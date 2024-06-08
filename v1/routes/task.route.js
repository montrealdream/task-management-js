//--------------- TASK ROUTER ---------------//
const express = require('express');

// create Router
const router = express.Router();

// controller
const controller = require('../../v1/controller/task.controller');

// use
router.get('/', controller.index);

router.patch('/change-status/:taskId', controller.changeStatus);

router.patch('/change-multi', controller.changeMulti);

router.post('/create', controller.createTask);

// export
module.exports = router; 