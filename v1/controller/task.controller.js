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

        // sort citeria
        const sortObject = {};

        if(req.query.sortKey && req.query.sortValue){
            sortObject[req.query.sortKey] = req.query.sortValue;
        }

        // count document in collection on DATABSE
        const documentLength = await Task.countDocuments(findObject);

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

        const tasks = await Task.find(findObject)
                                .sort(sortObject)
                                .limit(paginationObject.limit)
                                .skip(paginationObject.skip);
        // end sort citeria

        res.json(tasks);
    }
    catch(error){

    }
}