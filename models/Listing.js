const mongoose = require("mongoose");

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
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zipcode: {
        type: String
    },
    price: {
        type: Number
    },
    soldprice: {
        type: String
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
        type: String,
        required: true
    },
    mainphoto: {
        type: String
    },
    photos: {
        type: [String]
    },
    active: {
        type: String,
        default: 1
    }
});

module.exports = Listing = mongoose.model("listing", ListingSchema);
