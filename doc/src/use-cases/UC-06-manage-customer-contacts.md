# Use Case Specification: UC-06

### 🏗️ Identification & Context
* **ID / Code:** UC-06
* **Use Case Name:** Manage Customer Contacts
* **Description:** Allows an Administrator to add, edit and deactivate the contacts associated with a customer account, preserving the audit trail of historical invoices. It contains the extension point **erasure request**, which triggers UC-07.
* **Primary Actor:** Administrator
* **Scope:** Subscription Management & Invoicing System
* **Level:** User Goal

### 👥 Stakeholders & Triggers
* **Stakeholders & Interests:**
  * *Administrator:* Wants to keep contact information up to date when people join or leave the customer company (FR-1.3).
  * *Customer company:* Wants invoices and notifications to reach the right person.
  * *Auditor / Tax authority:* Requires that historical invoices remain unaltered (FR-1.3.2, FR-5.4).
* **Trigger:** The Administrator opens the "Contacts" section of a customer.
* **Extension Points:** *erasure request* (step 3, when the Administrator chooses to process a personal data erasure request) → UC-07.

### 🛡️ Conditions & Guarantees
* **Preconditions:** The Administrator is authenticated (UC-01) and the customer exists (UC-05).
* **Postconditions:** The customer's contact list reflects the changes; the change is recorded in the customer timeline (FR-6.7.2).
* **Success Guarantee:** Contacts are created, updated or marked as "inactive", and the customer always keeps at least one active billing contact.
* **Minimal Guarantee:** No contact is physically deleted through this use case, and historical invoices linked to a contact are never altered (FR-1.3.2).
* **Trigger:** The Administrator requests to manage the customer's contacts.

### 🔄 Flows of Events

#### Main Success Scenario (Happy Path):
1. **Administrator:** Selects a customer and requests to manage its contacts.
2. **System:** Lists the customer's contacts with their role (billing, operational…), status (active/inactive) and data.
3. **Administrator:** Chooses to add a new contact, edit an existing one or mark one as inactive.
4. **System:** Shows the corresponding form or confirmation.
5. **Administrator:** Enters the data or confirms the action.
6. **System:** Validates the data and the business rules (at least one active billing contact must remain for active customers).
7. **System:** Saves the changes, records the event in the customer timeline and keeps the link between historical invoices and the original contact (FR-1.3.2).

#### Extensions (Alternative Flows):
* **3a. Erasure request (extension point):**
  * 3a1. Administrator indicates that the contact has requested deletion of their personal data.
  * 3a2. UC-07 (Anonymize Contact Data) is executed.
* **6a. Invalid contact data:**
  * 6a1. System indicates the errors and the flow resumes at step 5.
* **6b. Attempt to deactivate or remove the only billing contact of an active customer:**
  * 6b1. System blocks the action and explicitly warns that another billing contact must be assigned first (NFR-2.8 – Blocked Actions).
  * 6b2. The flow resumes at step 3.
* **6c. Contact data are used for marketing purposes without consent:**
  * 6c1. System does not allow marking billing/operational contacts as marketing recipients without an explicit consent record (NFR-5.3).
