# Use Case Specification: UC-22

### 🏗️ Identification & Context
* **ID / Code:** UC-22
* **Use Case Name:** Review Unmatched Payment
* **Description:** Extends UC-20 when a bank transaction is ambiguous, delayed, duplicated or cannot be associated: an Administrator reviews it and manually assigns it to one or more invoices, marks it as duplicate, or leaves it unresolved.
* **Primary Actor:** Administrator
* **Scope:** Subscription Management & Invoicing System
* **Level:** User Goal (extends UC-20 at extension point *ambiguous transaction*)

### 👥 Stakeholders & Triggers
* **Stakeholders & Interests:**
  * *Administrator:* Wants all the information needed to decide quickly.
  * *Customer company:* Does not want to receive overdue reminders for invoices already paid.
  * *Company (Product Owner):* Wants accurate balances and no premature "paid" statuses (FR-3.3).
* **Trigger:** The Administrator opens a flagged transaction from an alert or the dashboard (FR-6.2).

### 🛡️ Conditions & Guarantees
* **Preconditions:** There is at least one transaction flagged for review (UC-20).
* **Postconditions:** The transaction is matched, marked as duplicate/not related, or remains pending with a note.
* **Success Guarantee:** The manual decision updates the related invoice statuses and the account standing (FR-2.5.2), and is logged with user and timestamp.
* **Minimal Guarantee:** The total assigned never exceeds the transaction amount; no invoice changes state without explicit confirmation.
* **Trigger:** The Administrator requests to review an unmatched payment.

### 🔄 Flows of Events

#### Main Success Scenario (Happy Path):
1. **Administrator:** Opens the queue of flagged transactions and selects one.
2. **System:** Displays the transaction (date, amount, payer, reference, metadata), the reason it was flagged and candidate invoices ranked by similarity.
3. **Administrator:** Selects one or more invoices and the amount to assign to each.
4. **System:** Validates that the assigned amounts are consistent with the transaction amount.
5. **Administrator:** Confirms the assignment.
6. **System:** Links the transaction, updates invoice statuses ("paid" / "partially reconciled") and the account standing, and cancels pending reminders for paid invoices.
7. **System:** Logs the decision and removes the transaction from the review queue.

#### Extensions (Alternative Flows):
* **3a. Transaction is a duplicate or unrelated to any invoice:**
  * 3a1. Administrator marks it as "duplicate" or "not related" with a reason.
  * 3a2. System logs it and closes the review.
* **3b. Not enough information to decide:**
  * 3b1. Administrator adds a comment and leaves it pending; the account may be marked "In Dispute" (FR-2.5.1).
* **4a. Assigned amount exceeds the transaction amount:**
  * 4a1. System rejects the assignment; the flow resumes at step 3.
