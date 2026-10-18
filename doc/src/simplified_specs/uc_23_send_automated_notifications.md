# Use Case Specification: UC-23

- **ID / Code:** UC-23
- **Use Case Name:** Send Automated Notifications
- **Description:** Dispatches automated email/SMS notifications to company contacts and internal administrators based on lifecycle events (`UC-15`, `UC-25`), scheduled follow-ups (3 and 5 days post-issue), periodic overdue intervals, and custom rule-based triggers (`UC-24`), while respecting the business calendar (`UC-19`) and continuing debt collection reminders for cancelled accounts with unpaid historical balances.
- **Primary Actor:** System Scheduler (or invoked via `<<include>>` by `UC-15` and `UC-25`)
- **Supporting Actor:** Email / SMS Gateway (`<<System>>`)
- **Scope:** Subscription Management & Invoicing System (Notification & Communications Engine)
- **Level:** User Goal / Subfunction
- **Stakeholders & Interests:**
  - *Customer Contact:* Wants timely invoice delivery and reminders only on valid working days, without receiving notifications for inactive contacts or deferred "Pending Activation" subscriptions (FR-1.3.2, FR-2.1.2, FR-4.1, FR-4.4.2).
  - *Administrator:* Wants immediate alerts for issued/paid invoices, system/bank errors, cancellation requests, and custom overdue rules (FR-4.2, FR-4.3, FR-5.3.1).
  - *Company / Business:* Requires persistent overdue collection notifications even after an account is cancelled if historical balances remain unpaid (FR-5.2).
- **Preconditions:** The notification engine is online and notification templates/rules are configured.
- **Postconditions:** Notifications are dispatched via the Email/SMS Gateway, delivery statuses are logged, and failed dispatches are queued and alerted on the System Health dashboard.
- **Success Guarantee:** Eligible company contacts and administrators receive accurate notifications on working days (`UC-19`, FR-4.1, FR-4.2, FR-4.3, FR-4.4.2), overdue reminders persist for cancelled accounts with unpaid debt (FR-5.2), and inactive contacts are excluded (FR-1.3.2).
- **Minimal Guarantee:** No notifications or reminders are ever sent to customers in "Pending Activation" state (FR-2.1.2), operational contacts are never sent marketing spam (NFR-5.3), and gateway failures are isolated per message without halting the notification batch queue (NFR-6.1).
- **Trigger:** Invoked immediately via `<<include>>` by **UC-15: Issue & Send Invoice** or **UC-25: Request Account Cancellation**, or triggered periodically by the **System Scheduler**.
- **Main Success Scenario:**
1. System identifies pending notification events:
   - Immediate invoice transition to "sent" state (`UC-15`, FR-4.1.1) or invoice issued/paid administrator alert (FR-4.2.1).
   - Scheduled follow-up reminders at 3 calendar days and 5 calendar days after issue date for unpaid invoices (FR-4.1.2).
   - Periodic overdue notifications for unpaid invoices—including historical unpaid invoices belonging to cancelled accounts (FR-4.1.3, FR-5.2).
   - Rule-based custom notification triggers (e.g., days overdue or euro balance thresholds) (FR-4.3).
   - Administrative alerts for account cancellation requests (`UC-25`, FR-5.3.1), missing customer info, or bank errors (FR-4.2.2).
2. System filters out any customer accounts in "Pending Activation" state (FR-2.1.2) and ensures only active (non-inactive) billing contacts are targeted (FR-1.3.2).
3. For scheduled reminders and overdue notices, System automatically executes **UC-19: Adjust Dates for Non-Working Days** (`<<include>>`) to postpone any notification falling on a weekend or holiday to the next working day (FR-4.4.2).
4. For each notification in an isolated transaction (NFR-6.1), System formats the message payload with proper character encoding (NFR-2.6) and transmits it to the external **Email / SMS Gateway**.
5. **Email / SMS Gateway** confirms message dispatch.
6. System records the notification in the communication audit trail and updates the pending email queue metrics on the System Health dashboard (NFR-2.9).

- **Extensions:**
4a. Email / SMS Gateway Delivery Failure:
  4a1. **Email / SMS Gateway** returns a delivery error or timeout for a specific message.
  4a2. System logs the individual failure, places the message in the retry queue on the System Health dashboard (NFR-2.9), alerts the Administrator (FR-4.2.2), and continues processing the remaining notifications in the queue (NFR-6.1).