# Use Case Specification: UC-08

- **ID / Code:** UC-08
- **Use Case Name:** Set Up Subscription Plan
- **Description:** Allows an Administrator to configure a monthly recurring subscription agreement for a customer, define customizable billing anchor dates and payment terms, support future deferred activation ("Pending Activation"), and link standard pricing structures. Includes an extension point for proposing commercial exceptions (`UC-09`).
- **Primary Actor:** Administrator
- **Scope:** Subscription Management & Invoicing System (Subscription & Billing Subsystem)
- **Level:** User Goal
- **Stakeholders & Interests:**
  - *Administrator:* Wants to easily link customers to billing plans, set customizable anchor dates, or schedule future activation dates (UR-2.1, BR-1, FR-2.1.2).
  - *Customer Company:* Wants accurate billing start dates, agreed payment terms, and exact decimal precision on their subscription rates (BR-1, FR-2.1.2, NFR-2.5).
  - *Company / Business:* Requires that recurrence is never activated for customers lacking mandatory tax information and that all pricing changes are audited (FR-2.6.4, NFR-2.8 Blocked Actions).
- **Preconditions:** The Administrator has an active, authenticated session (UC-01), and the target customer profile exists in the system (UC-05).
- **Postconditions:** A subscription agreement is linked to the customer in either an "Active", "Pending Activation", or "Pending Approval" state, and the pricing audit trail is recorded.
- **Success Guarantee:** The customer is linked to a subscription plan with a defined billing anchor date and payment terms (BR-1), tax readiness is verified (NFR-2.8 Blocked Actions), and the pricing assignment is logged in the audit trail (FR-2.6.4).
- **Minimal Guarantee:** Recurrence activation is strictly blocked if customer tax information is incomplete (NFR-2.8 Blocked Actions), decimal precision is preserved without losing cents (NFR-2.5), and all price modifications are audited (FR-2.6.4).
- **Trigger:** The Administrator selects a customer account to set up or modify a subscription plan.
- **Main Success Scenario:**
1. Administrator requests to set up a subscription plan for a registered customer (UR-2.1).
2. System retrieves the customer's tax profile and displays the configured standard pricing structures and subscription options (FR-2.6.1).
3. Administrator selects a standard pricing tier, defines the monthly billing anchor date, specifies agreed payment terms, and sets the activation start date (BR-1, UR-2.1, FR-2.1.1, FR-2.1.2).
4. Administrator submits the subscription configuration.
5. System validates that the customer profile contains sufficient tax information (NIF/Tax ID, legal name, tax address) to permit recurring billing (NFR-2.8 Blocked Actions) and verifies exact decimal precision on all amounts (NFR-2.5).
6. System activates the subscription plan (for immediate start dates), records the modifying user, timestamp, previous price, and updated price in the pricing audit trail (FR-2.6.4), and updates the customer lifecycle timeline (FR-6.7.2).
7. System confirms the active subscription setup to the Administrator.

- **Extensions:**
3a. Commercial Exception Needed (Custom Pricing, Discounts, or Waived Proration):
  3a1. Administrator or authorized user decides to apply a temporary volume discount, free period, custom price, or waived initial prorated charge (FR-2.6.2).
  3a2. System executes extending use case **UC-09: Propose Commercial Exception** at the `commercial exception` extension point.
3b. Future Billing Start Date Selected (Deferred Activation):
  3b1. Administrator sets a future billing start date (FR-2.1.2).
  3b2. System saves the subscription in a "Pending Activation" state and suppresses all invoice generation and payment reminders until the activation date is reached (FR-2.1.2).
5a. Insufficient Customer Tax Information:
  5a1. System detects missing mandatory tax details (such as NIF/Tax ID or tax address) on the customer profile (NFR-2.8 Blocked Actions).
  5a2. System blocks the recurrence activation, alerts the Administrator (FR-4.2.2), and displays an explicit warning requiring the tax profile to be completed first (NFR-2.8 Blocked Actions).
5b. Price Inconsistency Detected:
  5b1. System detects that the selected rate conflicts with configured revenue-range or standard pricing rules (FR-2.6.1).
  5b2. System automatically flags the subscription pricing as "Pending Review" for human validation (FR-2.6.1).