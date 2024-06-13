const taskRouter = require('./task.route');
const userRouter = require('./user.route');

// middlware
const authMiddleware = require('../middleware/auth.middlware');

module.exports = (app) => {
    const verison = `/api/v1`;

    app.use(
        verison + '/tasks',
        authMiddleware.requireAuth,
        taskRouter
    );

    app.use(
        verison + '/user',
        userRouter
    )
}