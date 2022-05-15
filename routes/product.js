const express=require('express');
const route=express.Router();
const {authCheck,adminCheck}=require('../middlewares/auth');

const {create,lists,remove,
    read,update,list,totalProduct,
    readWithPopulate,updateProductStar,
    getRelevantProduct,searchProduct,brandSchemaEnumvalues,
    colorSchemaEnumvalues}=require('../controllers/product');
const { Router } = require('express');


route.post('/product',authCheck,adminCheck,create);
route.get('/products/total',totalProduct)

route.get('/products/:count',lists);
route.get('/product/:slug',read);

route.get('/product/with/populate/:slug',readWithPopulate);

route.delete('/product/:slug',authCheck,adminCheck,remove);
route.put('/product/:slug',authCheck,adminCheck,update)

route.post('/products',list);

route.put('/product/star/:product_id',authCheck,updateProductStar);

route.get('/product/relevant/:product_id',getRelevantProduct);

route.post('/query/search',searchProduct);

route.get('/query/search/brand/enum',brandSchemaEnumvalues)

route.get('/query/search/color/enum',colorSchemaEnumvalues)





module.exports=route;