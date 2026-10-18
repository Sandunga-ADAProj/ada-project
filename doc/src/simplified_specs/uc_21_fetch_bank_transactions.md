# Use Case Specification: UC-21

- **ID / Code:** UC-21
- **Use Case Name:** Fetch Bank Transactions
- **Description:** A subfunction that integrates with external financial institutions, banking APIs, and the simulated Stripe environment to securely pull incoming transaction data for payment verification.
- **Primary Actor:** System Scheduler (via `UC-20`)
- **Supporting Actor:** Banking API (`<<System>>`)
- **Scope:** Subscription Management & Invoicing System (External Banking Integration Layer)
- **Level:** Subfunction
- **Stakeholders & Interests:**
  - *Administrator:* Wants reliable transaction ingestion within the 1-minute speed threshold and immediate alerts if bank integration errors occur (FR-3.1, FR-4.2.2, NFR-1.3, NFR-2.9).
  - *Company / Business:* Wants modular integration supporting banking APIs, CSV imports, and a simulated Stripe environment without data loss or corruption (FR-3.1, NFR-2.2, NFR-2.3, NFR-2.10).
- **Preconditions:** The calling parent use case (`UC-20: Reconcile Bank Payments`) is active, and banking API credentials are configured.
- **Postconditions:** Validated raw transaction records are ingested into the staging queue and returned to `UC-20`, or integration errors are logged and alerted.
- **Success Guarantee:** Transaction payloads are securely fetched from the Banking API / simulated Stripe environment (FR-3.1, NFR-2.10), verified for data integrity and decimal precision (NFR-2.2, NFR-2.5), and passed to `UC-20`.
- **Minimal Guarantee:** Corrupted or incomplete banking payloads are rejected without altering internal financial records (NFR-2.2), and any integration failures are logged on the System Health dashboard and alerted to Administrators (FR-4.2.2, NFR-2.9).
- **Trigger:** Automatically invoked via mandatory inclusion (`<<include>>`) by **UC-20: Reconcile Bank Payments**.
- **Main Success Scenario:**
1. System opens an encrypted connection (NFR-5.1) to the external **Banking API** / simulated Stripe environment (FR-3.1, NFR-2.10).
2. System requests all new settled transactions since the last successful synchronization timestamp.
3. **Banking API** returns the transaction payload containing transaction IDs, reference strings, decimal amounts, currencies, timestamps, and payer metadata.
4. System validates the payload integrity, character encoding (NFR-2.6), and exact decimal precision (NFR-2.2, NFR-2.5).
5. System stores the ingested transactions in the reconciliation staging table, updates the System Health dashboard integration status (NFR-2.9), and returns the transaction list to **UC-20: Reconcile Bank Payments**.

- **Extensions:**
1a. Banking API Unreachable or Integration Error:
  1a1. System detects a network timeout, authentication failure, or malformed response from the **Banking API** (FR-4.2.2).
  1a2. System aborts the fetch attempt, logs the error on the System Health dashboard (NFR-2.9), and dispatches an immediate alert to the Administrator regarding the bank integration error (FR-4.2.2).