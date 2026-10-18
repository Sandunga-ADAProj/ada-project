# Use Case Specification: UC-26

- **ID / Code:** UC-26
- **Use Case Name:** Process Account Cancellation
- **Description:** Allows an Administrator to review and approve (or reject) a pending account cancellation request (`UC-25`) on a privacy-restricted review screen displaying outstanding financial obligations. Upon approval, the system freezes new recurring invoice generation while persisting overdue debt collection reminders and retaining historical statutory records.
- **Primary Actor:** Administrator (or designated Substitute Approver)
- **Scope:** Subscription Management & Invoicing System (Account Lifecycle & Debt Collection Subsystem)
- **Level:** User Goal
- **Stakeholders & Interests:**
  - *Administrator:* Wants a focused cancellation review screen that clearly highlights outstanding financial obligations while disclosing only minimum authorized account details (FR-5.3.2).
  - *Company / Business:* Requires that cancelling an account immediately stops new recurring invoices (FR-5.1), keeps overdue reminders active for unpaid historical invoices (FR-5.2), and retains all historical records in accordance with statutory laws (FR-5.4).
  - *Customer Company:* Expects no new monthly subscription invoices after their approved cancellation takes effect (FR-5.1).
- **Preconditions:** The Administrator has an active, authenticated session (UC-01), and a customer account has a pending cancellation request (`UC-25`).
- **Postconditions:** The customer account subscription is cancelled (freezing recurring billing), overdue collection workflows persist for any unpaid balances, and historical records remain securely retained.
- **Success Guarantee:** Upon approval, recurring invoice generation ceases immediately for the company (FR-5.1), overdue notifications for any outstanding historical balances persist until settled or written off (FR-4.1.3, FR-5.2), and all company historical data and invoice PDFs are retained per statutory record-retention laws (FR-5.4, NFR-5.2).
- **Minimal Guarantee:** The cancellation review screen discloses only minimum authorized account details (FR-5.3.2, NFR-5.1), statutory historical records are never deleted upon cancellation (FR-5.4), and unpaid historical debt is never silently erased (FR-5.2).
- **Trigger:** The Administrator selects a pending cancellation request from their notifications or dashboard queue (FR-5.3.1, FR-6.2).
- **Main Success Scenario:**
1. Administrator selects a pending account cancellation request for formal review (FR-5.3.1).
2. System renders the cancellation review screen, displaying all outstanding financial obligations (unpaid, overdue, or disputed invoices) while disclosing only the minimum authorized account details (FR-5.3.2, NFR-5.1).
3. Administrator reviews the obligations and requests to approve the account cancellation, prompting the system to display a warning before completing the legally sensitive action (NFR-1.5).
4. Administrator confirms the cancellation approval.
5. System transitions the customer subscription status to "Cancelled" and permanently freezes the generation of any new recurring invoices for that company (FR-5.1).
6. System checks for outstanding unpaid balances and, if present, maintains active overdue notification schedules for those historical invoices until settled, resolved, or written off (FR-4.1.3, FR-5.2).
7. System archives and retains the company's historical data and invoice records in compliance with statutory record-retention laws (FR-5.4, NFR-5.2) and logs the cancellation on the customer chronological timeline (FR-6.7.2).
8. System confirms the completed account cancellation to the Administrator.

- **Extensions:**
3a. Administrator Rejects the Cancellation Request:
  3a1. Administrator rejects the cancellation request (e.g., due to active contract lock-in or resolved client retention) and enters a reason.
  3a2. System restores the customer account to standard "Active" status, keeps recurring billing active, logs the decision in the timeline (FR-6.7.2), and notifies the requesting Base User.