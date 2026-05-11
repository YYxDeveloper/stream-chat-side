## Context

此專案為 Flutter Stream Chat SDK 的 sample_app，目前需要從手動輸入認證升級為 Firebase Auth 第三方登入。

- **Flutter 專案路徑**：`gitsubmodul/sample_app`
- **Firebase 專案 ID**：`stream-auth-2026`
- **Stream Chat 設定**：API Key + Secret 存放於 .env 檔案
- **參考範例**：gitsubmodul/sample_app（既有登入實作）

## Goals / Non-Goals

**Goals:**
1. 實作 Firebase Auth 第三方登入（Google + Apple）
2. 建立 Firebase Functions 生成 Stream Chat token
3. 更新 Flutter 登入頁面，顯示登入日誌
4. 使用 .env 管理 Stream API Key + Secret

**Non-Goals:**
- 不修改既有的 Stream Chat 功能（訊息、頻道等）
- 不實作 Email/Password 登入（僅 Google + Apple）
- 不實作 Firebase Admin SDK（僅用戶端）

## Decisions

### 1. Firebase Functions vs. 直接在前端生成 Token

**選擇：Firebase Functions**
- 理由：Stream Chat Secret 不能存放在客戶端，必須在伺服器端
- Firebase Functions 可確保 Secret 不會暴露在前端程式碼中

### 2. 登入流程設計

```
Flutter App                    Firebase              Firebase Functions      Stream Chat
    │                             │                          │                    │
    │─ Google Sign-In ──────────▶│                          │                    │
    │◀── Firebase ID Token ──────│                          │                    │
    │                             │                          │                    │
    │─ Call Function ───────────▶│                          │                    │
    │                             │─ Verify ID Token ───────▶│                    │
    │                             │◀─ User Info ────────────│                    │
    │                             │                          │─ Generate Token ──▶│
    │                             │◀── Stream Token ────────│                    │
    │◀── Stream Token ───────────│                          │                    │
    │                             │                          │                    │
    │─ connectUser ────────────────────────────────────────▶│                    │
```

### 3. .env 檔案位置

- **Flutter**：專案根目錄 `.env`
- **Firebase Functions**：`functions/.env`

### 4. 日誌顯示方式

使用 Flutter 的 `debugPrint` 搭配簡單的 AlertDialog 顯示登入過程狀態

## Risks / Trade-offs

| 風險 |  Mitigation |
|------|-------------|
| Firebase Functions 部署需付費（Blaze 方案） | 初期使用 Firebase Spark 免費方案測試 |
| Apple 登入需要付費 Apple Developer 帳號 | 先行實作 Google 登入，Apple 登入後續 |
| Token 過期需重新整理 | 使用 Firebase ID Token refresh 機制 |

## Migration Plan

1. 新增 `firebase_auth` 依賴至 Flutter
2. 建立 Firebase Functions 專案（init firebase functions）
3. 設定 .env 檔案
4. 實作 Firebase Functions token 生成
5. 更新 Flutter 登入頁面
6. 本地測試
7. 部署 Firebase Functions
