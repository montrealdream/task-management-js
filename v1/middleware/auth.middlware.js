// model
const User = require('../models/user.model');

module.exports.requireAuth = async (req, res, next) => {
    if(!req.headers.authorization){
        res.json({
            code: 404,
            message: "Vui lòng gửi kèm token"
        });
        return;
    }
    // get token user
    const tokenUser = req.headers.authorization.split(' ')[1];
    
    const user = await User.findOne({
        tokenUser: tokenUser,
        deleted: false
    }).select("fullName email");

    if(!user){
        res.json({
            code: 404,
            message: "Không tìm thấy user với token này"
        });
        return;
    }

    // respone
    res.locals.user = user;

    // next middlware
    next();
}