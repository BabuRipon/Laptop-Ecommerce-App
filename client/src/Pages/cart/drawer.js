import React from 'react';
import {Drawer} from 'antd'
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const DrawerComponent=()=>{
   
    const {drawer,cart}=useSelector(state=>state)
    const dispatch=useDispatch();

    return(
        <Drawer
        title={`product / ${cart.length}`}
        placement="right"
        visible={drawer}
        onClose={(e)=>{
            dispatch({
                type:"VISIBLE_ACTIVITY",
                payload:false
            })
        }}
      >
        <div className="container">
            {
                cart.map(c=>{
                    return(
                        <div className="row my-2" key={c._id} >
                            <div className="col" >
                                <img 
                                style={{width:'100%',objectFit:'cover'}}
                                src={c.images[0].url}/>
                            </div>
                            <h6 className="text-center w-100 p-3">{c.title} x {c.count}</h6>
                        </div>
                    )
                })
            }
        </div>
        <Link 
        className="btn btn-primary btn-outline  btn-block"
        onClick={(e)=>{
            dispatch({
                type:"VISIBLE_ACTIVITY",
                payload:false
            })
        }}
        to="/cart"
        >Go to Cart page</Link>
      </Drawer>
    )
}

export default DrawerComponent;