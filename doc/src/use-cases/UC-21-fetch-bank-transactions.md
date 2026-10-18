# Use Case Specification: UC-21

### 🏗️ Identification & Context
* **ID / Code:** UC-21
* **Use Case Name:** Fetch Bank Transactions
* **Description:** Subfunction included by UC-20 that connects to the external Banking API to retrieve new incoming transactions since the last successful synchronization.
* **Primary Actor:** None (included use case)
* **Supporting Actor:** Banking API
* **Scope:** Subscription Management & Invoicing System
* **Level:** Subfunction

### 👥 Stakeholders & Triggers
* **Stakeholders & Interests:**
  * *Company (Product Owner):* Wants reliable, complete transaction data (FR-3.1, NFR-2.2).
  * *Bank:* Requires secure, authenticated API usage.
* **Trigger:** Invocation from UC-20.

### 🛡️ Conditions & Guarantees
* **Preconditions:** Bank integration credentials and settings are configured (UC-28).
* **Postconditions:** New transactions are stored for reconciliation and the synchronization checkpoint is updated.
* **Success Guarantee:** All transactions since the last checkpoint are retrieved and stored without loss or duplication (NFR-2.2).
* **Minimal Guarantee:** If retrieval fails, the checkpoint is not advanced, so no transaction is lost.
* **Trigger:** UC-20 requests transactions.

### 🔄 Flows of Events

#### Main Success Scenario (Happy Path):
1. **System:** Requests from the **Banking API** the transactions since the last synchronization checkpoint.
2. **Banking API:** Returns the list of transactions.
3. **System:** Validates the response format and discards transactions already stored.
4. **System:** Stores the new transactions in "pending reconciliation" state and updates the checkpoint.
5. **System:** Returns control to UC-20.

#### Extensions (Alternative Flows):
* **2a. Banking API unavailable, timeout or authentication error:**
  * 2a1. System retries according to the configured policy.
  * 2a2. If it keeps failing, System logs the error, keeps the checkpoint unchanged and reports the failure to UC-20.
* **3a. Malformed or incomplete response:**
  * 3a1. System rejects the batch, logs it and reports an integration error.
