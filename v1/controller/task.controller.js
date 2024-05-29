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
    catch(error){

    }
}