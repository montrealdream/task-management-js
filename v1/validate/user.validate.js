// [POST] /api/v1/user/register
module.exports.register = async (req, res, next) => {
    if(!req.body.fullName){
        res.json({
            code: 404,
            message: "Vui lòng điền đầy đủ họ tên"
        });
        return;
    }

    if(!req.body.email){
        res.json({
            code: 404,
            message: "Vui lòng điền email"
        });
        return;
    }

    if(!req.body.password){
        res.json({
            code: 404,
            message: "Không được để trống password"
        });
        return;
    }

    // next middleware
    next();
}

// [POST] /api/v1/user/login
module.exports.login = async (req, res, next) => {
    if(!req.body.email){
        res.json({
            code: 404,
            message: "Vui lòng nhập email"
        });
        return;
    }

    if(!req.body.password){
        res.json({
            code: 404,
            message: "Vui lòng nhập mật khẩu"
        });
        return;
    }

    // next middlware
    next();
}

// [POST] /api/v1/user/password/forgot
module.exports.forgotPassword = (req, res, next) => {
    if(!req.body.email){
        res.json({
            code: 404,
            message: "Vui lòng nhập email"
        });
        return;
    }

    // next middleware
    next();
}


// [POST] /api/v1/user/password/otp
module.exports.otpPassword = (req, res, next) => {
    if(!req.body.email){
        res.json({
            code: 404,
            message: "Có người bật devtool xóa email"
        });
        return;
    }

    if(!req.body.otp){
        res.json({
            code: 404,
            message: "Vui lòng nhập mã otp"
        });
        return;
    }

    // next middleware
    next();
}

// [POST] /api/v1/user/password/reset
module.exports.resetPassword = (req, res, next) => {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if(!password){
        res.json({
            code: 404,
            message: "Vui lòng nhập mật khẩu"
        });
        return;
    }

    if(!confirmPassword){
        res.json({
            code: 404,
            message: "Vui lòng xác nhận lại mật khẩu"
        });
        return;
    }

    if(confirmPassword != password){
        res.json({
            code: 404,
            message: "Mật khẩu xác nhận không tương thích"
        });
        return;
    }

    // next middleware
    next();
}