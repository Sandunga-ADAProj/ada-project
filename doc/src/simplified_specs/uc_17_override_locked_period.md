# Use Case Specification: UC-17

- **ID / Code:** UC-17
- **Use Case Name:** Override Locked Period
- **Description:** Allows a Super-Administrator to grant an explicit, audited exception to create, edit, or delete an invoice within an administratively closed financial period (`UC-16`).
- **Primary Actor:** Super-Administrator
- **Scope:** Subscription Management & Invoicing System (Accounting & Security Layer)
- **Level:** User Goal (Extending Use Case)
- **Stakeholders & Interests:**
  - *Super-Administrator:* Needs an emergency mechanism to correct critical accounting errors in a closed period while maintaining full audit accountability (UR-3.1, FR-2.7).
  - *External Accountant / Auditor:* Requires an immutable audit log entry detailing who overrode the locked period, when, why, and whether an accounting export package needs regeneration (FR-2.7, FR-6.3.2).
- **Preconditions:** The Super-Administrator has an active, authenticated session (UC-01), and the target financial period is currently marked as administratively closed (`UC-16`).
- **Postconditions:** The specific invoice operation is permitted within the locked period, an explicit exception record is written to the security audit trail, and any affected accounting export period is flagged for versioned regeneration.
- **Success Guarantee:** The authorized invoice modification is completed within the closed period, and a comprehensive audit log entry records the Super-Administrator's identity, timestamp, justification, and modified data (FR-2.7).
- **Minimal Guarantee:** Standard Users and Administrators can never execute this override (FR-2.7), and no override can occur without recording a mandatory audit trail entry.
- **Trigger:** The Super-Administrator invokes the `period locked` extension point during **UC-14: Manage Ad-Hoc & Test Invoices** (or related invoice modification) when targeting a closed financial period.
- **Main Success Scenario:**
1. System detects an attempt to create, edit, or delete an invoice within an administratively closed financial period and blocks the standard flow (`UC-14`) (FR-2.7).
2. Super-Administrator requests to apply an explicit administrative override exception for the locked period (FR-2.7).
3. System verifies the actor holds Super-Administrator privileges (UR-3.1, FR-2.7) and prompts for a mandatory audit justification and confirmation of the legally sensitive action (NFR-1.5).
4. Super-Administrator enters the formal justification and confirms the override.
5. System temporarily unlocks the transaction scope for this single operation, records an explicit exception entry in the immutable audit log (FR-2.7), and flags the financial period so any subsequent accounting export package will receive a new version identifier and visual correction marker (FR-6.3.2).
6. System returns control to **UC-14: Manage Ad-Hoc & Test Invoices** to complete the invoice operation.

- **Extensions:**
3a. Actor Lacks Super-Administrator Privileges:
  3a1. System detects that the user is a Base User or standard Administrator (FR-2.7).
  3a2. System denies the override request and maintains the period lock block (FR-2.7).