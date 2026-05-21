import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:sign_in_with_apple/sign_in_with_apple.dart';
import 'package:cloud_functions/cloud_functions.dart';
import 'dart:io';

class FirebaseAuthService {
  static final FirebaseAuthService _instance = FirebaseAuthService._internal();
  static FirebaseAuthService get instance => _instance;
  FirebaseAuthService._internal();

  final FirebaseAuth _auth = FirebaseAuth.instance;
  final GoogleSignIn _googleSignIn = GoogleSignIn();

  Stream<User?> authStateChanges() => _auth.authStateChanges();

  User? get currentUser => _auth.currentUser;

  Future<String?> signInWithGoogle() async {
    try {
      final GoogleSignInAccount? googleUser = await _googleSignIn.signIn();
      if (googleUser == null) {
        return null;
      }

      final GoogleSignInAuthentication googleAuth =
          await googleUser.authentication;

      final credential = GoogleAuthProvider.credential(
        accessToken: googleAuth.accessToken,
        idToken: googleAuth.idToken,
      );

      await _auth.signInWithCredential(credential);

      final token = await _callCreateStreamUserFunction();
      return token;
    } catch (e) {
      rethrow;
    }
  }

  Future<String?> signInWithApple() async {
    try {
      final appleCredential = await SignInWithApple.getAppleIDCredential(
        scopes: [
          AppleIDAuthorizationScopes.fullName,
          AppleIDAuthorizationScopes.email,
        ],
      );

      final oauthCredential = OAuthProvider('apple.com').credential(
        idToken: appleCredential.identityToken,
        accessToken: appleCredential.authorizationCode,
      );

      await _auth.signInWithCredential(oauthCredential);

      final token = await _callCreateStreamUserFunction();
      return token;
    } catch (e) {
      rethrow;
    }
  }

  Future<String?> _callCreateStreamUserFunction() async {
    try {
      final functions = FirebaseFunctions.instance;
      final callable = functions.httpsCallable('createStreamUserAndGetToken');
      final result = await callable();
      return result.data as String?;
    } catch (e) {
      rethrow;
    }
  }

  Future<void> signOut() async {
    try {
      await _callRevokeStreamUserFunction();
    } catch (_) {}

    await _googleSignIn.signOut();
    await _auth.signOut();
  }

  Future<void> _callRevokeStreamUserFunction() async {
    try {
      final functions = FirebaseFunctions.instance;
      final callable = functions.httpsCallable('revokeStreamUserToken');
      await callable();
    } catch (_) {}
  }

  bool get isAppleSignInAvailable => Platform.isIOS || Platform.isMacOS;
}
