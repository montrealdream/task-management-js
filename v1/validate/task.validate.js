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

// [PATCH] /api/v1/task/edit/:taskId
module.exports.editTask = async (req, res, next) => {
    try{
        if(!req.body.title){
            res.json({
                code: 404,
                message: "vui lòng điền tiêu đề công việc"
            });
            return;
        }

        // next middleware
        next();
    }
    catch(error){

    }
}