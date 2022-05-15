const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        minlength:[2,'too short should be length more than 2'],
        maxlength:[32,'too big should be length less than 32'],
        required:[true,'name field required !']
    },
    slug:{
        type:String,
        unique:true,
        lowercase:true,
    }
},{
  timestamps:true
})

module.exports=mongoose.model('Category',categorySchema);