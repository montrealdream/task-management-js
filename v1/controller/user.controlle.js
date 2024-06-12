// model
const User = require('../models/user.model');
const ForgotPassword = require('../models/forgot-password.model');

const bcrypt = require('bcrypt'); //hashing password
const saltRounds = 10; // Typically a value between 10 and 12

// helper
const generateHelper = require('../helper/generate.helper');
const mailHelper = require('../helper/mail.helper');

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

// [POST] /api/v1/user/password/forgotPassword
module.exports.forgotPassword = async (req, res) => {
    try{
        const email = req.body.email;

        const user = await User.findOne({
            email: email,
            deleted: false
        }).select("-password");

        if(!user){
            res.json({
                code: 404,
                message: "Email không tồn tại"
            });
            return;
        }

        // STEP 1: CREATE OTP & SAVE ON DB
        const objForgotPassword = {
            email: email,
            otp: generateHelper.randomNums(6),
            expireAt: Date.now() + (1*60*1000), // 1000ms * 60 * 1 = 1m
        }

        const record = new ForgotPassword(objForgotPassword);
        await record.save();

        // STEP 2: SEND MAIL
        const subjectEmail = 'Mã OTP xác minh lấy lại mật khẩu';
        const content = `
            Mã OTP xác minh lấy lại mật khẩu là: <b>${objForgotPassword.otp}</b>
            <br>
            Lưu ý: mã OTP chỉ có thời hạn trong 3 phút
        `   
        mailHelper.sendMail(email, subjectEmail, content);


        res.json({
            code: 200,
            message: "Đã gửi mail nhận mã OTP, hãy check mail"
        });
    }
    catch(error){
        console.log(error);
    }
}


// [POST] /api/v1/user/password/otp
module.exports.otpPassword = async (req, res) => {
    try{
        const {email, otp} = req.body;
        
        // cần get thêm cookie có xem đúng trên thiết bị yêu cầu không

        const isValid = await ForgotPassword.findOne({
            email: email,
            otp: otp
        });

        // wrong otp
        if(!isValid){
            res.json({
                code: 404,
                message: "Mã OTP không chính xác hãy kiểm tra lại"
            });
            return;
        }

        const user = await User.findOne({
            email: email
        }).select("-password");

    
        res.json({
            code: 200,
            message: "Nhập mã OTP thành công",
            token: user.tokenUser
        });
    }
    catch(error){

    }
}