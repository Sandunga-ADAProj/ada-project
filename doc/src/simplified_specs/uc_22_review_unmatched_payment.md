# Use Case Specification: UC-22

- **ID / Code:** UC-22
- **Use Case Name:** Review Unmatched Payment
- **Description:** Allows an Administrator to manually inspect and resolve ambiguous, delayed, duplicate, or unassociated bank transactions flagged during automated reconciliation (`UC-20`).
- **Primary Actor:** Administrator
- **Scope:** Subscription Management & Invoicing System (Banking & Reconciliation Subsystem)
- **Level:** User Goal (Extending Use Case)
- **Stakeholders & Interests:**
  - *Administrator:* Wants a clear side-by-side view of the flagged bank transaction and candidate outstanding invoices to resolve exceptions quickly (FR-3.3, FR-6.2, NFR-1.1).
  - *Customer Company:* Wants their payment accurately credited to their invoice and their account standing restored once manual verification completes (FR-2.5.2).
- **Preconditions:** The Administrator has an active, authenticated session (UC-01), and at least one bank transaction is flagged for manual review (`UC-20`).
- **Postconditions:** The flagged bank transaction is manually linked to one or more invoices (updating their status to "paid" or "partially reconciled") or marked as a duplicate/ignored record, and the audit trail is updated.
- **Success Guarantee:** The ambiguous transaction is resolved, linked invoice states and customer account standings update in real time (FR-2.4, FR-2.5.2, NFR-4.1), and the manual resolution is logged in the audit trail.
- **Minimal Guarantee:** Concurrent editing collisions are blocked (NFR-2.4), decimal precision is strictly preserved (NFR-2.5), and no transaction is double-counted.
- **Trigger:** The Administrator selects a flagged ambiguous payment notification from the dashboard (`UC-20` `ambiguous transaction` extension point, FR-3.3, FR-4.2.2, FR-6.2).
- **Main Success Scenario:**
1. Administrator selects a flagged bank transaction from the pending manual intervention queue on the dashboard (FR-3.3, FR-6.2).
2. System displays the raw bank transaction metadata (payer name, amount, reference string, date) alongside candidate outstanding invoices filtered by similar amounts or customer names.
3. Administrator selects the matching target invoice(s) and confirms the manual payment allocation.
4. System checks for concurrent editing collisions via optimistic locking (NFR-2.4) and verifies exact decimal allocation (NFR-2.5).
5. System updates the target invoice status to "paid" or "partially reconciled" (FR-2.4), recalculates the customer's real-time account standing (FR-2.5.2, NFR-4.1), and halts overdue reminders if fully settled (FR-4.1.3).
6. System clears the manual review flag, logs the Administrator's resolution in the audit trail, and dispatches a payment confirmation notification (FR-4.2.1).

- **Extensions:**
3a. Transaction Identified as Duplicate or Non-Invoice Transfer:
  3a1. Administrator determines that the bank transaction is a duplicate feed entry or an unrelated transfer (FR-3.3).
  3a2. Administrator marks the transaction as "Dismissed / Duplicate" with an explanatory note.
  3a3. System archives the transaction record in the audit log without altering any invoice balances.
3b. Account is in Dispute:
  3b1. Administrator notes that the partial or mismatched payment stems from an active billing dispute (FR-2.5.1).
  3b2. Administrator sets the customer's account standing to "In Dispute" (FR-2.5.1) and adds a contextual comment on the invoice (`UC-04`, FR-2.8).