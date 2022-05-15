
const SearchReducer=(state={text:''},action)=>{
    switch(action.type){
        case "TEXT_SEARCH":
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}

export default SearchReducer;