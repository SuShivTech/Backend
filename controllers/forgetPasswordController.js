
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const usr = require("../models/userModels");
const { transporter } = require('./nodemailerFunctions');
const app = express();
app.use(bodyParser.json());

// Mock database


// Generate OTP Endpoint
exports.forgetPassword= async (req, res) => {
    const { email } = req.body;
    const user =  await usr.findOne({email});
    if (!user) {
        return res.status(404).send('User not found');
    }

    // Generate a random OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    // Store OTP and timestamp in the database
     const otpp = {
        code: otp,
        timestamp: Date.now()
    };
    usr.findOneAndUpdate({email}, { $set: { otp:otpp } })
        .then((user) => {
            
            
        })
        .catch((err) => {
            console.log(err);
           

        })

    // Send OTP to the user via email
    sendOtpByEmail(email, otp);

    res.send('OTP sent successfully');
};

// Verify OTP Endpoint
exports.verifyOtp =  async(req, res) => {
    const { email, otp ,newPassword } = req.body;
    const user = await usr.findOne({email});
    if (!user) {
        return res.status(404).send('User not found');
    }

    const storedOtp = user.otp;
    if (!storedOtp || storedOtp.code !== otp) {
        return res.status(401).send('Invalid OTP');
    }

    // Check if OTP has expired (10 minutes)
    const otpTimestamp = storedOtp.timestamp;
    const currentTime = Date.now();
    if (currentTime - otpTimestamp > 10 * 60 * 1000) {
        return res.status(401).send('OTP has expired');
    }
   // Hash the new password
   bcrypt.hash(newPassword, 12, (err, hash) => {
    if (err) {
        return res.status(500).send('Error hashing password');
    }
    // Update the user's password in the database
    usr.findOneAndUpdate({email},{$set:{password : hash,confirmpassword:hash}})
    .then(r =>{
        res.status(200).json({message:"password changed successfully"});
    })
    .catch(e=>{
        res.status(500).json({err:"enternal server error",e});
    })
});
    
};

// Change Password Endpoint
exports.resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    const user = await usr.findOne({email});
    if (!user) {
        return res.status(404).send('User not found');
    }

    // Hash the new password
    bcrypt.hash(newPassword, 10, (err, hash) => {
        if (err) {
            return res.status(500).send('Error hashing password');
        }
        // Update the user's password in the database
        user.password = hash;
        res.send('Password updated successfully');
    });
};

// Function to send OTP via email
function sendOtpByEmail(email, otp) {
    const mailOptions = {
        from: 'adityam2448@gmail.com', // Sender address
        to: email, // Recipient address
        subject: 'Forget Password varification OPT',
        text: 'Your OTP for changing password is '+otp+' this otp will valid for 10 min only.' // You can also use 'html' key for HTML content
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
    // Configure nodemailer to send emails
    // Example: nodemailer.createTransport(...)
    // Send email with the OTP
}

