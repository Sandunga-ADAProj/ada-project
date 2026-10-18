# Use Case Specification: UC-10

### 🏗️ Identification & Context
* **ID / Code:** UC-10
* **Use Case Name:** Approve Commercial Exception
* **Description:** Allows an Administrator or Super-Administrator (depending on the configured thresholds) to review a pending commercial exception proposal and approve or reject it. If approved, the new conditions are applied to the subscription.
* **Primary Actor:** Administrator (Super-Administrator for amounts above the threshold)
* **Scope:** Subscription Management & Invoicing System
* **Level:** User Goal

### 👥 Stakeholders & Triggers
* **Stakeholders & Interests:**
  * *Approver:* Wants enough information (impact, justification, history) to decide quickly.
  * *Proposer:* Wants to know the decision as soon as possible.
  * *Company (Product Owner):* Wants discounts to be controlled and auditable (FR-2.6.3, FR-2.6.4).
* **Trigger:** The approver opens a pending proposal from a notification or the dashboard (UC-03).

### 🛡️ Conditions & Guarantees
* **Preconditions:** A proposal exists in "Pending Approval" state (UC-09); the actor is the assigned approver or substitute with the required authorization level.
* **Postconditions:** The proposal is "Approved" or "Rejected".
* **Success Guarantee:** If approved, the subscription conditions are updated for the defined validity period, without retroactive changes to already issued invoices; the pricing audit trail records user, timestamp, previous and new price (FR-2.6.4); the proposer is notified.
* **Minimal Guarantee:** A proposal can only be decided once and only by an authorized approver; the decision is always logged.
* **Trigger:** The approver requests to review a proposal.

### 🔄 Flows of Events

#### Main Success Scenario (Happy Path):
1. **Approver:** Opens a pending commercial exception.
2. **System:** Displays the proposal: customer, type, value, validity, justification, proposer, financial impact and the customer's pricing history.
3. **Approver:** Approves the proposal, optionally adding a comment.
4. **System:** Verifies that the approver's authorization level covers the amount (FR-2.6.3).
5. **System:** Applies the exception to the subscription for the defined period and records the change in the pricing audit trail (FR-2.6.4) and the customer timeline.
6. **System:** Notifies the proposer of the approval.

#### Extensions (Alternative Flows):
* **3a. Approver rejects the proposal:**
  * 3a1. Approver enters the rejection reason.
  * 3a2. System marks the proposal as "Rejected", keeps standard conditions and notifies the proposer.
* **4a. Amount exceeds the Administrator's threshold:**
  * 4a1. System prevents the approval and escalates the proposal to a Super-Administrator.
* **5a. The exception affects a locked financial period (FR-2.7):**
  * 5a1. System applies the change only from the next open period, or requires an override (UC-17).
