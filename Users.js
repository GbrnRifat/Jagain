const express = require('express');
const router = express.Router();
const db = require('./database');

router.get('/users', (req, res) => {
  db.getAllUsers((err, users) => {
    if (err) return res.status(500).send('Database error');
    res.json(users);
  });
});

router.get('/users/:id', (req, res) => {
  const sql = 'SELECT * FROM users WHERE user_id = ?';
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).send('Database error');
    if (results.length === 0) return res.status(404).send('User not found');
    res.json(results[0]);
  });
});

router.put('/users/:id', (req, res) => {
  const { name, email, password } = req.body;

  const sql = `
    UPDATE users SET name = ?, email = ?, password = ? WHERE user_id = ?
  `;
  db.query(sql, [name, email, password, req.params.id], (err, result) => {
    if (err) {
      console.error('User update error:', err);
      return res.status(500).send({ message: 'Update failed' });
    }
    res.send({ message: 'Profile updated' });
  });
});

router.put('/update-profile', (req, res) => {
  const { user_id, name, email, password } = req.body;

  if (!user_id) {
    return res.status(400).send({ message: 'User ID is required' });
  }

  const sql = `
    UPDATE users SET name = ?, email = ?, password = ? WHERE user_id = ?
  `;
  db.query(sql, [name, email, password, user_id], (err, result) => {
    if (err) {
      console.error('User update error:', err);
      return res.status(500).send({ message: 'Update failed' });
    }
    res.send({ message: 'Profile updated' });
  });
});

router.get('/profile/:id', (req, res) => {
  const user_id = req.params.id;

  if (!user_id) {
    return res.status(401).json({ error: 'User ID required' });
  }

  const query = 'SELECT name, email, password FROM users WHERE user_id = ?';
  db.query(query, [user_id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });

    const user = results[0];
    res.json({
      name: user.name,
      email: user.email,
      password: user.password,
    });
  });
});

router.get('/dashboard-info/:id', (req, res) => {
  const user_id = req.params.id;

  const userQuery = 'SELECT name FROM users WHERE user_id = ?';
  const passwordCountQuery = 'SELECT COUNT(*) AS total FROM stored_passwords WHERE user_id = ?';

  db.query(userQuery, [user_id], (err, userResult) => {
    if (err || userResult.length === 0) return res.status(500).json({ error: 'User not found' });

    db.query(passwordCountQuery, [user_id], (err, countResult) => {
      if (err) return res.status(500).json({ error: 'Failed to get password count' });

      res.json({
        name: userResult[0].name,
        passwordCount: countResult[0].total
      });
    });
  });
});


  
module.exports = router;
