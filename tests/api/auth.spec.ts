import { test, expect } from '@playwright/test';

test.describe('Auth API', () => {

  test('GET /profile - unauthorized', async ({ request }) => {
    const response = await request.get('/api/profile');

    expect(response.status()).toBe(401); // should require token
  });

  test('GET /profile - authorized', async ({ request }) => {
    // login first
    const login = await request.post('/api/login', {
      data: {
        email: 'user@example.com',
        password: 'Password123'
      }
    });

    const { token } = await login.json();

    const response = await request.get('/api/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    expect(response.status()).toBe(200);
  });

});
