# Use Case Specification: UC-11

### 🏗️ Identification & Context
* **ID / Code:** UC-11
* **Use Case Name:** Configure Standard Pricing & Targets
* **Description:** Allows the Super-Administrator to define standard pricing structures, price ranges per plan/revenue tier and the approval thresholds for discounts, and to set purely informational monthly billing and collection targets.
* **Primary Actor:** Super-Administrator
* **Scope:** Subscription Management & Invoicing System
* **Level:** User Goal

### 👥 Stakeholders & Triggers
* **Stakeholders & Interests:**
  * *Super-Administrator:* Wants to control pricing policy centrally (FR-2.6.1, UR-3.2).
  * *Administrator:* Wants clear ranges to detect inconsistent prices and informational targets to track performance (FR-6.5).
  * *Company (Product Owner):* Wants price consistency and no impact of targets on billing calculations.
* **Trigger:** The Super-Administrator selects "Pricing configuration".

### 🛡️ Conditions & Guarantees
* **Preconditions:** The Super-Administrator is authenticated (UC-01).
* **Postconditions:** New pricing structures, ranges, thresholds and targets are in force for future operations.
* **Success Guarantee:** Configuration is saved separately from operational data (NFR-2.7), versioned with user and timestamp, and applied only to future invoices (no retroactive changes).
* **Minimal Guarantee:** Informational targets never alter billing calculations or workflows (FR-6.5); existing issued invoices are never modified.
* **Trigger:** The Super-Administrator requests to configure pricing.

### 🔄 Flows of Events

#### Main Success Scenario (Happy Path):
1. **Super-Administrator:** Requests to configure standard pricing.
2. **System:** Displays current plans, standard prices, price ranges by revenue tier, discount approval thresholds and monthly targets.
3. **Super-Administrator:** Modifies prices, ranges, thresholds and/or informational billing and collection targets and saves.
4. **System:** Validates consistency (minimum ≤ maximum, positive values, exact decimal precision – NFR-2.5).
5. **System:** Shows the impact: existing subscriptions whose price falls outside the new ranges.
6. **Super-Administrator:** Confirms the changes.
7. **System:** Saves the new configuration version, logs the change and flags affected subscriptions as "Pending Review" (FR-2.6.1) for UC-12.

#### Extensions (Alternative Flows):
* **3a. Only informational targets are modified:**
  * 3a1. System saves the targets as informational data without impact analysis or review flagging (FR-6.5); the flow ends at step 7 without flagging subscriptions.
* **4a. Inconsistent values:**
  * 4a1. System indicates the inconsistency; the flow resumes at step 3.
* **6a. Super-Administrator cancels:**
  * 6a1. Configuration remains unchanged.
