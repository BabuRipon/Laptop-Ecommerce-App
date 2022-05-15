const express=require('express');
const route=express.Router();
const {authCheck,adminCheck}=require('../middlewares/auth');

const {read,create,update,remove,list}=require('../controllers/subCategory')


route.get('/sub/:slug',read)
route.get('/subs',list)
route.post('/sub',authCheck,adminCheck,create);
route.put('/sub/:slug',authCheck,adminCheck,update)
route.delete('/sub/:slug',authCheck,adminCheck,remove)



module.exports=route;