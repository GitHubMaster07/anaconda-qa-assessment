import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility tests @accessibility', () => {

  test('Homepage should have no accessibility violations', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Challenge 1 page should have no accessibility violations', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Challenge 1' }).click();
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Challenge 2 page should have no accessibility violations', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Challenge 2' }).click();
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Challenge 3 page should have no accessibility violations', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Challenge 3' }).click();
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Challenge 4 page should have no accessibility violations', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Challenge 4' }).click();
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

});