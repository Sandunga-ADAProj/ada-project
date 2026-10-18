# Use Case Specification: UC-19

- **ID / Code:** UC-19
- **Use Case Name:** Adjust Dates for Non-Working Days
- **Description:** A shared subfunction that evaluates a calculated invoice due date or scheduled notification/reminder timestamp against the configurable business calendar (working days, weekends, and regional holidays) and automatically postpones any date falling on a non-working day to the next available working day.
- **Primary Actor:** System Scheduler (Indirectly via calling use cases `UC-13` and `UC-23`)
- **Scope:** Subscription Management & Invoicing System (Business Calendar Engine)
- **Level:** Subfunction
- **Stakeholders & Interests:**
  - *Customer Company:* Wants fair invoice due dates and payment reminders that never fall on weekends or regional holidays (FR-4.4.1, FR-4.4.2).
  - *Administrator:* Wants automated calendar compliance without manual date recalculations (FR-4.4.2, NFR-1.1).
- **Preconditions:** The calling parent use case (`UC-13: Generate Recurring Invoices` or `UC-23: Send Automated Notifications`) has calculated a target action or due date, and the business calendar configuration is loaded.
- **Postconditions:** A validated working-day timestamp is returned to the calling parent use case.
- **Success Guarantee:** Any target date falling on a weekend or configured regional holiday is accurately postponed to the next available working day (FR-4.4.1, FR-4.4.2).
- **Minimal Guarantee:** The business calendar state is never modified during read evaluation, and a valid date is always returned to the calling transaction.
- **Trigger:** Automatically invoked via mandatory inclusion (`<<include>>`) by **UC-13: Generate Recurring Invoices** or **UC-23: Send Automated Notifications**.
- **Main Success Scenario:**
1. Calling parent use case passes a calculated invoice due date or scheduled notification date (along with the relevant regional calendar context) to this subfunction (FR-4.4.2).
2. System queries the stored configurable business calendar defining working days, weekends, and regional holidays (FR-4.4.1).
3. System evaluates whether the target date falls on a designated working day (FR-4.4.1).
4. System confirms the date is a valid working day and returns the date unchanged to the calling parent use case.

- **Extensions:**
3a. Target Date Falls on a Non-Working Day (Weekend or Regional Holiday):
  3a1. System detects that the scheduled notification, reminder, or calculated invoice due date falls on a weekend or configured regional holiday (FR-4.4.1, FR-4.4.2).
  3a2. System iteratively advances the date by one calendar day until it reaches the next available working day (FR-4.4.2).
  3a3. System returns the postponed working date to the calling parent use case (FR-4.4.2).