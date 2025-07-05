const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 🔧 Replace these with your actual RDS credentials
const db = mysql.createConnection({
  host: 'localhost', // or your RDS endpoint
  user: 'admin',
  password: 'password',
  database: 'login_app'
});

// ✅ GET route for ALB health checks
app.get('/api/health', (req, res) => {
  res.status(200).send('OK');
});

// ✅ Login POST endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE username = ? AND password = ?', 
    [username, password], 
    (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length > 0) res.sendStatus(200);
      else res.sendStatus(401);
    });
});

// Start the server
app.listen(4000, () => {
  console.log('Backend running on port 4000');
});
