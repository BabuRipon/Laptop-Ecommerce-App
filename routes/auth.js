const express=require('express');
const route=express.Router();
const {createOrUpdateUser, currentUser}=require('../controllers/auth')
const {authCheck,adminCheck}=require('../middlewares/auth');


route.post('/create-or-update-user',authCheck,createOrUpdateUser);
route.post('/current-user',authCheck,currentUser)
route.post('/current-admin',authCheck,adminCheck,currentUser)

module.exports=route;