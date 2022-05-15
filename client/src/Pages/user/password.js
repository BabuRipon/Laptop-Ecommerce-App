import React ,{useState}from 'react';
import UserNav from '../component/nav/usernav';
import {auth}from '../../firebaseConfig'
import {toast}from 'react-toastify'

const Password=()=>{

  const [password,setPassword]=useState('');
  const [loading,setLoading]=useState(false);

  const onSubmitHandler=async (e)=>{
    e.preventDefault();
      setLoading(true);

    await auth.currentUser.updatePassword(password)
      .then(()=>{
        toast.success('password updated successfully.')
        setPassword('')
        setLoading(false);
      })
      .catch(err=>{
         toast.error(err.message);
      })
  }
  
   const PasswordForm=()=>(
     <form onSubmit={onSubmitHandler}>
       <div className="form-group p-1">
         <label>your password</label>
         <input 
          type="password"
          className="form-control"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          disabled={loading}
         />
       </div>
       <button className="btn btn-raised btn-primary"
       disabled={!password ||password.length<4||loading}
       >submit</button>
     </form>
   )

    return(
      <div className="container-fluid">
         <div className="row">
             <div className="col-md-2 ">
                   <UserNav />
             </div>
             <div className="col">
                   {
                     loading?
                     <h4 className="p-1 text-success">loading...</h4>
                     :
                     <h4 className="p-1">Reset Your Password</h4>
                   }
                   {PasswordForm()}
             </div>
         </div>
      </div>
    )
}

export default Password;