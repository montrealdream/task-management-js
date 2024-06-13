module.exports.requireAuth = async (req, res, next) => {
    // get token user
    // const tokenUser = req.headers.authorization.split(' ')[1];
    
    // next middlware
    next();
}