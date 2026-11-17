#!/usr/bin/env node

/**
 * Script para renderizar diagramas PlantUML (.pu, .puml, .plantuml)
 * ubicados en doc/src hacia la carpeta doc/ manteniendo la misma jerarquía.
 * Solo genera imágenes PNG (no SVG).
 *
 * Uso:
 *   node scripts/render-diagrams.js          (renderizado incremental: solo procesa modificados)
 *   node scripts/render-diagrams.js --all    (fuerza la regeneración de todos los diagramas)
 *   node scripts/render-diagrams.js --svg    (genera además archivos SVG vectoriales)
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Algoritmo de codificación base64 propio de PlantUML
function encode64(data) {
  let r = '';
  for (let i = 0; i < data.length; i += 3) {
    if (i + 2 === data.length) {
      r += append3bytes(data[i], data[i + 1], 0);
    } else if (i + 1 === data.length) {
      r += append3bytes(data[i], 0, 0);
    } else {
      r += append3bytes(data[i], data[i + 1], data[i + 2]);
    }
  }
  return r;
}

function append3bytes(b1, b2, b3) {
  return (
    encode6bit((b1 >> 2) & 0x3f) +
    encode6bit((((b1 & 0x3) << 4) | (b2 >> 4)) & 0x3f) +
    encode6bit((((b2 & 0xf) << 2) | (b3 >> 6)) & 0x3f) +
    encode6bit(b3 & 0x3f)
  );
}

function encode6bit(b) {
  if (b < 10) return String.fromCharCode(48 + b);
  b -= 10;
  if (b < 26) return String.fromCharCode(65 + b);
  b -= 26;
  if (b < 26) return String.fromCharCode(97 + b);
  b -= 26;
  if (b === 0) return '-';
  if (b === 1) return '_';
  return '?';
}

function plantumlEncode(text) {
  const deflated = zlib.deflateRawSync(Buffer.from(text, 'utf8'), { level: 9 });
  return encode64(deflated);
}

// Búsqueda recursiva de archivos con extensiones específicas
function getAllFiles(dir, extensions) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, extensions));
    } else {
      const ext = path.extname(fullPath).toLowerCase();
      if (extensions.includes(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

function isValidPng(buf) {
  return (
    buf &&
    buf.length > 8 &&
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47
  );
}

// Renderizado: prioriza PlantUML oficial si no supera el límite de URL, con fallback a Kroki
async function renderDiagram(code, format = 'png') {
  let lastError = null;

  // 1. Prioridad: Servidor oficial de PlantUML (para diagramas pequeños/medianos en PNG)
  if (format === 'png') {
    try {
      const encoded = plantumlEncode(code);
      if (encoded.length < 4000) {
        const res = await fetch('https://www.plantuml.com/plantuml/png/' + encoded);
        if (res.ok) {
          const desc = res.headers.get('x-plantuml-diagram-description');
          const err = res.headers.get('x-plantuml-diagram-error');
          // Asegurar que no sea una imagen de error generada por PlantUML
          if (!err && desc !== '(0 entities)' && desc !== '(Error)') {
            const buf = Buffer.from(await res.arrayBuffer());
            if (isValidPng(buf)) {
              return buf;
            }
          }
        }
      }
    } catch (err) {
      lastError = err;
    }
  }

  // 2. Fallback: Kroki (soporta POST de diagramas gigantescos en PNG y SVG sin límite de URL)
  try {
    const res = await fetch(`https://kroki.io/plantuml/${format}`, {
      method: 'POST',
      body: code,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
    if (res.ok) {
      const buf = Buffer.from(await res.arrayBuffer());
      if (format === 'svg' || isValidPng(buf)) {
        return buf;
      }
    } else {
      const errText = await res.text();
      lastError = new Error(`Kroki (${res.status}): ${errText.trim()}`);
    }
  } catch (err) {
    lastError = err;
  }

  throw lastError || new Error('No se pudo renderizar el diagrama con los servidores disponibles.');
}

async function main() {
  const forceAll = process.argv.includes('--all') || process.argv.includes('-f') || process.argv.includes('--force');
  const generateSvg = process.argv.includes('--svg');

  const scriptDir = __dirname;
  const projectRoot = path.resolve(scriptDir, '..');
  const srcRoot = path.join(projectRoot, 'doc', 'src');
  const docRoot = path.join(projectRoot, 'doc');

  if (!fs.existsSync(srcRoot)) {
    console.error(`Error: No se encontró la carpeta '${srcRoot}'.`);
    process.exit(1);
  }

  const files = getAllFiles(srcRoot, ['.pu', '.puml', '.plantuml']);
  console.log(`Encontrados ${files.length} archivos PlantUML en '${path.relative(projectRoot, srcRoot)}'.`);
  if (forceAll) {
    console.log('Modo forzado (--all): se regenerarán todos los diagramas.');
  } else {
    console.log('Modo incremental: solo se procesarán diagramas nuevos o modificados (usa --all para forzar todos).');
  }
  if (generateSvg) {
    console.log('Modo SVG activado (--svg): se generarán también archivos .svg.');
  }
  console.log();

  let processedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const relFromSrc = path.relative(srcRoot, file);
    const parsed = path.parse(relFromSrc);
    const outRelDir = parsed.dir;
    const outFileName = parsed.name + '.png';
    const outDir = path.join(docRoot, outRelDir);
    const outFile = path.join(outDir, outFileName);

    const srcStat = fs.statSync(file);

    if (!forceAll && fs.existsSync(outFile)) {
      const outStat = fs.statSync(outFile);
      if (outStat.mtimeMs >= srcStat.mtimeMs && outStat.size > 0 && (!generateSvg || fs.existsSync(path.join(outDir, parsed.name + '.svg')))) {
        skippedCount++;
        continue;
      }
    }

    process.stdout.write(`[${i + 1}/${files.length}] Renderizando: ${relFromSrc} -> ${path.relative(docRoot, outFile)} ... `);

    try {
      fs.mkdirSync(outDir, { recursive: true });
      const code = fs.readFileSync(file, 'utf8');
      const pngBuf = await renderDiagram(code, 'png');
      fs.writeFileSync(outFile, pngBuf);

      if (generateSvg) {
        const svgBuf = await renderDiagram(code, 'svg');
        fs.writeFileSync(path.join(outDir, parsed.name + '.svg'), svgBuf);
      }

      console.log(`OK (${(pngBuf.length / 1024).toFixed(1)} KB)`);
      processedCount++;
      await new Promise((r) => setTimeout(r, 200));
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
      errorCount++;
    }
  }

  console.log('\n--- Resumen ---');
  console.log(`Procesados / Actualizados: ${processedCount}`);
  console.log(`Omitidos (sin cambios):    ${skippedCount}`);
  if (errorCount > 0) {
    console.log(`Errores:                   ${errorCount}`);
    process.exit(1);
  } else {
    console.log('¡Completado con éxito!');
  }
}

main().catch((err) => {
  console.error('Error fatal:', err);
  process.exit(1);
});
