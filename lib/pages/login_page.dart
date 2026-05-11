import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../services/firebase_auth_service.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final FirebaseAuthService _authService = FirebaseAuthService.instance;
  bool _isLoading = false;
  String _logMessage = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('登入'),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(
                Icons.chat_bubble_outline,
                size: 80,
                color: Colors.deepPurple,
              ),
              const SizedBox(height: 24),
              const Text(
                'Stream Chat',
                style: TextStyle(
                  fontSize: 32,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 48),
              if (_isLoading) ...[
                const CircularProgressIndicator(),
                const SizedBox(height: 16),
                Text(_logMessage),
              ] else ...[
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton.icon(
                    onPressed: _signInWithGoogle,
                    icon: const Icon(Icons.login),
                    label: const Text('使用 Google 登入'),
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 16),
                    ),
                  ),
                ),
                if (_authService.isAppleSignInAvailable) ...[
                  const SizedBox(height: 16),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton.icon(
                      onPressed: _signInWithApple,
                      icon: const Icon(Icons.apple),
                      label: const Text('使用 Apple 登入'),
                      style: ElevatedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        backgroundColor: Colors.black,
                        foregroundColor: Colors.white,
                      ),
                    ),
                  ),
                ],
              ],
              if (_logMessage.isNotEmpty && !_isLoading) ...[
                const SizedBox(height: 24),
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: Colors.grey[200],
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    _logMessage,
                    style: const TextStyle(fontFamily: 'monospace'),
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }

  Future<void> _signInWithGoogle() async {
    setState(() {
      _isLoading = true;
      _logMessage = '正在啟動 Google 登入...';
    });

    try {
      _updateLog('正在取得 Google 帳戶...');
      final token = await _authService.signInWithGoogle();

      _updateLog('登入成功！Token: ${token?.substring(0, 20)}...');

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Google 登入成功！')),
        );
      }
    } on FirebaseAuthException catch (e) {
      _updateLog('Firebase Auth 錯誤: ${e.message}');
      _showError('登入失敗: ${e.message}');
    } catch (e) {
      _updateLog('錯誤: $e');
      _showError('登入失敗: $e');
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  Future<void> _signInWithApple() async {
    setState(() {
      _isLoading = true;
      _logMessage = '正在啟動 Apple 登入...';
    });

    try {
      _updateLog('正在取得 Apple 帳戶...');
      final token = await _authService.signInWithApple();

      _updateLog('登入成功！Token: ${token?.substring(0, 20)}...');

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Apple 登入成功！')),
        );
      }
    } on FirebaseAuthException catch (e) {
      _updateLog('Firebase Auth 錯誤: ${e.message}');
      _showError('登入失敗: ${e.message}');
    } catch (e) {
      if (e.toString().contains('SignInAbortedException')) {
        _updateLog('Apple 登入已取消');
        setState(() {
          _isLoading = false;
        });
        return;
      }
      _updateLog('錯誤: $e');
      _showError('登入失敗: $e');
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  void _updateLog(String message) {
    if (mounted) {
      setState(() {
        _logMessage = message;
      });
    }
  }

  void _showError(String message) {
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(message),
          backgroundColor: Colors.red,
        ),
      );
    }
  }
}
