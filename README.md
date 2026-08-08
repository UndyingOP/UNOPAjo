#UNOP AJO Savings Circle

AJO Savings Circle is a web-based savings-circle management application designed to help users create, join, and manage collaborative savings circles.

## Overview

The application allows authenticated users to:

- Create a savings circle.
- Become the administrator of a circle they create.
- Join existing savings circles.
- View circle information and members.
- Track the current contribution round.
- View contribution status for circle members.
- Access administrator controls for circles they manage.
- Sign in and sign out securely.

The project is built as a client-side web application using HTML, CSS, JavaScript, Firebase Authentication, and Cloud Firestore.

## Technology Stack

- **HTML5** — Page structure and content.
- **CSS3** — Styling and responsive layout.
- **JavaScript (ES Modules)** — Application logic and Firebase integration.
- **Firebase Authentication** — User authentication and session management.
- **Cloud Firestore** — Storage for users, circles, members, rounds, and contributions.
- **GitHub Pages** — Suitable for hosting the static frontend.

## Main Pages

### `index.html`
The authentication/entry page where users sign in before accessing the application.

### `dashboard.html`
The main dashboard. Users can:

- See existing circles.
- Create a new savings circle.
- Join an existing circle.
- Open a circle.
- Sign out.

### `circle.html`
Displays details of a selected circle, including:

- Circle name.
- Contribution amount.
- Contribution frequency.
- Administrator.
- Members.
- Current round.
- Contribution records.
- Administrator controls.

### `manage-circle.html`
The administrator management page for controlling a circle.

### `style.css`
Contains the shared visual design and layout styles.

## Firebase Data Structure

The application uses Cloud Firestore with a structure similar to:

```text
users/
  {userId}

circles/
  {circleId}
    members/
      {userId}

    rounds/
      {roundId}
        contributions/
          {userId}
```

### Circle document

A circle contains information such as:

```text
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
```

### Member document

A member contains information such as:

```text
userId
email
joinedAt
status
totalContributed
```

### Contribution document

A contribution record contains information such as:

```text
userId
email
amount
status
createdAt
```

Contribution statuses currently include:

- `pending`
- `paid`

## Application Flow

```text
User
  ↓
Sign in
  ↓
Dashboard
  ├── Create Circle
  │      ↓
  │   Become Admin + Member
  │
  └── Join Existing Circle
         ↓
      Become Member
         ↓
      Open Circle
         ↓
      View Members & Contributions
```

## Circle Creation

When a user creates a circle, the application stores the circle configuration in Firestore and automatically makes the creator the administrator and first member.

The initial member count is therefore:

```text
1 / maximum members
```

## Joining a Circle

A user can join an available circle from the dashboard.

The application checks:

1. The user is authenticated.
2. The circle exists.
3. The user is not already a member.
4. The circle has not reached its maximum membership.

The member is then added to the circle.

## Security

Firestore Security Rules are used to control access to application data.

The rules should ensure that:

- Users can access their own user records.
- Authenticated users can read appropriate circle information.
- Only the authenticated administrator can update or delete their circle.
- Users can create their own membership record.
- Administrators can manage members.
- Round management is restricted to the circle administrator.
- Contribution updates are restricted to the relevant member or administrator.

**Important:** Always deploy and test Firestore Security Rules before using the application with real financial information.

## Current Development Status

The core application flow is operational:

- Authentication
- Dashboard
- Circle creation
- Admin membership
- Circle joining
- Circle viewing
- Member display
- Round display
- Contribution tracking structure
- Admin management structure

### Planned Improvements

Future development can include:

- Automatic contribution-record creation when a new member joins an existing round.
- Contribution payment confirmation.
- Automatic round progression.
- Payout/recipient tracking.
- Transaction history.
- Member removal and replacement.
- Circle notifications.
- Automated bank-alert integration.
- Improved error handling.
- Performance optimization.
- More detailed administrator analytics.

## Local Development

Because the application uses Firebase modules and authentication, it is recommended to run it through a local development server rather than opening HTML files directly with `file://`.

For example, using VS Code with a local server extension:

```text
Open project
    ↓
Start local server
    ↓
Open index.html
    ↓
Sign in
```

Make sure your Firebase project's Authentication and Firestore services are configured correctly.

## Deployment

The frontend can be deployed using GitHub Pages or another static hosting service.

Before deployment:

1. Verify the Firebase configuration.
2. Verify Firebase Authentication settings.
3. Verify Firestore Security Rules.
4. Add the production domain to Firebase Authentication's authorized domains.
5. Test login, circle creation, joining, and viewing.
6. Test the application with more than one account.

## Project Structure

A typical project structure is:

```text
AJO/
│
├── index.html
├── dashboard.html
├── circle.html
├── manage-circle.html
├── style.css
└── README.md
```

Additional JavaScript files or assets can be added as the application grows.

## Important Note

This application is currently a development project. Although it is designed around savings-circle functionality, it should not be used to process or store real financial transactions until the security rules, transaction logic, authentication, validation, and backend architecture have been thoroughly tested.

## Author

**Abraham Netufo**

AJO Savings Circle — collaborative savings management web application.

