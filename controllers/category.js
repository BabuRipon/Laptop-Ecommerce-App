const Category=require('../models/category');
const SubCategory=require('../models/subCategory');
const Product=require('../models/product');
const slugify=require('slugify');

exports.create=async(req,res)=>{

        try {
            const {name}=req.body;
            const newCategory=await new Category({name,slug:slugify(name)}).save();
            res.json(newCategory);
        } catch (error) {
            res.status(400).send('Already present in DB');
        }

}

exports.read=async(req,res)=>{
    try{
        const categoryResult=await Category.findOne({slug:req.params.slug});
        const products=await Product.find({category:categoryResult._id});
        res.status(200).json({
        categoryResult,products
    });
    }catch(err){
          res.status(404).json({error:'not found this category.'})
    }
    
}

// exports.readById=async(req,res)=>{
//     try{
//         const categoryResult=await Category.findOne({_id:req.params._id});
//         res.status(200).json(categoryResult);
//     }catch(err){
//           res.status(404).json({error:'not found this category.'})
//     }
// }


exports.list=async(req,res)=>{
    try{
        const categoriesResult=await Category.find().sort([['createdAt',-1]]);
        res.status(200).json(categoriesResult);
    }
    catch(error){
      res.status(404).json({error:error.message})
    }
    
}

exports.update=async(req,res)=>{
   try{
      const {name}=req.body;
      const newCategory=await Category.findOneAndUpdate({slug:req.params.slug},{name,slug:slugify(name)},{new:true});
      res.status(200).json(newCategory);
    }catch(error){
       res.json(400).json({
           error:'Category updation failed.'
       })
   }    
}


exports.remove=async(req,res)=>{
    console.log('remove backend')
    try{
      const result=await Category.findOneAndDelete({slug:req.params.slug});
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

exports.getSubByParents=async(req,res)=>{
    
   try{
        const subs=await SubCategory.find({parent:req.params._id});
        res.status(200).json(subs);
   }
   catch(err){
       res.status(404).send(err.message);
   }
}


