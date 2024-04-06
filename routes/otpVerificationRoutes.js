const express = require("express");
const { requestOTPByPhoneNumber, verifyOtpByPhone } = require("../controllers/mobileOtpVarification");
const verifyRouter = express.Router();



verifyRouter.post('/verify',verifyOtpByPhone)

verifyRouter.post('/getotp',requestOTPByPhoneNumber);



module.exports=verifyRouter