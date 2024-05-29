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

        const task = await Task.find(findObject);

        res.json(task);
    }
    catch(error){

    }
}