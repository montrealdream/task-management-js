const mongoose = require('mongoose');

// defining shema
const ForgotPasswordSchema = new mongoose.Schema(
    {
        email: String,
        otp: String,
        expireAt: {
            type: Date,  
            expires: 0 //second
        }
    }
);

// create model
const ForgotPassword = mongoose.model('ForgotPassword', ForgotPasswordSchema, 'forgot-password');

// export
module.exports = ForgotPassword;
