const Feedback = require("../models/feedback.model.js")

const sendFeedback = async (req, res) => {
    const {email, name, message} = req.body;

    if(!email | !name | !message){
        return res.status(404).json({
            message: "All fields are required"
        })
    }

    await Feedback.create({
        email,
        name,
        message
    })

    return res.status(201).json({message: "Feedback submitted."})
}

const getFeedbacks = async (req, res) => {
    const feedbacks = await Feedback.find();

    return res.status(200).json({
        feedbacks})

}

module.exports = {
    sendFeedback,
    getFeedbacks
}