const nodemailer = require('nodemailer')

const sendEmail = async (email, subject, message) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_USER,
            port: 587,
            service: "gmail",
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls:{
                rejectUnauthorized: false
            }
        });
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: message,
        });
        console.log("Email sent successfully");
    } catch (err) {
        console.log(err);
    }
};

module.exports = sendEmail;