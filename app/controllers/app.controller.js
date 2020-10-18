const Task = require('../models/task.model');

exports.getAllTasks = (req, res) => {
    Task.getAll((err, results) => {
       if (err)
           return res.status(500).json({
               error_msg: err
           });
       return res.status(200).json(results);
    });
}


exports.getTaskById = (req, res) => {
    Task.getById(req.params.taskId, (err, result) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).json({
                    error_msg: `Not found task with id ${req.params.taskId}.`
                });
            } else {
                return res.status(500).json({
                    error_msg: "Error retrieving task with id " + req.params.taskId
                });
            }
        } else res.json(result);
    });

};

exports.createTask = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).json({
            error_msg: "Content can not be empty!"
        });
    }

    // Create a Customer
    const newTask = new Task({
        title: req.body.title,
        description: req.body.description
    });

    // Save Customer in the database
    Task.create(newTask, (err, result) => {
        if (err)
            return res.status(500).json({
                error_msg: err.message || "Some error occurred while creating the task."
            });
        return res.json(result);
    });
};


exports.updateTask = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).json({
            error_msg: "Content can not be empty!"
        });
    }

    Task.update(req.params.taskId, new Task(req.body), (err, result) => {
            if (err) {
                if (err.kind === "not_found") {
                    return res.status(404).json({
                        error_msg: `Not found task with id ${req.params.taskId}.`
                    });
                } else {
                    return res.status(500).json({
                        error_msg: "Error updating task with id " + req.params.taskId
                    });
                }
            }
            return res.json(result);
        }
    );
};


exports.deleteTask = (req, res) => {
    Task.remove(req.params.taskId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).json({
                    error_msg: `Not found Customer with id ${req.params.taskId}.`
                });
            } else {
                return res.status(500).json({
                    error_msg: "Could not delete task with id " + req.params.customerId
                });
            }
        }
        return res.send({ success_message: `task was deleted successfully!` });
    });
};
