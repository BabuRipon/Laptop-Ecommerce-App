import React ,{useEffect}from 'react';
import './App.css';
import {Switch,Route, useHistory} from 'react-router-dom';
import Login from './Pages/Auth/login';
import Register from './Pages/Auth/register';
import Header from './Pages/component/header';
import Home from './Pages/home';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterComplete from './Pages/Auth/reigisterComplete';
import {auth} from './firebaseConfig';
import {useDispatch} from 'react-redux';
import * as actionTypes from './redux/actionType';
import ForgotPassword from './Pages/Auth/forgotPassword';
import {currentUser} from './functions/auth';
import History from './Pages/user/history';
import UserRoute from './Pages/component/routes/userRoute';
import Wishlist from './Pages/user/wishlist';
import Password from './Pages/user/password';
import AdminDashboard from './Pages/admin/AdminDashboard';
import AdminRoute from './Pages/component/routes/adminRoute';
import AdminCategory from './Pages/admin/category/admincategory';
import UpdateCategory from './Pages/admin/category/updateCategory';
import AdminSubCategory from './Pages/admin/subCategory/createSubCategory';
import UpdateSubCategory from './Pages/admin/subCategory/updateSubCategory';
import ProductCreate from './Pages/admin/product/createProduct';
import Products from './Pages/admin/product/products';
import Productupdate from './Pages/admin/product/productUpdate'
import ProductDetailPage from './Pages/product';
import ProductCategoryWise from './Pages/component/category/productCategoryWise';
import ProductBySubCategory from './Pages/component/subcategory/ProductBySubCategory';
import ShopTabProduct from './Pages/shop/shopTab';
import CartPage from './Pages/cart/cart';
import DrawerComponent from './Pages/cart/drawer';
import CheckoutPage from './Pages/cart/checkout';
import CouponPage from './Pages/admin/coupon/coupon';




export const App=()=>{

  const dispatch=useDispatch();
  const history=useHistory();


  useEffect(()=>{
     const unsubscribe=auth.onAuthStateChanged(async (user)=>{
       if(user){
         const idToken=await user.getIdTokenResult();
        //  console.log(JSON.stringify(user));
        currentUser(idToken)
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

            
        })
        .catch(error=>{
            console.log(error.message);
        })
         
       }else{
        history.push('/login');
       }

      
       
     });

     return ()=>{
       unsubscribe();
     }
     
  },[history,dispatch]);

  return (
    <>
     <Header />
     <ToastContainer />
     <DrawerComponent />
     <Switch>
       <Route path='/' exact component={Home} />
       <Route path='/register' exact component={Register} />
       <Route path="/register/complete" exact component={RegisterComplete} />
       <Route path='/login' exact component={Login} />
       <Route path='/forgot/password' exact component={ForgotPassword} />
       <UserRoute path="/user/history">
           <History />
       </UserRoute>
       <UserRoute path="/user/password">
           <Password />
       </UserRoute>
       <UserRoute path="/user/wishlist">
           <Wishlist />
       </UserRoute>
       <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
       <AdminRoute path="/admin/category" exact component={AdminCategory} />
       <AdminRoute path="/admin/category/:slug" exact component={UpdateCategory} />
       <AdminRoute path="/admin/sub-category/sub" exact component={AdminSubCategory} />
       <AdminRoute path="/admin/sub-category/sub/:slug" exact component={UpdateSubCategory} />
       <AdminRoute path="/admin/product" exact component={ProductCreate} />
       <AdminRoute path="/admin/products" exact component={Products} />
       <AdminRoute path="/admin/product/:slug" exact component={Productupdate} />


       <Route path='/product/:slug' exact component={ProductDetailPage} />
       <Route path="/category/:slug" exact component={ProductCategoryWise} />
       <Route path="/subcategory/:slug" exact component={ProductBySubCategory} />
       <Route path="/shop/filter" component={ShopTabProduct} />
       <Route path="/cart" component={CartPage} />

       <UserRoute path="/user/checkout">
           <CheckoutPage />
       </UserRoute>
       {/* <UserRoute path="/payment">
           <PaymentPage />
       </UserRoute> */}

       <AdminRoute path="/admin/coupon" exact component={CouponPage} />

     </Switch>
   
    </>
   )
}


