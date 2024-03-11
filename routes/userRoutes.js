const express = require("express");
const userRouter = express.Router();
const Authentication = require('../middlewares/authenticate')
const {
    userResister,
    userLogin,
    userLogout,
    getUser,
    userProfileUpdate,
} = require('../controllers/userControllers');
const uploadMiddleware = require("../middlewares/uploadImageMiddleware");
const { resetPassword, verifyOtp, forgetPassword } = require("../controllers/forgetPasswordController");



userRouter.post('/register', userResister);

userRouter.post('/login', userLogin);

userRouter.put('/updateprofile', Authentication, userProfileUpdate);

userRouter.get('/logout', Authentication, userLogout);

userRouter.get('/getuser', Authentication, getUser);

userRouter.post('/reset-password', resetPassword);

userRouter.post('/verify-otp', verifyOtp);

userRouter.post('/forgot-password', forgetPassword);
module.exports = userRouter