const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();

const validatePost = require('../middlewares/validatePost');
const validateUpdatePost = require('../middlewares/validateUpdatePost');
const validateToken = require('../middlewares/validateToken');
const postController = require('../controllers/postController');

router.post('/', validateToken, validatePost, rescue(postController.create));

router.get('/', validateToken, rescue(postController.getAll));

router.get('/:id', validateToken, rescue(postController.getById));

router.put('/:id', validateToken, validateUpdatePost, rescue(postController.update));

router.delete('/:id', validateToken, rescue(postController.destroy));

module.exports = router;