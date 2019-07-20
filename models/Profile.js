const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    position: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    active: {
        type: String,
        default: 1
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);