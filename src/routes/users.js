const express = require('express');

const router = express.Router();

router.post('/login', (req, res) => {
  console.log('Testando router');
  return res.status(201).json({ message: 'teste!' });
});

module.exports = router;