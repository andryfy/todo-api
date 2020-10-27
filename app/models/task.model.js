const sql = require('../../config/db');

// Constructor
const Task = function (task) {
    this.title = task.title;
    this.description = task.description;
    this.createdAt = new Date();
    this.doneAt = null;
    this.isDone = false
}

// result = cb

Task.create = (newTask, cb) => {
    sql.query("INSERT INTO tasks SET ?", newTask, (err, res) => {
        if (err) {
            console.log("insert task error: ", err);
            cb(err, null);
            return;
        }

        console.log("created task: ", { id: res.insertId, ...newTask });
        cb(null, { id: res.insertId, ...newTask });
    });
};

Task.getById = (taskId, cb) => {
    sql.query(`SELECT * FROM tasks WHERE id = ${taskId}`, (err, res) => {
        if (err) {
            console.log("get task error: ", err);
            cb(err, null);
            return;
        }

        if (res.length) {
            console.log("found task: ", res[0]);
            cb(null, res[0]);
            return;
        }

        // not found Customer with the id
        cb({ kind: "not_found" }, null);
    });
};


Task.getAll = cb => {
    sql.query("SELECT * FROM tasks", (err, res) => {
        if (err) {
            console.log("get all tasks error: ", err);
            cb(null, err);
            return;
        }
        console.log("tasks: ", res);
        cb(null, res);
    });
};

Task.update = (id, task, cb) => {
    sql.query(
        "UPDATE tasks SET title = ?, description = ? WHERE id = ?",
        [task.title, task.description, id],
        (err, res) => {
            if (err || res.affectedRows === 0) {
                console.log("update task error: ", err);
                cb(null, err);
                return;
            }
            console.log("updated task: ", { id: id, ...task });
            cb(null, true);
        }
    );
};

Task.done = (id, cb) => {
    sql.query(
        "UPDATE tasks SET isDone = true, doneAt = CURDATE() WHERE id = ?",
        [id],
        (err, res) => {
            if (err) {
                res.status(500).json({err_msg: err});
                cb(null, err);
                return ;
            }
            console.log("done task: ", { id: id });
            cb(null, { id: id});
        }
    );
};

Task.remove = (id, cb) => {
    sql.query("DELETE FROM tasks WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("delete task error: ", err);
            cb(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // not found Customer with the id
            cb({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted task with id: ", id);
        cb(null, res);
    });
};

module.exports = Task;
