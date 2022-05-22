const express = require('express');

const router = express.Router();

const validatePost = require('../middlewares/validatePost');

router.post('/', validatePost);

module.exports = router;