export const increment = (item) => {
  return {
    type: "INCREMENT",
    payload: item,
  };
};
export const decrement = (item) => {
  return {
    type: "DECREMENT",
    payload: item,
  };
};
