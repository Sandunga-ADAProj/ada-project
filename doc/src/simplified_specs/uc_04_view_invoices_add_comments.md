# Use Case Specification: UC-04

- **ID / Code:** UC-04
- **Use Case Name:** View Invoices & Add Comments
- **Description:** Allows an authenticated Base User to view, download, and track the real-time status of invoices for their assigned clients, attach supporting files, and collaborate via contextual comments and `@mentions`.
- **Primary Actor:** Base User
- **Scope:** Subscription Management & Invoicing System
- **Level:** User Goal
- **Stakeholders & Interests:**
  - *Base User:* Wants to track invoice lifecycle states, download compliant PDFs, attach supporting documentation, and collaborate with colleagues directly on invoice records (UR-1.2, FR-2.2.3, FR-2.4, FR-2.8).
  - *Internal Colleague (Mentioned User):* Wants immediate targeted notifications when `@mentioned` on an invoice requiring their attention (FR-2.8).
  - *Company / Business:* Wants to prevent unstructured general chat while maintaining secure, virus-free documentation on financial records (FR-2.8, NFR-5.5).
- **Preconditions:** The Base User has an active, authenticated session (UC-01), and the invoicing subsystem is online.
- **Postconditions:** Any new contextual comments, `@mention` notifications, or validated file attachments are linked to the invoice record and persisted.
- **Success Guarantee:** The user views accurate real-time invoice lifecycle statuses ("draft", "ready to issue", "issued", "sent", "overdue", "paid", "partially reconciled") (FR-2.4), downloads properly encoded PDFs (NFR-2.6), and posts contextual comments that trigger targeted `@mention` alerts (FR-2.8).
- **Minimal Guarantee:** Unstructured chat is blocked (FR-2.8), malicious file uploads are rejected without execution (NFR-5.5), and unauthorized access to unassigned invoices is prevented (NFR-5.6).
- **Trigger:** The Base User selects an invoice record to inspect, download, attach files, or comment on.
- **Main Success Scenario:**
1. Base User selects an invoice from their assigned client list to view details (UR-1.2).
2. System verifies the user's authorization for the target invoice (NFR-5.6) and displays the invoice breakdown, sequential number, itemized VAT calculations, current lifecycle state, and existing contextual comments (FR-2.2.2, FR-2.4, FR-2.8).
3. Base User optionally requests to download the invoice PDF or attach a supporting document (UR-1.2, FR-2.2.3).
4. System scans any uploaded attachment for security threats (NFR-5.5), links the valid file to the invoice record (FR-2.2.3), or generates the downloadable PDF with intact character encoding for accents and foreign names (NFR-2.6).
5. Base User enters a contextual comment on the invoice record and includes an `@mention` referencing another internal user (FR-2.8).
6. System validates that the comment is bound to the specific invoice context (FR-2.8) and saves the comment with a timestamp.
7. System dispatches a targeted notification to the `@mentioned` internal user (FR-2.8) and updates the invoice collaboration thread in real time (NFR-4.1).

- **Extensions:**
1a. Unauthorized Invoice URL Access (IDOR):
  1a1. System detects that the requested invoice does not belong to the Base User's assigned clients or sections (UR-1.2, NFR-5.6).
  1a2. System rejects the request and displays an access denied message (NFR-5.6).
4a. Malicious File Upload Detected:
  4a1. System detects a dangerous or malicious file during the attachment upload scan (NFR-5.5).
  4a2. System refuses to open or store the file, aborts the upload, and displays a clear security error message to the Base User (NFR-5.5).
4b. Bulk / Mass Download Detected:
  4b1. System detects that the user is performing a mass download of invoice records (FR-6.4.2).
  4b2. System logs the export metadata (timestamp, filters, user) and triggers an immediate administrative alert (FR-6.4.1, FR-6.4.2).