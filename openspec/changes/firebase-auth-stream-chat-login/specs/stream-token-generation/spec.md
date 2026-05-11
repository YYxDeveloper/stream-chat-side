## ADDED Requirements

### Requirement: Firebase Function generates Stream Chat token
The system SHALL generate a Stream Chat user token on the server side using Firebase Functions.

#### Scenario: Token generation with valid Firebase ID token
- **WHEN** Flutter app sends Firebase ID token to Firebase Function
- **AND** Firebase Function verifies the ID token successfully
- **THEN** Firebase Function generates Stream Chat token using Stream SDK
- **AND** returns token to Flutter app

#### Scenario: Token generation with invalid Firebase ID token
- **WHEN** Flutter app sends invalid Firebase ID token to Firebase Function
- **AND** Firebase Function fails to verify the token
- **THEN** Firebase Function returns 401 Unauthorized error

#### Scenario: Token generation with missing environment variables
- **WHEN** Firebase Function is called but STREAM_API_KEY or STREAM_API_SECRET is missing
- **THEN** Firebase Function returns 500 Internal Server error with appropriate message
