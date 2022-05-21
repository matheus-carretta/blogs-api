const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();

const loginController = require('../controllers/loginController');
const { validateLogin } = require('../middlewares/validateLogin');

router.post('/', validateLogin, rescue(loginController.login));

module.exports = router;