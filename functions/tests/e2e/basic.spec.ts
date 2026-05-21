import { test, expect } from '@playwright/test';

test('smoke test - page loads', async ({ page }) => {
  await page.goto('data:text/html,<h1>Stream Chat Functions</h1>');
  await expect(page.locator('h1')).toContainText('Stream Chat');
});

test('@android smoke test - device viewport', async ({ page }) => {
  await page.goto('data:text/html,<h1>Pixel 6 Pro Test</h1>');
  await expect(page.locator('h1')).toContainText('Pixel 6 Pro');
  const viewport = page.viewportSize();
  expect(viewport?.width).toBe(412);
  expect(viewport?.height).toBe(915);
});
