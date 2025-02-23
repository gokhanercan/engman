import { test, expect } from '@playwright/test';
import { assertConsoleErrors } from '../assertions/consoleAssert';

test('Essential pages', async ({ page }) => {
  await page.goto('/'); //Dashboard
  await expect(page).toHaveTitle(/engman/);
  assertConsoleErrors(page);

  await page.goto('/developers');
  await expect(page).toHaveTitle(/Developers/);
  assertConsoleErrors(page);

  await page.goto('/skills');
  await expect(page).toHaveTitle(/Skills/);
  assertConsoleErrors(page);

  await page.goto('/projects');
  await expect(page).toHaveTitle(/Projects/);
  assertConsoleErrors(page);
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });