# Use Case Specification: UC-14

- **ID / Code:** UC-14
- **Use Case Name:** Manage Ad-Hoc & Test Invoices
- **Description:** Allows an Administrator to manually generate one-off (ad-hoc) invoices on demand, attach supporting files, and edit or delete unissued test/draft invoices while maintaining a secure audit log. Can be extended by `UC-17: Override Locked Period` if the target financial period is closed.
- **Primary Actor:** Administrator
- **Scope:** Subscription Management & Invoicing System (Invoicing Subsystem)
- **Level:** User Goal
- **Stakeholders & Interests:**
  - *Administrator:* Wants fast autofill when creating one-off invoices, automatic form draft recovery, and the ability to clean up unissued test drafts safely (FR-2.2.1, FR-2.3.1, FR-2.3.2, NFR-1.1, NFR-1.5).
  - *Company / Business:* Requires that closed financial periods block unauthorized edits/creations and that all edits or deletions of test invoices are permanently recorded in a secure audit log (FR-2.3.2, FR-2.7).
- **Preconditions:** The Administrator has an active, authenticated session (UC-01), and the invoicing subsystem is online.
- **Postconditions:** An ad-hoc or test invoice is created, edited, or deleted (if unissued), and the action is recorded in the secure audit log.
- **Success Guarantee:** Ad-hoc invoices are accurately autofilled and formatted with exact decimal precision (FR-2.2.1, FR-2.2.2, FR-2.3.1, NFR-2.5), and any edits or deletions of unissued test/draft invoices are logged in the audit trail (FR-2.3.2).
- **Minimal Guarantee:** Issued invoices can never be deleted as test invoices (FR-2.3.2), modifications inside locked financial periods are blocked unless overridden by an audited Super-Administrator exception (FR-2.7), and page reloads never duplicate invoice records (NFR-1.5).
- **Trigger:** The Administrator selects the option to create an ad-hoc invoice or manage an existing draft/test invoice.
- **Main Success Scenario:**
1. Administrator requests to create a new ad-hoc (one-off) invoice or select an existing unissued test/draft invoice for a customer (FR-2.3.1, FR-2.3.2).
2. System verifies that the target financial period is open (FR-2.7) and autofills all customer and billing details from stored profile records into the form (FR-2.2.1) with automatic draft recovery active (NFR-1.5).
3. Administrator enters or modifies the line items, specifies tax/VAT parameters, and optionally attaches supporting documentation files (FR-2.2.2, FR-2.2.3).
4. Administrator saves the invoice as a "draft" / test invoice or marks it as "ready to issue" (FR-2.3.2, FR-2.4).
5. System validates decimal precision (NFR-2.5), checks for concurrent editing collisions (NFR-2.4), and scans any uploaded attachments for malicious content (NFR-5.5).
6. System persists the invoice record and logs the creation or modification in the secure audit trail (FR-2.3.2).
7. System confirms the operation to the Administrator.

- **Extensions:**
2a. Target Financial Period is Locked (`period locked` extension point):
  2a1. System detects that the invoice date falls within an administratively closed financial period (FR-2.7).
  2a2. System blocks standard creation, editing, or deletion and warns the Administrator (FR-2.7).
  2a3. If a Super-Administrator is performing the action and requires an exception, System executes extending use case **UC-17: Override Locked Period**.
3a. Administrator Deletes an Unissued Test / Draft Invoice:
  3a1. Administrator requests to delete an unissued test invoice currently in "draft" / "Not Issued" status (FR-2.3.2).
  3a2. System verifies the invoice has never been issued, prompts the Administrator for confirmation (NFR-1.5), removes the draft from active views, and records the deletion in the secure audit log (FR-2.3.2).
4a. Accidental Form Closure or Page Reload:
  4a1. Administrator accidentally closes the form or reloads the browser page (NFR-1.5).
  4a2. System restores the saved draft and ensures the invoice is not lost or duplicated (NFR-1.5).