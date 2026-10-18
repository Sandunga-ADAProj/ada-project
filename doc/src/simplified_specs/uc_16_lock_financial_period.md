# Use Case Specification: UC-16

- **ID / Code:** UC-16
- **Use Case Name:** Lock Financial Period
- **Description:** Allows an Administrator to mark a specific monthly or quarterly financial period as administratively closed, blocking all subsequent invoice creation, editing, or deletion within that period across both the UI and API.
- **Primary Actor:** Administrator
- **Scope:** Subscription Management & Invoicing System (Accounting & Compliance Layer)
- **Level:** User Goal
- **Stakeholders & Interests:**
  - *Administrator / External Accountant:* Wants to freeze completed accounting periods so financial figures cannot shift after reconciliation or tax reporting (FR-2.7).
  - *Company / Business:* Requires strict enforcement of period locks across both the user interface and API endpoints unless explicitly overridden by an audited Super-Administrator exception (FR-2.7, NFR-2.8).
- **Preconditions:** The Administrator has an active, authenticated session (UC-01), and the accounting subsystem is online.
- **Postconditions:** The selected financial period is marked as "Closed / Locked", blocking all standard write operations on invoices within that date range.
- **Success Guarantee:** The financial period is administratively locked, and all subsequent attempts to create, edit, or delete invoices within that period are blocked across UI and API channels (FR-2.7, NFR-2.8).
- **Minimal Guarantee:** Global period state changes are logged in the audit trail and strictly enforced across all system interfaces (FR-2.7, NFR-2.8).
- **Trigger:** The Administrator selects a financial period to close/lock.
- **Main Success Scenario:**
1. Administrator navigates to the financial period management view and selects an open monthly or quarterly accounting period (FR-2.7).
2. System displays a summary of the period's invoices, including any remaining unissued drafts or unresolved payment matches.
3. Administrator requests to mark the financial period as administratively closed (FR-2.7).
4. System warns the Administrator that locking the period will block all invoice creation, editing, and deletion within those dates (FR-2.7, NFR-1.5).
5. Administrator confirms the period lock.
6. System updates the financial period status to "Closed / Locked", enforces the write-block across both the UI and API layers (FR-2.7, NFR-2.8), and records the locking action in the system audit trail.
7. System confirms to the Administrator that the financial period is locked.

- **Extensions:**
2a. Unissued Drafts Exist in Target Period:
  2a1. System highlights unissued draft invoices remaining in the period.
  2a2. Administrator chooses either to cancel the lock to resolve the drafts first or proceed with locking the period to freeze all records.