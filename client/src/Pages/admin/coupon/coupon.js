import React,{useState,useEffect} from 'react'
import AdminNav from '../../component/nav/adminav';
import { useSelector } from 'react-redux';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import { DeleteOutlined} from '@ant-design/icons';

import { createCoupon , getCoupons ,deleteCoupon} from '../../../functions/coupon';

import "react-datepicker/dist/react-datepicker.css";

const CouponPage=()=>{

    const [name,setName]=useState('')
    const [discount,setDiscount]=useState(0)
    const [expiryDate,setExpiryDate]=useState(new Date())
    const [loading,setLoading]=useState(false);
    const [coupons,setCoupons]=useState([]);

    const {user}=useSelector(state=>state);

    useEffect(()=>{
        LoadCoupons();  
    },[])

    const LoadCoupons=async()=>{
        getCoupons(user.token)
        .then(res=>{
            setCoupons(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    const onCouponSubmitHandler=(e)=>{
        e.preventDefault();
        setLoading(true);
        let couponData={name,discount,expiryDate};
        // console.log(couponData);
        createCoupon(couponData,user.token)
        .then(res=>{
            console.log(res.data);
            LoadCoupons();
            setName("");
            setDiscount(0);
            setExpiryDate(new Date());
            setLoading(false);
            toast.success('coupon created')
        })
        .catch(err=>{
            setLoading(false);
            console.log(err);
        })
    }

    const onCouponDeleteHandler=(id)=>{
        deleteCoupon(id,user.token)
        .then(res=>{
            console.log(res.data);
            LoadCoupons();
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return (
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-2 ">
                    <AdminNav />
            </div>
            <div className="col mt-5">
                    {loading?
                    <h4 className="text-danger">loading...</h4>
                    :<h4>Create Coupon</h4>}
                    <hr /><br />
                    <form onSubmit={onCouponSubmitHandler}>
                          <div className="form-group">
                              <label className="form-label">Name</label>
                              <input 
                              type="text"
                              className="form-control"
                              name="name"
                              value={name}
                              onChange={e=>setName(e.target.value)}
                              />
                          </div>
                          <div className="form-group">
                              <label className="form-label">Discount(%)</label>
                              <input 
                              type="number"
                              className="form-control"
                              name="discount"
                              value={discount}
                              onChange={e=>setDiscount(e.target.value)}
                              />
                          </div>
                          <div className="form-group">
                          <label className="form-label">Expiry Date</label>
                          <DatePicker  
                          className="form-control" 
                          selected={expiryDate}  
                          onChange={(date) => setExpiryDate(date)} />
                          </div>
                          <button className="btn btn-outline-primary">Create</button>
                    </form>
                    <hr />
                    
                <h5 className="text-primary">{coupons.length} coupons</h5>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                        <th scope="col">name</th>
                        <th scope="col">discount</th>
                        <th scope="col">expiry date</th>
                        <th scope="col">action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            coupons.map(c=>(
                                <tr key={c._id}>
                                    <td>{c.name}</td>
                                    <td>{c.discount}</td>
                                    <td>{new Date(c.expiryDate).toLocaleDateString()}</td>
                                    <td>
                                        <DeleteOutlined 
                                         className="text-danger"
                                         onClick={()=>onCouponDeleteHandler(c._id)}
                                        />
                                    </td>
                                </tr>
                            ))
                        }
                        
                    </tbody>
                </table>
                <br />
               
            </div>
      </div>
   </div>
    )
}

export default CouponPage;
