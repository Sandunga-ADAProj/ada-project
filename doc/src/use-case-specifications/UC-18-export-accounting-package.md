# Use Case Specification: UC-18

* **ID / Code:** UC-18
* **Use Case Name:** Export Accounting Package
* **Description:** Allows an Administrator to generate monthly or quarterly export packages (e.g., VeriFactu, CSV, ZIP) for the external accounting service, with versioning when regenerated and full export audit.
* **Primary Actor:** Administrator
* **Scope:** Subscription Management & Invoicing System
* **Level:** User Goal
* **Stakeholders & Interests:**
  * *Administrator:* Wants to deliver complete, correct accounting data with minimal manual work.
  * *External accounting service:* Needs reliable files in the agreed formats, without corrupted characters (NFR-2.6) and with clear versions (FR-6.3.2).
  * *Company (Product Owner):* Wants every export to be traceable and mass downloads to be detected (FR-6.4).
* **Preconditions:** The Administrator is authenticated and has export permissions.
* **Postconditions:** An export package is available for download. Regenerated packages receive a new version identifier and visual marker (FR-6.3.2).
* **Success Guarantee:** The package is generated in the selected format with exact amounts (NFR-2.5) and correct encoding (NFR-2.6); metadata (timestamp, filters, requesting user) is recorded (FR-6.4.1); if it replaces a previous package, it has a new version identifier and visual marker (FR-6.3.2).
* **Minimal Guarantee:** A failed export does not modify the original invoice data.
* **Trigger:** The Administrator selects "Export accounting package".
* **Main Success Scenario:**
1. **Administrator:** Requests to export an accounting package.
2. **System:** Displays the available export options, including period (monthly/quarterly), supported format (e.g., CSV or ZIP) and filters.
3. **Administrator:** Selects the options and confirms.
4. **System:** Starts the generation as a background task and shows its status (pending, processing, completed) (NFR-1.4).
5. **System:** Generates the package from issued invoices of the period.
6. **System:** Records the export metadata, including timestamp, applied filters and requesting user (FR-6.4.1). If the package is regenerated, it assigns a new version identifier and visual marker (FR-6.3.2).
7. **System:** Notifies the Administrator that the package is ready and makes it available for download.

* **Extensions:**
  * 3a. The package for that period already exists and data have changed (e.g., after UC-17):
    * 3a1. System generates a new version, marks it visually as "Regenerated – vN" (FR-6.3.2).
  * 3b. Export classified as bulk/mass data export:
    * 3b1. System generates the package but automatically sends an alert to administrators (FR-6.4.2).
  * 5a. No issued invoices in the selected period:
    * 5a1. System informs that there is nothing to export.
  * 5b. Error during generation:
    * 5b1. System marks the task as "completed with errors" and keeps its status visible across browser sessions (NFR-1.4).
