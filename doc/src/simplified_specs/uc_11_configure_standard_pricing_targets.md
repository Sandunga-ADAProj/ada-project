# Use Case Specification: UC-11

- **ID / Code:** UC-11
- **Use Case Name:** Configure Standard Pricing & Targets
- **Description:** Allows a Super-Administrator to configure global price ranges, standard pricing structures, commercial discount approval thresholds, and purely informational monthly billing and collection targets.
- **Primary Actor:** Super-Administrator
- **Scope:** Subscription Management & Invoicing System (Global Configuration Layer)
- **Level:** User Goal
- **Stakeholders & Interests:**
  - *Super-Administrator:* Wants centralized control over standard pricing tiers, discount approval thresholds, and informational revenue targets without corrupting active operational data (UR-3.1, UR-3.2, FR-2.6.1, FR-6.5, NFR-2.7).
  - *Administrator:* Wants clear informational targets displayed on the dashboard and automatic flagging of price inconsistencies (FR-2.6.1, FR-6.5).
- **Preconditions:** The Super-Administrator has an active, authenticated session (UC-01), and the global configuration subsystem is online.
- **Postconditions:** Global pricing structures, discount thresholds, and informational targets are updated, and any existing customer subscriptions with newly inconsistent prices are flagged for review.
- **Success Guarantee:** Standard pricing structures and approval thresholds are saved with exact decimal precision (FR-2.6.1, FR-2.6.3, NFR-2.5), informational billing targets are updated without altering core billing calculations (FR-6.5), and global configuration remains strictly separated from operational data (NFR-2.7).
- **Minimal Guarantee:** Informational billing targets never alter core invoicing calculations or workflows (FR-6.5), and past issued invoices are never retroactively modified (FR-6.6.2, NFR-2.7).
- **Trigger:** The Super-Administrator selects the option to configure global pricing structures or informational billing targets.
- **Main Success Scenario:**
1. Super-Administrator requests to configure standard pricing structures, discount thresholds, and billing targets (UR-3.2, FR-2.6.1, FR-6.5).
2. System retrieves and displays current global price ranges, standard subscription tiers, discount approval thresholds, and monthly billing/collection targets.
3. Super-Administrator updates the standard pricing tables, adjusts the discount thresholds requiring Administrator vs. Super-Administrator approval (FR-2.6.1, FR-2.6.3), and sets informational monthly billing and collection targets (FR-6.5).
4. Super-Administrator confirms and submits the configuration changes.
5. System validates exact decimal precision (NFR-2.5) and ensures state separation between global configuration and historical operational records (NFR-2.7).
6. System persists the updated pricing rules and informational targets, and scans active accounts to flag any resulting price inconsistencies as "Pending Review" for human validation (FR-2.6.1).
7. System logs the configuration update in the audit trail and confirms completion to the Super-Administrator.

- **Extensions:**
4a. Invalid Numeric Range or Threshold Overlap:
  4a1. System detects overlapping price ranges or invalid threshold percentages.
  4a2. System highlights the conflicting fields and prompts the Super-Administrator to correct them without losing valid form entries (NFR-1.5).