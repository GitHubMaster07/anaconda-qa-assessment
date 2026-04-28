import { test, expect } from '@playwright/test';
import { loginSuccessSchema, errorResponseSchema } from './schemas/login.schema';

test.describe('Login API @smoke @regression', () => {

  test('POST /login - valid credentials', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: {
        email: 'user@example.com',
        password: 'Password123'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    
    // Schema validation - ensures response structure matches expected contract
    const validation = loginSuccessSchema.safeParse(body);
    if (!validation.success) {
      console.error('Schema validation failed:', validation.error.errors);
    }
    expect(validation.success).toBe(true);
    expect(validation.data?.token).toBeTruthy();
  });

  test('POST /login - invalid password', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: {
        email: 'user@example.com',
        password: 'wrong'
      }
    });

    expect(response.status()).toBe(401);

    const body = await response.json();
    
    const validation = errorResponseSchema.safeParse(body);
    expect(validation.success).toBe(true);
    expect(validation.data?.error).toBeTruthy();
  });

  test('POST /login - missing fields', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: {}
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    
    const validation = errorResponseSchema.safeParse(body);
    expect(validation.success).toBe(true);
    expect(validation.data?.error).toBeTruthy();
  });

});