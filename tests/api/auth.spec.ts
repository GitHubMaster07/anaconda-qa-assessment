import { test, expect } from '@playwright/test';
import { loginSuccessSchema } from './schemas/login.schema';
import { profileSuccessSchema, errorResponseSchema } from './schemas/profile.schema';

test.describe('Auth API @smoke @regression', () => {

  test('GET /profile - unauthorized', async ({ request }) => {
    const response = await request.get('/api/profile');

    expect(response.status()).toBe(401);

    const body = await response.json();
    
    const validation = errorResponseSchema.safeParse(body);
    expect(validation.success).toBe(true);
    expect(validation.data?.error).toBeTruthy();
  });

  test('GET /profile - authorized', async ({ request }) => {
    const login = await request.post('/api/login', {
      data: {
        email: 'user@example.com',
        password: 'Password123'
      }
    });

    expect(login.status()).toBe(200);
    
    const body = await login.json();
    const loginValidation = loginSuccessSchema.safeParse(body);
    expect(loginValidation.success).toBe(true);
    
    const { token } = body;

    const response = await request.get('/api/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    expect(response.status()).toBe(200);

    const profileBody = await response.json();
    const profileValidation = profileSuccessSchema.safeParse(profileBody);
    expect(profileValidation.success).toBe(true);
    expect(profileValidation.data?.email).toBe('user@example.com');
  });

});