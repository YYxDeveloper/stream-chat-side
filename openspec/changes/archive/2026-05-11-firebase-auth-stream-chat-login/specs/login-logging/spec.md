## ADDED Requirements

### Requirement: Login process shows progress logs
The system SHALL display real-time logging of the login process to help debugging.

#### Scenario: Display login progress
- **WHEN** user initiates login
- **THEN** system displays a dialog showing:
  - "Starting Google/Apple sign-in..."
  - "Firebase authentication successful"
  - "Generating Stream Chat token..."
  - "Connecting to Stream Chat..."

#### Scenario: Login error displays message
- **WHEN** login fails at any step
- **THEN** system displays error message in the dialog
- **AND** user can dismiss the dialog and retry

#### Scenario: Login success dismisses dialog
- **WHEN** login completes successfully
- **THEN** dialog automatically dismisses
- **AND** user is navigated to main screen
