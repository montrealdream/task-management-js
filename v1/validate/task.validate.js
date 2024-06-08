// [POST] /api/v1/tasks/create
module.exports.createTask = async (req, res, next) => {
    try{
        if(!req.body.title){
            res.json({
                code: 404,
                message: "Vui lòng nhập tiêu đề công việc"
            });
            return;
        }

        // next middleware
        next();
    }
    catch(error){

    }
}