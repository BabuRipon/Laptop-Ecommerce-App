const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

exports.upload=async(req,res)=>{
    try{
        const result=await cloudinary.uploader.upload(req.body.image,{
            public_id:Date.now(),
            resource_type:'auto'
        });

        res.status(200).json({
            public_id:result.public_id,
            url:result.secure_url
        })
    }
    catch(err){
        res.status(500).send(err);
    }
    
    
}

exports.remove=(req,res)=>{
    cloudinary.uploader.destroy(req.body.public_id,(err,result)=>{
        if(err) return res.status(500).send(err);
        console.log(result)
        res.status(200).send('image removed .')
    })
}