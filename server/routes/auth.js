const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const maxLoginAttempts = 3; 
const loginAttempts = new Map(); 

const hardcodedUsers = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];

const secretKey = 'your-secret-key';

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (loginAttempts.has(username) && loginAttempts.get(username) >= maxLoginAttempts) {
    return res.status(401).json({ message: 'Account is blocked. Please contact support.' });
  }

  const user = hardcodedUsers.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    const attempts = loginAttempts.get(username) || 0;
    loginAttempts.set(username, attempts + 1);

    if (attempts + 1 >= maxLoginAttempts) {
      return res.status(401).json({ message: 'Account is blocked. Please contact support.' });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
  }

  loginAttempts.delete(username);

  const token = jwt.sign({ userId: user.id }, secretKey);

  res.json({ token });
  
});

router.post('/logout', (req, res) => {

    res.json({ message: 'Logout successful' });
  });

module.exports = router;
