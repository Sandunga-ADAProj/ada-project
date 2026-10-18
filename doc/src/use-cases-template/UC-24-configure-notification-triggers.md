# Use Case Specification: UC-24

* **ID / Code:** UC-24
* **Use Case Name:** Configure Notification Triggers
* **Description:** Allows an Administrator to create, edit, enable/disable and delete custom rule-based notification triggers (e.g., invoices more than N days overdue, outstanding balance above X €), defining recipients and channel.
* **Primary Actor:** Administrator
* **Scope:** Subscription Management & Invoicing System
* **Level:** User Goal
* **Stakeholders & Interests:**
  * *Administrator:* Wants proactive alerts adapted to operational needs (FR-4.3).
  * *Company (Product Owner):* Wants to reduce overdue debt and detect risks early.
* **Preconditions:** The Administrator is authenticated and has notification configuration permissions.
* **Postconditions:** The rule is stored and active/inactive as configured.
* **Success Guarantee:** The rule is saved with condition, threshold, recipients, channel and frequency, and is evaluated by UC-23 from its next execution.
* **Minimal Guarantee:** Invalid rules are never saved; legally required notifications (FR-4.1) cannot be disabled through custom rules (Assumption).
* **Trigger:** The Administrator selects "Notification rules".
* **Main Success Scenario:**
1. **Administrator:** Requests to create a notification trigger.
2. **System:** Displays the rule editor: condition type (days overdue, outstanding balance, account standing…), threshold, recipients, channel (email/SMS) and frequency.
3. **Administrator:** Defines the rule and saves it.
4. **System:** Validates the rule (valid threshold, existing recipients, no duplicated rule).
5. **System:** Shows a preview of how many records currently meet the condition.
6. **Administrator:** Confirms and activates the rule.
7. **System:** Stores the rule and logs the change.

* **Extensions:**
1a. Administrator edits, disables or deletes an existing rule:
  1a1. System loads the rule; changes are validated and logged as in steps 4–7.
4a. Invalid or duplicated rule:
  4a1. System indicates the problem; the flow resumes at step 3.
