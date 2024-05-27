const mongoose = require("mongoose")

const adminSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["ADMIN", "VENDOR"]
    }
})

module.exports = mongoose.model("Admin", adminSchema)