const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    user: {
        type: String,
        ref: "user"
    },
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true,
        default: "Agent"
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
    photo: {
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

module.exports = Profile = mongoose.model("profile", ProfileSchema);
