# Use Case Specification: UC-10

- **ID / Code:** UC-10
- **Use Case Name:** Approve Commercial Exception
- **Description:** Enables an Administrator (or Super-Administrator / designated Substitute Approver) to review and authorize or reject proposed commercial exceptions and discounts based on configurable threshold rules, logging the decision in the pricing audit trail.
- **Primary Actor:** Administrator (inherited by Super-Administrator)
- **Scope:** Subscription Management & Invoicing System (Pricing & Approval Subsystem)
- **Level:** User Goal
- **Stakeholders & Interests:**
  - *Administrator / Super-Administrator:* Wants clear visibility into the proposed discount, justification, and previous pricing before authorizing financial changes (FR-2.6.3, FR-2.6.4).
  - *Base User:* Wants timely resolution of their proposed commercial exceptions so client billing can proceed (FR-2.6.2).
  - *Company / Business:* Requires strict enforcement of discount threshold hierarchies and complete auditability of all pricing modifications (FR-2.6.3, FR-2.6.4).
- **Preconditions:** The Administrator has an active, authenticated session (UC-01), and at least one commercial exception proposal is in a "Pending Approval" state (`UC-09`).
- **Postconditions:** The commercial exception is either approved and applied to the subscription or rejected, and the decision is permanently logged in the pricing audit trail.
- **Success Guarantee:** Authorized commercial exceptions are applied to the customer's subscription plan, the pricing audit trail records the approving user, timestamp, previous price, and updated price (FR-2.6.4), and the customer lifecycle timeline is updated (FR-6.7.2).
- **Minimal Guarantee:** Administrators cannot approve discounts that exceed their role's configured threshold ceiling (which require Super-Administrator authorization) (FR-2.6.3), and concurrent approval collisions are blocked (NFR-2.4).
- **Trigger:** The Administrator selects a pending commercial exception from their actionable notifications or dashboard queue (FR-6.2).
- **Main Success Scenario:**
1. Administrator selects a pending commercial exception request for review (FR-2.6.3, FR-6.2).
2. System verifies that the actor has the required role threshold authority (Administrator, Super-Administrator, or active Substitute Approver) to authorize the specific discount level (FR-2.6.3, FR-7.2).
3. System displays the customer profile, current price, proposed exception details (volume discount, free period, custom price, or waived proration), and requester justification (FR-2.6.2, FR-2.6.4).
4. Administrator approves the commercial exception.
5. System checks for concurrency collisions (NFR-2.4) and applies the approved pricing or billing deferral to the customer's subscription agreement with exact decimal precision (FR-2.6.2, NFR-2.5).
6. System records the authorization in the pricing audit trail (logging the modifying/approving user, timestamp, previous price, and updated price) (FR-2.6.4) and appends the rate change event to the customer chronological timeline (FR-6.7.2).
7. System notifies the requesting user and updates the dashboard queue (NFR-4.1).

- **Extensions:**
2a. Discount Exceeds Administrator Threshold (Super-Administrator Required):
  2a1. System detects that the proposed discount percentage exceeds the Administrator's authorization ceiling (FR-2.6.3).
  2a2. System blocks approval by the Administrator and routes the request to a Super-Administrator (FR-2.6.3).
4a. Administrator Rejects the Commercial Exception:
  4a1. Administrator rejects the proposal and enters a rejection reason.
  4a2. System retains the original subscription price, logs the rejection in the audit trail (FR-2.6.4), and notifies the requesting Base User.