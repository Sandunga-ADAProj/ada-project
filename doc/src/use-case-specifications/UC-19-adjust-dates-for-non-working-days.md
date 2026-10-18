# Use Case Specification: UC-19

* **ID / Code:** UC-19
* **Use Case Name:** Adjust Dates for Non-Working Days
* **Description:** Shared subfunction included by UC-13 and UC-23 that checks a calculated date (invoice due date, scheduled notification or reminder) against the business calendar and postpones it to the next working day if it falls on a weekend or holiday.
* **Primary Actor:** None (included use case; executed by the System on behalf of UC-13 / UC-23)
* **Scope:** Subscription Management & Invoicing System
* **Level:** Subfunction
* **Stakeholders & Interests:**
  * *Customer company:* Does not want due dates or reminders on non-working days.
  * *Company (Product Owner):* Wants dates consistent with the regional business calendar (FR-4.4).
* **Preconditions:** The business calendar (working days, weekends, regional holidays) is configured (FR-4.4.1, UC-28).
* **Postconditions:** The returned date is a working day.
* **Success Guarantee:** The including use case receives the original date if it is a working day, or the next available working day otherwise (FR-4.4.2).
* **Minimal Guarantee:** The original date is never moved earlier; if the calendar is unavailable, the original date is returned and an alert is generated.
* **Trigger:** UC-13 calculates a due date or UC-23 schedules a notification.
* **Main Success Scenario:**
1. **System:** Receives a calculated date and the region/calendar applicable to the customer.
2. **System:** Checks the date against the business calendar.
3. **System:** The date is a working day; it is returned unchanged to the including use case.

* **Extensions:**
  * 2a. No calendar is configured for the customer's region:
    * 2a1. System uses the default calendar and alerts administrators (Assumption).
  * 3a. The date falls on a weekend or holiday:
    * 3a1. System searches for the next working day in the calendar.
    * 3a2. System returns the adjusted date and records the adjustment.
