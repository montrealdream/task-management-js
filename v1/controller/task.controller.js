const Task = require('../../v1/models/task.model');

// [GET] /api/v1/tasks
module.exports.index = async (req, res) => {
    try{
        const findObject = {
            deleted: false
        };

        // filter status of task
        if(req.query.status){
            findObject.status = req.query.status;
        }
        // end filter status of task

        // search keyword (~search according title)
        if(req.query.keyword){
            // regex
            const keyword = new RegExp(req.query.keyword, "i");
            // end regex

            findObject.title = keyword;
        }
        // end search keyword

        // sort citeria
        const sortObject = {};

        if(req.query.sortKey && req.query.sortValue){
            sortObject[req.query.sortKey] = req.query.sortValue;
        }
        // end sort citeria

        // count document in collection on DATABSE
        const documentLength = await Task.countDocuments(findObject);
        // end count document in collection on DATABSE

        // pagination
        const paginationObject = {
            limit: 2,  // limit item of one page
            current: 1 // current page 
        };

        if(req.query.page){
            paginationObject.current = parseInt(req.query.page);
        }

        paginationObject.skip = (paginationObject.current - 1) * paginationObject.limit; //skip item for page

        paginationObject.total = Math.ceil(documentLength/paginationObject.limit); // total page 
        // end pagination

        // get document
        const tasks = await Task.find(findObject)
                                .sort(sortObject)
                                .limit(paginationObject.limit)
                                .skip(paginationObject.skip);
        

        res.json(tasks);
    }
    catch(error){

    }
}

// [PATCH] /api/v1/tasks/change-status/:taskId
module.exports.changeStatus = async (req, res) => {
    try{
        const taskId = req.params.taskId;
        const status = req.body.status;

        const listStatus = ["initial", "doing", "finish", "pending", "notFinish"];

        if(listStatus.includes(status)){
            // change status
            await Task.updateOne(
                {_id: taskId}, 
                {
                    status: status
                }
            );
            // res.status(500).json({ error: 'message' })
            
            res.json({
                code: 200,
                message: "Cập nhật trạng thái thành công!"
            });
        }
        else{
            res.json({
                code: 200,
                message: "Trạng thái này không tồn tại"
            })
        }
       
    }
    catch(error){

    }
}

// [PATCH] /api/v1/tasks/change-multi
module.exports.changeMulti = async (req, res) => {
    try{
        const {ids, status} = req.body;
        
        const listStatus = ["initial", "doing", "finish", "pending", "notFinish"];

        if(listStatus.includes(status)){
             // update
            await Task.updateMany(
                {
                    _id: {$in: ids},
                },{
                    status: status
                }
            );

            res.json({
                code: 200,
                message: "Đổi trạng thái nhiều công việc thành công"
            });
        }
        else{
            res.json({
                code: 404,
                message: "Trạng thái này không tồn tại"
            });
        }
       
    }
    catch(error){

    }
}

// [POST] /api/v1/tasks/create
module.exports.createTask = async (req, res) => {
    try{
        const objTask = {
            title: req.body.title,
            status: "initial", //default ,
            // chưa có time start
        }

        const task = new Task(objTask);
        await task.save();

        res.json({
            code: 200,
            message: "Tạo mới một công việc thành công"
        });
    }
    catch(error){

    }
}

// [GET /api/v1/tasks/detail/:taskId
module.exports.detail = async (req, res) => {
    try{
        const taskId = req.params.taskId;

        // get task
        const task = await Task.findOne({
            _id: taskId,
            deleted: false
        }).select("-deleted");

        console.log(task);
        res.json({
            code: 200,
            message: "Lấy ra chi tiết công việc thành công",
            task
        })
    }
    catch(error){

    }
}

// [PATCH] /api/v1/tasks/edit/:taskId
module.exports.edit = async (req, res) => {
    try{
        const taskId = req.params.taskId;
        
        const listStatus = ["initial", "doing", "finish", "pending", "notFinish"];

        if(req.body.timeStart){
            res.json({
                code: 404,
                message: "Không được chỉnh sửa thời gian bắt đầu công việc"
            });
        }

        // wrong stauts of task
        if(!listStatus.includes(req.body.status)){
            res.json({
                code: 404,
                message: "Trạng thái công việc không hợp lệ"
            });
            return;
        }

        await Task.updateOne(
            {_id: taskId},
            req.body
        );

        res.json({
            code: 200,
            message: "Chỉnh sửa công việc thành công"
        });


    }
    catch(error){

    }
}