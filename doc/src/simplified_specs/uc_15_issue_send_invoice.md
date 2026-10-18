# Use Case Specification: UC-15

- **ID / Code:** UC-15
- **Use Case Name:** Issue & Send Invoice
- **Description:** Allows an Administrator to formally issue an invoice—assigning immutable sequential compliance numbering—and transition it to the "sent" state, automatically invoking `UC-23: Send Automated Notifications` to dispatch the invoice to the customer contact and notify administrators.
- **Primary Actor:** Administrator
- **Scope:** Subscription Management & Invoicing System (Invoicing Subsystem)
- **Level:** User Goal
- **Stakeholders & Interests:**
  - *Administrator:* Wants a clear warning before legally irreversible invoice issuance and distinct error messages if creation succeeds but sending fails (NFR-1.5, NFR-1.6).
  - *Customer Company:* Wants to receive a compliant, properly encoded PDF invoice immediately upon transition to the "sent" state (FR-2.2.2, FR-4.1.1, NFR-2.6).
  - *Company / Business:* Requires sequential compliance numbering, real-time account standing updates, and automated notification dispatch (FR-2.2.2, FR-2.4, FR-2.5.2, FR-4.1.1, FR-4.2.1).
- **Preconditions:** The Administrator has an active, authenticated session (UC-01), and a valid invoice exists in "draft" or "ready to issue" state (`UC-13` or `UC-14`).
- **Postconditions:** The invoice status transitions to "issued" and "sent", a compliance PDF is locked, account standing is synchronized, and notifications are dispatched.
- **Success Guarantee:** The invoice receives a sequential compliance number, transitions to "issued" and "sent" (FR-2.2.2, FR-2.4), and **UC-23: Send Automated Notifications** dispatches notifications to both the customer contact and administrators (FR-4.1.1, FR-4.2.1).
- **Minimal Guarantee:** Issuing an invoice is protected against duplicate submission on page reload (NFR-1.5), and creation errors are strictly separated from delivery/sending errors so an issued invoice is never rolled back or duplicated if the email gateway fails (NFR-1.6).
- **Trigger:** The Administrator selects an invoice in "draft" or "ready to issue" status and requests to formally issue and send it.
- **Main Success Scenario:**
1. Administrator selects a prepared invoice and initiates the formal issuance and sending action.
2. System verifies that the target financial period is open (FR-2.7) and that the customer's tax and active billing contact information is complete (FR-4.2.2, NFR-2.8 Blocked Actions).
3. System displays a confirmation warning to the Administrator, indicating that formal invoice issuance is a legally irreversible accounting action (NFR-1.5).
4. Administrator confirms the issuance.
5. System assigns the immutable sequential compliance number, finalizes itemized tax and VAT calculations (FR-2.2.2, NFR-2.5), generates the compliant PDF with proper character encoding (NFR-2.6, NFR-5.2), and updates the invoice lifecycle state to "issued" and then "sent" (FR-2.4).
6. System synchronizes the customer's real-time account standing (FR-2.5.2, NFR-4.1).
7. System automatically executes **UC-23: Send Automated Notifications** (`<<include>>`) to send the invoice notification to the company contact immediately upon transition to the "sent" state (FR-4.1.1) and notify administrators that the invoice has been issued (FR-4.2.1).
8. System displays a confirmation message to the Administrator.

- **Extensions:**
4a. Page Reload During Issuance:
  4a1. Administrator reloads the page while the issuance transaction is processing (NFR-1.5).
  4a2. System detects the idempotency token and ensures the invoice issuance is neither lost nor duplicated (NFR-1.5).
5a. Invoice Could Not Be Created / Issued (Validation or Period Lock Failure):
  5a1. System encounters a validation failure or locked financial period prior to issuance (FR-2.7, NFR-1.6).
  5a2. System aborts the issuance and displays the specific error: "Invoice could not be created/issued" (NFR-1.6).
7a. Invoice Created and Issued, But Could Not Be Sent (Gateway Failure):
  7a1. **UC-23** reports that the external Email/SMS Gateway failed to deliver the notification.
  7a2. System retains the invoice in the "issued" state (do not roll back legal issuance), queues the notification for retry (NFR-2.9), alerts the Administrator (FR-4.2.2), and displays a distinct error message: "Invoice was created/issued but could not be sent" (NFR-1.6).