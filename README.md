# UNOP AJO Savings Tracker

## Overview

The **AJO Savings Tracker** is a web-based platform designed to help AJO (rotational savings) groups manage, monitor, and keep records of their savings activities digitally.

The project was created to make traditional AJO management simpler, more user-friendly, functional, and secure while giving members better visibility into their savings activities.

The system allows members to track payments and view the current state of their AJO circle, while administrators have tools for managing the circle and maintaining its records.

---

## Website Goals

The main goals of the AJO Savings Tracker are:

- **Simplicity** – keep the system easy to understand and use.
- **User friendliness** – provide an interface that feels familiar to users.
- **Functionality** – provide the essential tools required to manage an AJO circle.
- **Safety, security and privacy** – protect users, authentication data, and circle records.
- **Better user experience** – provide a smoother digital alternative to manually tracking AJO activities.

The interface also takes inspiration from familiar Nigerian payment applications. An **OPay-inspired layout and interaction style** was considered because many potential users are already comfortable with that type of interface.

> **Note:** The project uses an OPay-inspired user experience for familiarity; it is not affiliated with or operated by OPay.

---

## Core Functions

### 1. Registration and Onboarding

The Sign Up / Sign In page handles:

- User registration
- User authentication
- Login
- Access control
- Onboarding into the application

Firebase Authentication is used to manage user authentication.

---

### 2. Dashboard

The main dashboard provides the starting point for AJO activities.

Users can:

- Create an AJO circle
- View available circles
- Join an existing circle
- Open and view a circle
- Sign out of the application

---

### 3. Circle Dashboard

The circle dashboard is the main workspace for an AJO group.

Members can:

- View circle information
- View the members of the circle
- Track contribution records
- Track payments
- Monitor the current round
- View the current state of the AJO
- View contribution status and payout-related information

The aim is to give members a clear record of what has happened within the circle instead of relying entirely on information communicated by the administrator.

---

### 4. Manage Circle

The Manage Circle section provides administrative controls.

The administrator can:

- Manage the circle
- Mark member payments
- Manage rounds
- Update circle information
- Maintain relevant AJO records

Administrative actions are restricted so that ordinary members cannot use administrator controls.

---

## Application Structure

The main web flow is:

```text
Sign Up / Sign In
        │
        ▼
   Dashboard
        │
   ┌────┼───────────────┐
   │    │               │
   ▼    ▼               ▼
Create  View           Join
 AJO    AJO            AJO
        │
        ▼
 Circle Dashboard
        │
   ┌────┴──────────────┐
   │                   │
   ▼                   ▼
Members            Contributions
   │                   │
   ▼                   ▼
Tracking          Payment Status
                       │
                       ▼
                  AJO Rounds
                       │
                       ▼
                  Payout Records

Administrator
      │
      ▼
Manage Circle
      │
      ├── Mark Payment
      ├── Manage Rounds
      └── Update Data
```

---

## Technology Stack

The project uses a simple web technology stack:

| Technology | Purpose |
|---|---|
| HTML | Page structure |
| CSS | Styling and user interface |
| JavaScript | Application functionality and interaction |
| Firebase Authentication | User authentication |
| Firebase Firestore | Data storage and real-time application data |
| Firebase Security Rules | Access control and data protection |

### HTML

HTML is responsible for creating the pages and application structure.

### CSS

CSS provides the visual design, layout, spacing, buttons, cards, forms, and overall user interface.

### JavaScript

JavaScript controls the application's functionality, including:

- Authentication state
- Creating circles
- Joining circles
- Loading circles
- Loading members
- Contribution records
- AJO rounds
- Navigation
- Administrative interactions

### Firebase

Firebase provides the backend services used by the current application.

**Firebase Authentication** handles user identity and authentication.

**Cloud Firestore** stores application data such as users, circles, members, rounds, and contribution records.

**Firestore Security Rules** control who can read and modify protected data.

---

## Security Measures

Security was considered as a major part of the system design.

### Firebase Storage / Firestore

Application data is stored using Firebase services rather than being kept only inside the browser.

### Firebase Authentication

User authentication is handled through Firebase Authentication.

This allows the application to identify the currently signed-in user before allowing access to protected areas.

### Admin UID Protection

Each AJO circle contains an administrator UID.

The administrator's Firebase UID is linked to the circle document, allowing Firestore Security Rules to verify whether a user is actually the administrator.

Conceptually:

```text
Authenticated User UID
          │
          ▼
       Firebase
          │
          ▼
    Security Rules
          │
          ▼
Compare with circle.adminId
          │
      ┌───┴───┐
      ▼       ▼
   Admin    Member
      │       │
      ▼       ▼
Admin       Member
Controls    Controls
```

This prevents a user from simply claiming administrator privileges from the client side.

### Firestore Security Rules

Security Rules are used to restrict operations based on authentication and ownership.

For example, administrator-only operations can check:

```text
request.auth.uid == resource.data.adminId
```

This means the application does not rely only on hidden buttons or JavaScript checks to protect administrative operations.

### Firebase Snapshots

Firebase's data model and snapshot-based updates are used to keep displayed application data synchronized with the stored state and reduce problems caused by stale client-side information.

---

## AJO Data Model

The application is organized around an AJO circle and its related records.

A simplified structure is:

```text
circles/
    {circleId}
        name
        contribution
        frequency
        maxMembers
        memberCount
        adminId
        adminEmail
        createdAt
        currentRound
        status

        members/
            {userId}
                userId
                email
                joinedAt
                status
                totalContributed

        rounds/
            {roundId}
                number
                status
                createdAt

                contributions/
                    {userId}
                        userId
                        email
                        amount
                        status
                        createdAt
```

This structure separates:

- Circle information
- Member information
- Round information
- Individual contribution records

That separation makes the system easier to manage and extend.

---

## User Roles

### Member

A member can:

- Register and sign in
- View AJO circles
- Join circles
- View circle members
- View contribution records
- Track payment status
- Monitor AJO rounds
- View the current state of the circle

### Administrator

An administrator has the member capabilities plus additional management privileges.

The administrator can:

- Manage the circle
- Mark payments
- Manage rounds
- Update relevant circle data
- Maintain the circle's records

Administrator privileges are controlled through authentication and Firestore Security Rules.

---

## Design Philosophy

The project is built around five major principles:

```text
        SIMPLICITY
            │
            ▼
      USER FRIENDLINESS
            │
            ▼
      FUNCTIONALITY
            │
            ▼
    SECURITY & PRIVACY
            │
            ▼
       BETTER AJO
     MANAGEMENT
```

The objective is not simply to digitize an AJO spreadsheet. The objective is to create a system where members can independently see the state of their circle and its records.

---

## Current Project Scope

The current implementation focuses primarily on the **client-side web application** together with Firebase services.

The application provides the core structure for:

- Authentication
- AJO creation
- AJO discovery
- Joining circles
- Member management
- Contribution tracking
- Round management
- Administrative controls
- Secure Firebase data access

The project can be expanded with more advanced financial and automation capabilities as development continues.

---

## Future Development

Potential future improvements include:

- Real wallet/payment integration
- Automated payment verification
- Bank or payment-provider integration
- Automated payout processing
- Transaction history
- Payment notifications
- More advanced member dashboards
- Improved administrator analytics
- Automated AJO round progression
- Audit logs
- Enhanced fraud prevention
- More advanced privacy and security controls

For a production system handling real money, financial operations should be implemented through an appropriate regulated payment or banking partner rather than treating a Firestore balance as actual money.

---

## Project Vision

Traditional AJO systems often depend heavily on an administrator to keep records and communicate the state of the savings group.

The AJO Savings Tracker aims to reduce that dependence by giving members direct access to the information that concerns them.

The vision is:

> **A simple, user-friendly and secure digital platform where AJO members can see, track and understand the state of their savings circle.**

---


## Important Note

This application is currently a development project. Although it is designed around savings-circle functionality, it should not be used to process or store real financial transactions until the security rules, transaction logic, authentication, validation, and backend architecture have been thoroughly tested.

## Conclusion

The AJO Savings Tracker combines a familiar web interface with Firebase authentication, Firestore data storage, and security rules to create a digital foundation for managing rotational savings groups.

The project focuses on **simplicity, functionality, transparency, security, and user experience**, while providing a foundation that can later be extended into a more complete financial platform.


## Author

**Abraham Netufo**

AJO Savings Circle — collaborative savings management web application.

