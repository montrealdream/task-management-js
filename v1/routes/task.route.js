//--------------- TASK ROUTER ---------------//
const express = require('express');

// create Router
const router = express.Router();

// controller
const controller = require('../../v1/controller/task.controller');

// validate
const taskValidate = require('../validate/task.validate');

// use
router.get('/', controller.index);

router.patch('/change-status/:taskId', controller.changeStatus);

router.patch('/change-multi', controller.changeMulti);

router.post(
    '/create',
    taskValidate.createTask,
    controller.createTask
);

router.get(
    '/detail/:taskId',
    controller.detail
);

router.patch(
    '/edit/:taskId',
    taskValidate.editTask,
    controller.edit
);


router.patch(
    '/deleteOne/:taskId',
    controller.deleteOne
);

router.patch(
    '/delete-multi',
    controller.deleteMulti
);
// export
module.exports = router; 