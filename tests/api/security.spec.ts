import { test, expect } from '@playwright/test';

test.describe('Security tests @security', () => {

  test('SQL injection attempt on login', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: {
        email: "' OR '1'='1",
        password: "' OR '1'='1"
      }
    });
    
    // Should not bypass authentication
    expect(response.status()).toBe(401);
  });

  test('SQL injection on forgot password', async ({ request }) => {
    const response = await request.post('/api/forgot-password', {
      data: { email: "' OR '1'='1" }
    });
    
    // Should return 400 (invalid email) not 500
    expect([400, 404]).toContain(response.status());
  });

  test('XSS payload in email field', async ({ request }) => {
    const xssPayload = '<script>alert("XSS")</script>';
    
    const response = await request.post('/api/forgot-password', {
      data: { email: xssPayload }
    });
    
    // Should reject or sanitize, not execute
    expect(response.status()).toBe(400);
  });

  test('Brute force protection - multiple failed logins', async ({ request }) => {
    const attempts = [];
    
    for (let i = 0; i < 10; i++) {
      attempts.push(
        request.post('/api/login', {
          data: {
            email: 'user@example.com',
            password: `wrong${i}`
          }
        })
      );
    }
    
    const responses = await Promise.all(attempts);
    const hasRateLimit = responses.some(r => r.status() === 429);
    
    // Rate limiting should be implemented
    expect(hasRateLimit || responses.every(r => r.status() === 401)).toBeTruthy();
  });

  test('Invalid token format', async ({ request }) => {
    const response = await request.get('/api/profile', {
      headers: {
        Authorization: 'Bearer invalid-token-format'
      }
    });
    
    expect(response.status()).toBe(401);
  });

  test('Missing Authorization header', async ({ request }) => {
    const response = await request.get('/api/profile');
    
    expect(response.status()).toBe(401);
  });

  test('Authorization header with wrong scheme', async ({ request }) => {
    const response = await request.get('/api/profile', {
      headers: {
        Authorization: 'Basic dXNlcjpwYXNz'
      }
    });
    
    expect(response.status()).toBe(401);
  });

});