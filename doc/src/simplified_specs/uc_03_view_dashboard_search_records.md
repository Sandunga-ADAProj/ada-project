# Use Case Specification: UC-03

- **ID / Code:** UC-03
- **Use Case Name:** View Dashboard & Search Records
- **Description:** Allows an authenticated Base User to view the centralized operational dashboard, inspect system health and customer timelines, and filter companies, contacts, and invoices across multiple criteria.
- **Primary Actor:** Base User
- **Scope:** Subscription Management & Invoicing System
- **Level:** User Goal
- **Stakeholders & Interests:**
  - *Base User:* Wants immediate visibility into assigned client balances, actionable notifications, customer lifecycle timelines, and multi-entity search filters (UR-1.2, FR-6.1, FR-6.2, FR-6.7.2).
  - *Administrator:* Wants to monitor informational monthly billing targets, system health metrics, and real-time account standings (FR-2.5.1, FR-6.5, NFR-2.9).
  - *Company / Business:* Requires strict access isolation so users only view records belonging to their assigned clients and sections (UR-1.2, NFR-5.6).
- **Preconditions:** The Base User has an active, authenticated session (UC-01), and the data retrieval layer is online.
- **Postconditions:** The system renders the filtered records, dashboard metrics, and chronological timelines without altering underlying operational data.
- **Success Guarantee:** The user views real-time synchronized account balances, standing statuses, actionable notifications, and accurately filtered entity lists restricted to their authorized scope (UR-1.2, FR-6.1, FR-6.2, NFR-4.1).
- **Minimal Guarantee:** Unauthorized data access and Insecure Direct Object References (IDOR) are strictly prevented (NFR-5.6). Individual worker productivity is never tracked via surveillance analytics (NFR-5.4).
- **Trigger:** The Base User accesses the main portal dashboard or initiates a multi-entity search query.
- **Main Success Scenario:**
1. Base User requests to view the centralized dashboard (FR-6.2).
2. System verifies the user's assigned client permissions and delegated account scopes (UR-1.2, FR-7.3).
3. System retrieves and displays real-time account balances, current financial standings (Up-to-Date, Overdue, Suspended, In Dispute), informational billing targets, actionable notifications, and pending manual intervention items (FR-2.5.1, FR-6.2, FR-6.5, NFR-4.1).
4. Base User applies search and filtering parameters across Companies (by business domain/industry sector or tags), Contacts (by contact name), or Invoices (by status, recurring vs. one-off type, and issue/due date ranges) (FR-1.5, FR-6.1).
5. System executes the query and renders the matching records with proper character encoding for accents and foreign names (NFR-2.6).
6. Base User selects a specific customer account to inspect its detailed profile and history.
7. System renders the chronological timeline of relevant customer lifecycle events, including registration, contact reassignment, rate changes, pauses, and cancellations (FR-6.7.2).

- **Extensions:**
3a. Administrator Views System Health Dashboard:
  3a1. Base User with Administrator privileges requests the System Health view (NFR-2.9).
  3a2. System displays recurring generation execution status, pending email queues, recent integration errors, and the last successful backup timestamp (NFR-2.9).
5a. No Matching Records Found:
  5a1. System detects an empty result set for the applied filter parameters.
  5a2. System informs the Base User that no records match the criteria and allows filter adjustment without resetting all search fields (NFR-1.1).
6a. Unauthorized Direct URL Access Attempt (IDOR):
  6a1. Base User attempts to access a customer or invoice record outside their assigned client scope via a direct URL or identifier (NFR-5.6).
  6a2. System rejects the request, blocks access to the record, and logs the security violation (NFR-5.6).