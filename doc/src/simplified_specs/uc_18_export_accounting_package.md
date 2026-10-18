# Use Case Specification: UC-18

- **ID / Code:** UC-18
- **Use Case Name:** Export Accounting Package
- **Description:** Allows an Administrator (or authorized External Accountant guest user) to generate and download periodic accounting export packages (monthly or quarterly VeriFactu, CSVs, ZIPs), assigning explicit version identifiers and visual markers when regenerated after data corrections, logging export audit metadata, and alerting on mass downloads.
- **Primary Actor:** Administrator (or Temporary Guest Account with export privileges)
- **Scope:** Subscription Management & Invoicing System (Reporting & Accounting Subsystem)
- **Level:** User Goal
- **Stakeholders & Interests:**
  - *Administrator / External Accountant:* Wants compliant, properly encoded monthly or quarterly export packages (VeriFactu/CSVs/ZIPs) with clear version markers if data was corrected (FR-6.3.1, FR-6.3.2, NFR-2.6, NFR-2.10).
  - *Super-Administrator / Security Officer:* Wants comprehensive audit metadata recorded for every export and immediate alerts upon detecting bulk or mass data export attempts (FR-6.4.1, FR-6.4.2).
- **Preconditions:** The Administrator has an active, authenticated session (UC-01), and the reporting subsystem is online.
- **Postconditions:** The accounting export package is generated and versioned, export audit metadata is logged, and mass download alerts are triggered if thresholds are exceeded.
- **Success Guarantee:** A compliant export package (VeriFactu/CSV/ZIP) is generated asynchronously without freezing the UI (FR-6.3.1, NFR-1.4), version identifiers and visual markers are applied if regenerated after a correction (FR-6.3.2), character encoding for accents/foreign names is preserved (NFR-2.6), and full audit metadata is logged (FR-6.4.1).
- **Minimal Guarantee:** Every export action is logged with timestamp, applied filters, and requesting user (FR-6.4.1), and bulk/mass export attempts automatically trigger administrative security alerts (FR-6.4.2).
- **Trigger:** The Administrator requests to generate a periodic accounting export package.
- **Main Success Scenario:**
1. Administrator selects the option to generate an accounting export package and specifies the target period (monthly or quarterly), format (VeriFactu, CSV, or ZIP), and entity filters (FR-6.3.1, NFR-2.10).
2. System initiates the export generation as an asynchronous background operation, displaying real-time task status ("pending", "processing") without freezing the UI (NFR-1.4).
3. System compiles the invoice and tax records with exact decimal precision (NFR-2.5) and proper character encoding so letters with accents or foreign names are not corrupted in PDFs or CSVs (NFR-2.6).
4. System checks whether an export package was previously generated for this period and, if regenerating following a data correction, assigns an explicit incremented version identifier and visual correction marker (FR-6.3.2).
5. System records comprehensive export metadata in the audit trail, including generation timestamp, applied filters, package version, and requesting user (FR-6.4.1).
6. System updates the background task status to completed (NFR-1.4) and provides the package for download to the Administrator.

- **Extensions:**
1a. Bulk or Mass Data Export Attempt Detected:
  1a1. System detects that the requested export scope or frequency constitutes a bulk/mass data download attempt (FR-6.4.2).
  1a2. System logs the event in the security audit trail and automatically triggers an immediate alert to Administrators and Super-Administrators (FR-6.4.1, FR-6.4.2).
3a. Background Export Task Encounters Partial Record Error:
  3a1. System encounters a formatting error on a specific record during batch compilation.
  3a2. System updates the asynchronous task status to "completed with errors" (NFR-1.4) and highlights the specific problematic record for the Administrator.