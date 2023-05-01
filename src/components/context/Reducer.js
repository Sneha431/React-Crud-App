const initialStatedata = {
  count: 0,
};

export const cartReducer = (state = initialStatedata, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + action.payload,
      };

    case "DECREMENT":
      return {
        ...state,
        count: state.count - action.payload,
      };
    default:
      return state;
  }
};
