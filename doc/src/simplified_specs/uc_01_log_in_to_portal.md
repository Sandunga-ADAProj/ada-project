# Use Case Specification: UC-01

- **ID / Code:** UC-01
- **Use Case Name:** Log In to Portal
- **Description:** Allows an internal employee (Base User, Administrator, or Super-Administrator) to securely authenticate into the portal using their verified corporate email address and password, establishing an active, time-bound session.
- **Primary Actor:** Base User (inherited by Administrator and Super-Administrator)
- **Scope:** Subscription Management & Invoicing System (Core Security Layer)
- **Level:** User Goal
- **Stakeholders & Interests:**
  - *Base User:* Wants rapid, frictionless access to assigned client records and invoicing tools (UR-1.1, NFR-1.1).
  - *Super-Administrator:* Wants to enforce strict access controls, prevent unauthorized entry, and ensure inactive sessions terminate automatically (UR-3.1, FR-7.5).
  - *Company / Business:* Wants to protect sensitive customer and financial data in compliance with data privacy regulations (NFR-5.1).
- **Preconditions:** The authentication subsystem is online, the internal database is operational, and the user interface is accessible to the client.
- **Postconditions:** An authenticated, encrypted user session is established, or the failed login attempt counter is incremented and logged.
- **Success Guarantee:** The user's credentials are verified, an isolated session token is generated with an automatic 10-minute inactivity timeout (FR-7.5.1), and the user is granted access according to their assigned role permissions.
- **Minimal Guarantee:** System access remains strictly locked to unauthenticated clients. Database transactional integrity and credential confidentiality (NFR-5.1) are preserved, and all failed authorization attempts are recorded in the security audit log under any completion or failure scenario.
- **Trigger:** The Base User requests to access the portal login interface.
- **Main Success Scenario:**
1. Base User requests to log into the portal (UR-1.1).
2. System prompts the Base User to enter their corporate email address and password.
3. Base User enters their credentials and submits the authentication request.
4. System validates that the input fields comply with baseline syntax and accessibility standards (NFR-1.7).
5. System encrypts the credentials in transit (NFR-5.1), queries the internal user database, and verifies that the account is active and the password hash matches the stored record.
6. System generates an authenticated session token configured to terminate automatically after a configurable period of inactivity, such as 10 minutes (FR-7.5.1).
7. System loads the user's role-based permissions and grants access to the portal dashboard.

- **Extensions:**
4a. Invalid Email Syntax or Blank Fields:
  4a1. System flags the specific input fields violating format rules (NFR-1.7).
  4a2. System prompts the Base User to correct the errors while preserving the entered email string.
5a. Mismatched Credentials (Invalid Email or Incorrect Password):
  5a1. System halts session generation logic.
  5a2. System increments the consecutive failed login attempt counter for the target profile.
  5a3. System displays a generic, secure error notification without revealing which field was incorrect.
5b. Three Consecutive Failed Login Attempts:
  5b1. System detects that the user profile has reached three consecutive failed authentication attempts (FR-7.5.3).
  5b2. System temporarily blocks further authentication attempts for that account for a set duration (e.g., 5 minutes) (FR-7.5.3).
  5b3. System logs the security lockout event and informs the Base User that login is temporarily suspended.
5c. Administrative Account Deactivated:
  5c1. System detects that the user account has been administratively deactivated (FR-7.5.2).
  5c2. System denies access, terminates any residual session tokens immediately (FR-7.5.2), and informs the user to contact an Administrator.