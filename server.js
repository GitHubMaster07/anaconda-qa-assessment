const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(express.json()); // Parse JSON request bodies for API
app.use(express.static('public'));

// ========== API ENDPOINTS ==========

// Login endpoint - returns JWT token for valid credentials
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Missing fields
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }

  // Valid credentials (hardcoded for test purposes)
  if (email === 'user@example.com' && password === 'Password123') {
    return res.status(200).json({ token: 'fake-jwt-token-12345' });
  }

  // Invalid credentials
  return res.status(401).json({ error: 'Invalid credentials' });
});

// Forgot password endpoint - sends reset link
app.post('/api/forgot-password', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  if (!email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  return res.status(200).json({ message: 'Password reset link sent' });
});

// Profile endpoint - returns user data for authenticated requests
app.get('/api/profile', (req, res) => {
  const auth = req.headers.authorization;

  // No token provided
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = auth.split(' ')[1];

  // Invalid token
  if (token !== 'fake-jwt-token-12345') {
    return res.status(401).json({ error: 'Invalid token' });
  }

  // Valid token - return user profile
  return res.status(200).json({ 
    id: 1, 
    email: 'user@example.com', 
    name: 'Test User' 
  });
});

// ========== UI ENDPOINTS ==========

// Main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Challenge pages
app.get('/challenge1.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/challenge1.html'));
});

app.get('/challenge2.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/challenge2.html'));
});

app.get('/challenge3.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/challenge3.html'));
});

app.get('/challenge4.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/challenge4.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`API available at http://localhost:${port}/api/`);
});