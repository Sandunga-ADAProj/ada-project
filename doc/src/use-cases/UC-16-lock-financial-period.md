# Use Case Specification: UC-16

### 🏗️ Identification & Context
* **ID / Code:** UC-16
* **Use Case Name:** Lock Financial Period
* **Description:** Allows an Administrator to mark a financial period (e.g., a month or quarter) as administratively closed, blocking any creation, edition or deletion of invoices within that period.
* **Primary Actor:** Administrator
* **Scope:** Subscription Management & Invoicing System
* **Level:** User Goal

### 👥 Stakeholders & Triggers
* **Stakeholders & Interests:**
  * *Administrator:* Wants to freeze closed periods so that exported accounting data cannot change (FR-2.7).
  * *External accounting service:* Requires stable figures for closed periods.
  * *Auditor:* Wants evidence of who closed each period and when.
* **Trigger:** The Administrator selects "Lock period" (typically after exporting the accounting package, UC-18).

### 🛡️ Conditions & Guarantees
* **Preconditions:** The Administrator is authenticated; the period is open and has already ended.
* **Postconditions:** The period is in "locked" state.
* **Success Guarantee:** The period is locked, the action is logged (user, timestamp) and every later attempt to create, edit or delete invoices in that period is blocked unless an audited override exists (UC-17).
* **Minimal Guarantee:** Invoices of the period are not modified by the locking operation.
* **Trigger:** The Administrator requests to lock a period.

### 🔄 Flows of Events

#### Main Success Scenario (Happy Path):
1. **Administrator:** Requests to lock a financial period.
2. **System:** Displays open periods and, for the selected one, a summary: number of invoices, drafts still pending and totals.
3. **Administrator:** Selects the period.
4. **System:** Checks that there are no pending drafts or "ready to issue" invoices in the period and warns that locking blocks further changes.
5. **Administrator:** Confirms.
6. **System:** Marks the period as locked, records the action in the audit trail and confirms the operation.

#### Extensions (Alternative Flows):
* **4a. Pending drafts or unissued invoices exist:**
  * 4a1. System lists them and asks the Administrator to resolve them first or to confirm locking anyway (pending drafts will be blocked).
* **4b. The period has not ended yet:**
  * 4b1. System does not allow locking a current or future period.
* **5a. Administrator cancels:**
  * 5a1. The period remains open.
