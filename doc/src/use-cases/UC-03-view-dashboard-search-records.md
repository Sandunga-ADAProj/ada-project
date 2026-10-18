# Use Case Specification: UC-03

### 🏗️ Identification & Context
* **ID / Code:** UC-03
* **Use Case Name:** View Dashboard & Search Records
* **Description:** Allows a user to view the centralized dashboard (balances, actionable notifications and pending items) and to search and filter companies, contacts and invoices, use bookmarks and consult the customer timeline, always restricted to the records they are authorized to see.
* **Primary Actor:** Base User (inherited by Administrator and Super-Administrator)
* **Scope:** Subscription Management & Invoicing System
* **Level:** User Goal

### 👥 Stakeholders & Triggers
* **Stakeholders & Interests:**
  * *Base User:* Wants to quickly see what requires their attention and to find records with few clicks (FR-6.2, NFR-1.1).
  * *Administrator:* Wants pending manual interventions (unmatched payments, flagged prices, missing data) to be visible.
  * *Company (Product Owner):* Wants each employee to access only their assigned clients and sections (UR-1.2, NFR-5.6).
* **Trigger:** The user logs in (end of UC-01) or selects "Dashboard" / "Search".

### 🛡️ Conditions & Guarantees
* **Preconditions:** The user is authenticated (UC-01).
* **Postconditions:** None (read-only use case), except for updated bookmarks or recently viewed items.
* **Success Guarantee:** The user sees the dashboard and the search results that match the applied filters, limited to the records their permissions allow.
* **Minimal Guarantee:** No record outside the user's permissions is ever displayed or accessible, even by manipulating the URL (NFR-5.6).
* **Trigger:** The user requests the dashboard or performs a search.

### 🔄 Flows of Events

#### Main Success Scenario (Happy Path):
1. **User:** Requests to view the dashboard.
2. **System:** Displays the dashboard with account balances and standing (FR-2.5.1), actionable notifications and pending items requiring manual intervention (FR-6.2), plus the user's bookmarks and recently viewed entities (FR-6.7.1).
3. **User:** Selects the entity to search (companies, contacts or invoices) and applies filters.
4. **System:** Shows the available filters for that entity: business domain/sector for companies, name for contacts, and status, type (recurring/one-off) and issue/due date ranges for invoices (FR-6.1).
5. **User:** Sets the filter values and launches the search.
6. **System:** Returns the matching records the user is authorized to access.
7. **User:** Selects a record from the results.
8. **System:** Displays the record detail; for a company, it includes the chronological timeline of lifecycle events (FR-6.7.2). The record is added to the recently viewed list.

#### Extensions (Alternative Flows):
* **6a. No records match the filters:**
  * 6a1. System informs the user that there are no results and suggests clearing or relaxing filters.
* **7a. User bookmarks a record:**
  * 7a1. User marks the record as favourite.
  * 7a2. System adds it to the user's bookmarks (FR-6.7.1).
* **7b. User selects an invoice:**
  * 7b1. The flow continues in UC-04.
* **8a. User attempts to open a record that does not belong to them (e.g., copied URL):**
  * 8a1. System rejects the request with an "access denied" message and records the attempt (NFR-5.6).
