const express = require('express');
const router = express.Router();
const db = require('../db');

// READ profile by user ID
router.get('/:id', (req, res) => {
    const userId = req.params.id;
    db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json(results[0]);
    });
});

// UPDATE profile
router.put('/:id', (req, res) => {
    const userId = req.params.id;
    const { name, email, username } = req.body;

    db.query(
        'UPDATE users SET name = ?, email = ?, username = ? WHERE id = ?',
        [name, email, username, userId],
        (err, results) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: 'Profile updated successfully' });
        }
    );
});

// DELETE profile
router.delete('/:id', (req, res) => {
    const userId = req.params.id;
    db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'User deleted successfully' });
    });
});

module.exports = router;
