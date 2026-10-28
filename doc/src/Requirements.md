## **1\. Business Requirements (BR)**

* **BR-1 (Customer & Subscription Management):**  
  * The business requires a centralized management system to record customer entities and link them to active monthly subscription agreements with customizable billing anchor dates and agreed payment terms.   
* **BR-2 (Automated & Scalable Invoicing):**  
  * The business requires automated recurring invoice generation to maintain consistent financial records, eliminate manual processing overhead, and prevent billing errors.  
* **BR-3 (Scalability & Operational Efficiency):**  
  * The business process must scale seamlessly to support customer base growth without requiring a proportional increase in administrative workforce or manual tracking efforts.

## **2\. User Requirements (UR)**  

## **A. Base Users (Internal Employees)**

* **UR-1.1 (Authentication):** Users must be able to securely log into the portal using their verified corporate email address and password.  
* **UR-1.2 (Invoice Visibility):** Users must be able to view, download, and track the status of their assigned clients and sections.  
* **UR-1.3 (User Preferences):** Users can configure personal preferences and accessibility options in the system, but cannot change its behavior. Only super-administrators can do this.

#### **B. Administrators (Internal Employees)**

* **UR-2.1 (Customer Onboarding):** Administrators must be able to register new companies, set up subscriptions, and link them to their respective billing plans and invoices.  
* **UR-2.2 (Permission Delegation):** Administrators must be able to grant or revoke specific portal permissions for internal staff members assigned to manage specific customer accounts or operational sections. 
* **UR-2.3 (Invoice Management):** Administrators must be able to manage invoice creation, issuance and status.
* **UR-2.4 (Payment Reconciliation):** Administrators must be able to monitor payments and review unmatched transactions.
* **UR-2.5 (Collections Management):** Administrators must be able to oversee overdue invoices, reminders and outstanding balances.
* **UR-2.6 (Cancellation Management):** Administrators must be able to review cancellation requests and outstanding financial obligations.
* **UR-2.7 (Accounting & Reporting):** Administrators must be able to monitor financial information and generate accounting exports.

#### **C. Super-Administrators (System Owners / Managers)**

* **UR-3.1 (Global Access Control):** Super-administrators must have full administrative access to manage internal staff roles, fine-tune system-wide security permissions, and oversee platform configurations.  
* **UR-3.2 (Process Management):** Super-administrators must be able to modify operational workflows, business rules, and system integration settings.


## **3\. Functional Requirements (FR)**

#### **1\. Company Registration & Verification**

* **FR-1.1 (Email Verification):** The system shall register and verify the company email address during onboarding.  
* **FR-1.2 (Extended Customer Profile):** The system shall capture and store comprehensive company entity data during registration, including:  
  * Commercial name, trading name, and legal name  
  * NIF / Tax ID (stored without format enforcement or regional restrictions)  
  * Tax address and country  
  * Working currency  
  * Primary contact information  
* **FR-1.3 (Contact Management & Inactivity):**  
  * **FR-1.3.1:** The system shall support associating multiple contact profiles with a single customer account.  
  * **FR-1.3.2:** The system shall allow marking a contact as "inactive" upon departure/attrition without deleting or altering the audit trail of historical invoices sent to that contact.  
* **FR-1.4 (Duplicate Prevention):** The system shall perform fuzzy matching checks during customer creation to detect and flag potential duplicate records for review prior to saving.  
* **FR-1.5 (Customer Tagging):** The system shall allow administrators to assign customizable tags (e.g., industry sector, business domain, priority tier) to customer profiles for grouping and filtering.
* **FR-1.6 (Billing Contact Protection):** The system shall prevent the deletion of the only active billing contact associated with an active customer account and display an explanatory error message.


#### **2\. Invoicing & Billing Operations**

* **FR-2.1 (Recurring Billing & Activation):**  
  * **FR-2.1.1 (Automated Generation):** The system shall automatically generate monthly recurring invoices for active customer accounts according to their assigned billing anchor dates.  
  * **FR-2.1.2 (Future Billing & Deferred Activation):** The system shall support setting future billing start dates, maintaining the customer in a “Pending Activation” state without generating invoices or payment reminders until the activation date is reached.  
* **FR-2.2 (Invoice Data, Formatting & Documentation):**  
  * **FR-2.2.1 (Autofill Data):** The system shall autofill all customer and billing details from stored records during invoice generation.  
  * **FR-2.2.2 (Standard Formatting):** The system shall generate standard compliance invoices featuring sequential numbering, itemized tax information, and VAT calculations.  
  * **FR-2.2.3 (File Attachments):** The system shall support uploading and attaching supporting documentation and files directly to customer and invoice records.  
* **FR-2.3 (Manual & Test Invoicing):**  
  * **FR-2.3.1 (Ad-Hoc Invoices):** The system shall allow administrators to manually generate ad-hoc (one-off) invoices for a customer on demand.  
  * **FR-2.3.2 (Test Invoices):** The system shall permit administrators to edit and delete unissued test invoices (Draft / Not Issued) while maintaining a secure audit log of those actions.  
* **FR-2.4 (Expanded Invoice State Lifecycle):**  
  * The system shall track and display real-time statuses across the complete invoice lifecycle: "draft", "ready to issue", "issued", "sent", "overdue", "paid", and "partially reconciled".  
* **FR-2.5 (Real-Time Account Standing):**  
  * **FR-2.5.1:** The system shall continuously track and display the current financial standing of each account (Up-to-Date, Overdue, Suspended, In Dispute).  
  * **FR-2.5.2:** The system shall update account standing automatically based on invoice due dates, reconciled bank payments, and unresolved balances.  
* **FR-2.6 (Pricing, Discounts & Commercial Approvals):**  
  * **FR-2.6.1 (Pricing Configuration & Audits):** Price ranges and standard pricing structures shall be configurable by Super-Administrators. Price inconsistencies shall be automatically flagged as Pending Review for human validation.  
  * **FR-2.6.2 (Commercial Exceptions):** The system shall allow authorized users to propose commercial exceptions (temporary volume discounts, free periods, custom pricing, or waiving initial prorated charges to defer standard billing to the following month).  
  * **FR-2.6.3 (Discount Approval Workflows):** Financial changes and commercial exceptions shall trigger an approval workflow requiring Administrator or Super-Administrator authorization based on configurable discount thresholds.  
  * **FR-2.6.4 (Pricing Audit Trail):** The system shall log all modifications to client pricing, recording the modifying user, timestamp, previous price, and updated price.  
* **FR-2.7 (Financial Period Locking):**  
  * The system shall allow Administrators to mark financial periods as administratively closed, blocking all invoice creation, editing, or deletion within that period without an explicit audited Super-Administrator exception.  
* **FR-2.8 (Invoice Contextual Collaboration):**  
  * The system shall allow users to leave contextual comments on specific invoice records and \@mention other internal users (triggering targeted notifications). General unstructured chat shall not be permitted.
* **FR-2.9 (Recurring Billing Activation Validation):** The system shall prevent recurring billing activation for customer accounts with incomplete required tax information and display an explanatory error message.
 

#### **3\. Banking Integration & Payment Reconciliation**

* **FR-3.1:** The system shall integrate with external financial institutions and banking APIs to fetch transaction data for payment verification.  
* **FR-3.2:** The system shall automatically reconcile incoming bank transactions against outstanding invoices based on reference numbers, amounts, and metadata.  
* **FR-3.3:** The system shall flag ambiguous, delayed, duplicate, or unassociated bank transactions for manual administrator review without marking the invoice as paid prematurely.
* **FR-3.4 (Simulated Payment Integration):** The system shall support integration with a simulated Stripe environment for testing payment-related operations without processing real financial transactions.


#### **4\. Automated Notifications & Reminders**

* **FR-4.1 (Company Notifications):**  
  * **FR-4.1.1:** The system shall send an automated notification to the company contact immediately upon transition to the sent state.  
  * **FR-4.1.2:** For issued unpaid invoices, the system shall send automated follow-up notifications 3 calendar days and 5 calendar days after the invoice issue date.  
  * **FR-4.1.3:** The system shall continue sending periodic overdue notifications for unpaid invoices at set intervals until the balance is fully settled, resolved, or written off.  
* **FR-4.2 (Administrator Notifications):**  
  * **FR-4.2.1:** The system shall notify administrators whenever an invoice is issued or paid.  
  * **FR-4.2.2:** The system shall alert administrators immediately when missing customer information, bank integration errors, or unresolved payment matches occur.  
* **FR-4.3 (Rule-Based Custom Notifications):**  
  * The system shall allow administrators to configure custom, rule-based notification triggers based on operational conditions (e.g., invoices exceeding a specified number of days overdue, or outstanding balances surpassing a defined threshold in euros).  
* **FR-4.4 (Business Calendar & Date Adjustments):**  
  * **FR-4.4.1:** The system shall store and maintain a configurable business calendar defining working days, weekends, and regional holidays.  
  * **FR-4.4.2:** If a scheduled notification, reminder, or calculated invoice due date falls on a non-working day, the system shall automatically postpone the action to the next available working day.  
    

#### **5\. Account Cancellation, Retention & Debt Collection**

* **FR-5.1 (Cancellation Recurring Freeze):** When a company account is cancelled, the system shall cease generating new recurring invoices for that company.   
* **FR-5.2 (Debt Collection Persistence):** When an account is cancelled with outstanding balances, active subscription generation shall cease, but overdue notifications for outstanding historical invoices shall persist.   
* **FR-5.3 (Cancellation Approval Workflow):**   
  * **FR-5.3.1:** When a user requests an account cancellation, the system shall notify an administrator for formal review and approval.   
  * **FR-5.3.2:** The cancellation review screen shall display outstanding financial obligations and disclose only the minimum authorized account details.   
* **FR-5.4 (Statutory Record Retention):** The system shall securely retain company historical data and invoice records in accordance with statutory record-retention laws.   
* **FR-5.5 (Personal Data Deletion & Anonymization):**   
  * **FR-5.5.1:** The system shall support the deletion or anonymization of personal contact data when legally appropriate.   
  * **FR-5.5.2:** Personal data deletion shall preserve the validity and availability of historical invoice PDFs and required accounting audit trails. 

#### **6\. Search, Filtering & Reporting**

* **FR-6.1 (Multi-Entity Filtering):** The system shall provide filtering options across data entities:   
  * Companies: Filterable by business domain/industry sector.  
  * Contacts: Filterable by contact name.  
  * Invoices: Filterable by status (Draft, Issued, Paid, Overdue, Disputed, Unresolved), invoice type (Recurring vs. One-off), and issue/due date ranges.   
* **FR-6.2 (Centralized Dashboard):** The system shall display a centralized dashboard highlighting account balances, actionable notifications, and pending items requiring manual intervention.   
* **FR-6.3 (Accounting Export Packages & Versioning):**   
  * **FR-6.3.1:** The system shall generate periodic export packages (monthly or quarterly) for external accounting services (e.g., VeriFactu/CSVs/ZIPs).   
  * **FR-6.3.2:** The system shall assign explicit version identifiers and visual markers whenever an export package is regenerated following a data correction.   
* **FR-6.4 (Export Audit Trail & Mass Download Alerts):**   
  * **FR-6.4.1:** The system shall record comprehensive metadata (generation timestamp, applied filters, and requesting user) for all export actions.   
  * **FR-6.4.2:** The system shall automatically trigger administrative alerts upon detecting bulk or mass data export attempts.   
* **FR-6.5 (Informational Billing Targets):** The system shall allow administrators to configure purely informational monthly billing and collection targets without altering core billing calculations or workflows.   
* **FR-6.6 (Annual Account Pricing Review):**   
  * **FR-6.6.1:** The system shall identify and display customer accounts requiring annual revenue-range and pricing reviews at the beginning of the period.  
  * **FR-6.6.2:** The system shall track review data sources and record authorized price modifications without applying retroactive adjustments to past invoices.    
* **FR-6.7 (UI Productivity Tools & Customer Timeline):**   
  * **FR-6.7.1:** The system shall allow users to bookmark favorite or recently viewed entities for rapid retrieval.   
  * **FR-6.7.2:** The system shall render a chronological timeline of relevant customer lifecycle events (e.g., registration, contact reassignment, rate changes, pauses, and cancellations).
* **FR-6.8 (Assigned Invoice Access):** The system shall allow users to view, download, and track invoices belonging to their assigned customers or operational sections, while preventing access to unauthorized records.
* **FR-6.9 (Personal Preferences):** The system shall allow users to configure and save their personal interface and accessibility preferences without modifying system-wide settings or business rules.
* **FR-6.10 (System Health Dashboard):** The system shall provide an administrative health dashboard displaying recurring billing execution status, pending notification queues, recent integration errors, and the last successful backup.
* **FR-6.11 (CSV Data Management):** The system shall support importing and exporting data in CSV format, subject to the user's access permissions.


#### **7\. User Access & Permission Management**

* **FR-7.1 (Custom Role & Permission Definition):** The system shall allow Super-Administrators to define and assign custom roles and permissions to users.   
* **FR-7.2 (Substitute Approver Assignment):** The system shall allow administrators to assign a substitute approver when a primary approver is unavailable, logging all reassignments in the audit trail.   
* **FR-7.3 (Temporary Account Delegation):**   
  * **FR-7.3.1:** The system shall allow administrators to temporarily delegate customer account management to another user for a specified validity period.   
  * **FR-7.3.2:** Temporary delegation shall preserve the original assignment record and automatically terminate upon expiration.   
* **FR-7.4 (Temporary Guest Accounts):** The system shall support provision of temporary guest user accounts provisioned with strict minimum-privilege permissions for external roles (e.g., external accountants).   
* **FR-7.5 (Session Security & Access Controls):**   
  * **FR-7.5.1:** The system shall automatically terminate an active user session after a configurable period of inactivity (e.g., 10 minutes).   
  * **FR-7.5.2:** The system shall immediately terminate active user sessions upon administrative account deactivation.   
  * **FR-7.5.3:** The system shall temporarily block further authentication attempts for a set duration (e.g., 5 minutes) after three consecutive failed login attempts.
* **FR-7.6 (Employee Authentication):** The system shall allow internal users to authenticate using their verified corporate email address and password, enforcing the access permissions associated with their accounts.
* **FR-7.7 (Scoped Permission Management):** The system shall allow Administrators to grant and revoke customer-specific or section-specific access permissions for internal employees, without allowing them to modify global role definitions.
* **FR-7.8 (System Configuration Management):** The system shall allow Super-Administrators to manage system-wide operational workflows, business rules, and integration settings. 


## **4. Non-Functional Requirements (NFRs)**

The numerical thresholds and acceptance criteria defined in this section are initial engineering proposals based on the anticipated usage of the system. Where the client has not provided explicit performance or usability targets, reasonable values have been established by the development team and remain subject to client validation.

### **1. Performance & Usability**

* **NFR-1.1 Efficiency:** The system shall allow internal users to search for customers and view their invoices within 30 seconds and a maximum of 5 user interactions per task. Reviewing the details of an unmatched payment shall take no more than 120 seconds and 10 user interactions, under standardized usability testing conditions.
  * **Verification:** Conduct usability tests with representative internal users using predefined customer, invoice, and unmatched payment records. Measure completion times and user interactions for each task. All specified limits must be satisfied.

* **NFR-1.2 Ease of Use:** During usability testing with 10 representative internal employees, at least 80% of participants shall successfully complete the selected administrative tasks without assistance or prior training.
  * **Verification:** Conduct usability tests with 10 representative employees who have not received prior training. At least 8 participants must independently complete all selected tasks successfully.

* **NFR-1.3 Transaction Speed:** Payment-status checks must process and reflect in the system within **1 minute**.
  * **Verification:** Measure the time between submitting a payment-status check request and displaying the resulting status. The total duration must not exceed 60 seconds.

* **NFR-1.4 Asynchronous Feedback:** Time-intensive background operations must execute without freezing the UI, displaying real-time task statuses (pending, processing, completed with errors) that persist across browser sessions.
  * **Verification:** Execute long-running background operations while interacting with the interface. Close and reopen the application during execution. The interface must remain usable, and operation statuses must persist and remain accessible across sessions.

* **NFR-1.5 Form Recovery:** The interface shall automatically save drafts for active forms upon accidental closure, and ensure an issuance is not lost or duplicated if the user reloads the page. It must also warn before legally irreversible actions.
  * **Verification:** Interrupt form completion, reload the page, and attempt to repeat invoice issuance. Draft information must be recoverable, duplicate invoices must not be generated, and irreversible actions must display confirmation warnings.

* **NFR-1.6 Distinct Exceptions:** Errors must be clearly separated (e.g., "Invoice could not be created" vs. "Invoice was created but could not be sent").
  * **Verification:** Simulate invoice creation failures and notification delivery failures independently. Each scenario must produce a distinct error message correctly describing the failed operation.

* **NFR-1.7 Accessibility Standards:** The system shall comply with Web Content Accessibility Guidelines (WCAG) 2.2 Level AA. All essential controls must support keyboard navigation, appropriate labels, sufficient color contrast, and understandable error messages without requiring mouse hover.
  * **Verification:** Conduct automated accessibility scans and manual keyboard-navigation and screen-reader tests against WCAG 2.2 Level AA success criteria. All applicable Level A and AA criteria must be satisfied.


### **2. Scalability & System Integrity**

* **NFR-2.1 Scalability:** The system shall support at least 50 concurrent users and 10,000 customer records while maintaining a 95th-percentile response time of no more than 3 seconds for customer searches, invoice retrieval, and dashboard loading under defined load-testing conditions.
  * **Verification:** Perform load tests with 50 concurrent users and a database containing at least 10,000 customer records. Measure response times for the specified operations. The 95th-percentile response time for each operation must not exceed 3 seconds.

* **NFR-2.2 Data Integrity:** The system shall ensure that database operations involving customer records, invoices, and payments are executed atomically, preventing incomplete or partially committed transactions. If an operation fails, its database changes shall be rolled back. Repeated processing of the same request or bank transaction shall not create duplicate financial records. All operations shall preserve database integrity constraints, and integration failures shall be logged for recovery or manual review.
  * **Verification:** Simulate transaction failures, duplicate requests, and database constraint violations. Verify that failed operations are rolled back, duplicate financial records are not created, database constraints remain satisfied, and integration errors are logged for recovery or manual review.

* **NFR-2.3 Modularity & Extensibility:** The system's core data models and architecture must be modularly designed to support adding new payment methods, custom billing frequencies, and communication channels without requiring core model redesigns.
  * **Verification:** Review the architecture and perform controlled extension tests by introducing a new payment method, billing frequency, and notification channel. These extensions must be possible without requiring a redesign of the existing core data models.

* **NFR-2.4 Concurrency Control:** The system must implement real-time editing collision detection (e.g., optimistic locking) to block simultaneous conflicting updates on shared entities and prevent accidental data overwrites.
  * **Verification:** Simulate two users editing the same record simultaneously. The system must detect conflicting updates, prevent silent overwriting of previously committed data, and inform the affected user of the conflict.

* **NFR-2.5 Decimal Precision:** The system shall maintain exact decimal precision (e.g., using fixed-point arithmetic) for all monetary and tax calculations without rounding loss or truncation discrepancies.
  * **Verification:** Execute monetary calculation tests involving decimal values, taxes, discounts, and rounding edge cases. Results must match independently calculated reference values using the defined currency precision and rounding rules, without numerical discrepancies.

* **NFR-2.6 Character Encoding:** The system shall enforce UTF-8 character encoding across all data processing, storage, PDF document generation, and CSV imports/exports to ensure correct handling and display of accented and international characters.
  * **Verification:** Import, export, and render sample records containing accented characters and international names. Compare the resulting PDF and CSV contents against the original data. All supported characters must remain correctly represented without corruption.

* **NFR-2.7 State Separation:** The system shall maintain a strict separation between global system configuration settings and operational business records.
  * **Verification:** Inspect the database schema and configuration-management design. Verify that global settings are managed separately from operational customer, subscription, invoice, and payment records.

* **NFR-2.8 API Parity:** All business rules, validation constraints, and authorization policies enforced by the user interface shall be equally enforced across all application programming interface (API) endpoints.
  * **Verification:** Attempt the same restricted operations through both the user interface and direct API requests. Authorization restrictions, validation rules, and business constraints must be enforced consistently through both access methods.


### **3. Multi-Device Accessibility & Mobility**

* **NFR-3.1 Cross-Device Compatibility:** The system must be accessible via a responsive web application or mobile-friendly interface, allowing users to perform administrative tasks from any location.
  * **Verification:** Test representative administrative workflows using desktop, tablet, and mobile screen sizes. Essential functions must remain accessible and usable without losing required information or functionality.

* **NFR-3.2 Browser Compatibility:** The system shall support the latest two stable major versions of Google Chrome, Mozilla Firefox, Microsoft Edge, and Safari on supported desktop platforms, as well as Safari on iOS and Chrome on Android.
  * **Verification:** Execute the same critical administrative workflow tests across the specified browsers and their supported versions. All critical workflows must complete successfully without browser-specific errors or loss of functionality.


### **4. Data Synchronization & Consistency**

* **NFR-4.1 Real-Time Synchronization:** The system shall propagate successfully committed changes to customer records, invoice statuses, payment records, and notification statuses across all relevant modules within a maximum of 5 seconds. All modules shall display consistent information after synchronization, and synchronization failures shall be logged and reported to administrators.
  * **Verification:** Update customer information, invoice statuses, payment records, and notification statuses in one module. Measure the time required for each committed change to appear in related modules. Synchronization must complete within 5 seconds, and simulated synchronization failures must be logged and reported.


### **5. Security & Data Privacy**

* **NFR-5.1 Confidentiality:** The system shall protect sensitive customer information, including company names, tax identification numbers, and contact details, through AES-256 encryption for stored data and backups, and TLS 1.3 for data transmitted over networks (allowing TLS 1.2 where compatibility requires it). User passwords shall be stored using salted Argon2id password hashes. Access to sensitive information shall be restricted according to authenticated user roles and assigned permissions.
  * **Verification:** Inspect database and backup encryption configurations, verify supported TLS versions, and review password storage mechanisms. Perform authorization tests using accounts with different roles and customer assignments. Sensitive data must be encrypted, passwords must not be stored in plaintext, and unauthorized access attempts must be rejected without exposing confidential information.

* **NFR-5.2 PDF Preservation vs. Anonymization:** Historical invoice PDFs and legally required accounting documents must remain accessible and unaltered throughout their applicable statutory retention periods, even when personal contact data is anonymized or deleted.
  * **Verification:** Anonymize or delete personal contact information in a test customer record and inspect its associated historical invoices. Legally required documents must remain accessible and unchanged, with retention controls enforcing the applicable statutory periods.

* **NFR-5.3 Purpose Isolation:** Operational and billing contact details must be strictly isolated from marketing campaigns based on explicit customer consent records.
  * **Verification:** Attempt to access or use billing contact information for marketing purposes without recorded consent. The system must deny unauthorized marketing access while preserving legitimate operational and billing functionality.

* **NFR-5.4 Non-Surveillance Analytics:** System metrics shall measure aggregate performance and workflow friction without tracking individual worker productivity.
  * **Verification:** Inspect generated analytics records, reports, and exported statistics. They must contain aggregate operational metrics without exposing or tracking individual employee productivity.

* **NFR-5.5 Malicious Files:** The system shall inspect and validate uploaded files against malicious payload signatures and disallowed file types, rejecting unsafe files without execution or storage and displaying an explanatory security error.
  * **Verification:** Upload harmless security-testing files designed to trigger malicious-file detection mechanisms. The system must reject detected unsafe files, prevent their opening or execution, and display an appropriate error message.

* **NFR-5.6 IDOR Prevention:** The system shall enforce object-level authorization across all direct references, URLs, and API endpoints, rejecting any attempt by a user to access invoice or customer records outside their assigned permissions.
  * **Verification:** Attempt to access invoice records outside the authenticated user's permissions by modifying invoice identifiers in URLs and direct API requests. All unauthorized requests must be denied without disclosing invoice information.


### **6. System Reliability & Fault Tolerance**

* **NFR-6.1 Isolated Batch Processing:** Automated batch process engines must execute each record as an isolated transaction, ensuring individual item failures are logged and alerted without halting or failing the overall execution queue.
  * **Verification:** Introduce a controlled failure in one record during an automated batch operation. The failed record must be logged and reported, while all other valid records continue processing independently.

## 5. Requirements Traceability (UR → FR)

* UR-1.1 — Authentication → FR-7.5, FR-7.6
* UR-1.2 — Invoice Visibility → FR-2.4, FR-6.1, FR-6.2, FR-6.8
* UR-1.3 — User Preferences → FR-6.9

* UR-2.1 — Customer Onboarding → FR-1.1–1.6, FR-2.1, FR-2.9
* UR-2.2 — Permission Delegation → FR-7.3, FR-7.7
* UR-2.3 — Invoice Management → FR-2.2, FR-2.3, FR-2.4, FR-2.7
* UR-2.4 — Payment Reconciliation → FR-3.1, FR-3.2, FR-3.3, FR-3.4
* UR-2.5 — Collections Management → FR-2.5, FR-4.1, FR-4.2, FR-4.3, FR-5.2
* UR-2.6 — Cancellation Management → FR-5.1, FR-5.2, FR-5.3
* UR-2.7 — Accounting & Reporting → FR-6.1, FR-6.2, FR-6.3, FR-6.4, FR-6.11
* UR-3.1 — Global Access Control → FR-7.1, FR-7.5, FR-7.8
* UR-3.2 — Process Management → FR-2.6.1, FR-7.8


## 6. Functional Requirement Dependencies

The following table identifies key dependencies between functional requirements to ensure that related system capabilities are implemented consistently.

| Requirement | Depends on | Explanation |
|---|---|---|
| FR-2.1.1 — Automated Invoice Generation | FR-1.2, FR-2.1.2, FR-2.2, FR-2.9 | Invoice generation requires valid customer billing data, must respect activation dates, and must follow invoice formatting rules. Recurring billing activation must be blocked when mandatory tax information is missing. |
| FR-2.5.2 — Account Standing Updates | FR-2.4, FR-3.2 | Financial standing depends on invoice statuses and reconciled payments. |
| FR-3.2 — Automatic Payment Reconciliation | FR-3.1 | Reconciliation requires transaction data retrieved from banking integrations. |
| FR-3.3 — Unmatched Payment Handling | FR-3.2 | Manual review is required when automatic reconciliation cannot determine a reliable match. |
| FR-4.1.3 — Overdue Notifications | FR-2.4, FR-2.5 | Reminders depend on invoice states and outstanding balances. |
| FR-5.2 — Debt Collection Persistence | FR-5.1, FR-4.1.3 | Cancellation must stop new recurring invoices while allowing reminders for existing unpaid invoices. |
| FR-6.8 — Assigned Invoice Access | FR-7.7 | Invoice visibility must respect customer-specific or section-specific permissions. |
