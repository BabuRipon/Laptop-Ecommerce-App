const Product=require('../models/product');
const User=require('../models/user');
const slugify=require('slugify');

exports.create=async(req,res)=>{

        try {
            req.body.slug=slugify(req.body.title);

            console.log(typeof(req.body.price));

            const newCategory=await new Product(req.body).save();
            res.json(newCategory);
            
        } catch (error) {
            res.status(400).send(error.message);
        }

}

exports.lists=async(req,res)=>{
   try{
     
    const products=await Product
    .find({})
    .limit(+req.params.count)
    .populate('subCategory')
    .populate('category')
    .sort([['createdAt',-1]])
    

    res.status(200).json(products);

   }catch(err){
       res.status(404).send(err.message);
   }
}

exports.remove=async(req,res)=>{
    try{
       const result=await Product.findOneAndDelete({title:req.params.slug});
       res.status(200).send('Product deleted successfully...');
    }
    catch(err){
      res.status(400).send(err);
    }
}

exports.read=async(req,res)=>{
    try{
       const products=
            await Product
            .find({title:req.params.slug})
            ;
       res.status(200).json(products)
    }
    catch(err){
        res.status(400).send(err);
    }
}

exports.update=async(req,res)=>{
    try{
        req.body.slug=slugify(req.body.title);
        console.log(req.body.slug);
        const updatedProduct=await Product.findOneAndUpdate({slug:slugify(req.params.slug)},{...req.body},{new:true})
        res.status(200).json(updatedProduct)
    }
    catch(err){
        res.status(400).send(err);
    }
}

//withour pagination

// exports.list=async (req,res)=>{
//     const {sort,order,limit}=req.body;

//    try{
//         const result=await Product.find({})
//         .populate('subCategory')
//         .populate('category')
//         .sort([[sort,order]])
//         .limit(limit)

//         res.status(200).json(result);
//    }
//    catch(err){
//     res.status(404).send(err.message);
//    }
                       
// }

//with pagination endpoint
exports.list=async (req,res)=>{
        const {sort,order,page}=req.body;
        const productPerPage=3;
    
       try{
            const result=await Product.find({})
            .skip((page-1)*productPerPage)
            .populate('subCategory')
            .populate('category')
            .sort([[sort,order]])
            .limit(productPerPage)
    
            res.status(200).json(result);
       }
       catch(err){
        res.status(404).send(err.message);
       }
                           
    }

exports.totalProduct=async (req,res)=>{
    console.log('total product api')
    try{
       const total=await Product.find({}).count()
       res.status(200).json(total);
      
    }
    catch(err){
        res.status(400).send(err);
    }
}


exports.readWithPopulate=async(req,res)=>{
    try{
        const products=
             await Product
             .find({slug:req.params.slug})
             .populate('category')
             .populate('subCategory')
             ;
        res.status(200).json(products)
     }
     catch(err){
         res.status(400).send(err);
     }
}

// product -60c5ea343e4dce5085c30cb9
// user zaid - 609cc1dc0fca073daada5f94 

exports.updateProductStar=async(req,res)=>{
    
     const product=await Product.findById(req.params.product_id) ;
     const user=await User.findOne({email:req.user.email});

     const {star_count}=req.body;

     const existanceObject=product.ratings.find(prod=>prod.postedBy.toString()===user._id.toString());

     if(!existanceObject){
       let  ratingAdded=await Product.updateOne({_id:req.params.product_id},{
           '$push':{
            ratings:{star:star_count,postedBy:user._id}
           }
       },{new:true})

       console.log('rating added'+JSON.stringify(ratingAdded))

       res.status(200).json(ratingAdded);
       
     }else{
        let  ratingUpdated=await Product.updateOne({ratings:{
            $elemMatch:existanceObject
        }},{
            '$set':{
             "ratings.$.star":star_count,
            }
        },{new:true})

        console.log('rating updated ->'+JSON.stringify(ratingUpdated))

        res.status(200).json(ratingUpdated);
     }
}

exports.getRelevantProduct=async(req,res)=>{
try{
    const product = await Product.findById(req.params.product_id).exec();

  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(3)
    .populate("category")
    .populate("subCategory")
    .populate("postedBy")
    .exec();
    
  res.status(200).json(related);
}catch(err){
    res.status(400).json(err);
}

}


//search product by text
const productSearchText=async(req,res,query)=>{
    try{
        const product=await Product.find({ $text: { $search:`${query}`} })
        res.status(200).json(product);
    }catch(err){
        res.status(404).json(err);
    }
}

//search product by price
const productSearchPrice=async(req,res,price)=>{
    console.log('price ',price);
     try{
        const result=await Product.find({
            price:{
                $gte:price[0],
                $lte:price[1]
            }
        })

        res.status(200).json(result);

     }catch(err){
        res.status(404).json(err); 
     }
}

//search product by category

const productBycategory=async(req,res,category)=>{
    console.log(category)
    try{
        const result=await Product.find({category:{$in:category}}) ;
        res.status(200).json(result);
    }
    catch(err){
        res.status(400).json(err);
    }
}

//search product by stars

const productByStars=(req,res,stars)=>{
      
    Product.aggregate([
          {
              $project:{
                 products:"$$ROOT",
                 floorAvarage:{
                     $floor:{
                         $avg:"$ratings.star"
                     }
                 } 
              }
          },
          {
              $match:{
                floorAvarage:stars
              }
          },

      ])
      .exec((err,aggregateResult)=>{
          if(err) res.status(400).json(err)

          const productsResult=aggregateResult.map(p=>p.products);

          res.status(200).json(productsResult);
      })
}

//search product by sub-category

const productBysubcategory=(req,res,subs)=>{
    Product.find({
        subCategory:subs
    })
    .exec((err,subs)=>{
        if(err) res.status(400).json(err);

        res.status(200).json(subs);
    })
}

const productByBrand=async (req,res,brand)=>{
   console.log(brand);
    try{
        const result=await Product.find({brand});
        res.status(200).json(result);
    }
    catch(err){
        res.status(400).json(err);
    }
}

const productByShipping=async (req,res,shipping)=>{
   
    try{
        const result=await Product.find({shipping});
        res.status(200).json(result);
    }
    catch(err){
        res.status(400).json(err);
    }
}

const productByColor=async (req,res,color)=>{
   
    try{
        const result=await Product.find({color});
        res.status(200).json(result);
    }
    catch(err){
        res.status(400).json(err);
    }
}

exports.searchProduct=async(req,res)=>{
    const {query,price,category,stars,subs,brand,color,shipping}=req.body;


    if(query){
        await productSearchText(req,res,query);
    }

    if(price){
        await productSearchPrice(req,res,price);
    }

    if(category){
        await productBycategory(req,res,category)
    }

    if(stars){
        await productByStars(req,res,stars)
    }

    if(subs){
        console.log(subs);
        await productBysubcategory(req,res,subs);
    }

    if(brand){
        console.log(brand)
        await productByBrand(req,res,brand);
    }

    if(color){
        console.log(color)
        await productByColor(req,res,color);
    }

    if(shipping){
        console.log(shipping)
        await productByShipping(req,res,shipping);
    }

}


exports.brandSchemaEnumvalues=async(req,res)=>{
    try{
        const brands=Product.schema.path('brand').enumValues;
        res.status(200).json(brands);
    }
    catch(err){
        res.status(400).json(err); 
    }
   
}

exports.colorSchemaEnumvalues=async(req,res)=>{
    try{
        const colors=Product.schema.path('color').enumValues;
        res.status(200).json(colors);
    }
    catch(err){
        res.status(400).json(err); 
    }
}

