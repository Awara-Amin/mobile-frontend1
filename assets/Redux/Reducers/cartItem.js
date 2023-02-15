// import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../Constants";

import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_FROM_CART,
} from "../Constants/constants";

const cartItems = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    // return [...state, action.payload];

    case REMOVE_FROM_CART:
      // return state.filter((cartItem) => cartItem !== action.payload);
      // case REMOVE_FROM_CART:
      //   return state.filter((item) => item.id !== action.payload);
      return {
        ...state,
        error: "",
        cartItems: state.cartItems.filter(
          (x) => x.product !== action.payload.product
        ),
      };
    case CLEAR_CART:
      // return (state = []);
      return { ...state, error: "", cartItems: [] };
  }
  return state;
};

export default cartItems;
// const item = state.map((i) => {
//   // return i.product.cartItems;
//   var x = i.product.name;
//   return x;
// });
// const existItem = item.find((x) => x === action.payload.product.name);
