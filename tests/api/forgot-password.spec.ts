import { test, expect } from '@playwright/test';

test.describe('Forgot Password API @smoke @regression', () => {

  test('POST /forgot-password - valid email', async ({ request }) => {
    const response = await request.post('/api/forgot-password', {
      data: { email: 'user@example.com' }
    });

    expect(response.status()).toBe(200);
  });

  test('POST /forgot-password - invalid email format', async ({ request }) => {
    const response = await request.post('/api/forgot-password', {
      data: { email: 'not-an-email' }
    });

    expect(response.status()).toBe(400);
  });

  test('POST /forgot-password - missing email', async ({ request }) => {
    const response = await request.post('/api/forgot-password', {
      data: {}
    });

    expect(response.status()).toBe(400);
  });

});