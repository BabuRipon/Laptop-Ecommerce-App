let initialState=[];

if(localStorage.getItem('cart')){
    initialState=JSON.parse(localStorage.getItem('cart'));
}

const CartReducer=(state=initialState,action)=>{
    switch(action.type){
        case "ADD_TO_CART":
            return [...action.payload];
        default:
            return state;
    }
}

export default CartReducer;