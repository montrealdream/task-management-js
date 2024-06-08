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