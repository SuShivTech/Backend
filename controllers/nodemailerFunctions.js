const nodemailer = require('nodemailer')


exports.transporter = nodemailer.createTransport({
    service: 'gmail', // Use the email service provider
    auth: {
        user: 'raycodeforce@gmail.com', // Your email address
        pass: 'ftxg mdyt cnwd iivy' // Your password
    }
});
// Send email

