const express = require('express');
const TaskController = require('../controllers/app.controller');

exports.router = (function () {
    let router = express.Router();

    router.route('/all').get(TaskController.getAllTasks);
    router.route('/new').post(TaskController.createTask);
    router.route('/show/:id').get(TaskController.getTaskById);
    router.route('/done/:id').put(TaskController.doneTask);
    router.route('/update/:id').put(TaskController.updateTask);
    router.route('/delete/:id').delete(TaskController.deleteTask);

    return router;
})();
