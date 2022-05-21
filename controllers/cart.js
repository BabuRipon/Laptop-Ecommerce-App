const Product=require('../models/product');
const User=require('../models/user');
const Cart=require('../models/cart');
const Coupon=require('../models/coupon');
const Order=require('../models/order');
// const { findOne } = require('../models/product');

var uniqid = require('uniqid');



exports.addCartToDb=async(req,res)=>{
//    console.log(req.body);
//    console.log(req.user);

   const {cart}=req.body;

   const products=[];
   const user=await User.findOne({email:req.user.email})

//    console.log('user',user);

   const existingCart=await Cart.findOne({orderedBy:user._id});

   if(existingCart){
       existingCart.remove();
       console.log('old cart removed');
   }

   for(let i=0;i<cart.length;i++){
       let obj={};

       obj.product=cart[i]._id;
       obj.count=cart[i].count;
       obj.color=cart[i].color;
       //get price for Product original
       const {price}=await Product.findById(cart[i]._id);
       obj.price=price;

       products.push(obj);
   }

   let cartTotal=0;
   for(let i=0;i<products.length;i++){
        cartTotal+=products[i].count * products[i].price;
   }

  const newCart=await new Cart({
      products,
      cartTotal,
      orderedBy:user._id
  }).save();

  console.log('new cart details ',newCart);

  res.json({ok:true});

}

exports.getUserCart=async(req,res)=>{
    try{
    const user=await User.findOne({email:req.user.email});

    const cartResult=await Cart.findOne({orderedBy:user._id})
    .populate("products.product","_id title price")
            
    const {products,cartTotal}=cartResult;

    res.status(200).json({products,cartTotal});
    }catch(err){
        console.log(err);
    }
    
}

exports.EmptyCart=async(req,res)=>{

   try{
    const user=await User.findOne({email:req.user.email});

    const cart=await Cart.findOneAndDelete({orderedBy:user._id})
    res.status(200).json(cart);
   }
   catch(err){
       res.status(400).json({error:err});
   }
}

exports.saveAddress=async(req,res)=>{
    try{
        const saveAddressResult=await User.findOneAndUpdate({email:req.user.email},{address:req.body.adress},{
            new:true
        });
        res.status(200).json(saveAddressResult);
    }
    catch(err){
        res.status(400).json(saveAddressResult);
    }

}

exports.ApplyCoupon=async(req,res)=>{
  const validcoupon=await Coupon.findOne({name:req.body.name});
  if(!validcoupon){
     return res.status(400).json({error:'invalid coupon'});
  }

  const user=await User.findOne({email:req.user.email});
  const {products,cartTotal}=await Cart.findOne({orderedBy:user._id}).populate("products.product","_id title price");

  const totalAfterDiscount=(cartTotal - ((cartTotal*validcoupon.discount)/100)).toFixed(2);

  await Cart.findOneAndUpdate({orderedBy:user._id},{totalAfterDiscount},{new:true});

  res.status(200).json({totalAfterDiscount})

}

exports.createOrder = async (req, res) => {
    // console.log(req.body);
    // return;
    const { paymentResponse } = req.body;
    try{
        
    const user = await User.findOne({ email: req.user.email }).exec();
  
    const { products } = await Cart.findOne({ orderedBy: user._id }).exec();

    console.log(products)
    paymentResponse.paymentStatus='paid';
    const newOrder = await new Order({
      products,
      paymentResponse,
      orderdBy: user._id,
    }).save();
  
    // decrement quantity, increment sold
    let bulkOption = products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id }, // IMPORTANT item.product
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
  
    let updated = await Product.bulkWrite(bulkOption, {new:true});
    console.log("PRODUCT QUANTITY-- AND SOLD++", updated);
  
    console.log("NEW ORDER SAVED", newOrder);
    res.json({ ok: true });

    }catch(err){
        console.log(err);
    }

  };

  exports.orders = async (req, res) => {
    let user = await User.findOne({ email: req.user.email }).exec();
  
    let userOrders = await Order.find({ orderdBy: user._id })
      .populate("products.product")
      .exec();
  
    res.json(userOrders);
  };

  // addToWishlist wishlist removeFromWishlist
exports.addToWishlist = async (req, res) => {
    const { productId } = req.body;
  
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      { $addToSet: { wishlist: productId } }
    ).exec();
  
    res.json({ ok: true });
  };
  
  exports.wishlist = async (req, res) => {
    const list = await User.findOne({ email: req.user.email })
      .select("wishlist")
      .populate("wishlist")
      .exec();
  
    res.json(list);
  };
  
  exports.removeFromWishlist = async (req, res) => {
    const { productId } = req.params;
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      { $pull: { wishlist: productId } }
    ).exec();
  
    res.json({ ok: true });
  };

  exports.createCashOrder = async (req, res) => {
    const { cod, couponApplied } = req.body;
    // if COD is true, create order with status of Cash On Delivery
  
    if (!cod) return res.status(400).send("Create cash order failed");
  
    const user = await User.findOne({ email: req.user.email }).exec();
  
    let userCart = await Cart.findOne({ orderedBy: user._id }).exec();

    console.log('user cart',userCart);
  
    let finalAmount = 0;
  
    if (couponApplied.coupon && userCart.totalAfterDiscount) {
      finalAmount = userCart.totalAfterDiscount;
    } else {
      finalAmount = userCart.cartTotal;
    }
  
    let newOrder = await new Order({
      products: userCart.products,
      paymentResponse: {
        orderCreationId: uniqid(),
        amount: finalAmount,
        currency: "INR",
        paymentStatus:'Not paid',
        created_at: Date.now(),
      },
      orderdBy: user._id,
      orderStatus: "Cash On Delivery",
    }).save();
  
    // decrement quantity, increment sold
    let bulkOption = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id }, // IMPORTANT item.product
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
  
    let updated = await Product.bulkWrite(bulkOption, {});
    console.log("PRODUCT QUANTITY-- AND SOLD++", updated);
  
    console.log("NEW ORDER SAVED", newOrder);
    res.json({ ok: true });
  };
