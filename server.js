const express = require('express');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const secretKey = 'mySecretKey';
const users = [{ username: 'user', password: 'password' }];

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Convert time route
app.post('/convert-time', authenticateToken, (req, res) => {
  const { timezone } = req.body;
  const convertedTime = moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss');
  res.json({ convertedTime });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
