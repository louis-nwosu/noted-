const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    bio: {
        type: String,
    },
    password: {
        required: true,
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    noted: {
        type: Array,
        default: [{
            title: 'testing',
            descrition: 'more test'
        }]
    }
});

module.exports = mongoose.model('MyUser', userSchema);