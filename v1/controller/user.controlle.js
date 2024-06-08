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

// [POST] /api/v1/user/login
module.exports.login = async (req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({
            email: email,
        });

        if(!user){
            res.json({
                code: 404,
                message: "Email không tồn tại"
            });
            return;
        }

        if(user.deleted == true){
            res.json({
                code: 404,
                message: "Tài khoản đã bị xóa"
            });
            return;
        }

        // compare password 
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                // Handle error
                console.error('Error comparing passwords:', err);
                return;
            }
        
        if (result) {
            // Passwords match, authentication successful
            console.log('Passwords match! User authenticated.');
            res.json({
                code: 200,
                message: "Đăng nhập thành công",
                token: user.tokenUser
            });
        } else {
            // Passwords don't match, authentication failed
            console.log('Passwords do not match! Authentication failed.');
            res.json({
                code: 404,
                message: "Mật khẩu không chính xác",
            });
        }
        });
    }
    catch(error){

    }
}