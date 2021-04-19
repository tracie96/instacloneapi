const express = require('express')
const router = express.Router()
const userController = require('../controller/user.controller')
const requireLogin = require('../middleware/requireLogin')

router.route('/').post(userController.create);
router.route('/signin').post(userController.signin);
router.route('/protected').get(requireLogin,userController.protected);

module.exports = router;