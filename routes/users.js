// routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE user
router.post('/', (req, res) => {
  const { name, email, phone } = req.body;
  const sql = 'INSERT INTO userdetails (name, email, phone) VALUES (?, ?, ?)';
  db.query(sql, [name, email, phone], (err, result) => {
    if (err) throw err;
    res.json({ message: 'User added', id: result.insertId });
  });
});

// READ all users
router.get('/', (req, res) => {
  db.query('SELECT * FROM userdetails', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// UPDATE user
router.put('/:id', (req, res) => {
  const { name, email, phone } = req.body;
  const sql = 'UPDATE userdetails SET name = ?, email = ?, phone = ? WHERE id = ?';
  db.query(sql, [name, email, phone, req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: 'User updated' });
  });
});

// DELETE user
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM userdetails WHERE id = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: 'User deleted' });
  });
});

module.exports = router;
