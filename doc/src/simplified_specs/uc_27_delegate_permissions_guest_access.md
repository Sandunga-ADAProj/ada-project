# Use Case Specification: UC-27

- **ID / Code:** UC-27
- **Use Case Name:** Delegate Permissions & Guest Access
- **Description:** Allows an Administrator to grant or revoke specific portal permissions for internal staff, temporarily delegate customer account management to another user for a set validity period, assign a substitute approver, and provision temporary minimum-privilege guest accounts for external roles (such as external accountants).
- **Primary Actor:** Administrator
- **Scope:** Subscription Management & Invoicing System (Access & Delegation Subsystem)
- **Level:** User Goal
- **Stakeholders & Interests:**
  - *Administrator:* Wants to seamlessly delegate client accounts during staff absences, assign substitute approvers, and grant scoped access to external accountants (UR-2.2, FR-7.2, FR-7.3, FR-7.4).
  - *Internal Staff / Substitute Approver:* Wants clear, time-bound access to delegated client accounts without losing track of the original assignment (FR-7.2, FR-7.3.1, FR-7.3.2).
  - *Company / Business:* Requires that temporary delegations automatically expire while preserving original assignment records, and that guest accounts are strictly restricted to minimum-privilege permissions (FR-7.3.2, FR-7.4, NFR-5.1).
- **Preconditions:** The Administrator has an active, authenticated session (UC-01), and the access management subsystem is online.
- **Postconditions:** Staff permissions, temporary account delegations, substitute approver assignments, or temporary guest accounts are updated and logged in the security audit trail.
- **Success Guarantee:** Portal permissions are granted/revoked accurately (UR-2.2), temporary delegations preserve the original assignment record and automatically terminate upon expiration (FR-7.3.1, FR-7.3.2), substitute approver reassignments are audited (FR-7.2), and guest accounts receive strict minimum-privilege access (FR-7.4).
- **Minimal Guarantee:** Deactivating an account immediately terminates all active user sessions for that user (FR-7.5.2), original account ownership records are never overwritten by temporary delegation (FR-7.3.2), and all permission changes are audited.
- **Trigger:** The Administrator selects the option to manage staff delegations, assign a substitute approver, or provision a guest account.
- **Main Success Scenario:**
1. Administrator accesses the permission delegation and access management interface (UR-2.2).
2. System displays internal staff members, current customer account assignments, active approvers, and external guest accounts.
3. Administrator selects one of the delegation operations:
   - Grants or revokes specific customer account or section permissions for an internal staff member (UR-2.2);
   - Temporarily delegates customer account management to another user for a specified start and expiration validity period (FR-7.3.1);
   - Assigns a substitute approver to cover for an unavailable primary approver (FR-7.2); or
   - Provisions a temporary guest user account with strict minimum-privilege permissions and an expiration date for an external role (e.g., external accountant) (FR-7.4).
4. Administrator submits the access configuration.
5. System validates the permission scope and expiration dates, preserves the original customer assignment record alongside any temporary delegation (FR-7.3.2), and schedules automatic termination upon expiration (FR-7.3.2).
6. System logs all permission changes, delegations, and substitute approver reassignments in the security audit trail (FR-7.2) and updates the customer timeline if account ownership changed (FR-6.7.2).
7. System confirms the delegation setup to the Administrator.

- **Extensions:**
3a. Administrator Deactivates a User or Guest Account:
  3a1. Administrator revokes access and deactivates an active internal user or guest account (FR-7.5.2).
  3a2. System immediately terminates all active sessions associated with that deactivated account (FR-7.5.2) and logs the revocation.
5a. Temporary Delegation Validity Period Expires:
  5a1. System detects that a temporary account delegation or guest account has reached its configured expiration timestamp (FR-7.3.2, FR-7.4).
  5a2. System automatically terminates the delegated permissions, restores sole management visibility to the original assigned user (FR-7.3.2), and logs the expiration event.