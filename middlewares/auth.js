const admin=require('../firebase/index');
const user = require('../models/user');
const User=require('../models/user');

exports.authCheck=async (req,res,next)=>{
    // console.log(req.headers);
    try{
        const firebaseUser=await admin.auth().verifyIdToken(req.headers.token)
        // console.log('firebase authenticate user : ',firebaseUser);
        req.user=firebaseUser;
        
        next();
    }catch(error){
      res.status(401).json({
          error:'invalid or expired token'
      })
    }

}

exports.adminCheck=async(req,res,next)=>{

    // console.log('admin check')
    const {email}=req.user;

    const userResult=await User.findOne({email});

    // console.log('admin check',userResult);

    if(userResult.role=='admin'){
        next();
    }else{
        res.status(400).json({
            error:'admin user : access denied'
        })
    }
}