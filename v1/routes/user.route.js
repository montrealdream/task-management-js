//--------------- USER ROUTER ---------------//
const express = require('express');

// create Router
const router = express.Router();

// controller
const controller = require('../../v1/controller/user.controlle');

// validate
const userValidate = require('../validate/user.validate');

// // use
router.post(
    '/register',
    userValidate.register,
    controller.register
);

router.post(
    '/login',
    userValidate.login,
    controller.login
);

// export
module.exports = router;