const Coupon=require('../models/coupon');

exports.create=async(req,res)=>{
  try{
      console.log(req.body);
      const coupon=await new Coupon(req.body.couponData).save();
      res.status(200).json(coupon);
  }
  catch(err){
      res.status(400).json(err);
  }
}

exports.read=async(req,res)=>{
   try{
       const coupons=await Coupon.find();
       res.status(200).json(coupons);
   }
   catch(err){
       res.status(200).json(err);
   }
}

exports.remove=async(req,res)=>{
   try{
    //    console.log(req.params.couponId);
       const deletedCoupon=await Coupon.findByIdAndDelete(req.params.couponId);
       res.status(200).json(deletedCoupon);
   }
   catch(err){
       res.status(400).json(err);
   }
}