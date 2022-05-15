import React ,{useState,useEffect}from 'react';
import {auth} from '../../firebaseConfig'; 
import {toast}from'react-toastify';
import {createOrUpdateUser} from '../../functions/auth';
import { useDispatch } from 'react-redux';
import * as actionTypes from '../../redux/actionType';

const RegisterComplete=({history})=>{
    const [email,setEmail]=useState('');   
    const [password,setPassword]=useState('');
    const dispatch=useDispatch();

    useEffect(()=>{
        setEmail(window.localStorage.getItem('emailForSignIn'));
    },[])

    const onRegisterHandler=async(e)=>{
         e.preventDefault();
        
         if(!password ||!email){
            toast.error('please check your email or password');
            return;
        }

        if(auth.isSignInWithEmailLink(window.location.href)){
            
            let emailFromLocalStroge = window.localStorage.getItem('emailForSignIn'); 
            if (!emailFromLocalStroge) {
                toast.error('please no email found | please go to email to get link.');
                return;
            }

            try{

                await auth.signInWithEmailLink(email, window.location.href);
                 
                const user=auth.currentUser;
                await user.updatePassword(password);
                let idToken=await user.getIdTokenResult();
                
                window.localStorage.removeItem('emailForSignIn');

            createOrUpdateUser(idToken)
            .then(res=>{
                // console.log('backend setup success : ',res);
                dispatch({
                    type:actionTypes.LOGGED_IN_USER,
                    payload:{
                        email:res.data.email,
                        token:idToken.token,
                        name:res.data.name,
                        role:res.data.role,
                        _id:res.data._id
                    }
                })
            })
            .catch(error=>{
                console.log(error.message);
            })

                history.push('/login');

            }catch(error){
                toast.error(error.message);
            }
        
         }
    }

    const RegisterForm=()=>(
        <form onSubmit={onRegisterHandler}>
        <input 
        type="email" 
        value={email}
        className="form-control" 
        disabled
        />
        <input 
            type="password" 
            value={password}
            onChange={e=>setPassword(e.target.value)}
            className="form-control" 
            placeholder="password" 
            autoFocus
            />
        <br/>
        <button type="submit" className="btn btn-raised btn-primary">Complete Registration</button>
    </form> 
    )

    return(
        <div className="container p-5">
            <div className="row">
                 <div className="col-md-6 offset-md-3">
                      <h4>Register Complete</h4>
                      {RegisterForm()}
                 </div>
            </div>
        </div>
    )
}

export default RegisterComplete;