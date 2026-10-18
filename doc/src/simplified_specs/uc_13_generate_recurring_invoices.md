# Use Case Specification: UC-13

- **ID / Code:** UC-13
- **Use Case Name:** Generate Recurring Invoices
- **Description:** Executed automatically by the System Scheduler to generate monthly recurring compliance invoices for active customer accounts according to their billing anchor dates, autofilling customer data, adjusting dates for non-working days (`UC-19`), and executing each customer record as an isolated fault-tolerant transaction.
- **Primary Actor:** System Scheduler
- **Scope:** Subscription Management & Invoicing System (Automated Billing Engine)
- **Level:** User Goal
- **Stakeholders & Interests:**
  - *Company / Business:* Wants automated, error-free recurring invoice generation that scales seamlessly without increasing administrative headcount (BR-2, BR-3, FR-2.1.1).
  - *Administrator:* Wants isolated batch processing where individual customer errors are logged and alerted without halting the entire billing queue, plus real-time background task feedback (FR-4.2.2, NFR-1.4, NFR-6.1).
  - *Customer Company:* Expects compliant invoices with accurate sequential numbering, itemized VAT calculations, and due dates adjusted for holidays and weekends (FR-2.2.2, FR-4.4.2).
- **Preconditions:** The automated billing engine and database are online.
- **Postconditions:** Recurring invoices are generated for all eligible active subscriptions, individual failures are logged and alerted without stopping the batch, and the System Health dashboard is updated.
- **Success Guarantee:** Every eligible active account receives a compliant, sequentially numbered recurring invoice with exact decimal precision (FR-2.1.1, FR-2.2.2, NFR-2.5), due dates are adjusted for non-working days (`UC-19`), and accounts in "Pending Activation" or "Cancelled" states are skipped (FR-2.1.2, FR-5.1).
- **Minimal Guarantee:** Each record is processed as an isolated transaction so a single failure never halts the batch queue (NFR-6.1). No invoices are generated inside locked financial periods (FR-2.7) or for customers missing mandatory tax data (NFR-2.8 Blocked Actions).
- **Trigger:** The System Scheduler triggers the daily recurring billing batch run based on configured billing anchor dates (FR-2.1.1).
- **Main Success Scenario:**
1. System Scheduler initiates the automated recurring invoice generation batch for the current date (FR-2.1.1) and updates the background task status to "processing" (NFR-1.4).
2. System queries all customer subscriptions matching the current billing anchor date, automatically excluding accounts in "Pending Activation" (FR-2.1.2) or "Cancelled" states (FR-5.1).
3. For each eligible account in an isolated transaction (NFR-6.1), System verifies that the target financial period is not locked (FR-2.7) and that mandatory customer tax data is complete (NFR-2.8 Blocked Actions).
4. System autofills all customer, tax, currency, and subscription billing details from stored records (FR-2.2.1).
5. System automatically executes **UC-19: Adjust Dates for Non-Working Days** (`<<include>>`) to ensure calculated invoice due dates falling on weekends or regional holidays are postponed to the next working day (FR-4.4.2).
6. System calculates itemized tax information and VAT amounts with exact decimal precision (FR-2.2.2, NFR-2.5), assigns the next sequential compliance invoice number (FR-2.2.2), and sets the invoice lifecycle status to "ready to issue" or "issued" (FR-2.4).
7. System updates the System Health dashboard with the batch execution results (NFR-2.9) and marks the background task status as completed (NFR-1.4).

- **Extensions:**
3a. Missing Customer Tax Information or Price Flagged for Review:
  3a1. System detects missing customer tax details or an unresolved price inconsistency on a specific customer record (FR-2.6.1, FR-4.2.2, NFR-2.8 Blocked Actions).
  3a2. System aborts invoice generation for that specific customer, logs the error, and dispatches an immediate alert to the Administrator (FR-4.2.2, NFR-1.6).
  3a3. System continues processing the remaining customer accounts in the batch queue without interruption (NFR-6.1).
3b. Target Financial Period is Administratively Locked:
  3b1. System detects that the billing date falls within a closed financial period (FR-2.7).
  3b2. System blocks invoice creation for the locked period and alerts the Administrator (FR-2.7, FR-4.2.2).