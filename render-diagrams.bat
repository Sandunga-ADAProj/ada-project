@echo off
node "%~dp0scripts\render-diagrams.js" %*
if %ERRORLEVEL% neq 0 (
    echo.
    echo Ha ocurrido un error al renderizar los diagramas.
    pause
)
