
const axios = require('axios')
const dotenv = require('dotenv');
dotenv.config();

const client = require('twilio')( process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


const usr = require("../models/userModels");
const errorHandler = require('../middlewares/errorHandler');


// Generate OTP Endpoint

exports.requestOTPByPhoneNumber= async (req,res) => {

    try
    {
        const phone = req.body.phone;
        //  const user =  await usr.findOne({phone});
        
        // if (!user) {

        //     return res.status(404).send('User not found');
        // }

        // // Generate a random OTP
        // const otp = Math.floor(100000 + Math.random() * 900000);

        // // Store OTP and timestamp in the database
        // const otpp = {
        //     code: otp,
        //     timestamp: Date.now()
        // };

        
                // Send OTP to the user via email
       const response  = await sendOTPByPhoneNumber('91'+phone)

         res.status(200).json({message:'OTP sent successfully'});
            
    }
    catch(er)
    {
        res.status(500).json({error:"Internal server error ", message:er.message});
    }
      

   

   
};

// Verify OTP Endpoint
exports.verifyOtpByPhone =  async(phone, otp) => {
    try{

        console.log("called =======")
        
       
     
        const verification = await client.verify.services(process.env.TWILIO_SERVICE_SID)
        .verificationChecks.create({
            to:'+91'+phone,
            code:otp
        })
        console.log(verification)
        if(!(verification.valid)){return false};

        return true;

    }
    catch(err)
    {
        throw err;
    }
    
};










const sendOTPByPhoneNumber =  async(phoneNumber) => {


    try {


        const payload = {
            Param1: "value1",
            Param2: "value2",
            Param3: "value3",
        };
        
        const headers = {
            accept: "application/json",
            "content-type": "application/json",
            authkey: process.env.AUTHKEY_SMS,    
            "User-Agent": "ReadMe-API-Explorer",
        };


        const mobile = phoneNumber;
        const url = `https://control.msg91.com/api/v5/otp?template_id=657bf14ed6fc0578437ea412&mobile=${mobile}`;
    
        const response = await axios.post(url, payload, { headers });
        return { message: "Success",response };
      } catch (e) {
        throw e;
      }
  
        
}
