const express = require('express');
const TaskController = require('../controllers/app.controller');

exports.router = (function () {
    let router = express.Router();

    router.route('/').get(TaskController.getAllTasks).post(TaskController.createTask);
    router.route('/:taskId').get(TaskController.getTaskById).put(TaskController.updateTask).delete(TaskController.deleteTask);

    return router;
})();