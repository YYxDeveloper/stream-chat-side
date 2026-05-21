# Testing Guide

## Prerequisites

- Node.js 18+
- Android Studio with SDK platform-tools
- Physical Pixel 6 Pro device

## Device Setup

### 1. Enable USB Debugging on Pixel 6 Pro

1. Go to **Settings → About Phone**
2. Tap **Build Number** 7 times
3. Go to **Settings → System → Developer Options**
4. Enable **USB Debugging**

### 2. Connect Device

```bash
adb devices
```

Expected output:
```
List of devices attached
<device-id>	device
```

### 3. Install Chrome on Device

Download and install Chrome APK from Play Store.

## Running Tests

### Viewport Simulation (Desktop)

```bash
npm run test:e2e
```

### Physical Device (Pixel 6 Pro)

```bash
npm run test:e2e:android
```

This will:
1. Check ADB connection
2. Set up port forwarding (tcp:9222 → chrome_devtools_remote)
3. Launch Chrome via CDP
4. Run tests

## Troubleshooting

### Device Not Found

```
Error: No Android device connected
```

**Solution:** Connect device via USB and enable USB Debugging.

### ADB Not Found

```
Error: ADB not found
```

**Solution:** Install Android SDK platform-tools:
```bash
brew install android-platform-tools
```

### Port Forwarding Failed

```
Error: Failed to set up ADB port forwarding
```

**Solution:**
1. Disconnect and reconnect USB cable
2. Try a different USB port
3. Revoke USB debugging authorizations and reconnect
