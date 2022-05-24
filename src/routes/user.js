const express = require('express');
const rescue = require('express-rescue');

const userController = require('../controllers/userController');
const validateToken = require('../middlewares/validateToken');
const validateUser = require('../middlewares/validateUser');

const router = express.Router();

router.post('/', validateUser, rescue(userController.create));

router.get('/', validateToken, rescue(userController.getAll));

router.delete('/me', validateToken, rescue(userController.destroyMe));

router.get('/:id', validateToken, rescue(userController.getById));

module.exports = router;