const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
    listdate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    bedroom: {
        type: Number
    },
    bathroom: {
        type: Number
    },
    squarefeet: {
        type: Number
    },
    description: {
        type: String
    },
    agentid: {
        type: String
    },
    mainphoto: {
        type: String
    },
    photos: {
        type: [String]
    },
    agentid: {
        type: String,
        required: true
    },
    active: {
        type: String,
        default: 1
    }
});

module.exports = Listing = mongoose.model('listing', ListingSchema);