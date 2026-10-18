# Use Case Specification: UC-15

### 🏗️ Identification & Context
* **ID / Code:** UC-15
* **Use Case Name:** Issue & Send Invoice
* **Description:** Allows an Administrator to issue an invoice in "ready to issue" state (making it legally final) and send it to the customer's billing contact. Sending includes the automated notification process (UC-23).
* **Primary Actor:** Administrator
* **Scope:** Subscription Management & Invoicing System
* **Level:** User Goal

### 👥 Stakeholders & Triggers
* **Stakeholders & Interests:**
  * *Administrator:* Wants to issue invoices safely, without losing or duplicating them, and to know exactly what failed if something goes wrong (NFR-1.5, NFR-1.6).
  * *Customer company:* Wants to receive the invoice immediately (FR-4.1.1).
  * *Company (Product Owner):* Wants compliant, sequentially numbered invoices and payment follow-up.
* **Trigger:** The Administrator selects "Issue & send" on one or more invoices.

### 🛡️ Conditions & Guarantees
* **Preconditions:** The invoice is in "ready to issue" state; the customer has an active billing contact; the period is open.
* **Postconditions:** The invoice is "issued" and, if delivery succeeds, "sent".
* **Success Guarantee:** The invoice is issued with its final number and PDF, sent to the billing contact, its state changes to "sent" (FR-2.4), administrators are notified of the issuance (FR-4.2.1) and follow-up reminders are scheduled (FR-4.1.2).
* **Minimal Guarantee:** An invoice is issued only once even if the page is reloaded (NFR-1.5); if sending fails, the invoice remains "issued" and the error is reported distinctly from a creation error (NFR-1.6).
* **Trigger:** The Administrator requests to issue and send an invoice.

### 🔄 Flows of Events

#### Main Success Scenario (Happy Path):
1. **Administrator:** Selects an invoice and requests to issue and send it.
2. **System:** Shows a preview and warns that issuing is a legally irreversible action (NFR-1.5).
3. **Administrator:** Confirms.
4. **System:** Verifies the invoice data and that the period is open, and changes its state to "issued", generating the final PDF.
5. **System:** **Includes UC-23** to send the invoice to the customer's billing contact and to notify administrators of the issuance (FR-4.1.1, FR-4.2.1).
6. **System:** Changes the invoice state to "sent" and schedules follow-up reminders at 3 and 5 calendar days (FR-4.1.2).
7. **System:** Displays the result to the Administrator; for batch operations, shows task progress asynchronously (NFR-1.4).

#### Extensions (Alternative Flows):
* **3a. Administrator cancels:**
  * 3a1. The invoice remains "ready to issue".
* **4a. Missing data or no active billing contact:**
  * 4a1. System blocks issuance and indicates what is missing (NFR-2.8).
* **4b. Period locked:**
  * 4b1. System blocks issuance (FR-2.7); a Super-Administrator override (UC-17) is required.
* **5a. Delivery to the customer fails:**
  * 5a1. System keeps the invoice "issued", queues a retry and shows a specific message: "Invoice was issued but could not be sent" (NFR-1.6).
  * 5a2. System alerts administrators (FR-4.2.2).
* **\*a. Page reloaded during issuance:**
  * \*a1. System detects the operation already in progress/completed and does not issue the invoice twice (NFR-1.5).
