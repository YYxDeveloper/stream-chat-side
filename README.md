# stream-chat-side

Stream Chat Flutter 整合專案，實作 Firebase Auth 第三方登入（Google + Apple）與 Stream Chat token 生成。

## 專案簡介

本專案基於 [stream-chat-flutter](https://github.com/GetStream/stream-chat-flutter) SDK，建立一個完整的聊天應用範例，整合 Firebase 認證與 Stream Chat 服務。

## 功能

- Firebase Auth 第三方登入（Google / Apple）
- Firebase Functions 在 server 端生成 Stream Chat token
- 安全的金鑰管理（透過 Firebase CLI config，不使用 .env）
- 多平台支援：iOS、Android、macOS、Web

## 開發教學

| 主題 | 連結 |
|---|---|
| Firebase 金鑰管理（functions:config:set） | [tutorial-firebase-config.html](./tutorial-firebase-config.html) |

## 專案結構

```
stream-chat-side/
├── lib/                    # Flutter 主程式
├── functions/              # Firebase Cloud Functions（Node.js）
├── gitsubmodul/            # stream-chat-flutter SDK submodule
├── ios/                    # iOS 平台設定
├── macos/                  # macOS 平台設定
├── web/                    # Web 平台設定
└── tutorial-firebase-config.html  # Firebase 金鑰管理教學
```

## 快速開始

### 環境需求

- Flutter >= 3.0
- Node.js >= 18（Firebase Functions 用）
- Firebase CLI >= 11

### 安裝

```bash
# 安裝 Flutter 依賴
flutter pub get

# 安裝 Firebase Functions 依賴
cd functions && npm install
```

### Firebase 金鑰設定

```bash
# 設定 Stream Chat 金鑰（詳見教學）
firebase functions:config:set \
  stream.key="你的_STREAM_API_KEY" \
  stream.secret="你的_STREAM_API_SECRET"
```

詳細說明請參考：[Firebase 金鑰管理教學](./tutorial-firebase-config.html)

## 相關資源

- [Stream Chat Flutter SDK 文件](https://getstream.io/chat/docs/sdk/flutter/)
- [Firebase Auth 文件](https://firebase.google.com/docs/auth)
- [Token 生成官方教學](https://getstream.io/chat/docs/sdk/flutter/v4/guides/token_generation_with_firebase/)
