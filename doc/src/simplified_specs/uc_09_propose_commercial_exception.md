# Use Case Specification: UC-09

- **ID / Code:** UC-09
- **Use Case Name:** Propose Commercial Exception
- **Description:** Allows an authorized Base User (or Administrator) to propose a commercial exception for a customer subscription—such as temporary volume discounts, free periods, custom pricing, or waiving initial prorated charges to defer standard billing to the following month—triggering an approval workflow based on configurable discount thresholds.
- **Primary Actor:** Base User (or Administrator via inheritance)
- **Scope:** Subscription Management & Invoicing System (Pricing & Approval Subsystem)
- **Level:** User Goal (Extending Use Case)
- **Stakeholders & Interests:**
  - *Base User:* Wants to propose flexible commercial terms to close or retain client deals (FR-2.6.2).
  - *Administrator / Super-Administrator:* Wants all discounts exceeding configured thresholds routed through a formal authorization workflow and logged in the pricing audit trail (FR-2.6.3, FR-2.6.4).
  - *Company / Business:* Wants to prevent unauthorized revenue leakage while maintaining commercial agility.
- **Preconditions:** The user has an active, authenticated session (UC-01) and is viewing or configuring a customer subscription (`UC-08`).
- **Postconditions:** A commercial exception proposal is recorded and routed to an authorized approver (or substitute approver), and the pricing audit trail is updated.
- **Success Guarantee:** The proposed commercial exception is validated for decimal precision (NFR-2.5), logged in the pricing audit trail (FR-2.6.4), and queued for Administrator or Super-Administrator approval according to configurable discount thresholds (FR-2.6.3).
- **Minimal Guarantee:** No unapproved commercial exception or discount is applied to active billing without required authorization (FR-2.6.3).
- **Trigger:** The user invokes the `commercial exception` extension point during **UC-08: Set Up Subscription Plan** or selects an existing subscription to propose an exception.
- **Main Success Scenario:**
1. Base User requests to propose a commercial exception for a customer subscription (FR-2.6.2).
2. System displays the commercial exception options: temporary volume discount, free period, custom pricing, or waiving initial prorated charges to defer standard billing to the following month (FR-2.6.2).
3. Base User enters the proposed financial parameters, justification notes, and validity period, then submits the proposal.
4. System validates the decimal precision of the proposed figures (NFR-2.5) and evaluates the discount percentage against configurable approval thresholds (FR-2.6.3).
5. System identifies the required authorization level (Administrator or Super-Administrator) and checks if a substitute approver is currently assigned for the primary approver (FR-2.6.3, FR-7.2).
6. System places the exception in a "Pending Approval" state, logs the proposal in the pricing audit trail (recording user, timestamp, previous price, and proposed price) (FR-2.6.4), and notifies the designated approver (FR-6.2).
7. System confirms to the Base User that the commercial exception has been submitted for approval.

- **Extensions:**
4a. Invalid Discount Format or Negative Price:
  4a1. System detects invalid numeric values or precision errors (NFR-2.5).
  4a2. System flags the field and prompts the Base User to enter a valid amount while preserving other form inputs (NFR-1.5).