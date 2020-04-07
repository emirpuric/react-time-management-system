const Task = require('../model/task');

class TaskService {

    async create(task) {
        let taskModel = new Task(task);
        await taskModel.save();
        return task;
    }

    async update(task) {
        
    }

    async get(id) {
        await Task.findOne({ _id: id }, (error, task) => {
            if (error) {
                throw error;
            } else {
                return task;
            }
        });
    }

    async getByUser(userId, dateFrom, dateTo) {

    }

}

module.exports = new TaskService();