# Use Case Specification: UC-25

### 🏗️ Identification & Context
* **ID / Code:** UC-25
* **Use Case Name:** Request Account Cancellation
* **Description:** Allows a user responsible for a customer account to request the cancellation of that customer's subscription account. The request is sent to an Administrator for formal review (includes UC-23).
* **Primary Actor:** Base User (inherited by Administrator and Super-Administrator)
* **Scope:** Subscription Management & Invoicing System
* **Level:** User Goal

### 👥 Stakeholders & Triggers
* **Stakeholders & Interests:**
  * *Base User (account manager):* Wants to register the customer's cancellation request easily.
  * *Administrator:* Wants every cancellation to be reviewed before being applied (FR-5.3.1).
  * *Customer company:* Wants its cancellation to be processed.
* **Trigger:** The user selects "Request cancellation" on a customer account.

### 🛡️ Conditions & Guarantees
* **Preconditions:** The user is authenticated and has access to the customer account; the account is active and has no pending cancellation request.
* **Postconditions:** A cancellation request exists in "Pending Review" state.
* **Success Guarantee:** The request is stored with reason, requested effective date and requester, and the responsible Administrator is notified (FR-5.3.1).
* **Minimal Guarantee:** Billing continues normally until the request is approved (UC-26); duplicate requests are not created.
* **Trigger:** The user requests the cancellation.

### 🔄 Flows of Events

#### Main Success Scenario (Happy Path):
1. **User:** Requests the cancellation of a customer account.
2. **System:** Displays the cancellation form (reason, requested effective date, comments).
3. **User:** Fills in the form and submits it.
4. **System:** Validates the data and asks for confirmation.
5. **User:** Confirms.
6. **System:** Stores the request in "Pending Review" state and adds the event to the customer timeline.
7. **System:** **Includes UC-23** to notify an Administrator for formal review (FR-5.3.1).
8. **System:** Confirms to the user that the request has been sent.

#### Extensions (Alternative Flows):
* **1a. A cancellation request is already pending:**
  * 1a1. System shows the existing request and does not create a new one.
* **4a. Invalid data (e.g., effective date in the past):**
  * 4a1. System indicates the error; the flow resumes at step 3.
* **5a. User cancels:**
  * 5a1. No request is created.
