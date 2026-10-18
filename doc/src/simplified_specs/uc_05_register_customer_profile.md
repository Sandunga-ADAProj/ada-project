# Use Case Specification: UC-05

- **ID / Code:** UC-05
- **Use Case Name:** Register Customer Profile
- **Description:** Allows an Administrator to onboard a new customer company by capturing extended legal and tax profile data, performing fuzzy duplicate checks, verifying the company email address, attaching files, and assigning custom tags.
- **Primary Actor:** Administrator
- **Scope:** Subscription Management & Invoicing System (CRM & Onboarding Subsystem)
- **Level:** User Goal
- **Stakeholders & Interests:**
  - *Administrator:* Wants an efficient onboarding flow with automatic draft recovery and clear duplicate warnings (UR-2.1, FR-1.4, NFR-1.1, NFR-1.5).
  - *Customer Company:* Wants their legal name, international tax ID, and working currency recorded accurately without restrictive regional format blocks (FR-1.2, NFR-2.6).
  - *Company / Business:* Requires centralized, duplicate-free customer records with verified email addresses and encrypted sensitive data (BR-1, FR-1.1, FR-1.4, NFR-5.1).
- **Preconditions:** The Administrator has an active, authenticated session (UC-01), and the customer onboarding subsystem is online.
- **Postconditions:** A new encrypted customer entity record is created, tagged, and logged in the customer lifecycle timeline.
- **Success Guarantee:** The company profile is saved with extended entity data (FR-1.2), custom tags are assigned (FR-1.5), duplicate checks are cleared (FR-1.4), the company email verification is processed (FR-1.1), and all sensitive data is encrypted at rest (NFR-5.1).
- **Minimal Guarantee:** Database transactional integrity is strictly preserved. No unverified duplicate records, corrupted character encodings, or unencrypted sensitive fields are persisted under any scenario (NFR-2.2, NFR-2.6, NFR-5.1).
- **Trigger:** The Administrator initiates the onboarding of a new customer company.
- **Main Success Scenario:**
1. Administrator requests to register a new customer company profile (UR-2.1).
2. System displays the customer registration form with automatic draft-saving enabled (NFR-1.5).
3. Administrator enters extended company data: commercial name, trading name, legal name, NIF/Tax ID (without format enforcement or regional restrictions), tax address, country, working currency, and primary contact details (FR-1.2).
4. Administrator assigns customizable tags (e.g., industry sector, business domain, priority tier) and optionally attaches supporting onboarding documents (FR-1.5, FR-2.2.3).
5. Administrator submits the registration request.
6. System performs fuzzy matching checks against existing customer records to detect potential duplicates prior to saving (FR-1.4).
7. System dispatches a verification request to the company email address and confirms its validity (FR-1.1).
8. System encrypts sensitive company and tax data (NFR-5.1), persists the new customer profile, and records the registration event in the customer lifecycle timeline (FR-6.7.2).
9. System displays a confirmation message indicating successful customer onboarding.

- **Extensions:**
4a. Malicious Supporting Document Attached:
  4a1. System detects a dangerous file during upload validation (NFR-5.5).
  4a2. System blocks the file attachment and displays an error message while preserving the rest of the registration form data (NFR-1.5, NFR-5.5).
5a. Accidental Form Closure or Page Reload:
  5a1. Administrator accidentally closes the form or reloads the page prior to completion (NFR-1.5).
  5a2. System recovers the automatically saved draft and prevents duplicate profile creation upon reload (NFR-1.5).
6a. Potential Duplicate Record Flagged:
  6a1. System's fuzzy matching algorithm detects an existing company with similar legal/commercial names or Tax ID (FR-1.4).
  6a2. System flags the potential duplicate and presents the matching record details to the Administrator for review prior to saving (FR-1.4).
  6a3. Administrator either cancels the registration to avoid duplication or explicitly confirms that the entity is distinct to resume at Step 7.
7a. Company Email Verification Fails:
  7a1. System detects an undeliverable or unverified company email address (FR-1.1).
  7a2. System marks the email status as unverified, alerts the Administrator (FR-4.2.2), and prompts for a corrected email address.