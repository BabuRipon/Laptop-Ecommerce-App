import axios from "axios";

export const createCoupon=async(couponData,authToken)=>{
  return await axios.post(`/api/coupon`,{couponData},{
    headers:{
        token:authToken
    }
});
}

export const deleteCoupon=async(coupon_id,authToken)=>{
    return await axios.delete(`/api/coupon/${coupon_id}`,{
        headers:{
            token:authToken
        }
    });
}

export const getCoupons=async(authToken)=>{
    return await axios.get(`/api/coupon`,{
        headers:{
            token:authToken
        }
    });
}

