# Use Case Specification: UC-08

* **ID / Code:** UC-08
* **Use Case Name:** Set Up Subscription Plan
* **Description:** Allows an Administrator to create or modify a customer's monthly subscription, linking it to a billing plan, a billing anchor date, payment terms and, optionally, a future activation date. It contains the extension point **commercial exception**, which triggers UC-09.
* **Primary Actor:** Administrator
* **Scope:** Subscription Management & Invoicing System
* **Level:** User Goal
* **Stakeholders & Interests:**
  * *Administrator:* Wants to link customers to plans quickly and correctly (UR-2.1).
  * *Company (Product Owner):* Wants subscriptions with customizable anchor dates and payment terms that feed automatic invoicing (BR-1, BR-2).
  * *Customer company:* Wants to be billed according to the agreed conditions and start date.
* **Preconditions:** The Administrator is authenticated (UC-01); the customer exists (UC-05); standard pricing is configured (UC-11).
* **Postconditions:** The customer has a subscription in "Active" or "Pending Activation" state, linked to a plan.
* **Success Guarantee:** The subscription is stored with plan, price, billing anchor date, payment terms and start date; if the start date is in the future, the customer stays in "Pending Activation" and no invoices or reminders are generated until then (FR-2.1.2); price changes are recorded in the pricing audit trail (FR-2.6.4).
* **Minimal Guarantee:** Recurring billing is never activated for a customer without sufficient tax information (NFR-2.8 – Blocked Actions); no partially configured subscription is persisted.
* **Trigger:** The Administrator selects "Set up subscription" for a customer (e.g., at the end of UC-05).
* **Main Success Scenario:**
1. **Administrator:** Requests to set up a subscription for a customer.
2. **System:** Displays the available plans with their standard prices and price ranges (FR-2.6.1).
3. **Administrator:** Selects a plan and sets the billing anchor date, payment terms and start date.
4. **System:** Validates the data and checks that the customer has the tax information required for invoicing.
5. **System:** Shows a summary of the subscription and the expected first invoice date.
6. **Administrator:** Confirms the subscription.
7. **System:** Stores the subscription with status "Active" (start date reached) or "Pending Activation" (future start date) (FR-2.1.2), logs the pricing data (FR-2.6.4) and records the event in the customer timeline.

* **Extensions:**
4a. Customer lacks sufficient tax information:
  4a1. System blocks activation and explicitly warns which data are missing (NFR-2.8 – Blocked Actions).
  4a2. System alerts administrators about missing customer information (FR-4.2.2). The use case ends or the Administrator completes the data (UC-05) and restarts.
4b. Price outside the configured range:
  4b1. System flags the price as "Pending Review" (FR-2.6.1); it will be handled in UC-12.
5a. Commercial exception required (extension point):
  5a1. Administrator indicates that the customer needs special conditions (discount, free period, custom price or waiving the initial prorated charge).
  5a2. UC-09 (Propose Commercial Exception) is executed; the subscription is saved with the exception pending approval.
