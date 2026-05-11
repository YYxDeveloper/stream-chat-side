## Why

目前 sample_app 使用手動輸入 API Key + User ID + Token 方式登入 Stream Chat。為了提升使用者體驗並簡化登入流程，需要導入 Firebase Auth 第三方登入（Google + Apple），並透過 Firebase Functions 在伺服器端生成 Stream Chat token，實現安全且現代化的認證機制。

## What Changes

1. **新增 Firebase Auth 依賴**：在 Flutter 專案中加入 `firebase_auth` 套件
2. **建立 Firebase Functions**：建立 Node.js Functions 接收 Firebase ID Token，生成 Stream Chat token
3. **更新登入頁面**：新增 Firebase Auth 第三方登入 UI（Google + Apple 按鈕）
4. **顯示登入日誌**：在登入過程中顯示詳細的 log 資訊
5. **使用 .env 管理金鑰**：Stream Chat API Key + Secret 存放於 .env 檔案

## Capabilities

### New Capabilities

- `firebase-auth-integration`: Firebase Auth 第三方登入整合（Google + Apple）
- `stream-token-generation`: Firebase Functions 生成 Stream Chat token
- `env-configuration`: 使用 .env 檔案管理敏感資訊
- `login-logging`: 登入過程日誌顯示

### Modified Capabilities

- （無）

## Impact

- **Flutter 專案**：gitsubmodul/sample_app
- **Firebase 專案**：stream-auth-2026
- **新依賴**：firebase_auth
- **新服務**：Firebase Functions（Node.js）
- **環境變數**：.env（STREAM_API_KEY, STREAM_API_SECRET）
