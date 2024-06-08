const taskRouter = require('./task.route');
const userRouter = require('./user.route');

module.exports = (app) => {
    const verison = `/api/v1`;

    app.use(
        verison + '/tasks',
        taskRouter
    );

    app.use(
        verison + '/user',
        userRouter
    )
}