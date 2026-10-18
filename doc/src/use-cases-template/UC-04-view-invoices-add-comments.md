# Use Case Specification: UC-04

* **ID / Code:** UC-04
* **Use Case Name:** View Invoices & Add Comments
* **Description:** Allows a user to view, download and track the status of invoices of their assigned clients, and to leave contextual comments on a specific invoice, mentioning other internal users.
* **Primary Actor:** Base User (inherited by Administrator and Super-Administrator)
* **Scope:** Subscription Management & Invoicing System
* **Level:** User Goal
* **Stakeholders & Interests:**
  * *Base User:* Wants to check the lifecycle status of invoices and coordinate with colleagues on a specific invoice (UR-1.2, FR-2.8).
  * *Mentioned user:* Wants to be notified only when their attention is required on a specific invoice.
  * *Company (Product Owner):* Wants collaboration to stay contextual and traceable, avoiding unstructured chat (FR-2.8).
* **Preconditions:** The user is authenticated (UC-01) and has permission to access the invoice's customer.
* **Postconditions:** If a comment is added, it is stored linked to the invoice, with author and timestamp, and mentioned users are notified.
* **Success Guarantee:** The user views the invoice with its current status (FR-2.4) and, optionally, downloads its PDF or publishes a comment that notifies the mentioned users.
* **Minimal Guarantee:** The invoice data is never modified through this use case; comments that fail to save are not partially stored.
* **Trigger:** The user selects an invoice from the dashboard or a search result (UC-03).
* **Main Success Scenario:**
1. **User:** Selects an invoice.
2. **System:** Displays the invoice details: number, customer, items, taxes, amounts, due date, current status ("draft", "ready to issue", "issued", "sent", "overdue", "paid", "partially reconciled") (FR-2.4), attachments (FR-2.2.3) and its comment thread.
3. **User:** Writes a comment on the invoice and mentions one or more internal users using "@".
4. **System:** Validates the comment and that the mentioned users exist and are active.
5. **System:** Stores the comment linked to the invoice, with author and timestamp.
6. **System:** Sends a targeted notification to each mentioned user (FR-2.8).
7. **System:** Displays the updated comment thread.

* **Extensions:**
2a. User downloads the invoice:
  2a1. User requests the PDF.
  2a2. System generates/serves the PDF preserving special characters correctly (NFR-2.6). The use case ends.
3a. User only views the invoice and leaves:
  3a1. The use case ends with no changes.
4a. Mentioned user does not exist or is inactive:
  4a1. System informs the user and lets them correct the mention.
4b. Empty comment:
  4b1. System does not allow the comment to be published.
6a. Notification cannot be delivered:
  6a1. System keeps the comment, queues the notification for retry and shows the mention in the recipient's dashboard (FR-6.2).
