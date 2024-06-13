//--------------- TASK ROUTER ---------------//
const express = require('express');

// create Router
const router = express.Router();

// controller
const controller = require('../../v1/controller/task.controller');

// validate
const taskValidate = require('../validate/task.validate');

// middlware
const authMiddleware = require('../middleware/auth.middlware');
// use
router.get('/', controller.index);

router.patch(
    '/change-status/:taskId',
    authMiddleware.requireAuth,
    controller.changeStatus
);

router.patch(
    '/change-multi', 
    authMiddleware.requireAuth,
    controller.changeMulti
);

router.post(
    '/create',
    authMiddleware.requireAuth,
    taskValidate.createTask,
    controller.createTask
);

router.get(
    '/detail/:taskId',
    controller.detail
);

router.patch(
    '/edit/:taskId',
    authMiddleware.requireAuth,
    taskValidate.editTask,
    controller.edit
);


router.patch(
    '/deleteOne/:taskId',
    authMiddleware.requireAuth,
    controller.deleteOne
);

router.patch(
    '/delete-multi',
    authMiddleware.requireAuth,
    controller.deleteMulti
);
// export
module.exports = router; 