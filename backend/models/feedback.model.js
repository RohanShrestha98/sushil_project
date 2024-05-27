const mongoose = require("mongoose")

const feedbackSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})


const Feedback = mongoose.model("Feedback", feedbackSchema)


module.exports = Feedback