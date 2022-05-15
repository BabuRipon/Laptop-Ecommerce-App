import React,{useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {applyDiscountCoupon, getUserCart, saveUserAdress, createOrder, EmptyCart} from '../../functions/user'
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import { useHistory } from "react-router-dom";
import axios from 'axios';

const loadScript=(src)=>{
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

const CheckoutPage=({})=>{

    const [products,setProducts]=useState([]);
    const [totalAmount,setTotalAmount]=useState(0);
    const [adress,setAdress]=useState('<p></p>');
    const [coupon,setCoupon]=useState('');
    const [totalAfterDiscount,setTotalAfterDiscount]=useState(0);
    const [discountSuccess,setDiscountSuccess]=useState(false);
    const [discountFailed,setDiscountFalied]=useState("");
    const [savedAddress,setSaveAddress]=useState(false);

    const {user,coupon:couponApplied}=useSelector(state=>state);
    const dispatch=useDispatch();
    const history=useHistory();

    useEffect(()=>{
        // console.log('coupon',couponApplied)
        getUserCart(user.token)
        .then(res=>{
            // console.log(JSON.stringify(res.data,null,4));
            setProducts(res.data.products);
            setTotalAmount(res.data.cartTotal)
            
        })
        .catch(err=>{
            console.log(err);
        })

    },[])
    
    const saveAddressToDb=()=>{
        saveUserAdress(adress,user.token)
            .then(res=>{
                setSaveAddress(true);
                // console.log(res.data);
                toast.success('Adress saved')
            })
            .catch(err=>{
                console.log(err);
            })
    }

    const applyDiscountHandler=()=>{
        applyDiscountCoupon(coupon,user.token)
        .then(res=>{
            // console.log(res.data);
            setTotalAfterDiscount(res.data.totalAfterDiscount);
            dispatch({
                type:"DISCOUNT_FOR_COUPON",
                payload:{
                    totalAfterDiscount:+res.data.totalAfterDiscount,
                    coupon:true,
                }
            })
            setDiscountSuccess(true)
            setDiscountFalied("");
        })
        .catch(err=>{
            console.log(err.response && err.response.data);
            setDiscountFalied(err.response.data.error);
        })
    }


    const displayRazorpay=async()=>{
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        // creating a new order
        const result = await axios.post(`${process.env.REACT_APP_BACKEND_API}/payment/order`,{coupon:couponApplied},{
            headers:{
                token:user.token,
            }
        });

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        // Getting the order details back
        const { amount, id: order_id, currency,created_at } = result.data;

        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
            amount:amount.toString(),
            currency: currency,
            name: "Laptop World",
            description: "Test Transaction",
            // image: { logo },
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    amount:amount/100,
                    currency:currency,
                    created_at:created_at
                };

                console.log('response handler',response);
                createOrder(data,user.token)
                .then((res)=>{
                   
                    if (res.data.ok) {
                        // empty cart from local storage
                        if (typeof window !== "undefined") localStorage.removeItem("cart");
                        // empty cart from redux
                        dispatch({
                            type: "ADD_TO_CART",
                            payload: [],
                          });
                          // reset coupon to false
                          dispatch({
                            type: "DISCOUNT_FOR_COUPON",
                            payload: {},
                          });
                        // empty cart from database
                        EmptyCart(user.token);
                        history.push('/user/history')
                    }

                })
                .catch(err=>{
                    console.log(err);
                })
                // console.log(data);
            },
            prefill: {
                name:user.name,
                email:user.email,
            },
            notes: {
                address:adress,
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return(
        <div className="container mt-3">
        <div className="row">
         <div className="col-sm-6">
             <h4>Delivary Address</h4>
             <br/>
             <br/>
             <p className='text-info'>Please fill the adress to proceed to pay.</p>
             <ReactQuill value={adress}
                onChange={(value)=>{
                    setAdress(value)
                    console.log('adress',value);
                }}
                />
             <button className="btn btn-primary mt-2 btn-outline" 
             disabled={adress==='<p></p>'||adress==='<p><br></p>' } //todo
             onClick={saveAddressToDb}
             >Save</button>
             <hr/>
             <h4>Got Coupon ?</h4>
             <br/>
             <input 
             className="form-control"
             placeholder="enter coupon"
             value={coupon}
             onChange={e=>setCoupon(e.target.value)}
             /><br />
             {discountFailed?<h4 className="bg-danger p-1">{discountFailed}</h4>:null}
             <button 
             onClick={applyDiscountHandler}
             className="btn btn-outline-primary">apply</button>
         </div>
         <div className="col-sm-6">
             <h4>Order Summery</h4>
             <hr/>
             <p>product {products.length}</p>
             <hr/>
             {
                 products.map((p)=>{
                     return(
                         <div key={p._id}>
                            <p>{p.product.title} ({p.color}) x {p.count} = {p.count *p.price}</p>
                        </div>
                     )
                 })
             }
             <hr/>
             <p>Cart Total :{totalAmount}</p>
             {discountSuccess?<p className="bg-success p-1">Total price after discount : {totalAfterDiscount}</p>:null}
             <div className="row">
     
                 <div className="col-md-6">
                 <button className="btn btn-primary btn-outline" 
                 disabled={!(adress && savedAddress)}
                 onClick={displayRazorpay}
                 >Place Order</button>
                 </div>
                 
             </div>
         </div>
        </div>
     </div> 
    )
}

export default CheckoutPage;

