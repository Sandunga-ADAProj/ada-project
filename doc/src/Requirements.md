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

#### 

#### 

#### 

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
  * The system shall allow users to leave contextual comments on specific invoice records and @mention other internal users (triggering targeted notifications). General unstructured chat shall not be permitted.

#### **3\. Banking Integration & Payment Reconciliation**

* **FR-3.1:** The system shall integrate with external financial institutions and banking APIs to fetch transaction data for payment verification.  
* **FR-3.2:** The system shall automatically reconcile incoming bank transactions against outstanding invoices based on reference numbers, amounts, and metadata.  
* **FR-3.3:** The system shall flag ambiguous, delayed, duplicate, or unassociated bank transactions for manual administrator review without marking the invoice as paid prematurely.

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

## **Non-Functional Requirements (NFRs)**

### **1\. Performance & Usability**

* **NFR-1.1 Efficiency:** Common administrative tasks must be optimized for speed, minimizing both required clicks and manual data entry.  
* **NFR-1.2 Ease of Use:** The application must feature an intuitive user interface (UI) requiring minimal user training.  
* **NFR-1.3 Transaction Speed:** Payment-status checks must process and reflect in the system within **1 minute**.  
* **NFR-1.4 Asynchronous Feedback:** Time-intensive background operations must execute without freezing the UI, displaying real-time task statuses (pending, processing, completed with errors) that persist across browser sessions.  
* **NFR-1.5 Form Recovery:** The interface shall automatically save drafts for active forms upon accidental closure, and ensure an issuance is not lost or duplicated if the user reloads the page. It must also warn before legally irreversible actions.  
* **NFR-1.6 Distinct Exceptions:** Errors must be clearly separated (e.g., “Invoice could not be created” vs. “Invoice was created but could not be sent”).  
* **NFR-1.7 Accessibility Standards:** Controls must work without mouse hover, utilizing proper labels, contrast, keyboard support, and understandable error messages.

### **2\. Scalability & System Integrity**

* **NFR-2.1 Scalability:** The system architecture must accommodate growth in user volume, data storage, and concurrent transactions without degrading performance.  
* **NFR-2.2 Data Integrity:** Information must be reliably processed and transmitted across systems without data loss, artificial delays, or corruption.  
* **NFR-2.3 Modularity & Extensibility:** The system's core data models and architecture must be modularly designed to support adding new payment methods, custom billing frequencies, and communication channels without requiring core model redesigns.   
* **NFR-2.4 Concurrency Control:** The system must implement real-time editing collision detection (e.g., optimistic locking) to block simultaneous conflicting updates on shared entities and prevent accidental data overwrites.   
* **NFR-2.5 Decimal Precision:** The system must have exact decimal precision when managing numbers; cents cannot be lost.  
* **NFR-2.6 Character Encoding:** The system must not show corrupted characters when reading letters with accents or foreign names in PDFs or CSVs.  
* **NFR-2.7 State Separation:** Global configuration must be strictly separated from operational data.  
* **NFR-2.8 API Parity:** The system’s API cannot bypass the rules applied by the interface.  
* **Blocked Actions:** The system must block and explicitly warn if: (1) someone tries to activate recurrence for a customer without sufficient tax information, or (2) someone tries to delete the only billing contact of an active customer.  
* **NFR-2.9 System Health Dashboard:** The system shall have a simple health screen displaying recurring generation execution, pending email queues, recent integration errors, and the last successful backup.  
* **NFR-2.10 Integration Support:** CSV data management and a simulated Stripe environment must be implemented.

### **3\. Multi-Device Accessibility & Mobility**

* **NFR-3.1 Cross-Device Compatibility:** The system must be accessible via a responsive web application or mobile-friendly interface, allowing users to perform administrative tasks from any location.  
* **NFR-3.2 Browser Compatibility:** The system must be compatible with modern browsers, both for PC (Chrome, Mozilla) and Mobile (iOS, Android)

### **4\. Data Synchronization & Consistency**

* **NFR-4.1 Real-Time Sync:** Customer records, invoicing, payment statuses, and notifications must remain continuously synchronized across all modules.

### **5\. Security & Data Privacy**

* **NFR-5.1 Confidentiality:** All sensitive customer data (including company names, tax identification numbers, and contact details) must be encrypted and protected against unauthorized access in compliance with data privacy regulations.  
* **NFR-5.2 PDF Preservation vs. Anonymization:** Historical invoice PDFs and legal accounting documents must be permanently retained even if customer contact details are anonymized or deleted.  
* **NFR-5.3 Purpose Isolation:** Operational and billing contact details must be strictly isolated from marketing campaigns based on explicit customer consent records.  
* **NFR-5.4 Non-Surveillance Analytics:** System metrics shall measure aggregate performance and workflow friction without tracking individual worker productivity.  
* **NFR-5.5 Malicious Files:** If the system detects a dangerous file upload, it should not open it and must display an error.  
* **NFR-5.6 IDOR Prevention:** If a user copies the URL of an invoice that does not belong to them, the system will reject it.  
* 

### **6\. System Reliability & Fault Tolerance**

* **NFR-6.1 Isolated Batch Processing:** Automated batch process engines must execute each record as an isolated transaction, ensuring individual item failures are logged and alerted without halting or failing the overall execution queue. 

