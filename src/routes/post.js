const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();

const validatePost = require('../middlewares/validatePost');
const validateToken = require('../middlewares/validateToken');
const postController = require('../controllers/postController');

router.post('/', validateToken, validatePost, rescue(postController.create));

router.get('/', validateToken, rescue(postController.getAll));

module.exports = router;