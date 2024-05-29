const mongoose = require('mongoose');

// defining shema
const TaskSchema = new mongoose.Schema(
    {
        title: String,
        status: String,
        content: String,
        timeStart: String,
        timeFinish: String,
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date
    },
    {
        timestamps: true
    }
);

// create model
const Task = mongoose.model('Task', TaskSchema, 'tasks');

// export
module.exports = Task;
