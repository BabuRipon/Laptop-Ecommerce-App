import React,{useState,useEffect} from 'react';
import {useSelector,useDispatch}from 'react-redux'
import {Link} from 'react-router-dom';
import ModalImage from "react-modal-image";
import { colorsEnumValue } from '../../functions/product';
import { toast } from 'react-toastify';
import {CheckCircleOutlined,CloseCircleOutlined,CloseOutlined} from '@ant-design/icons';
import { EmptyCart,userCart,getUserCart } from '../../functions/user';

const CartPage=({history})=>{
    const {cart,user}=useSelector(state=>state);
    const dispatch=useDispatch();
    const [colors,setColors]=useState([]);

    console.log(user);

    useEffect(()=>{
        console.log('cart',localStorage.getItem('cart'))
        colorsEnumValue()
        .then((res)=>{
          setColors(res.data)
        })
        .catch(err=>{
            console.log(err);
        })

    },[])
   


    const getTotal=()=>{
        const total=cart.reduce((accu,cur)=>{
            return accu + cur.count * cur.price; 
        },0)

        return total;
    }

    const onColorChangeHandler=(e,product)=>{
       console.log(e.target.value,product);
       let cartArray=[];
       if(typeof window !==undefined){
           if(localStorage.getItem('cart')){
               cartArray=JSON.parse(localStorage.getItem('cart'))
           }

           let modifiedArray=cartArray.map(p=>{
               if(p._id===product._id){
                   p.color=e.target.value;
               }

               return p;
           })

           localStorage.setItem('cart',JSON.stringify(modifiedArray));

        //update redux cart too

        dispatch({
            type:'ADD_TO_CART',
            payload:modifiedArray
        })

       }
    }

    const onCountChangeHandler=(e,product)=>{
        let cartArray=[];

        let count=e.target.value<1 ?1:e.target.value;

        if(e.target.value >product.quantity){
            toast.error('product out of stock .')
            return ;
        }

        if(typeof window!==undefined){
            if(localStorage.getItem('cart')){
                cartArray=JSON.parse(localStorage.getItem('cart'));
            }

            let modifiedCartArray=cartArray.map(c=>{
                if(c._id===product._id){
                    c.count=count;
                }

                return c;
            })

            localStorage.setItem('cart',JSON.stringify(modifiedCartArray));

            //update redux cart too
            dispatch({
                type:'ADD_TO_CART',
                payload:modifiedCartArray
            })
        }
    }

    const onCartDeleteHandler=(product)=>{
        let cartArray=[];

        if(typeof window!==undefined){
            if(localStorage.getItem('cart')){
                cartArray=JSON.parse(localStorage.getItem('cart'));
            }

            let modifiedCartArray=cartArray.filter(c=>c._id!==product._id)

            localStorage.setItem('cart',JSON.stringify(modifiedCartArray));

            //update redux cart too
            dispatch({
                type:'ADD_TO_CART',
                payload:modifiedCartArray
            })
        }
    }

    const saveCartToDb=()=>{
       
        // console.log(JSON.stringify(cart,null,4));
 
       userCart(cart,user.token)
       .then(res=>{
        //    console.log(res.data);
           if(res.data.ok){
               history.push('/user/checkout');
           }
       })
       .catch(err=>{
           console.log('cart save err',err)
       })

       
    }

    const saveCashOrderToDb = () => {
        // console.log("cart", JSON.stringify(cart, null, 4));
        dispatch({
          type: "COD",
          payload: true,
        });
        userCart(cart,user.token)
        .then(res=>{
         //    console.log(res.data);
            if(res.data.ok){
                history.push('/user/checkout');
            }
        })
        .catch(err=>{
            console.log('cart save err',err)
        })
      };

    const onEmptyCartHandler=()=>{
        console.log('emptyCart handler');
        EmptyCart(user.token)
        .then(res=>{
            
            localStorage.removeItem('cart');

            dispatch({
                type:"ADD_TO_CART",
                payload:[]
            })

            toast.success('cart has been removed.please continue shopping')
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return(
        <div className="container-fluid">
           <div className="row">
               <h4>Cart / {cart.length} product</h4>
           </div>
           <hr/>
           <div className="row">
              <div className="col-md-8">
                  {
                      !cart.length?<h6>no product in cart.Please <Link to="/shop/filter"> continue shopping</Link></h6>
                      :
                      <table className="table table-bordered">
                      <thead>
                           <tr>
                               <th>image</th>
                               <th>title</th>
                               <th>price</th>
                               <th>count</th>
                               <th>color</th>
                               <th>shipping</th>
                               <th>brand</th>
                               <th>remove</th>
                           </tr>
                       </thead>
                       <tbody>
                          {cart.map(c=>{
                              return (
                                  <tr key={c._id}>
                                    <th>
                                       {
                                           c.images.length ?
                                           <div style={{width:"100px",height:'auto'}}>
                                                <ModalImage
                                                    small={c.images[0].url}
                                                    medium={c.images[0].url}
                                                    />
                                           </div>
                                           :"image"
                                       }
                                    </th>
                                    <th>{c.title}</th>
                                    <th>{c.price}</th>
                                    <th>
                                        <input 
                                        type="number"
                                        value={c.count}
                                        className="form-control"
                                        onChange={(e)=>onCountChangeHandler(e,c)}
                                        />
                                    </th>
                                    <th>
                                        <select
                                        className="form-control"
                                        name="color"
                                        onChange={(e)=>onColorChangeHandler(e,c)}
                                        >
                                          {c.color?<option value={c.color} key={c.color}>{c.color}</option>
                                          :<option>select</option>}
                                          {colors.filter(item=>item!==c.color).map(c=>(
                                              <option key={c} value={c}>{c}</option>
                                          ))}
                                        </select>
                                    </th>
                                    <th className="text-center">{
                                    c.shipping==='Yes'?
                                    <CheckCircleOutlined className="text-success"/>
                                    :
                                    <CloseCircleOutlined className="text-danger"/>
                                    }</th>
                                    <th>{c.brand}</th>
                                    <th className="text-center">
                                        <CloseOutlined 
                                        style={{cursor:'pointer'}}
                                        className="text-danger"
                                        onClick={()=>onCartDeleteHandler(c)}
                                        />
                                    </th>
                                  </tr>
                              )
                          })}
                       </tbody>
                      </table>
                  }
                   
                  
              </div>
              <div className="col-md-4">
                 <h3>Order Summery</h3>
                 <hr/>
                 <h4>products</h4>
                 {
                     cart.length ? cart.map((c,i)=>(
                        <h6 key={i}>{c.title} x {c.count} = {c.count * c.price}</h6>
                    )):null
                 }
                 <hr />
                 <h6>total = {cart.length ?getTotal():0}</h6>
                 <br />
                 {user ?
                 <>
                    <div className="row ">
                        <span className="col-sm-5 btn btn-outline-info" style={{whiteSpace:'normal'}} onClick={saveCartToDb}> 
                            proceed to checkout
                        </span>
                        <span 
                        className="col-sm-5 btn btn-outline-info ml-5 d-flex justify-content-center align-items-center"
                        onClick={onEmptyCartHandler}
                        >Empty Cart</span>
                    </div>
                    <div className='row'>
                        <span className="col-sm-5 btn btn-outline-info" style={{whiteSpace:'normal'}} onClick={saveCashOrderToDb}> 
                            Pay Cash On Delivery
                        </span>
                    </div>
                 </>
                :
                <span className="btn btn-outline-info"> 
                    <Link to={{
                            pathname:'/login',
                            state:{
                                from:'/cart'
                            }
                        }}>Login to checkout</Link>
                </span>
                }
              </div>
           </div>
        </div>
    )
}

export default CartPage;