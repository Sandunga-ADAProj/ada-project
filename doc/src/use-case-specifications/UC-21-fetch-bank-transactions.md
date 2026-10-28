# Use Case Specification: UC-21

* **ID / Code:** UC-21
* **Use Case Name:** Fetch Bank Transactions
* **Description:** Subfunction included by UC-20 that connects to the external Banking API (or simulated Stripe payment environment) to retrieve new incoming transactions since the last successful synchronization (FR-3.1, FR-3.4).
* **Primary Actor:** None (included use case). Supporting actor: Banking API
* **Scope:** Subscription Management & Invoicing System
* **Level:** Subfunction
* **Stakeholders & Interests:**
  * *Company (Product Owner):* Wants reliable, complete transaction data from banking APIs or test payment environments (FR-3.1, FR-3.4, NFR-2.2).
  * *Bank / Payment Provider:* Requires secure, authenticated API usage.
* **Preconditions:** Bank integration or simulated Stripe credentials and settings are configured (FR-3.1, FR-3.4, UC-28).
* **Postconditions:** New transactions are stored for reconciliation and the synchronization checkpoint is updated.
* **Success Guarantee:** All transactions since the last checkpoint are retrieved and stored without loss or duplication (NFR-2.2).
* **Minimal Guarantee:** If retrieval fails, the checkpoint is not advanced, so no transaction is lost.
* **Trigger:** Invocation from UC-20.
* **Main Success Scenario:**
1. **System:** Requests from the **Banking API** (or simulated Stripe service, FR-3.4) the transactions since the last synchronization checkpoint.
2. **Banking API:** Returns the list of transactions.
3. **System:** Validates the response format and discards transactions already stored.
4. **System:** Stores the new transactions in "pending reconciliation" state and updates the checkpoint.
5. **System:** Returns control to UC-20.

* **Extensions:**
  * 2a. Banking API or payment service unavailable, timeout or authentication error:
    * 2a1. System retries according to the configured policy.
    * 2a2. If it keeps failing, System logs the error, keeps the checkpoint unchanged and reports the failure to UC-20.
  * 3a. Malformed or incomplete response:
    * 3a1. System rejects the batch, logs it and reports an integration error.
