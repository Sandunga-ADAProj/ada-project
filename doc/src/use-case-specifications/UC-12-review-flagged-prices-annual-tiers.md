# Use Case Specification: UC-12

* **ID / Code:** UC-12
* **Use Case Name:** Review Flagged Prices & Annual Tiers
* **Description:** At the beginning of each period, the System Scheduler identifies accounts that require an annual revenue-range and pricing review and collects prices flagged as inconsistent; an Administrator reviews them, validating or modifying prices without retroactive adjustments.
* **Primary Actor:** Administrator. Supporting actor: System Scheduler (identifies accounts and flags them)
* **Scope:** Subscription Management & Invoicing System
* **Level:** User Goal
* **Stakeholders & Interests:**
  * *Administrator:* Wants a clear list of accounts to review, with data sources (FR-6.6.2).
  * *Company (Product Owner):* Wants pricing aligned with customers' revenue tier and human validation of anomalies (FR-2.6.1, FR-6.6.1).
  * *Customer company:* Expects past invoices not to be changed retroactively (FR-6.6.2).
* **Preconditions:** Pricing ranges are configured (UC-11). The Administrator is authenticated for the manual part.
* **Postconditions:** Each reviewed account has its price validated or updated, and its review is closed.
* **Success Guarantee:** Validated or modified prices are recorded with data sources, user, timestamp, previous and new price (FR-2.6.4, FR-6.6.2) and applied only to future invoices.
* **Minimal Guarantee:** No price change is applied automatically without human validation, and past invoices are never adjusted.
* **Trigger:** The System Scheduler starts the annual review at the beginning of the period, or a price is flagged as "Pending Review" (UC-08, UC-11).
* **Main Success Scenario:**
1. **System Scheduler:** Starts the annual pricing review process at the beginning of the period.
2. **System:** Identifies accounts that require revenue-range and pricing review and adds them, together with prices flagged as "Pending Review", to the review queue (FR-6.6.1, FR-2.6.1).
3. **System:** Notifies administrators and shows the pending reviews in the dashboard (FR-6.2).
4. **Administrator:** Opens an account from the review queue.
5. **System:** Displays the current price, applicable range, revenue tier, data sources used and pricing history.
6. **Administrator:** Validates the current price or enters a new price and the data source justifying it.
7. **System:** Records the decision in the pricing audit trail (FR-2.6.4), applies the new price from the next billing cycle and removes the account from the queue.

* **Extensions:**
  * 2a. No accounts require review:
    * 2a1. System records the execution and ends the process.
  * 6a. New price outside the configured range:
    * 6a1. System requires a commercial exception (UC-09) to be approved before applying it.
  * 6b. Administrator postpones the review:
    * 6b1. The account remains in the queue as pending.
