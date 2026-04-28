import { test, expect } from '@playwright/test';
import { forgotPasswordSuccessSchema, errorResponseSchema } from './schemas/forgot-password.schema';

test.describe('Forgot Password API @smoke @regression', () => {

  test('POST /forgot-password - valid email', async ({ request }) => {
    const response = await request.post('/api/forgot-password', {
      data: { email: 'user@example.com' }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    
    const validation = forgotPasswordSuccessSchema.safeParse(body);
    expect(validation.success).toBe(true);
    expect(validation.data?.message).toContain('reset link');
  });

  test('POST /forgot-password - invalid email format', async ({ request }) => {
    const response = await request.post('/api/forgot-password', {
      data: { email: 'not-an-email' }
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    
    const validation = errorResponseSchema.safeParse(body);
    expect(validation.success).toBe(true);
    expect(validation.data?.error).toBeTruthy();
  });

  test('POST /forgot-password - missing email', async ({ request }) => {
    const response = await request.post('/api/forgot-password', {
      data: {}
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    
    const validation = errorResponseSchema.safeParse(body);
    expect(validation.success).toBe(true);
    expect(validation.data?.error).toBeTruthy();
  });

});