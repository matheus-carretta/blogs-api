const express = require('express');
const rescue = require('express-rescue');

const userController = require('../controllers/userController');
const validateUser = require('../middlewares/validateUser');

const router = express.Router();

router.post('/', validateUser, rescue(userController.create));

module.exports = router;