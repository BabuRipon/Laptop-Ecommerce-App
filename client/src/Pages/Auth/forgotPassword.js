import React ,{useState,useEffect}from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../firebaseConfig';
import {useSelector} from 'react-redux';

const ForgotPassword=({history})=>{
    
    const [email,setEmail]=useState('');
    const {user} =useSelector(state=>state)

    useEffect(()=>{
        if(user){
            history.push('/');
        }
    },[user])

    const onSubmitHandler=(e)=>{
        e.preventDefault();

        const actionCodeSettings = {
            url:`${process.env.REACT_APP_FORGOT_PASSWORD_URL}`,
            handleCodeInApp:true,
          };

        auth.sendPasswordResetEmail(email,actionCodeSettings)
        .then(()=>{
            toast.success('Please find your email to reset password link');
        })
        .catch(error=>{
            toast.error(error.message);
        })
    }

    const ForgotPassword=()=>(
        <form onSubmit={onSubmitHandler}>
            <input
              placeholder="enter your email"
              className="form-control mb-3"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              autoFocus
            />
            <button
            className="btn btn-raised btn-primary"
            >submit</button>
        </form>
    )

    return(
        <div className="container p-5">
            <div className="row">
               <div className="col-md-6 offset-md-3">
                    <h4 className="text-info">Forgot password</h4>
                    {ForgotPassword()}
               </div>
            </div>
        </div>
    )
}

export default ForgotPassword;