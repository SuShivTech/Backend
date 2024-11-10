const mongoose = require("mongoose");

const paymentHistorySchema = mongoose.Schema(
  {
    
   
    userId: {
      type: String,
      required: [true, "Please enter user id"],
    },
    payment_id:{
        type :String,
        required:[true,"Please enter user payment id"]
    },
    order_id:{
        type:String,
        required:[true,"Please enter order id"]
    },
    signature:{
      type:String,
      required:[true,"please ennter signature"]
    },
    amount:{
        type:Number,
        required:[true,"please amount"]
      },
  },
   {
    timestamps: true,
  }
);


module.exports=mongoose.model('paymentHistory',paymentHistorySchema);