
const DrawerReducer=(state=false,action)=>{
    switch(action.type){
        case 'VISIBLE_ACTIVITY':
            return action.payload;
        default:
            return state;
    }
}

export default DrawerReducer;