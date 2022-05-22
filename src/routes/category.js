const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();

const categoryController = require('../controllers/categoryController');
const validateToken = require('../middlewares/validateToken');
const validateCategory = require('../middlewares/validateCategory');

router.post('/', validateToken, validateCategory, rescue(categoryController.create));

router.get('/', validateToken, rescue(categoryController.getAll));

module.exports = router;