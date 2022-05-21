const codReducer = (state = false, action) => {
    switch (action.type) {
      case "COD": //COD stands for cash on delivery
        return action.payload;
      default:
        return state;
    }
  };

  export default codReducer;