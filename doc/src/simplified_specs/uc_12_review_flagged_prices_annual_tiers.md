# Use Case Specification: UC-12

- **ID / Code:** UC-12
- **Use Case Name:** Review Flagged Prices & Annual Tiers
- **Description:** Triggered automatically by the System Scheduler at the beginning of a period or accessed by an Administrator to identify customer accounts requiring annual revenue-range and pricing reviews, validate flagged price inconsistencies, track review data sources, and record authorized forward-looking price modifications.
- **Primary Actor:** Administrator (and System Scheduler for periodic identification)
- **Scope:** Subscription Management & Invoicing System (Pricing & Compliance Subsystem)
- **Level:** User Goal
- **Stakeholders & Interests:**
  - *Administrator:* Wants automatic identification of accounts needing annual pricing review or having flagged price inconsistencies, along with clear source tracking (FR-2.6.1, FR-6.6.1, FR-6.6.2).
  - *Customer Company:* Wants assurance that annual rate adjustments only apply to future billing periods and never retroactively alter past invoices (FR-6.6.2).
  - *Company / Business:* Wants to ensure customer subscription tiers remain aligned with current customer revenue ranges and standard pricing structures (FR-2.6.1, FR-6.6.1).
- **Preconditions:** The pricing subsystem is online; for manual review, the Administrator has an active, authenticated session (UC-01).
- **Postconditions:** Flagged accounts and annual tier reviews are resolved, data sources are recorded, forward-looking prices are updated, and the pricing audit trail is logged.
- **Success Guarantee:** Accounts requiring annual review or price validation are displayed (FR-2.6.1, FR-6.6.1), review data sources and authorized price modifications are recorded in the pricing audit trail (FR-2.6.4, FR-6.6.2), and past invoices remain completely untouched (FR-6.6.2).
- **Minimal Guarantee:** Retroactive price adjustments to past invoices are strictly prohibited under any scenario (FR-6.6.2), and exact decimal precision is maintained (NFR-2.5).
- **Trigger:** The System Scheduler initiates the beginning-of-period annual review scan, or an Administrator selects flagged accounts from the dashboard for review (FR-2.6.1, FR-6.6.1).
- **Main Success Scenario:**
1. System Scheduler identifies customer accounts requiring annual revenue-range and pricing reviews at the beginning of the period, as well as accounts flagged with price inconsistencies as "Pending Review" (FR-2.6.1, FR-6.6.1).
2. System surfaces these accounts on the centralized dashboard for Administrator action (FR-6.2, FR-6.6.1).
3. Administrator selects a flagged customer account to perform the pricing and revenue-range review.
4. System displays the customer's current pricing, revenue-range tier, historical timeline, and the reason for the flag (FR-2.6.1, FR-6.6.1, FR-6.7.2).
5. Administrator verifies the customer's updated revenue range, documents the review data source, and enters the authorized forward-looking price modification (FR-6.6.2).
6. System validates the new price (NFR-2.5), updates the subscription rate for future billing cycles without applying any retroactive adjustments to past invoices (FR-6.6.2), and clears the "Pending Review" flag.
7. System logs the modification in the pricing audit trail (recording modifying user, timestamp, previous price, updated price, and review data source) (FR-2.6.4, FR-6.6.2) and appends the rate change to the customer timeline (FR-6.7.2).

- **Extensions:**
5a. Price remains unchanged after review:
  5a1. Administrator confirms that the existing price is valid and documents the review data source (FR-6.6.2).
  5a2. System clears the "Pending Review" flag and logs the completed annual review in the audit trail without changing the rate.
5b. Proposed Price Modification Requires Higher Approval:
  5b1. Administrator proposes a custom rate that falls outside standard tier bounds (FR-2.6.2, FR-2.6.3).
  5b2. System routes the modification to a Super-Administrator for approval (`UC-10`) before applying the new rate.