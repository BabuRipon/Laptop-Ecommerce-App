import * as actionType from './actionType'

// const initialState={
//     email:'',
//     token:''
// }

const reducer=(state=null,action)=>{
    switch(action.type){
        case actionType.LOGGED_IN_USER:
            return {
                ...state,
                ...action.payload
            };
        case actionType.LOGGED_OUT_USER:
            return action.payload;

        default:
            return state;
    }
}

export default reducer;