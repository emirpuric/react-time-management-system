const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        max: 100
    },
    lastName: {
        type: String,
        max: 100
    },
    username: { 
        type: String, 
        required: true, 
        max: 100 
    },
    password: { 
        type: String,
        required: true, 
        max: 100 
    },
    preferredWorkingHoursPerDay: { 
        type: Number, 
        required: true,
        min: 0,
        default: 0 
    },
    roles: { 
        type: Number, 
        required: true, 
        default: 1, 
        validate: {  
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        } 
    }
});

module.exports = mongoose.model('User', userSchema);