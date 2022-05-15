const express=require('express');
const route=express.Router();
const {authCheck,adminCheck}=require('../middlewares/auth');

const {read,create,update,remove,list,getSubByParents,readById}=require('../controllers/category')


route.get('/category/:slug',read)
// route.get('/category/readbyid/:_id',readById);
route.get('/categories',list)
route.get('/category/subs/:_id',getSubByParents);

route.post('/category',authCheck,adminCheck,create);
route.put('/category/:slug',authCheck,adminCheck,update)
route.delete('/category/:slug',authCheck,adminCheck,remove)




module.exports=route;