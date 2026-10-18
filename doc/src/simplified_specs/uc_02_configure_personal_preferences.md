# Use Case Specification: UC-02

- **ID / Code:** UC-02
- **Use Case Name:** Configure Personal Preferences
- **Description:** Enables an authenticated Base User to customize personal interface preferences, accessibility settings, and bookmarked entities without altering global system behavior or operational business rules.
- **Primary Actor:** Base User
- **Scope:** Subscription Management & Invoicing System
- **Level:** User Goal
- **Stakeholders & Interests:**
  - *Base User:* Wants to tailor visual accessibility options and bookmark frequently accessed entities for rapid daily workflow retrieval (UR-1.3, FR-6.7.1, NFR-1.7).
  - *Super-Administrator:* Wants to ensure personal preference adjustments remain strictly isolated from global system configurations and core business behavior (UR-1.3, NFR-2.7).
- **Preconditions:** The Base User has an active, authenticated session (UC-01), and the user profile subsystem is online.
- **Postconditions:** The user's personal preference profile and entity bookmarks are updated and persisted in the database.
- **Success Guarantee:** Personal accessibility settings and bookmarked entities are saved and applied immediately to the user's interface while global system behavior remains untouched (UR-1.3, NFR-2.7).
- **Minimal Guarantee:** Global configuration and operational data remain strictly separated (NFR-2.7). No corrupted preference states or unauthorized behavioral changes are persisted under any scenario.
- **Trigger:** The Base User selects the option to manage personal preferences or bookmark an entity.
- **Main Success Scenario:**
1. Base User requests to view and modify their personal preferences (UR-1.3).
2. System retrieves and displays the user's current accessibility configurations, display settings, and bookmarked favorite entities (FR-6.7.1).
3. Base User modifies their accessibility options (such as contrast, keyboard navigation aids, or label preferences) and updates their bookmarked entities (UR-1.3, FR-6.7.1, NFR-1.7).
4. Base User confirms the preference changes.
5. System validates that the requested modifications only affect user-level presentation and do not alter system behavior or global configurations (UR-1.3, NFR-2.7).
6. System persists the updated personal preferences to the user's profile record.
7. System applies the new interface settings and confirms the update to the Base User.

- **Extensions:**
3a. Base User Attempts to Modify Global System Behavior:
  3a1. System detects an attempt to alter restricted global workflow or behavioral parameters (UR-1.3).
  3a2. System blocks the action and informs the Base User that only Super-Administrators can modify system behavior (UR-1.3).
4a. Accidental Form Closure Before Saving:
  4a1. System automatically saves a draft of the modified preference form upon accidental closure so progress is not lost (NFR-1.5).