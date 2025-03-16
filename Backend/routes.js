const express = require('express');
const router = express.Router();
const db = require('./database');

// Obtener todos los usuarios
router.get('/personas', (req, res) => {
  db.all('SELECT * FROM persona', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});



module.exports = router;