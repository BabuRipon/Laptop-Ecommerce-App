import React,{useState} from 'react';
import {auth}from '../../firebaseConfig';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register=()=>{
    
    const [email,setEmail]=useState('');

    const onSubmitHandler=async(e)=>{
         e.preventDefault();

         var actionCodeSettings = {
            url:`/register/complete`,
            handleCodeInApp:true,
          };

        await auth.sendSignInLinkToEmail(email,actionCodeSettings)

       toast.success(`a link is send to user ${email} to register`);
        
       window.localStorage.setItem('emailForSignIn',email);
       setEmail('');

    }

    const registerForm=()=>(
        <form onSubmit={onSubmitHandler}>
            <input 
            type="email" 
            value={email}
            onChange={e=>setEmail(e.target.value)}
            className="form-control" 
            placeholder="abc@gamil.com" 
            autoFocus
            />
            <br/>
            <button type="submit" className="btn btn-raised btn-primary">Register</button>
        </form> 
        )

    return (
       <div className="contianer p-5">
          <div className="row">
              <div className="col-md-6 offset-md-3">
                <h4>Register</h4>
                {registerForm()}
              </div>
          </div>
       </div>
    )
}

export default Register;