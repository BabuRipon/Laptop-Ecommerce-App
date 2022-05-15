import React ,{useEffect,useState}from 'react';
import {useSelector}from 'react-redux';
import {Route}from 'react-router-dom';
import { currentAdmin } from '../../../functions/auth';
import LoadingToRedirect from './loadingToRedirect';



const AdminRoute=({children,...rest})=>{

    const {user}=useSelector(state=>({...state}));
    const [ok,setOk]=useState(false);

   useEffect(()=>{
       if(user && user.token){
        currentAdmin(user.token)
            .then(res=>{
                setOk(true);
            })
            .catch(error=>{
                console.log(error.message);
            })
       }
    
   },[user])

    return(
        ok?
        <Route {...rest} />
        :
        <LoadingToRedirect />
    )
}

export default AdminRoute;