const mongoose = require("mongoose");

const OfficeSchema = new mongoose.Schema({
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
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    }
});

module.exports = Office = mongoose.model("office", OfficeSchema);
