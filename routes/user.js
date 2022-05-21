const express=require('express');
const route=express.Router();
const {authCheck}=require('../middlewares/auth');
const {addCartToDb,getUserCart,EmptyCart,saveAddress, 
    ApplyCoupon,createOrder,orders,addToWishlist,wishlist,removeFromWishlist,createCashOrder}=require('../controllers/cart')


route.post('/user/cart',authCheck,addCartToDb);
route.get('/user/cart',authCheck,getUserCart);
route.delete('/user/cart/empty',authCheck,EmptyCart)
route.post('/user/save/adress',authCheck,saveAddress);
route.post('/apply/coupon',authCheck,ApplyCoupon);

route.post("/user/order", authCheck, createOrder);
route.post("/user/cash-order", authCheck, createCashOrder); // COD stands for cash on delivery 
route.get("/user/orders", authCheck, orders);

// wishlist
route.post("/user/wishlist", authCheck, addToWishlist);
route.get("/user/wishlist", authCheck, wishlist);
route.put("/user/wishlist/:productId", authCheck, removeFromWishlist);

module.exports=route;