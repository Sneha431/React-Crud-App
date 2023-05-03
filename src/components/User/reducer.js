const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, item: [] };
  }

  if (action.type === "REMOVE_ITEM") {
    return {
      ...state,
      item: state.item.filter((curElem) => {
        return curElem._id !== action.payload;
      }),
    };
  }

  if (action.type === "INCREMENT") {
    //   we need to find out which item is clicked
    let updatedCart = state.item.map((curElem) => {
      if (curElem._id === action.payload) {
        return {
          ...curElem,
          cartquantity: parseInt(curElem.cartquantity) + 1,
          totalAmount:
            parseInt(curElem.price) * (parseInt(curElem.cartquantity) + 1),
        };
      }
      return curElem;
    });

    return { ...state, item: updatedCart };
  }

  if (action.type === "DECREMENT") {
    //   we need to find out which item is clicked
    let updatedCart = state.item
      .map((curElem) => {
        if (curElem._id === action.payload) {
          return {
            ...curElem,
            cartquantity: parseInt(curElem.cartquantity) - 1,
            totalAmount:
              parseInt(curElem.price) * (parseInt(curElem.cartquantity) - 1),
          };
        }
        return curElem;
      })
      .filter((curElem) => curElem.cartquantity !== 0);
    return { ...state, item: updatedCart };
  }
  // if (action.type === "GET_TOTAL") {
  //   let totalAmount1 = state.totalAmount;
  //   let updatedCart = state.item.map((curElem) => {
  //     totalAmount1 += curElem.totalAmount;
  //     console.log(totalAmount1);
  //     return { ...state, totalAmount1 };
  //   });
  // }
  if (action.type === "GET_TOTAL") {
    let totalprice = state.item.reduce((initialval, curElem) => {
      let { price, cartquantity } = curElem;
      initialval = initialval + price * cartquantity;
      return initialval;
    }, 0);
    let totalItem = state.item.reduce((initialval, curElem) => {
      let { cartquantity } = curElem;
      initialval = initialval + parseInt(cartquantity);
      return initialval;
    }, 0);
    // console.log(totalprice);
    return { ...state, totalAmount: totalprice, totalItem };
  }
  return state;
};

export default reducer;
