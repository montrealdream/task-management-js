const taskRouter = require('./task.route');

module.exports = (app) => {
    const verison = `/api/v1`;

    app.use(
        verison + '/tasks',
        taskRouter
    );
}