# Use Case Specification: UC-24

- **ID / Code:** UC-24
- **Use Case Name:** Configure Notification Triggers
- **Description:** Allows an Administrator to configure custom, rule-based notification triggers based on operational conditions (such as invoices exceeding a specified number of days overdue or outstanding balances surpassing a defined threshold in euros) and maintain the configurable business calendar (working days, weekends, and regional holidays).
- **Primary Actor:** Administrator
- **Scope:** Subscription Management & Invoicing System (Notification & Calendar Configuration Subsystem)
- **Level:** User Goal
- **Stakeholders & Interests:**
  - *Administrator:* Wants flexible, rule-based alerting for high-risk overdue accounts and an easy way to maintain regional holidays in the business calendar (FR-4.3, FR-4.4.1, NFR-1.1).
  - *Company / Business:* Wants proactive debt collection workflows and strict separation between configuration rules and operational data (FR-4.3, NFR-2.7).
- **Preconditions:** The Administrator has an active, authenticated session (UC-01), and the configuration subsystem is online.
- **Postconditions:** Custom notification rules and business calendar working/non-working day definitions are saved and active for `UC-19` and `UC-23`.
- **Success Guarantee:** Rule-based triggers (days overdue, euro balance thresholds) and regional business calendar dates are persisted accurately (FR-4.3, FR-4.4.1) and applied to future notification evaluations.
- **Minimal Guarantee:** Global configuration remains strictly separated from operational data (NFR-2.7), and invalid threshold rules are rejected prior to saving.
- **Trigger:** The Administrator selects the option to configure notification triggers or update the business calendar.
- **Main Success Scenario:**
1. Administrator navigates to the notification and business calendar configuration panel (FR-4.3, FR-4.4.1).
2. System displays existing custom notification rules and the current business calendar showing working days, weekends, and regional holidays (FR-4.3, FR-4.4.1).
3. Administrator defines or updates a custom rule-based notification trigger by specifying the operational condition (e.g., invoices exceeding $X$ days overdue, or total outstanding account balance surpassing $Y$ euros), target recipients, and notification frequency (FR-4.3).
4. Administrator updates the business calendar by marking or unmarking regional holidays and non-working days (FR-4.4.1).
5. Administrator submits the configuration changes.
6. System validates the numeric parameters (NFR-2.5), persists the updated trigger rules and business calendar while maintaining state separation (NFR-2.7), and logs the configuration change in the audit trail.
7. System confirms the updated settings to the Administrator.

- **Extensions:**
5a. Contradictory Calendar or Negative Threshold Input:
  5a1. System detects a negative euro threshold, negative day count, or an invalid calendar range.
  5a2. System flags the invalid field and prompts the Administrator to correct it while preserving valid inputs (NFR-1.5).