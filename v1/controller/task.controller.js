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

        // sort citeria
        const sortObject = {};

        if(req.query.sortKey && req.query.sortValue){
            sortObject[req.query.sortKey] = req.query.sortValue;
        }

        const tasks = await Task.find(findObject)
                                .sort(sortObject);

        res.json(tasks);
    }
    catch(error){

    }
}