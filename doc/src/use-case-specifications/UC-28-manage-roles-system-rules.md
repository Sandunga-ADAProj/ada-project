# Use Case Specification: UC-28

* **ID / Code:** UC-28
* **Use Case Name:** Manage Roles & System Rules
* **Description:** Allows the Super-Administrator to define custom roles and permissions, and to modify system-wide configuration: business rules and workflows (e.g., approval thresholds, reminder intervals, session timeout, login block duration), business calendar and integration settings (banking API, Email/SMS gateway, simulated Stripe).
* **Primary Actor:** Super-Administrator
* **Scope:** Subscription Management & Invoicing System
* **Level:** User Goal
* **Stakeholders & Interests:**
  * *Super-Administrator:* Wants full control of roles, security and platform configuration (UR-3.1, UR-3.2, FR-7.1).
  * *All users:* Depend on correct roles and stable rules.
  * *Company (Product Owner):* Wants configuration changes to be controlled, auditable and separated from operational data (NFR-2.7).
* **Preconditions:** The actor is authenticated with the Super-Administrator role.
* **Postconditions:** New roles or configuration values are in force.
* **Success Guarantee:** Changes are validated, versioned and logged (user, timestamp, previous and new value), stored separately from operational data (NFR-2.7) and applied to subsequent operations; affected users' sessions reflect role changes.
* **Minimal Guarantee:** Invalid configurations are never applied; the system always keeps at least one active Super-Administrator; the previous configuration remains in force if saving fails; configuration rules defined here are enforced equally by the API and the interface (NFR-2.8).
* **Trigger:** The Super-Administrator selects "System administration".
* **Main Success Scenario:**
1. **Super-Administrator:** Requests to manage roles.
2. **System:** Displays existing roles and their permissions.
3. **Super-Administrator:** Creates or edits a role, selecting its permissions, and assigns it to users (FR-7.1).
4. **System:** Validates the role (unique name, consistent permissions).
5. **System:** Saves the role, applies it to the assigned users and logs the change.

* **Extensions:**
  * 1a. Manage system rules and workflows:
    * 1a1. System displays configurable rules: discount approval thresholds (FR-2.6.1), reminder intervals, inactivity timeout, failed-login block duration, cancellation workflow…
    * 1a2. Super-Administrator modifies values; System validates and saves them as a new configuration version.
    * 1a3. If validation fails: System indicates the invalid value and does not save (see also extension 4a).
  * 1b. Manage business calendar:
    * 1b1. Super-Administrator defines working days, weekends and regional holidays (FR-4.4.1), used by UC-19.
  * 1c. Manage integration settings:
    * 1c1. Super-Administrator updates banking API, Email/SMS gateway or simulated Stripe settings (NFR-2.10).
    * 1c2. System tests the connection before saving and shows the result.
      * 1c2a. Connection test fails:
        * 1c2a1. System warns the Super-Administrator and keeps the previous settings unless explicitly confirmed.
  * 4a. Invalid role or configuration:
    * 4a1. System indicates the error and does not save.
  * 5a. Change would leave the system without any active Super-Administrator:
    * 5a1. System blocks the change.
  * 5b. Role change affects users with active sessions:
    * 5b1. System immediately applies the updated role to those sessions; if permissions are reduced, any in-progress action requiring a revoked permission is rejected (FR-7.5.2).
