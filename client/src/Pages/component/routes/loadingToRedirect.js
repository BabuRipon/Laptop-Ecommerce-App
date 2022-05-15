import React ,{useEffect,useState}from 'react';
import {useHistory}from 'react-router-dom';

const LoadingToRedirect=()=>{
    const [counter,setCounter]=useState(5);
    const history=useHistory();

    useEffect(()=>{
        if(counter==0){
           history.push('/login');
        }

        setTimeout(()=>{
           setCounter(preCounter=>--preCounter);
      },1000);

   },[counter])

   return(
       <div className="container p-5">
           <p className="text-center text-danger">Redirect to you just in {counter} seconds.</p>
       </div>
   )
}

export default LoadingToRedirect;