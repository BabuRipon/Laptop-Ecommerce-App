import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import {BrowserRouter,Routes, Route, useLocation}from 'react-router-dom';
import 'antd/dist/antd.css';
import {combineReducers, createStore}from 'redux';
import {Provider,}from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './redux/reducer';
import SearchReducer from './redux/searchReducer';
import CartReducer from './redux/cartReducer';
import DrawerReducer from './redux/drawerReducer';
import CouponReducer from './redux/couponReducer';
import codReducer from './redux/codReducer';

import { useEffect } from 'react';




const ScrollToTop=()=>{
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0,0);
    }, [pathname]);

    return null;
}


const root=combineReducers({
  user:reducer,
  search:SearchReducer,
  cart:CartReducer,
  drawer:DrawerReducer,
  coupon:CouponReducer,
  cod:codReducer,
})

const store=createStore(root,composeWithDevTools());


ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
      <ScrollToTop />
        <App />
      </BrowserRouter>
  </Provider>
  
  ,
  document.getElementById('root')
);

