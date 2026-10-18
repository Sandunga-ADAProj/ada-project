# Use Case Specification: UC-02

* **ID / Code:** UC-02
* **Use Case Name:** Configure Personal Preferences
* **Description:** Allows a user to configure their personal display and accessibility preferences (e.g., language, theme, font size, contrast, default filters), without affecting the global behaviour of the system.
* **Primary Actor:** Base User (inherited by Administrator and Super-Administrator)
* **Scope:** Subscription Management & Invoicing System
* **Level:** User Goal
* **Stakeholders & Interests:**
  * *Base User:* Wants to adapt the interface to their needs and accessibility requirements (UR-1.3, NFR-1.7).
  * *Super-Administrator:* Wants to guarantee that personal preferences never alter system-wide configuration, which only they can change (UR-1.3, NFR-2.7).
* **Preconditions:** The user is authenticated (UC-01).
* **Postconditions:** The user's preferences are stored and applied to their own sessions.
* **Success Guarantee:** The new preferences are saved in the user's profile and applied immediately to the interface.
* **Minimal Guarantee:** Global system configuration remains unchanged under any scenario; if saving fails, the previous preferences remain in force.
* **Trigger:** The user selects "Preferences" in their profile menu.
* **Main Success Scenario:**
1. **User:** Requests to configure personal preferences.
2. **System:** Displays the current preference values (language, theme, contrast, font size, default views and notification display options).
3. **User:** Modifies one or more preferences and saves the changes.
4. **System:** Validates the selected values.
5. **System:** Stores the preferences in the user's profile, separately from the global configuration (NFR-2.7).
6. **System:** Applies the new preferences to the interface and shows a confirmation message.

* **Extensions:**
  * 3a. User cancels the operation:
    * 3a1. System discards the changes and keeps the previous preferences.
  * 4a. Invalid or unsupported value:
    * 4a1. System indicates which option is not valid and keeps the rest of the form data.
    * 4a2. The flow resumes at step 3.
  * 4b. The user tries to modify an option that affects system behaviour:
    * 4b1. System does not show or does not allow editing that option, since it is reserved to Super-Administrators (UC-28).
