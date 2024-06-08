const mongoose = require('mongoose');

// defining shema
const UserSchema = new mongoose.Schema(
    {
        fullName: String,
        email: String,
        avatar: String,
        tel: String,
        tokenUser: String,
        password: String,
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date
    },
    {
        timestamps: true
    }
);

// create model
const User = mongoose.model('User', UserSchema, 'user');

// export
module.exports = User;
