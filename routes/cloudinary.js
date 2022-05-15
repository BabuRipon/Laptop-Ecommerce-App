const express=require('express');
const route=express.Router();
const {authCheck,adminCheck}=require('../middlewares/auth');
const {upload,remove}=require('../controllers/cloudinary')


route.post('/uploadImage',authCheck,adminCheck,upload)
route.post('/removeImage',authCheck,adminCheck,remove)

module.exports=route;