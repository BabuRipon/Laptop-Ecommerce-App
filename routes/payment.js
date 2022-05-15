const express=require('express');
const route=express.Router();
const {authCheck}=require('../middlewares/auth');
const {createOrder}=require('../controllers/payment');

route.post('/payment/order',authCheck,createOrder);

module.exports=route;