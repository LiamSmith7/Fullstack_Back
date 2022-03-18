let mongoose = require("mongoose");

module.exports = mongoose.model("User", new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        pass: {
            type: String,
            required: true
        }
    }
));