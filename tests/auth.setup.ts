import { test as setup } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

setup('authenticate', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login();

  await page.context().storageState({ path: 'playwright/.auth/storageState.json' });
});

