# Use Case Specification: UC-06

- **ID / Code:** UC-06
- **Use Case Name:** Manage Customer Contacts
- **Description:** Enables an Administrator to associate multiple contact profiles with a customer account, update contact details, isolate marketing consent from billing operations, and mark departing contacts as "inactive" while preserving historical invoice audit trails. Includes an extension point for legal data erasure requests (`UC-07`).
- **Primary Actor:** Administrator
- **Scope:** Subscription Management & Invoicing System (CRM Subsystem)
- **Level:** User Goal
- **Stakeholders & Interests:**
  - *Administrator:* Wants to manage multiple contacts per company and cleanly deactivate departed staff without breaking historical records (FR-1.3.1, FR-1.3.2).
  - *Customer Contact:* Wants their personal data protected and operational billing communications strictly isolated from marketing campaigns unless explicitly consented (NFR-5.1, NFR-5.3).
  - *Company / Business:* Requires that active customers always retain at least one valid billing contact and that historical invoice audit trails remain immutable (FR-1.3.2, NFR-2.8 Blocked Actions).
- **Preconditions:** The Administrator has an active, authenticated session (UC-01), and the target customer profile exists in the system (UC-05).
- **Postconditions:** Contact associations, consent flags, or inactivity statuses are updated, and the event is logged in the customer lifecycle timeline.
- **Success Guarantee:** Multiple contacts are accurately associated with the customer account (FR-1.3.1), departed contacts are marked "inactive" without altering historical invoice trails (FR-1.3.2), and concurrent editing collisions are prevented (NFR-2.4).
- **Minimal Guarantee:** The system never deletes the sole billing contact of an active customer (NFR-2.8 Blocked Actions), never exposes operational contacts to unconsented marketing (NFR-5.3), and never corrupts historical invoice audit trails (FR-1.3.2).
- **Trigger:** The Administrator selects the option to add, modify, or deactivate contacts for a customer account.
- **Main Success Scenario:**
1. Administrator views a customer profile and requests to manage its associated contacts (FR-1.3.1).
2. System retrieves and displays all active and inactive contact profiles linked to the customer account.
3. Administrator adds a new contact profile, updates existing contact details, or selects a departing contact to mark as "inactive" (FR-1.3.1, FR-1.3.2).
4. Administrator specifies explicit customer consent settings to isolate operational and billing contact details from marketing campaigns (NFR-5.3).
5. Administrator submits the contact modifications.
6. System checks for real-time concurrency collisions (optimistic locking) (NFR-2.4) and verifies that the customer retains at least one active billing contact if the account is active (NFR-2.8 Blocked Actions).
7. System updates the contact records, preserves all historical invoice audit trails linked to any deactivated contact (FR-1.3.2), and appends the contact reassignment event to the customer chronological timeline (FR-6.7.2).
8. System confirms the contact update to the Administrator.

- **Extensions:**
3a. Erasure Request (Legal Personal Data Deletion / Anonymization):
  3a1. Administrator receives a legal request to erase or anonymize a contact's personal data (FR-5.5.1).
  3a2. System executes extension use case **UC-07: Anonymize Contact Data** at the `erasure request` extension point.
6a. Attempt to Delete or Deactivate the Only Billing Contact of an Active Customer:
  6a1. System detects that the Administrator is attempting to remove or deactivate the sole billing contact of an active customer account (NFR-2.8 Blocked Actions).
  6a2. System blocks the action and displays an explicit warning requiring another active billing contact to be assigned first (NFR-2.8 Blocked Actions).
6b. Concurrent Editing Collision Detected:
  6b1. System detects via optimistic locking that another user modified the same contact record simultaneously (NFR-2.4).
  6b2. System blocks the conflicting overwrite and prompts the Administrator to review the updated record before re-applying changes (NFR-2.4).