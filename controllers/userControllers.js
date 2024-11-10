
const User = require('../models/userModels');
const paymentHistory = require('../models/paymentHistoryModels');
const expressAsyncHandler = require("express-async-handler");

const axios = require("axios")
const bcrypt = require('bcrypt')

const dotenv = require('dotenv')
dotenv.config();

const jwt = require('jsonwebtoken');
const { verifyOtpByPhone } = require('./mobileOtpVarification');
const { verifyLoginOTPByEmail } = require('./forgetPasswordController');

exports.saveHistory = async(req, res) => {

    try{
        const userId = req.rootuser._id;
        const { payment_id, order_id, signature, amount } = req.body;

        const response = await paymentHistory.create({ userId, payment_id, order_id, signature, amount})
        res.status(200).json(response);
    } catch (e) {
        res.status(500).json({error:e.message});
    }
}
 
//@desc User register
//@route GET /api/user/register
//@access public
exports.userResister = async (req, res) => {

    console.log('Called ');
    
    const { phone, email, password, confirmPassword } = req.body.formData;

    if (!confirmPassword || !phone || !email || !password) {
        return res.status(400).send("Enter the data first");
    }

    const obj = await User.findOne({$or:[{ email },{phone}]});

    if (obj) {

        return res.status(409).send("User has resgistrerd already ");

    }
    try {
        const newUser = await new User({ email, phone, password, confirmpassword:confirmPassword });

        await User.create(newUser);
        res.status(200).send("User rigistered successfully");

    }
    catch {
        console.log(err);
        res.status(500).send("internal server error");
    }


}




//@desc User Login
//@route GET /api/user/login
//@access public



exports.userLogin = async (req, res) => {

    console.log("called")
    try
    {

    const { phone,otp } = req.body;
    
    
   

    if (!phone  || !otp) {
        return res.status(400).json({ message: "Enter the data first " });
    }


        
        
        const number = '91'+phone;
    
        const headers = {
            accept: "application/json",
            "content-type": "application/json",
            authkey: process.env.AUTHKEY_SMS,    
            "User-Agent": "ReadMe-API-Explorer",
        };

        // const url = `https://control.msg91.com/api/v5/otp/verify?otp=${otp}&mobile=${number}`;
        // const response = await axios.get(url, { headers });
    
        // if (response.data.type !== "success") {
        //   return res.status(400).json({ message: "OTP didn't matched" });
        // }
        
        let us = await User.findOne( { phone });
         if (!us) {
            
            const resp =  await User.create({phone});

         
            us = resp;
         }
         await User.findOneAndUpdate({phone},{$push : {lastLogin:new Date()}});

         const token = await us.generateAuthToken()
         res.cookie("jwtoken", token, {
 
             expires: new Date(Date.now() + 25892000000),
             httpOnly: true
         });
 
        //  (token) ? res.status(200).send({
        //      message: "login success", jwtoken: token
        //  }).status(200) : res.status(500).json({ message: "Internal server error" });
 
        res.status(200).json({
          message: "OTP verified successfully .",
        });
      


    /*
    let us = await User.findOne({ $or: [{ 'email': phone }, { 'phone': phone }] });
    if (us) {

        let otpv=null;
        if(phone.indexOf('@')!=-1){
            const email = phone;
            
          otpv= await verifyLoginOTPByEmail(email,otp);
            
    
        }
        else{
            otpv =  await verifyOtpByPhone(phone,otp);
        }
        
        
        if(!otpv)
        {
           return res.status(422).json({message:"Wrong OTP"})
        }

        const isMatch = await bcrypt.compare(password, us.password);

        if (!isMatch) {
            return res.status(401).json( {message : "Incorrect password"})
        }
        const token = await us.generateAuthToken()
        res.cookie("jwtoken", token, {

            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
        });

        (token) ? res.status(200).send({
            message: "login success", jwtoken: token
        }).status(200) : res.status(500).json({ message: "Internal server error" });

    } else {

        res.status(404).json({ message: "User not found please register first" })

    }
    */


}
catch(e)
{
  
    res.status(500).json({message:e.message});
}

}




//@desc User Logout
//@route GET /api/user/logout
//@access authorized
exports.userLogout = async (req, res) => {
    try {

        res.cookie('jwtoken', '', { maxAge: 1 });
     

        res.status(200).json({ message: "Token deleted" });
    }
    catch (err) {
        res.status(500).json({ mess: "Internal server error" })
    }
}


//@desc User information
//@route GET /api/user/getuser
//@access private
exports.getUser = async (req, res) => {
    const user = await User.findOne({ _id: req.rootuser._id })
    res.status(200).send(user);
}





//@desc User profile updation
//@route GET /api/user/updateprofile
//@access authorized
exports.userProfileUpdate = async (req, res) => {
    const userId = req.rootuser._id;

    const { name, email, phone } = req.body;
     User.findOneAndUpdate({ _id: userId }, { $set: { name, email, phone, created_at: new Date() } })
        .then((user) => {
            console.log(user);
            res.status(200).send(user);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("internal server error");

        })
}

