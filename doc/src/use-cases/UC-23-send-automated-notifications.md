# Use Case Specification: UC-23

### 🏗️ Identification & Context
* **ID / Code:** UC-23
* **Use Case Name:** Send Automated Notifications
* **Description:** Sends notifications to customer contacts and internal users through the Email / SMS Gateway: invoice delivery, follow-up reminders (3 and 5 days), periodic overdue reminders, administrator alerts, cancellation requests and custom rule-based alerts. It is started periodically by the System Scheduler and is also included by UC-15 and UC-25. Scheduled dates are adjusted with UC-19.
* **Primary Actor:** System Scheduler (when executed periodically)
* **Supporting Actor:** Email / SMS Gateway
* **Scope:** Subscription Management & Invoicing System
* **Level:** User Goal (scheduled execution) / Subfunction (when included by UC-15 or UC-25)

### 👥 Stakeholders & Triggers
* **Stakeholders & Interests:**
  * *Customer company:* Wants to receive invoices and reminders on time and only when appropriate (FR-4.1).
  * *Administrator:* Wants to be alerted about issued/paid invoices and problems (FR-4.2).
  * *Company (Product Owner):* Wants to reduce overdue debt without manual follow-up (BR-3), and to keep collecting debt after cancellation (FR-5.2).
* **Trigger:** Scheduled execution of the notification process, or invocation from UC-15 / UC-25.

### 🛡️ Conditions & Guarantees
* **Preconditions:** The Email / SMS Gateway is configured; notification templates and triggers exist (UC-24).
* **Postconditions:** Each due notification is sent or queued for retry, and its delivery status is recorded.
* **Success Guarantee:** Notifications are delivered to the correct recipients on working days (UC-19), only for invoices that remain unpaid (reminders stop once paid or written off – FR-4.1.3).
* **Minimal Guarantee:** No notification is sent twice for the same event; failures are logged and retried without stopping the remaining notifications (NFR-6.1); billing contact data are never used for marketing without consent (NFR-5.3).
* **Trigger:** Scheduled time reached / event in an including use case.

### 🔄 Flows of Events

#### Main Success Scenario (Happy Path):
1. **System Scheduler:** Starts the notification process.
2. **System:** Collects pending notifications: follow-up reminders 3 and 5 days after issuance (FR-4.1.2), periodic overdue reminders (FR-4.1.3), reminders for cancelled accounts with outstanding balance (FR-5.2) and custom rule-based alerts (FR-4.3).
3. **System:** Discards notifications for invoices already paid, resolved or written off, and for customers in "Pending Activation" (FR-2.1.2).
4. **System:** **Includes UC-19** to postpone notifications scheduled on non-working days.
5. **System:** Builds each message from its template with the recipient's data.
6. **System:** Sends each message through the **Email / SMS Gateway**.
7. **Email / SMS Gateway:** Confirms acceptance of each message.
8. **System:** Records the delivery status and updates the invoice state to "overdue" when applicable (FR-2.4).

#### Extensions (Alternative Flows):
* **1a. Invoked from UC-15 (invoice sent):**
  * 1a1. System sends the invoice to the billing contact (FR-4.1.1) and notifies administrators of the issuance (FR-4.2.1); then continues at step 7.
* **1b. Invoked from UC-25 (cancellation requested):**
  * 1b1. System notifies the responsible Administrator of the cancellation request (FR-5.3.1); then continues at step 7.
* **5a. Recipient has no valid contact data:**
  * 5a1. System skips that notification and alerts administrators about missing customer information (FR-4.2.2).
* **7a. Gateway rejects or fails to deliver:**
  * 7a1. System queues the message for retry, logs the error and reflects it in the system health screen (NFR-2.9).
  * 7a2. After the maximum number of retries, System alerts administrators.
