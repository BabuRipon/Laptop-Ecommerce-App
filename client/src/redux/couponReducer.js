
const CouponReducer=(state={
    totalAfterDiscount:0,coupon:false,},
    action)=>{
    switch(action.type){
        case "DISCOUNT_FOR_COUPON":
            return {...state,...action.payload}
        default:
            return state;
    }
}

export default CouponReducer;