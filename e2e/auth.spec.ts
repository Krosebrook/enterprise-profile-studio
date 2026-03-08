import { test, expect } from '../../playwright-fixture';

test.describe('Authentication Flows', () => {

  test.describe('Sign Up', () => {
    test('displays password strength indicator on signup page', async ({ page }) => {
      await page.goto('/signup');
      const passwordInput = page.locator('#password');
      
      // Type weak password
      await passwordInput.fill('abc');
      await expect(page.getByText('Weak')).toBeVisible();

      // Type fair password
      await passwordInput.fill('abcDEF');
      await expect(page.getByText('Fair')).toBeVisible();

      // Type strong password
      await passwordInput.fill('Abcdef1!');
      await expect(page.getByText('Very Strong')).toBeVisible();
    });

    test('shows success message on valid signup (not redirect)', async ({ page }) => {
      await page.goto('/signup');
      await page.locator('#fullName').fill('Test User');
      await page.locator('#email').fill(`test+${Date.now()}@example.com`);
      await page.locator('#password').fill('TestPass1!');
      await page.getByRole('button', { name: 'Create account' }).click();
      // Should stay on signup page with a success toast (not redirect to dashboard)
      await expect(page.locator('text=Check your email')).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('Sign In', () => {
    test('shows error for invalid credentials', async ({ page }) => {
      await page.goto('/login');
      await page.locator('#email').fill('nonexistent@example.com');
      await page.locator('#password').fill('wrongpass');
      await page.getByRole('button', { name: 'Sign in' }).click();
      // Should show an error toast
      await expect(page.locator('[data-sonner-toast]')).toBeVisible({ timeout: 10000 });
    });

    test('has forgot password link that navigates correctly', async ({ page }) => {
      await page.goto('/login');
      await page.getByText('Forgot password?').click();
      await expect(page).toHaveURL(/forgot-password/);
      await expect(page.getByText('Reset your password')).toBeVisible();
    });
  });

  test.describe('Forgot Password', () => {
    test('sends reset email and shows confirmation', async ({ page }) => {
      await page.goto('/forgot-password');
      await page.locator('#email').fill('test@example.com');
      await page.getByRole('button', { name: 'Send Reset Link' }).click();
      await expect(page.getByText('We sent a reset link')).toBeVisible({ timeout: 10000 });
    });

    test('has back to sign in link', async ({ page }) => {
      await page.goto('/forgot-password');
      await page.getByText('Back to sign in').click();
      await expect(page).toHaveURL(/login/);
    });
  });

  test.describe('Reset Password', () => {
    test('displays password strength indicator', async ({ page }) => {
      // Simulate recovery session by navigating with hash
      await page.goto('/reset-password#type=recovery');
      const passwordInput = page.locator('#password');
      await passwordInput.fill('NewPass1!');
      await expect(page.getByText('Very Strong')).toBeVisible();
    });

    test('shows mismatch error for different passwords', async ({ page }) => {
      await page.goto('/reset-password#type=recovery');
      await page.locator('#password').fill('NewPass1!');
      await page.locator('#confirm-password').fill('Different1!');
      await expect(page.getByText('Passwords do not match')).toBeVisible();
    });
  });

  test.describe('Protected Routes', () => {
    test('settings redirects unauthenticated users to login', async ({ page }) => {
      await page.goto('/settings');
      await expect(page).toHaveURL(/login/, { timeout: 10000 });
    });
  });
});
