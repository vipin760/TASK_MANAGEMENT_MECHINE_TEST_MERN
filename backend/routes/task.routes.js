const express = require('express')
const { createTask } = require('../controller/task.controller')
const router = express()

router.route('/').post(createTask)


module.exports = router