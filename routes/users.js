const express = require('express');
const router = express.Router();
const db = require('../db');

// Example route to fetch users
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users'); // Replace with your table name
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
