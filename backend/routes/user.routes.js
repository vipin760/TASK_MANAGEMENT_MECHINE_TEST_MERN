const express = require('express');
const { userRegister, userLogin } = require('../controller/user.controller');
const router = express()

router.route("/register").post(userRegister)
router.route("/login").post(userLogin);

module.exports = router