const SubCategory=require('../models/subCategory');
const Product=require('../models/product');
const slugify=require('slugify');

exports.create=async(req,res)=>{

        try {
            const {name,parent}=req.body;
            const newSubCategory=await new SubCategory({name,parent,slug:slugify(name)}).save();
            res.json(newSubCategory);
        } catch (error) {
            res.status(400).send('Already present in DB');
        }

}

exports.read=async(req,res)=>{
    try{
        const categorySubResult=await SubCategory.findOne({slug:req.params.slug});
        // console.log(categorySubResult._id.toString());
        const products=await Product.find({"subCategory":categorySubResult._id})
                                     .populate('category')
                                     .populate('subCategory');
  
        res.status(200).json({categorySubResult,products});
    }catch(err){
          res.status(404).json({error:'not found this category.'})
    }
    
}


exports.list=async(req,res)=>{
    try{
        const subCategoriesResult=await SubCategory.find().sort([['createdAt',-1]]);
        res.status(200).json(subCategoriesResult);
    }
    catch(error){
      res.status(404).json({error:error.message})
    }
    
}

exports.update=async(req,res)=>{
   try{
      const {name,parent}=req.body;
      const newSubCategory=await SubCategory.findOneAndUpdate({slug:req.params.slug},{name,parent,slug:slugify(name)},{new:true});
      res.status(200).json(newSubCategory);
    }catch(error){
       res.json(400).json({
           error:'Category updation failed.'
       })
   }    
}


exports.remove=async(req,res)=>{
    console.log('remove backend')
    try{
      const result=await SubCategory.findOneAndDelete({slug:req.params.slug});
      if(result==null){
          throw new Error('category not in db.')
      }
      res.json({
          result:`deletion of ${req.params.slug} successful.`
      })
    }catch(error){
        res.send(error.message);
        // res.status(400).json({error:'Category removed failed.'})
    }
}

