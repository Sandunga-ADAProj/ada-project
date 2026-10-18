# Use Case Specification: UC-27

* **ID / Code:** UC-27
* **Use Case Name:** Delegate Permissions & Guest Access
* **Description:** Allows an Administrator to grant or revoke portal permissions to staff members for specific customer accounts or sections, temporarily delegate account management, assign substitute approvers and provision temporary guest accounts with minimum privileges (e.g., external accountants).
* **Primary Actor:** Administrator
* **Scope:** Subscription Management & Invoicing System
* **Level:** User Goal
* **Stakeholders & Interests:**
  * *Administrator:* Wants to organize who manages which customers and cover absences (UR-2.2, FR-7.2, FR-7.3).
  * *Staff member / delegate:* Wants the access needed to do their work, only for the required time.
  * *External accountant (guest):* Needs temporary, read-limited access (FR-7.4).
  * *Company (Product Owner):* Wants the principle of least privilege and full traceability.
* **Preconditions:** The Administrator is authenticated and has permission management rights; roles are defined (UC-28).
* **Postconditions:** Permissions, delegations, substitute approvers or guest accounts are updated.
* **Success Guarantee:** Changes are applied immediately, logged in the audit trail (FR-7.2), preserve the original assignment (FR-7.3.2) and temporary access ends automatically on expiry.
* **Minimal Guarantee:** An Administrator cannot grant permissions higher than their own; guest accounts never receive more than the minimum required privileges (FR-7.4).
* **Trigger:** The Administrator selects "Permissions & delegation".
* **Main Success Scenario:**
1. **Administrator:** Requests to manage permissions.
2. **System:** Displays staff members, their roles, assigned customer accounts/sections and active delegations.
3. **Administrator:** Selects a staff member and grants or revokes permissions for specific customer accounts or sections.
4. **System:** Validates that the permissions do not exceed the Administrator's own.
5. **System:** Applies the changes and records them in the audit trail.

* **Extensions:**
  * 3a. Temporary delegation of a customer account:
    * 3a1. Administrator selects account, delegate and validity period.
    * 3a2. System creates the delegation preserving the original assignment and schedules its automatic termination (FR-7.3).
  * 3b. Assign substitute approver:
    * 3b1. Administrator selects the primary approver, substitute and period.
    * 3b2. System routes approvals (UC-10) to the substitute during that period and logs the reassignment (FR-7.2).
  * 3c. Create temporary guest account:
    * 3c1. Administrator enters guest email, minimum-privilege profile and expiry date.
    * 3c2. System creates the account and sends the invitation (UC-23); it expires automatically (FR-7.4).
  * 3d. Revoke access / deactivate user:
    * 3d1. System immediately terminates the user's active sessions (FR-7.5.2).
  * 4a. Permissions exceed the Administrator's level:
    * 4a1. System blocks the change and informs that a Super-Administrator is required (UC-28).
