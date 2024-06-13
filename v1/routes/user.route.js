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
    controller.register
);

router.post(
    '/login',
    controller.login
);

router.post(
    '/password/forgot',
    controller.forgotPassword
);


router.post(
    '/password/otp',
    controller.otpPassword
);

router.post(
    '/password/reset',
    controller.resetPassword
);

// export
module.exports = router;