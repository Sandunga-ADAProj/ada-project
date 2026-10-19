# Use Case Specification: UC-09

* **ID / Code:** UC-09
* **Use Case Name:** Propose Commercial Exception
* **Description:** Allows an authorized user to propose non-standard commercial conditions for a customer subscription (temporary volume discount, free period, custom price, or waiving the initial prorated charge to defer billing to the following month), which then enter an approval workflow. It extends UC-08 at the extension point *commercial exception* and can also be started directly by a Base User on an existing subscription.
* **Primary Actor:** Base User (inherited by Administrator and Super-Administrator)
* **Scope:** Subscription Management & Invoicing System
* **Level:** User Goal (extends UC-08)
* **Stakeholders & Interests:**
  * *Base User (account manager):* Wants to propose non-standard commercial conditions for a customer customers (FR-2.6.2).
  * *Administrator / Super-Administrator:* Want every financial deviation to be controlled and approved (FR-2.6.3).
  * *Company (Product Owner):* Wants full traceability of price changes (FR-2.6.4).
* **Preconditions:** The user is authenticated and has permission to manage the customer's account; the customer has a subscription (existing or being set up in UC-08).
* **Postconditions:** A commercial exception proposal exists in "Pending Approval" state, assigned to the appropriate approver.
* **Success Guarantee:** The proposal is stored in Pending Approval state and routed to an Administrator or Super-Administrator according to the configured approval thresholds (FR-2.6.3).
* **Minimal Guarantee:** The exception has no effect on billing until it is approved (UC-10).
* **Trigger:** A commercial exception is requested while setting up a subscription (UC-08) or the user selects "Propose exception" on an existing subscription.
* **Main Success Scenario:**
1. **User:** Requests to propose a commercial exception for a subscription.
2. **System:** Displays the exception types: temporary volume discount, free period, custom pricing, or waiving the initial prorated charge (FR-2.6.2).
3. **User:** Selects the type, enters the value (amount or percentage), validity period and justification, and submits.
4. **System:** Validates the entered exception data.
5. **System:** Determines the required approver level (Administrator or Super-Administrator) according to the configured discount thresholds (FR-2.6.3).
6. **System:** Stores the proposal in "Pending Approval" state and routes it to the required approver or substitute approver when applicable (FR-7.2).
7. **System:** Confirms to the user that the proposal has been submitted.

* **Extensions:**
  * 4a. Invalid data (e.g., discount over 100 %, end date before start date):
    * 4a1. System indicates the errors; the flow resumes at step 3.
  UC-10.
  * 6a. Primary approver unavailable:
    * 6a1. System routes the proposal to the substitute approver configured in UC-27 (FR-7.2).
