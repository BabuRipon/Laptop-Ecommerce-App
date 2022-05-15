import React,{useState} from 'react';
import { Button } from 'antd';
import { MailOutlined ,GoogleOutlined,EyeOutlined,EyeInvisibleOutlined} from '@ant-design/icons';
import {auth,googleAuthProvider}from '../../firebaseConfig';
import { useDispatch ,useSelector} from 'react-redux';
import * as actionTypes from '../../redux/actionType';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {createOrUpdateUser} from '../../functions/auth';


const Login=()=>{

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [eye,setEye]=useState(false);
    const [passordType,setPasswordType]=useState('password');
    const [loading,setLoading]=useState(false);
    const dispatch=useDispatch();
    const history=useHistory();
    const {user}=useSelector(state=>state);


    const onVisiblePasswordHandler=(e)=>{
        e.preventDefault();
        setEye(eye=>!eye);
        setPasswordType(pre=>pre==='password'?'text':'password');
    }

    const rolebaseRedirect=(res)=>{
        
        if(history.location.state){
            history.push(history.location.state.from)
        }else{
            if(res.data.role==='admin'){
                history.push('/admin/dashboard');
            }else{
                history.push('/user/history');
            }
        }
   
    }

    const onLoginHandler=(e)=>{
        e.preventDefault();
        setLoading(true);
        console.log('onLoginHandler '+JSON.stringify(history.location.state))
        auth.signInWithEmailAndPassword(email,password)
        .then(async(userCredential)=>{
            const user = userCredential.user;
            const idToken=await user.getIdTokenResult()
            createOrUpdateUser(idToken)
            .then(res=>{
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

                rolebaseRedirect(res);
            })
            .catch(error=>{
                console.log(error.message);
            })
            
        })
        .catch(error=>{
            setLoading(false);
            if(error.code==="auth/user-not-found")
            {
               toast.error('email not register');
               setTimeout(()=>{
                   console.log(history)
                history.push('/register')
               },2000)
            }else{
                toast.error('password is incorrect');
            }
        })
    }

   const onLoginHandlerWithGoogle=async()=>{
       try{
        const result= await auth.signInWithPopup(googleAuthProvider);
        const {user} = result
        const idToken=await user.getIdTokenResult();

        createOrUpdateUser(idToken)
            .then(res=>{
                console.log('backend setup success : ',res);
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
                //rollbase redirect
                rolebaseRedirect(res);
            })
            .catch(error=>{
                console.log(error.message);
            })

        history.push('/');

       }catch(error){
           console.log(error.message);
       }
    }


    const LoginForm=()=>(
        <form >
            <div className="input-group mb-3">
                <input 
                value={email}
                type="text" 
                className="form-control" 
                placeholder="username" 
                onChange={(e)=>setEmail(e.target.value)}
                autoFocus 
                />
               
            </div>
            <div className="input-group mb-3">
                <input 
                value={password}
                type={passordType} 
                className="form-control" 
                placeholder="password"  
                onChange={(e)=>setPassword(e.target.value)}
                />
                <label 
                onClick={onVisiblePasswordHandler}
                style={{fontSize:"1.2rem"}}
                >
                {eye?<EyeOutlined />:<EyeInvisibleOutlined />}
                </label>
            </div>
            <Button 
            type="primary" 
            shape="round" 
            block
            className="mb-3"
            size="large"
            icon={<MailOutlined />}
            onClick={onLoginHandler}
            >Login with email/password</Button>
            <Button 
            type="danger" 
            shape="round" 
            block
            size="large"
            icon={<GoogleOutlined />}
            onClick={onLoginHandlerWithGoogle}
            className="mb-3"
            >Login with Google</Button>
            <Link 
            to="/forgot/password"
            className="float-right text-primary"
            style={{fontSize:"1.1rem"}}
            >Forgot Password</Link>
        </form>
    )

    return (
        <div className="container p-5">
            <div className="row">
               <div className="col-md-6 offset-md-3">
                     {loading?
                     <h4 className="text-primary">Loading...</h4>
                     :
                      <h4>Login</h4>}
                      {LoginForm()}
               </div>
            </div>
        </div>
    )
}

export default Login;