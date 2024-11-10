const express = require("express");
const userRouter = express.Router();
const Authentication = require('../middlewares/authenticate')
const {
    userResister,
    userLogin,
    userLogout,
    getUser,
    userProfileUpdate,
    saveHistory,
} = require('../controllers/userControllers');
const uploadMiddleware = require("../middlewares/uploadImageMiddleware");
const { resetPassword, verifyOtp, forgetPassword, getOTPByEmail } = require("../controllers/forgetPasswordController");
const { createOrder } = require("../controllers/createOrder");


userRouter.post('/register', userResister);

userRouter.post('/login', userLogin);

userRouter.put('/updateprofile', Authentication, userProfileUpdate);

userRouter.get('/logout', Authentication, userLogout);

userRouter.get('/getuser', Authentication, getUser);

userRouter.post('/reset-password', resetPassword);

userRouter.post('/order', createOrder);

userRouter.post('/paymentsuccess', Authentication, saveHistory);

module.exports = userRouter