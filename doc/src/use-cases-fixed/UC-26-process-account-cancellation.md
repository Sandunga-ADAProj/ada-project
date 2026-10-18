# Use Case Specification: UC-26

* **ID / Code:** UC-26
* **Use Case Name:** Process Account Cancellation
* **Description:** Allows an Administrator to review and approve or reject a cancellation request. When approved, recurring billing is frozen while overdue reminders for outstanding invoices persist and historical records are retained.
* **Primary Actor:** Administrator
* **Scope:** Subscription Management & Invoicing System
* **Level:** User Goal
* **Stakeholders & Interests:**
  * *Administrator:* Wants to see outstanding obligations before deciding (FR-5.3.2).
  * *Company (Product Owner):* Wants to stop billing cancelled customers but keep collecting outstanding debt (FR-5.1, FR-5.2).
  * *Customer company:* Wants no new invoices after cancellation.
  * *Tax authority:* Requires statutory retention of invoices (FR-5.4).
* **Preconditions:** A cancellation request exists in "Pending Review" state (UC-25).
* **Postconditions:** The account is "Cancelled" (approved) or remains active (rejected).
* **Success Guarantee:** On approval, no new recurring invoices are generated from the effective date (FR-5.1); overdue notifications for outstanding invoices continue (FR-5.2); historical data and invoices are retained (FR-5.4); the requester is notified and the event is recorded in the timeline.
* **Minimal Guarantee:** Outstanding invoices and historical records are never deleted; the review screen shows only the minimum authorized account details (FR-5.3.2).
* **Trigger:** The Administrator opens a pending cancellation request (notification from UC-25 or dashboard).
* **Main Success Scenario:**
1. **Administrator:** Opens a pending cancellation request.
2. **System:** Displays the request and the account's outstanding financial obligations (pending/overdue invoices and balance), showing only the minimum authorized account details (FR-5.3.2).
3. **Administrator:** Approves the cancellation and confirms the effective date.
4. **System:** Warns about the consequences and asks for confirmation (NFR-1.5).
5. **Administrator:** Confirms.
6. **System:** Marks the account as "Cancelled" from the effective date and stops recurring invoice generation (FR-5.1).
7. **System:** Keeps active overdue reminders for outstanding invoices (FR-5.2) and retains all historical data (FR-5.4).
8. **System:** Records the event in the customer timeline and notifies the requester.

* **Extensions:**
  * 3a. Administrator rejects the request:
    * 3a1. Administrator enters the reason.
    * 3a2. System marks the request as "Rejected", keeps the account active and notifies the requester.
  * 6a. Effective date is in the future:
    * 6a1. System schedules the cancellation; recurring billing continues until that date.
  * 7a. No outstanding balance:
    * 7a1. System marks the account standing as "Up-to-Date"; no reminders are kept.
