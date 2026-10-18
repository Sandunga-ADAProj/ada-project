# Use Case Specification: UC-20

* **ID / Code:** UC-20
* **Use Case Name:** Reconcile Bank Payments
* **Description:** The System Scheduler periodically obtains bank transactions (includes UC-21) and automatically matches them with outstanding invoices using reference number, amount and metadata, updating invoice and account standing. Ambiguous transactions trigger UC-22 through the extension point **ambiguous transaction**.
* **Primary Actor:** System Scheduler. Supporting actor: Banking API (via UC-21)
* **Scope:** Subscription Management & Invoicing System
* **Level:** User Goal
* **Stakeholders & Interests:**
  * *Company (Product Owner):* Wants automatic, fast payment verification (FR-3.2, NFR-1.3).
  * *Administrator:* Wants only doubtful cases to require manual work (FR-3.3).
  * *Customer company:* Wants paid invoices to stop generating reminders promptly.
* **Preconditions:** The bank integration is configured; there are outstanding invoices ("sent", "overdue", "partially reconciled").
* **Postconditions:** Matched invoices are "paid" or "partially reconciled"; ambiguous transactions are queued for review.
* **Success Guarantee:** Each clearly matched transaction updates the invoice status (FR-2.4) and the account standing (FR-2.5.2); administrators are notified of paid invoices (FR-4.2.1).
* **Minimal Guarantee:** No invoice is marked as paid unless the match is unambiguous (FR-3.3); each transaction is processed in isolation (NFR-6.1) and never applied twice (NFR-2.2).
* **Trigger:** Scheduled execution of the reconciliation process (frequency allowing payment status to be reflected within 1 minute – NFR-1.3).
* **Main Success Scenario:**
1. **System Scheduler:** Starts the reconciliation process.
2. **System:** **Includes UC-21** to fetch new bank transactions.
3. **System:** For each transaction not yet processed, searches outstanding invoices by reference number, amount and metadata (FR-3.2).
4. **System:** Finds a single invoice matching exactly.
5. **System:** Links the transaction to the invoice and marks it as "paid".
6. **System:** Updates the customer's account standing (FR-2.5.2), cancels pending reminders for that invoice and notifies administrators (FR-4.2.1).
7. **System:** Records the execution result in the system health screen (NFR-2.9).

* **Extensions:**
2a. Bank integration error:
  2a1. System logs the error, alerts administrators (FR-4.2.2) and ends the execution; it will retry on the next run.
3a. Transaction already processed:
  3a1. System skips it to avoid double application (NFR-2.2).
4a. Amount lower than the invoice total:
  4a1. System marks the invoice as "partially reconciled" and keeps the outstanding balance (FR-2.4).
4b. Ambiguous transaction (extension point): no match, several possible invoices, duplicate or delayed transaction:
  4b1. System flags the transaction for manual review without marking any invoice as paid (FR-3.3).
  4b2. System alerts administrators; UC-22 (Review Unmatched Payment) handles it.
