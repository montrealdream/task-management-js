//--------------- USER ROUTER ---------------//
const express = require('express');

// create Router
const router = express.Router();

// controller
const controller = require('../../v1/controller/user.controlle');

// // use
router.post('/register', controller.register);

// export
module.exports = router;