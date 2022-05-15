const User=require('../models/user');

exports.createOrUpdateUser=async(req,res,next)=>{
    const {name,picture,email}=req.user;

    const user=await User.findOneAndUpdate({email},{name:email.split('@')[0],picture},{new:true});

    if(user){

       console.log('updated user : ',user);
    res.json(user);
    }else{
       const newUser=await new User({email,name,picture}).save();
    //    console.log('new user : ',newUser);
    res.json(newUser);
    }
}


exports.currentUser=async(req,res,next)=>{
    const {email}=req.user;
    const currentUser=await User.findOne({email})
    if(currentUser){
        console.log(currentUser);
        res.json(currentUser);
        next()
    }else{
        res.status(401).json({
            error:'user not found in database',
        })
    }
}