import { test, expect } from '@playwright/test';

test.describe('Performance smoke tests @performance', () => {

  test('Login page load time should be under 2 seconds', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/challenge1.html');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    console.log(`Login page loaded in ${loadTime}ms`);
    expect(loadTime).toBeLessThan(2000);
  });

  test('Login action should complete under 3 seconds', async ({ page }) => {
    await page.goto('/challenge1.html');
    
    const startTime = Date.now();
    
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', 'password123');
    await page.click('#submitButton');
    await page.waitForSelector('#successMessage[data-test-ready="true"]');
    
    const actionTime = Date.now() - startTime;
    
    console.log(`Login action completed in ${actionTime}ms`);
    expect(actionTime).toBeLessThan(3000);
  });

});