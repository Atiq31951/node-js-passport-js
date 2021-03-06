const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: false,
        default: '01XXXXXXXXX',
        unique: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', UserSchema)
module.exports = User