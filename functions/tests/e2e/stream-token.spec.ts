import { test, expect } from '@playwright/test';

const FUNCTIONS_URL = 'http://localhost:5001/stream-auth-2026/us-central1';

async function callFunction(functionName: string, data: any) {
  const response = await fetch(`${FUNCTIONS_URL}/${functionName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data,
    }),
  });
  return response;
}

test.describe('Stream Token API - Unauthenticated Tests (E2E via Emulator)', () => {
  test('createStreamUserAndGetToken - unauthenticated returns FAILED_PRECONDITION', async () => {
    const response = await callFunction('createStreamUserAndGetToken', { name: 'Test' });
    const body = await response.json();
    expect(response.status).toBe(400);
    expect(body.error?.status).toBe('FAILED_PRECONDITION');
  });

  test('getStreamUserToken - unauthenticated returns FAILED_PRECONDITION', async () => {
    const response = await callFunction('getStreamUserToken', {});
    const body = await response.json();
    expect(response.status).toBe(400);
    expect(body.error?.status).toBe('FAILED_PRECONDITION');
  });

  test('revokeStreamUserToken - unauthenticated returns FAILED_PRECONDITION', async () => {
    const response = await callFunction('revokeStreamUserToken', {});
    const body = await response.json();
    expect(response.status).toBe(400);
    expect(body.error?.status).toBe('FAILED_PRECONDITION');
  });
});
