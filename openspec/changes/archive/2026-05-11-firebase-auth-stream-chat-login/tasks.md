## 1. Environment Setup

- [ ] 1.1 Add firebase_auth dependency to Flutter pubspec.yaml
- [ ] 1.2 Create .env file in Flutter project root with STREAM_API_KEY
- [ ] 1.3 Add flutter_dotenv package to read .env file
- [ ] 1.4 Initialize Firebase in Flutter app (Firebase.initializeApp)
- [ ] 1.5 Add .env to gitignore

## 2. Firebase Functions Setup

- [ ] 2.1 Initialize Firebase Functions in the project
- [ ] 2.2 Create functions/.env with STREAM_API_KEY and STREAM_API_SECRET
- [ ] 2.3 Install stream-chat package in functions (npm install stream-chat)
- [ ] 2.4 Deploy Firebase Functions to test environment

## 3. Firebase Auth Implementation

- [ ] 3.1 Create FirebaseAuthService class
- [ ] 3.2 Implement Google Sign-In method
- [ ] 3.3 Implement Apple Sign-In method
- [ ] 3.4 Handle auth state persistence
- [ ] 3.5 Test Google Sign-In flow
- [ ] 3.6 Test Apple Sign-In flow

## 4. Token Generation Function

- [ ] 4.1 Create generateToken Firebase Function
- [ ] 4.2 Implement Firebase ID token verification
- [ ] 4.3 Implement Stream Chat token generation using SDK
- [ ] 4.4 Add error handling for invalid tokens
- [ ] 4.5 Add error handling for missing environment variables

## 5. Flutter Login Page Update

- [ ] 5.1 Create new login page with Firebase Auth UI
- [ ] 5.2 Add "Sign in with Google" button
- [ ] 5.3 Add "Sign in with Apple" button
- [ ] 5.4 Implement login progress dialog with logs
- [ ] 5.5 Handle success and error states
- [ ] 5.6 Navigate to main screen after successful login

## 6. Integration & Testing

- [ ] 6.1 Connect Firebase Auth to Stream Chat login
- [ ] 6.2 Test full login flow (Firebase Auth → Function → Stream Chat)
- [ ] 6.3 Verify token persistence works
- [ ] 6.4 Test auto-reconnection on app restart
