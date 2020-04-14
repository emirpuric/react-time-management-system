const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    note: {
        type: String, 
        required: true, 
        max: 100
    },
    workingHours: {
        type: Number,
        required: true,
        min: 0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
});

module.exports = mongoose.model('Task', taskSchema);