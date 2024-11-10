const express = require("express");
const { requestOTPByPhoneNumber, verifyOtpByPhone } = require("../controllers/mobileOtpVarification");
const { verifyOtp, getOTPByEmail } = require("../controllers/forgetPasswordController");
const verifyRouter = express.Router();



// verifyRouter.post('/verify',verifyOtpByPhone)

verifyRouter.post('/getotp',requestOTPByPhoneNumber);

verifyRouter.post('/verify-otp', verifyOtp);

verifyRouter.post('/getemail-otp', getOTPByEmail);



module.exports=verifyRouter