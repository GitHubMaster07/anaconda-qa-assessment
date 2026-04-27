import { test, expect } from '@playwright/test';

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
    expect(body.token).toBeTruthy();
  });

  test('POST /login - invalid password', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: {
        email: 'user@example.com',
        password: 'wrong'
      }
    });

    expect(response.status()).toBe(401);
  });

  test('POST /login - missing fields', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: {}
    });

    expect(response.status()).toBe(400);
  });

});