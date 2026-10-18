# Use Case Specification: UC-07

* **ID / Code:** UC-07
* **Use Case Name:** Anonymize Contact Data
* **Description:** Extends UC-06 when a contact exercises their right to erasure: the system deletes or anonymizes the contact's personal data while preserving historical invoice PDFs and accounting audit trails.
* **Primary Actor:** Administrator
* **Scope:** Subscription Management & Invoicing System
* **Level:** User Goal (extends UC-06 at extension point *erasure request*)
* **Stakeholders & Interests:**
  * *Contact (data subject):* Wants their personal data removed in accordance with data protection law (FR-5.5.1).
  * *Company (Product Owner):* Must comply with privacy regulations and statutory retention at the same time (FR-5.4, NFR-5.1).
  * *Auditor / Tax authority:* Requires invoice PDFs and accounting trails to remain valid and available (FR-5.5.2, NFR-5.2).
* **Preconditions:** UC-06 is in progress and the selected contact exists. The deletion is legally appropriate (no legal obligation requires keeping those personal data in the operational database).
* **Postconditions:** The contact's personal data are anonymized and the contact is inactive.
* **Success Guarantee:** Personal data (name, email, phone…) are irreversibly replaced by anonymous values in operational records; historical invoice PDFs and audit trails remain intact and accessible (NFR-5.2); the action is logged.
* **Minimal Guarantee:** Either the whole anonymization is applied or nothing is changed; issued invoice PDFs are never modified or deleted.
* **Trigger:** An erasure request is registered while managing contacts (UC-06).
* **Main Success Scenario:**
1. **Administrator:** Requests to anonymize the selected contact's data.
2. **System:** Shows which data will be anonymized and which documents will be retained for legal reasons (invoice PDFs, accounting records).
3. **System:** Warns that the action is irreversible and asks for confirmation (NFR-1.5).
4. **Administrator:** Confirms the operation.
5. **System:** Replaces the contact's personal data with anonymized values in all operational records and marks the contact as inactive.
6. **System:** Keeps historical invoice PDFs and accounting trails unchanged (FR-5.5.2).
7. **System:** Records the action (user, date, contact identifier) in the audit log and returns to UC-06.

* **Extensions:**
3a. Administrator cancels:
  3a1. No data is modified; control returns to UC-06.
5a. The contact is the only billing contact of an active customer:
  5a1. System blocks the operation and asks the Administrator to assign another billing contact first (NFR-2.8 – Blocked Actions).
5b. Error during the anonymization:
  5b1. System rolls back all changes, logs the error and informs the Administrator.
