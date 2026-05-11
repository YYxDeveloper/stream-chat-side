## ADDED Requirements

### Requirement: User can sign in with Google
The system SHALL allow users to authenticate using their Google account via Firebase Auth.

#### Scenario: Successful Google sign-in
- **WHEN** user taps "Sign in with Google" button
- **THEN** system displays Google sign-in dialog
- **AND** user selects their Google account
- **AND** system receives Firebase ID token
- **AND** system proceeds to call Firebase Function to generate Stream Chat token

#### Scenario: Google sign-in failure
- **WHEN** user attempts Google sign-in but fails
- **THEN** system displays error message with failure reason
- **AND** user remains on login page

### Requirement: User can sign in with Apple
The system SHALL allow users to authenticate using their Apple ID via Firebase Auth.

#### Scenario: Successful Apple sign-in
- **WHEN** user taps "Sign in with Apple" button
- **AND** user completes Apple authentication
- **AND** system receives Firebase ID token
- **AND** system proceeds to call Firebase Function to generate Stream Chat token

#### Scenario: Apple sign-in failure
- **WHEN** user attempts Apple sign-in but fails
- **THEN** system displays error message with failure reason
- **AND** user remains on login page

### Requirement: User remains logged in across app restarts
The system SHALL persist authentication state and automatically reconnect on app restart.

#### Scenario: Auto reconnection on app restart
- **WHEN** user opens the app after previously successful login
- **AND** stored Firebase ID token is still valid
- **THEN** system automatically reconnects to Stream Chat
