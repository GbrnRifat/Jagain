const express = require('express');
const router = express.Router();
const db = require('../db');
const crypto = require('crypto');
const { ENCRYPTION_KEY, IV_LENGTH } = require('../config');

function encrypt(text) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text, 'utf8');
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
    if (!text || typeof text !== 'string' || !text.includes(':')) {
        console.warn('Invalid or missing encrypted text for decryption.');
        return '[DECRYPTION_ERROR]';
    }

    try {
        const [ivHex, encryptedHex] = text.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const encryptedText = Buffer.from(encryptedHex, 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString('utf8');
    } catch (err) {
        console.error('Decryption failed:', err.message);
        return '[DECRYPTION_ERROR]';
    }
}

router.post('/', (req, res) => {
    const { user_id, entry_name, entry_username, etalase, entry_password } = req.body;
    const encryptedPassword = encrypt(entry_password);

    const sql = 'INSERT INTO stored_passwords (user_id, entry_name, entry_username, etalase, entry_password) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [user_id, entry_name, entry_username, etalase, encryptedPassword], (err, result) => {
        if (err) {
            console.error('Insert Error:', err);
            res.status(500).send({ error: 'Database insert error' });
        } else {
            res.send({ message: 'Password stored successfully!', id: result.insertId });
        }
    });
});

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM stored_passwords';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Get Error:', err);
            res.status(500).send({ error: 'Database query error' });
        } else {
            const decryptedResults = results.map(row => ({
                ...row,
                entry_password: decrypt(row.entry_password)
            }));
            res.json(decryptedResults);
        }
    });
});

router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM stored_passwords WHERE stored_id = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).send({ error: 'Entry not found' });
        }

        const decrypted = {
            ...results[0],
            entry_password: decrypt(results[0].entry_password)
        };
        res.json(decrypted);
    });
});

router.put('/:id', (req, res) => {
    const { entry_name, entry_username, etalase, entry_password } = req.body;
    const encryptedPassword = encrypt(entry_password);

    const sql = 'UPDATE stored_passwords SET entry_name = ?, entry_username = ?, etalase = ?, entry_password = ? WHERE stored_id = ?';
    db.query(sql, [entry_name, entry_username, etalase, encryptedPassword, req.params.id], (err, result) => {
        if (err) {
            console.error('Update Error:', err);
            res.status(500).send({ error: 'Database update error' });
        } else {
            res.send({ message: 'Password updated successfully!' });
        }
    });
});

router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM stored_passwords WHERE stored_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error('Delete Error:', err);
            res.status(500).send({ error: 'Database delete error' });
        } else {
            res.send({ message: 'Password deleted successfully!' });
        }
    });
});

module.exports = router;
