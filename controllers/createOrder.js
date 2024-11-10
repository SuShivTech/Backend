const express = require('express')
const Razorpay = require('razorpay');
const { NIL } = require('uuid');
const app = express();

exports.createOrder= async(req, res) =>{
    console.log(req);
    var credentials={
        key_id: req.body.keyId,
        key_secret: req.body.keySecret
    }
    var instance = new Razorpay(credentials);

    var options = {
        amount: req.body.amount,
        currency: req.body.currency,
        payment_capture: 1
    };
    
    try { 
        const response = await instance.orders.create(options);
        res.json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount,
        })
        console.log(response);
    } catch (err) {
        console.log(err);
       return res.status(400).send('Not able to create order. Please try again!');
    }
}