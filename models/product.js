const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;

const productSchema=new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true,
        maxlength:[32,'too much big title'],
        text:true
    },
    slug:{
        type:String,
        lowercase:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
        maxlength:[2000,'too much word there , please short description'],
        text:true
    },
    price:{
        type:Number,
        trim:true,
        maxlength:32,
        required:true
    },
    category:{
        type:ObjectId,
        ref:"Category"
    },
    subCategory:[
        {
            type:ObjectId,
            ref:'SubCategory'
        }
    ],
    quantity:Number,
    sold:{
        type:Number,
        default:0
    },
    images:{
        type:Array,
    },
    shipping:{
        type:String,
        enum:["Yes","No"]
    },
    color:{
        type:String,
        enum:["Black","Brown","Silver","White","Blue"]
    },
    brand:{
        type:String,
        enum:["Apple","Lenovo","Dell","Samsung","Asus","Microsoft"]
    },
    ratings:[
        {
            star:Number,
            default:0,
            postedBy:{
                type:ObjectId,
                ref:"User"
            }
        }
    ],
},{
    timestamps:true
})

module.exports=mongoose.model('Product',productSchema);