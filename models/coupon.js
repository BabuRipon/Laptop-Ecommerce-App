const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;

const couponSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        uppercase:true
    },
    discount:{
        type:Number,
        required:true,
        default:0
    },
    expiryDate:{
        type:Date,
        required:true,
    }
},{
    timestamps:true
})


module.exports=mongoose.model('Coupon',couponSchema);

