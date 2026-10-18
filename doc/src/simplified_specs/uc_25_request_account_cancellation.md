# Use Case Specification: UC-25

- **ID / Code:** UC-25
- **Use Case Name:** Request Account Cancellation
- **Description:** Allows an authenticated Base User (or Administrator) to submit a formal request to cancel a customer company's subscription account, automatically invoking `UC-23: Send Automated Notifications` to alert an Administrator for formal review and approval (`UC-26`).
- **Primary Actor:** Base User (inherited by Administrator and Super-Administrator)
- **Scope:** Subscription Management & Invoicing System (Account Lifecycle Subsystem)
- **Level:** User Goal
- **Stakeholders & Interests:**
  - *Base User:* Wants a clear, structured way to initiate a client cancellation request when a customer decides to terminate their subscription (FR-5.3.1).
  - *Administrator:* Wants immediate notification of any cancellation request so they can review outstanding financial obligations before the account is terminated (FR-5.3.1, FR-5.3.2).
  - *Company / Business:* Wants to prevent unauthorized or accidental immediate cancellations by enforcing a formal approval workflow (FR-5.3.1).
- **Preconditions:** The Base User has an active, authenticated session (UC-01), and the target customer account is currently active.
- **Postconditions:** A cancellation request is recorded in "Pending Cancellation Approval" status, the customer timeline is updated, and an Administrator is notified via `UC-23`.
- **Success Guarantee:** The cancellation request is logged, **UC-23: Send Automated Notifications** dispatches a review alert to the designated Administrator (FR-5.3.1), and the request appears on the Administrator's centralized dashboard (FR-6.2).
- **Minimal Guarantee:** Requesting a cancellation never terminates billing prematurely prior to formal Administrator approval (FR-5.3.1).
- **Trigger:** The Base User selects an active customer account and initiates an account cancellation request.
- **Main Success Scenario:**
1. Base User selects an active customer profile within their assigned scope (UR-1.2) and requests an account cancellation (FR-5.3.1).
2. System displays a cancellation request form and warns the user that the request requires formal Administrator approval (FR-5.3.1, NFR-1.5).
3. Base User enters the cancellation reason, requested effective date, and supporting notes, then submits the request.
4. System validates the input and places the customer account in a "Pending Cancellation Approval" state (FR-5.3.1).
5. System appends the cancellation request event to the customer chronological timeline (FR-6.7.2) and surfaces the item on the Administrator's centralized dashboard (FR-6.2).
6. System automatically executes **UC-23: Send Automated Notifications** (`<<include>>`) to notify the Administrator (or assigned Substitute Approver, FR-7.2) for formal review and approval (FR-5.3.1).
7. System displays a confirmation message to the Base User indicating that the request is pending Administrator approval.

- **Extensions:**
1a. Unauthorized Account Access Attempt (IDOR):
  1a1. Base User attempts to request cancellation for a customer outside their assigned client scope (UR-1.2, NFR-5.6).
  1a2. System rejects the request and logs the security violation (NFR-5.6).