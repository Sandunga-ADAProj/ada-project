# Use Case Specification: UC-14

### 🏗️ Identification & Context
* **ID / Code:** UC-14
* **Use Case Name:** Manage Ad-Hoc & Test Invoices
* **Description:** Allows an Administrator to manually create one-off (ad-hoc) invoices for a customer and to create, edit and delete test/draft invoices that have not been issued, keeping a secure audit log. If the target period is locked, UC-17 may extend this use case.
* **Primary Actor:** Administrator
* **Scope:** Subscription Management & Invoicing System
* **Level:** User Goal
* **Extension Points:** *period locked* (step 5) → UC-17.

### 👥 Stakeholders & Triggers
* **Stakeholders & Interests:**
  * *Administrator:* Wants to bill extra services or correct situations not covered by recurring billing (FR-2.3.1).
  * *Company (Product Owner):* Wants drafts to be editable but every change audited (FR-2.3.2).
  * *Auditor:* Requires that issued invoices can never be edited or deleted.
* **Trigger:** The Administrator selects "New invoice" or opens a draft invoice.

### 🛡️ Conditions & Guarantees
* **Preconditions:** The Administrator is authenticated (UC-01); the customer exists.
* **Postconditions:** The invoice exists in "draft" or "ready to issue" state, or the draft has been deleted.
* **Success Guarantee:** The ad-hoc/test invoice is stored with autofilled customer data, correct taxes and attachments, and every creation, edit or deletion is recorded in the audit log (FR-2.3.2).
* **Minimal Guarantee:** Issued invoices are never edited or deleted; no invoice is created, edited or deleted in a locked period without an audited override (FR-2.7); reloading the page never duplicates an invoice (NFR-1.5).
* **Trigger:** The Administrator requests to manage a manual invoice.

### 🔄 Flows of Events

#### Main Success Scenario (Happy Path):
1. **Administrator:** Requests to create an ad-hoc invoice for a customer.
2. **System:** Displays the invoice form with customer and billing data autofilled (FR-2.2.1).
3. **Administrator:** Adds line items, quantities and prices, optionally attaches documents (FR-2.2.3), and indicates whether it is a test invoice.
4. **System:** Calculates taxes and totals with exact precision (FR-2.2.2, NFR-2.5) and auto-saves the draft (NFR-1.5).
5. **System:** Checks that the invoice date belongs to an open financial period.
6. **Administrator:** Saves the invoice.
7. **System:** Stores it as "draft" (test) or "ready to issue" (ad-hoc), and logs the action in the audit trail.

#### Extensions (Alternative Flows):
* **1a. Administrator edits an existing draft/test invoice:**
  * 1a1. System loads the draft; the flow continues at step 3.
* **1b. Administrator deletes a draft/test invoice:**
  * 1b1. System asks for confirmation.
  * 1b2. System deletes the draft and logs the deletion (FR-2.3.2). The use case ends.
* **1c. Administrator tries to edit or delete an issued invoice:**
  * 1c1. System blocks the action and indicates that issued invoices can only be corrected through a new invoice (Assumption: corrective invoice).
* **3a. Dangerous attachment detected:**
  * 3a1. System rejects the file and shows an error (NFR-5.5).
* **5a. Period locked (extension point *period locked*):**
  * 5a1. System blocks the operation and informs that the period is closed (FR-2.7).
  * 5a2. If an override is required, UC-17 (Override Locked Period) is executed by a Super-Administrator; otherwise the use case ends.
* **7a. Invoice is ready to be sent:**
  * 7a1. The Administrator may continue with UC-15 (Issue & Send Invoice).
