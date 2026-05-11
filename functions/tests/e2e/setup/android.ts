import { execSync } from 'child_process';
import { chromium, type Browser, type BrowserContext } from '@playwright/test';

const ADB_PORT = 9222;
const LOCAL_PORT = 9222;

export async function connectAndroidDevice(): Promise<{ browser: Browser; context: BrowserContext } | null> {
  try {
    execSync('adb devices', { stdio: 'pipe' });
  } catch {
    throw new Error('ADB not found. Please install Android SDK platform-tools.');
  }

  const devices = execSync('adb devices').toString();
  const connectedDevices = devices.split('\n').filter((line) => line.trim() && !line.startsWith('List'));

  if (connectedDevices.length === 0) {
    throw new Error('No Android device connected. Please connect your Pixel 6 Pro with USB debugging enabled.');
  }

  const deviceId = connectedDevices[0].split('\t')[0];

  try {
    execSync(`adb -s ${deviceId} forward tcp:${ADB_PORT} localabstract:chrome_devtools_remote`, {
      stdio: 'pipe',
    });
  } catch {
    throw new Error('Failed to set up ADB port forwarding. Is the device connected?');
  }

  const wsUrl = `http://localhost:${LOCAL_PORT}`;
  const browser = await chromium.connectOverCDP(wsUrl);

  const context = await browser.newContext({
    viewport: { width: 412, height: 915 },
    userAgent: 'Mozilla/5.0 (Linux; Android 13; Pixel 6 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
  });

  return { browser, context };
}

export async function disconnectAndroidDevice(): Promise<void> {
  try {
    execSync('adb kill-server', { stdio: 'pipe' });
  } catch {
    // Ignore errors
  }
}
