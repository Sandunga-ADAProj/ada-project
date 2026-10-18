# Use Case Specification: UC-28

- **ID / Code:** UC-28
- **Use Case Name:** Manage Roles & System Rules
- **Description:** Allows a Super-Administrator to define and assign custom roles and fine-grained system-wide security permissions, configure session timeout and lockout rules, and modify operational workflows, business rules, and external integration settings.
- **Primary Actor:** Super-Administrator
- **Scope:** Subscription Management & Invoicing System (Core Administration & Security Layer)
- **Level:** User Goal
- **Stakeholders & Interests:**
  - *Super-Administrator:* Wants full administrative control over custom roles, security policies (session timeouts, lockout durations), operational workflows, and integration settings (UR-3.1, UR-3.2, FR-7.1, FR-7.5).
  - *Company / Business:* Requires strict separation between global configuration and operational data (NFR-2.7), full parity between API rules and UI rules (NFR-2.8), and modular extensibility for payment methods and billing frequencies (NFR-2.3).
- **Preconditions:** The Super-Administrator has an active, authenticated session (UC-01), and the core administration subsystem is online.
- **Postconditions:** Custom roles, security parameters, operational business rules, or integration settings are updated across both UI and API layers, and the changes are recorded in the system audit log.
- **Success Guarantee:** Custom roles and permissions are defined and assigned (UR-3.1, FR-7.1), session security parameters (e.g., 10-minute inactivity timeout, 3-strike lockout duration) are updated (FR-7.5.1, FR-7.5.3), workflow/integration settings are persisted (UR-3.2, NFR-2.3), and all rules are enforced equally across the UI and API (NFR-2.8).
- **Minimal Guarantee:** Global configuration changes remain strictly separated from operational data (NFR-2.7), API endpoints can never bypass UI business rules (NFR-2.8), and deactivating or stripping privileges from a user immediately invalidates affected active sessions (FR-7.5.2).
- **Trigger:** The Super-Administrator accesses the global role and system rules administration console.
- **Main Success Scenario:**
1. Super-Administrator requests to manage global roles, security policies, and system rules (UR-3.1, UR-3.2).
2. System verifies Super-Administrator privileges and displays the global configuration console, separated from operational data (NFR-2.7).
3. Super-Administrator defines custom roles, fine-tunes granular permission matrices, and assigns roles to internal users (UR-3.1, FR-7.1).
4. Super-Administrator configures session security controls, including the inactivity auto-termination duration (e.g., 10 minutes) and the temporary lockout duration (e.g., 5 minutes) after three consecutive failed login attempts (FR-7.5.1, FR-7.5.3).
5. Super-Administrator modifies operational workflows, business rules, or external system integration settings (such as Banking APIs, CSV processors, or simulated Stripe parameters) (UR-3.2, NFR-2.3, NFR-2.10).
6. Super-Administrator confirms the global configuration updates.
7. System validates the rules, applies them synchronously across both the user interface and API enforcement layers (NFR-2.8), persists the configuration, and records a detailed entry in the administrative audit trail.
8. System confirms the global update to the Super-Administrator.

- **Extensions:**
3a. Super-Administrator Deactivates an Account or Revokes Active Role Privileges:
  3a1. Super-Administrator deactivates a user account or removes critical access permissions from a currently logged-in user (FR-7.5.2).
  3a2. System immediately terminates the user's active session(s) (FR-7.5.2) to enforce the updated security posture instantaneously.
6a. Configuration Conflict Detected:
  6a1. System detects a logical conflict in custom role permissions or workflow rules.
  6a2. System blocks the save operation, highlights the conflicting rule, and prompts the Super-Administrator to resolve the conflict while preserving all other form changes (NFR-1.5).