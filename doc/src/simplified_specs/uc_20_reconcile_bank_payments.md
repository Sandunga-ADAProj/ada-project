# Use Case Specification: UC-20

- **ID / Code:** UC-20
- **Use Case Name:** Reconcile Bank Payments
- **Description:** Executed by the System Scheduler to automatically reconcile incoming bank transactions (fetched via `UC-21`) against outstanding invoices based on reference numbers, amounts, and metadata, updating invoice lifecycle statuses, account standings, and notifying administrators. Includes an extension point for ambiguous transactions (`UC-22`).
- **Primary Actor:** System Scheduler
- **Scope:** Subscription Management & Invoicing System (Banking & Reconciliation Engine)
- **Level:** User Goal
- **Stakeholders & Interests:**
  - *Company / Business:* Wants automated payment verification and reconciliation to eliminate manual bookkeeping errors (BR-2, FR-3.2).
  - *Administrator:* Wants payment-status checks to reflect within 1 minute, immediate alerts when invoices are paid or when ambiguous matches occur, and assurance that ambiguous payments never mark an invoice as paid prematurely (FR-3.3, FR-4.2.1, FR-4.2.2, NFR-1.3).
  - *Customer Company:* Wants their account standing updated to "Up-to-Date" and overdue reminders halted immediately upon settling their balance (FR-2.5.2, FR-4.1.3).
- **Preconditions:** The reconciliation engine is online and scheduled to run.
- **Postconditions:** Matched invoices transition to "paid" or "partially reconciled", customer account standings are updated in real time, and ambiguous transactions are flagged for manual review (`UC-22`).
- **Success Guarantee:** Incoming transactions are fetched (`UC-21`), exact matches transition invoices to "paid" within the 1-minute processing threshold (FR-2.4, FR-3.2, NFR-1.3), customer account standing updates automatically (FR-2.5.2), and administrators are notified (FR-4.2.1).
- **Minimal Guarantee:** Ambiguous, delayed, duplicate, or unassociated bank transactions never mark an invoice as paid prematurely (FR-3.3), exact decimal precision is maintained (NFR-2.5), and individual transaction errors do not halt the batch queue (NFR-6.1).
- **Trigger:** The System Scheduler initiates the periodic payment reconciliation cycle.
- **Main Success Scenario:**
1. System Scheduler triggers the payment reconciliation process.
2. System automatically executes **UC-21: Fetch Bank Transactions** (`<<include>>`) to retrieve new incoming payment records from external banking APIs / simulated Stripe environment (FR-3.1, NFR-2.10).
3. For each transaction in an isolated batch context (NFR-6.1), System compares the payment reference number, exact decimal amount (NFR-2.5), currency, and customer metadata against outstanding ("issued", "sent", "overdue", "partially reconciled") invoices (FR-2.4, FR-3.2).
4. System identifies an exact, unambiguous full-payment match and updates the invoice status to "paid" within 1 minute (FR-2.4, FR-3.2, NFR-1.3).
5. System automatically recalculates and updates the customer's real-time account standing (e.g., to "Up-to-Date") (FR-2.5.1, FR-2.5.2, NFR-4.1) and stops any scheduled overdue reminders for that invoice (FR-4.1.3).
6. System notifies the Administrator that the invoice has been paid (FR-4.2.1) and logs the reconciliation entry.

- **Extensions:**
3a. Ambiguous, Delayed, Duplicate, or Unassociated Transaction (`ambiguous transaction` extension point):
  3a1. System detects a missing/mismatched reference number, duplicate transaction ID, unrecognized sender, or ambiguous amount (FR-3.3).
  3a2. System refrains from marking any invoice as paid prematurely, flags the transaction for manual review (FR-3.3), alerts the Administrator immediately (FR-4.2.2), and queues **UC-22: Review Unmatched Payment**.
4a. Partial Payment Match Detected:
  4a1. System matches the reference number to an invoice, but the paid amount is less than the total outstanding balance (FR-2.4).
  4a2. System updates the invoice status to "partially reconciled" (FR-2.4), updates the remaining unresolved balance on the customer's account standing (FR-2.5.2), and alerts the Administrator (FR-4.2.2).