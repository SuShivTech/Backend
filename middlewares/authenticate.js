
const jwt=require('jsonwebtoken');
const User =require('../models/userModels');




const Authentication= async (req,res,next)=>{
try{
    
    const token=req.cookies.jwtoken;
    const verifyToken = jwt.verify(token,process.env.JWT_PASS) ;
    const rootuser = verifyToken.user;

    
    if(!rootuser){
        throw new Error("user not found")
        
    }
    
    req.role=verifyToken.role;
    req.token=token;
    req.rootuser=rootuser;
    req.rootuserId=rootuser._id;
    
    next();
     
}catch(err){
     
    res.status(401).send('Unauthorized : Not Token provided')
    
    
    
}


}



module.exports= Authentication;