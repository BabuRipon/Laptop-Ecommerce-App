import React from 'react';
import {useSelector}from 'react-redux';
import {Route}from 'react-router-dom';
import LoadingToRedirect from './loadingToRedirect';


const UserRoute=({children,...rest})=>{

    const {user}=useSelector(state=>({...state}));
   

    return(
        user && user._id?
        <Route {...rest} render={()=>children} />
        :
        <LoadingToRedirect />
    )
}

export default UserRoute;