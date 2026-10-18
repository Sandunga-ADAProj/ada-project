# Use Case Specification: UC-05

* **ID / Code:** UC-05
* **Use Case Name:** Register Customer Profile
* **Description:** Allows an Administrator to register a new customer company with its full fiscal and contact data, verifying its email and detecting potential duplicates before saving.
* **Primary Actor:** Administrator
* **Scope:** Subscription Management & Invoicing System
* **Level:** User Goal
* **Stakeholders & Interests:**
  * *Administrator:* Wants to register customers quickly with minimal manual data entry (UR-2.1, NFR-1.1).
  * *Company (Product Owner):* Wants a centralized, reliable and duplicate-free customer base (BR-1, FR-1.4).
  * *Customer company:* Wants its data to be stored correctly and protected (NFR-5.1).
* **Preconditions:** The Administrator is authenticated (UC-01) and has customer management permissions.
* **Postconditions:** A new customer record exists with at least one primary contact and its email pending or completed verification.
* **Success Guarantee:** The customer profile is stored with its commercial, trade and legal names, NIF/Tax ID, tax address, country, working currency, primary contact, tags and attachments (FR-1.2, FR-1.5, FR-2.2.3); a "Registration" event is added to its timeline (FR-6.7.2).
* **Minimal Guarantee:** No partial customer record is persisted; if the form is closed accidentally, the data is kept as a draft (NFR-1.5). Sensitive data is stored encrypted (NFR-5.1).
* **Trigger:** The Administrator selects "New Customer".
* **Main Success Scenario:**
1. **Administrator:** Requests to register a new customer.
2. **System:** Displays the registration form: commercial name, trading name, legal name, NIF/Tax ID, tax address, country, working currency and primary contact data (FR-1.2).
3. **Administrator:** Fills in the form, optionally assigns tags (sector, domain, priority) (FR-1.5) and attaches supporting documents (FR-2.2.3), and submits it.
4. **System:** Validates mandatory fields and formats (the NIF/Tax ID is stored without format enforcement or regional restrictions) and scans attached files.
5. **System:** Performs a fuzzy matching check against existing customers to detect potential duplicates (FR-1.4).
6. **System:** Stores the customer profile and its primary contact, and records the "Registration" event in the customer timeline (FR-6.7.2).
7. **System:** Sends a verification message to the company email address (FR-1.1) and shows a confirmation with the option to set up a subscription (UC-08).

* **Extensions:**
4a. Missing or invalid mandatory data:
  4a1. System indicates the invalid fields with clear messages (NFR-1.7), keeping the rest of the data.
  4a2. The flow resumes at step 3.
4b. Dangerous attachment detected:
  4b1. System rejects the file without opening it and displays an error (NFR-5.5).
  4b2. The flow resumes at step 3 without that attachment.
5a. Potential duplicate detected:
  5a1. System shows the similar existing records and flags the new record for review.
  5a2. Administrator confirms it is a different customer; the flow resumes at step 6.
  5a3. Alternatively, the Administrator cancels the registration and opens the existing customer; the use case ends.
7a. Verification message cannot be sent:
  7a1. System keeps the customer stored, marks the email as "pending verification" and alerts the Administrator (FR-4.2.2), clearly distinguishing "customer created" from "verification not sent" (NFR-1.6).
