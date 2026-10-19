# Use Case Specification: UC-13

* **ID / Code:** UC-13
* **Use Case Name:** Generate Recurring Invoices
* **Description:** The System Scheduler automatically generates the monthly recurring invoices for every active subscription according to its billing anchor date, autofilling customer and billing data, applying approved exceptions and adjusting dates that fall on non-working days (includes UC-19).
* **Primary Actor:** System Scheduler
* **Scope:** Subscription Management & Invoicing System
* **Level:** User Goal
* **Stakeholders & Interests:**
  * *Company (Product Owner):* Wants automatic, consistent and error-free invoicing that scales without extra staff (BR-2, BR-3).
  * *Administrator:* Wants to be alerted only about failures, without the whole batch stopping (NFR-6.1).
  * *Customer company:* Wants accurate invoices on the agreed dates.
* **Preconditions:** Active subscriptions exist; standard pricing and the business calendar are configured (UC-11, UC-28).
* **Postconditions:** Invoices due on the execution date are created in "ready to issue" state.
* **Success Guarantee:** One invoice per subscription and billing cycle is created with itemized tax information, (FR-2.2.2), autofilled data (FR-2.2.1), exact decimal precision (NFR-2.5) and due dates adjusted to working days (UC-19).
* **Minimal Guarantee:** Each subscription is processed as an isolated transaction: a failure in one record is logged and alerted without stopping the rest (NFR-6.1); no duplicate invoice is ever created for the same cycle; no invoice is created in a locked period (FR-2.7).
* **Trigger:** Scheduled execution of the recurring billing process.
* **Main Success Scenario:**
1. **System Scheduler:** Starts the recurring billing process.
2. **System:** Selects active subscriptions whose billing anchor date corresponds to the current date, excluding those in "Pending Activation" or cancelled (FR-2.1.2, FR-5.1).
3. **System:** For each subscription, in an isolated transaction, checks that no invoice exists yet for that cycle.
4. **System:** Creates the invoice autofilling customer and billing data, applying the plan price and any approved commercial exception (FR-2.2.1, FR-2.6.2).
5. **System:** System calculates taxes and VAT with exact decimal precision.(FR-2.2.2).
6. **System:** Calculates the due date from the payment terms and **includes UC-19** to move it to the next working day if needed.
7. **System:** Saves the invoice in "ready to issue" state (FR-2.4).
8. **System:** When all subscriptions are processed, records an execution summary in the system health screen (NFR-2.9).

* **Extensions:**
  * 2a. A subscription reaches its deferred activation date:
    * 2a1. System changes it from "Pending Activation" to "Active" and includes it in the run (FR-2.1.2).
  * 3a. An invoice already exists for that cycle:
    * 3a1. System skips the subscription to avoid duplicates and logs it.
  * 4a. Customer data are incomplete (e.g., missing tax info):
    * 4a1. System does not generate the invoice, logs the error, alerts administrators about missing information (FR-4.2.2, Blocked Actions requirement) and continues with the next subscription (NFR-6.1).
  * 7a. The period is locked:
    * 7a1. System does not create the invoice and alerts administrators so that an override can be requested (UC-17).
  * \*a. Unexpected error processing one record:
    * \*a1. System rolls back only that record, logs it, alerts administrators and continues with the next one (NFR-6.1).
