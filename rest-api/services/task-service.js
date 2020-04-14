const Task = require('../model/task');
const mongoose = require('mongoose');

class TaskService {

    async create(task) {
        const taskModel = new Task({
            date: task.date,
            note: task.note,
            workingHours: task.workingHours,
            userId: task.userId
        });

        return await taskModel.save();
    }

    async update(task) {
        const taskData = {
            date: task.date,
            note: task.note,
            workingHours: task.workingHours
        };

        return await Task.updateOne({_id: task.id}, taskData, {upsert: true}).exec();
    }

    async get(id) {
        return await Task.findOne({ _id: id }).exec();
    }

    async getByUser(userId, dateFrom, dateTo) {

    }

    async deleteTask(taskId) {
        return await Task.findOneAndDelete({_id: taskId}).exec();
    }

    async getForUser(userId) {
        const id = mongoose.Types.ObjectId(userId);
        return await Task.aggregate([
            { $match: { userId: id } },
            { $group: { 
                _id: '$date', 
                totalWorkingHours: { $sum: '$workingHours' },
                docs: { '$push': { _id: '$_id', note: '$note', workingHours: '$workingHours', userId: '$userId' } }
            }},
            { $sort: { _id: -1 } }
        ]);
    }

}

module.exports = new TaskService();