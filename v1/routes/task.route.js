//--------------- TASK ROUTER ---------------//
const express = require('express');

// create Router
const router = express.Router();

// controller
const controller = require('../../v1/controller/task.controller');

// use
router.get('/', controller.index);

// export
module.exports = router; 