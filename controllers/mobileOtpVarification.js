
const dotenv = require('dotenv');
dotenv.config();

const client = require('twilio')( process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


const usr = require("../models/userModels");
const errorHandler = require('../middlewares/errorHandler');


// Generate OTP Endpoint

exports.requestOTPByPhoneNumber= async (req, res) => {

    try
    {
        const { phone } = req.body;
        // const user =  await usr.findOne({phone});
        
        // if (!user) {

        //     return res.status(404).send('User not found');
        // }

        // // Generate a random OTP
         const otp = Math.floor(100000 + Math.random() * 900000);

        // // Store OTP and timestamp in the database
        // const otpp = {
        //     code: otp,
        //     timestamp: Date.now()
        // };

        // const resp = await usr.findOneAndUpdate({phone}, { $set: { otp:otpp } })
        
                
                // Send OTP to the user via email
       const response  = await sendOTPByPhoneNumber(phone,otp)
        res.json({message:'OTP sent successfully',response});
            
    }
    catch(er)
    {
        res.status(500).json({error:"Internal server error ", message:er.message});
    }
      

   

   
};

// Verify OTP Endpoint
exports.verifyOtpByPhone =  async(req, res) => {
    try{

        console.log("called =======")
        
        const { phone, otp} = req.body;
        const user = await usr.findOne({phone});
        if (!user) {
            return res.status(404).send('User not found');
        }
        const verification = await client.verify.services(process.env.TWILIO_SERVICE_SID)
        .verificationChecks.create({
            to:'+91'+phone,
            code:otp
        })
        if(!verification.valid)throw new Error("Invalid OTP");

        res.status(200).json({message:"OTP verified successfully",verification});

    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
    
};










const sendOTPByPhoneNumber =  async(phoneNumber,otp) => {

   const resp =   client.verify
   .services(process.env.TWILIO_SERVICE_SID)
   .verifications.create({
     
       channel:"sms",
       to: '+91'+phoneNumber
   })

            return resp;
        
    }
