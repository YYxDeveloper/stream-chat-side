## ADDED Requirements

### Requirement: Stream API credentials stored in .env file
The system SHALL store Stream Chat API Key and Secret in .env files, not hardcoded.

#### Scenario: Flutter app reads Stream API Key from .env
- **WHEN** Flutter app initializes
- **THEN** app reads STREAM_API_KEY from .env file
- **AND** uses it for Stream Chat client initialization

#### Scenario: Firebase Functions reads credentials from .env
- **WHEN** Firebase Function starts
- **THEN** function reads STREAM_API_KEY and STREAM_API_SECRET from environment
- **AND** uses them for token generation

### Requirement: .env files are not committed to version control
The system SHALL ensure .env files are excluded from git.

#### Scenario: .env file in gitignore
- **WHEN** developer creates .env file
- **THEN** .env file is automatically ignored by git
- **AND** does not appear in git status
