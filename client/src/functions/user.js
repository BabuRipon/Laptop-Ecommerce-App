import axios from "axios"

export const userCart=async(cart,authToken)=>{
   return await axios.post(`/api/user/cart`,{cart},{
    headers:{
        token:authToken
    }
});
}

export const getUserCart=async(authToken)=>{
    return await axios.get(`/api/user/cart`,{
     headers:{
         token:authToken
     }
 });
 }

 export const EmptyCart=async (authToken)=>{
     return axios.delete(`/api/user/cart/empty`,{
        headers:{
            token:authToken
        }
     })
 }

 export const saveUserAdress=async(adress,authToken)=>{
    return await axios.post(`/api/user/save/adress`,{adress},{
     headers:{
         token:authToken
     }
 });
 }

 export const applyDiscountCoupon=async(name,authToken)=>{
    return await axios.post(`/api/apply/coupon`,{name},{
     headers:{
         token:authToken
     }
 });
 }

 export const createOrder = async (paymentResponse, authToken) =>
  await axios.post(
    `/api/user/order`,
    { paymentResponse },
    {
      headers: {
        token:authToken
      },
    }
  );

  export const getUserOrders = async (authtoken) =>
  await axios.get(`/api/user/orders`, {
    headers: {
      token:authtoken,
    },
  });

  //wishlist
  export const getWishlist = async (authtoken) =>
  await axios.get(`/api/user/wishlist`, {
    headers: {
      token:authtoken,
    },
  });

export const removeWishlist = async (productId, authtoken) =>
  await axios.put(
    `/api/user/wishlist/${productId}`,
    {},
    {
      headers: {
        token:authtoken,
      },
    }
  );

export const addToWishlist = async (productId, authtoken) =>
  await axios.post(
    `/api/user/wishlist`,
    { productId },
    {
      headers: {
        token:authtoken,
      },
    }
  );

  export const createCashOrderForUser = async (
    authtoken,
    cod,
    couponApplied
  ) =>
    await axios.post(
      `/api/user/cash-order`,
      {cod,couponApplied},
      {
        headers: {
          token:authtoken,
        },
      }
    );

 