// model
const User = require('../models/user.model');

const bcrypt = require('bcrypt'); //hashing password
const saltRounds = 10; // Typically a value between 10 and 12

// helper
const generateHelper = require('../helper/generate.helper');

// [POST] /api/v1/user/register
module.exports.register = async (req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;

        const existEmail = await User.findOne({
            email: email,
            deleted: false
        });

        if(existEmail){
            res.json({
                code: 404,
                message: "Email đã tồn tại"
            });
            return;
        }

        

        // hashing password with bcrypt
        bcrypt.genSalt(saltRounds, (error, salt) => {
            bcrypt.hash(password, salt, async (error, hash) => {
                // Store hash in your password DB.
                const objUser = {
                    fullName: req.body.fullName,
                    email: email,
                    tokenUser: generateHelper.randomString(20),
                    password: hash
                };
                
                const user = new User(objUser);
                await user.save();
            });
        });
        


        res.json({
            code: 200,
            message: "Tạo tài khoản thành công"
        });


    }
    catch(error){

    }
}