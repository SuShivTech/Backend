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


userRouter.post('/register', userResister);

userRouter.post('/login', userLogin);

userRouter.put('/updateprofile', Authentication, userProfileUpdate);

userRouter.get('/logout', Authentication, userLogout);

userRouter.get('/getuser', Authentication, getUser);

module.exports = userRouter