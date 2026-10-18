# Use Case Specification: UC-17

* **ID / Code:** UC-17
* **Use Case Name:** Override Locked Period
* **Description:** Extends UC-14 when an invoice operation targets a locked financial period: a Super-Administrator grants an explicit, justified and audited exception allowing that specific operation.
* **Primary Actor:** Super-Administrator
* **Scope:** Subscription Management & Invoicing System
* **Level:** User Goal (extends UC-14 at extension point *period locked*)
* **Stakeholders & Interests:**
  * *Super-Administrator:* Wants to correct exceptional errors in closed periods in a controlled way.
  * *Administrator:* Needs the correction to be possible without reopening the whole period.
  * *External accounting service / Auditor:* Need every change in a closed period to be justified and visible; a new export version must be generated (FR-6.3.2).
* **Preconditions:** The target period is locked (UC-16); the actor has the Super-Administrator role.
* **Postconditions:** A one-time, audited exception exists for the specific operation, or the request is rejected.
* **Success Guarantee:** Only the requested operation is allowed in the locked period; the override is logged with user, timestamp, justification and affected invoice; affected accounting packages are marked as requiring regeneration (FR-6.3.2).
* **Minimal Guarantee:** The period stays locked for any other operation; no override is applied without justification.
* **Trigger:** An operation in UC-14 is blocked because the period is locked and an override is requested.
* **Main Success Scenario:**
1. **Super-Administrator:** Opens the override request generated from UC-14.
2. **System:** Displays the locked period, the requested operation, the affected invoice and the requesting Administrator.
3. **Super-Administrator:** Enters a mandatory justification and authorizes the override.
4. **System:** Grants a one-time exception limited to that operation and invoice, and records it in the audit trail.
5. **System:** Allows the operation to be completed in UC-14.
6. **System:** Marks the accounting packages of that period as outdated so that a new version is generated (UC-18, FR-6.3.2) and notifies the requesting Administrator.

* **Extensions:**
  * 3a. Super-Administrator rejects the override:
    * 3a1. System records the rejection and the reason and notifies the requester; the UC-14 operation is cancelled.
  * 3b. Justification is empty:
    * 3b1. System does not allow the override to be authorized.
