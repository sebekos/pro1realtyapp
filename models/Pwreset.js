const mongoose = require('mongoose');

const PwresetSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    attempts: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Pwreset = mongoose.model('pwreset', PwresetSchema);