const express=require('express');
const route=express.Router();
const {authCheck,adminCheck}=require('../middlewares/auth');
const {create,read,remove}=require('../controllers/coupon')


route.post('/coupon',authCheck,adminCheck,create);
route.get('/coupon',authCheck,adminCheck,read);
route.delete('/coupon/:couponId',authCheck,adminCheck,remove)


module.exports=route;
