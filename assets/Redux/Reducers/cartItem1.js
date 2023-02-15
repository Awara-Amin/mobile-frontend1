// import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../Constants";

import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_FROM_CART,
} from "../Constants/constants";

const cartItems = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // console.log(
      //   "actionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn RRRRRRRRRRRRRRRRRRRRRRRRR-4 item"
      // );
      // // console.log(action);
      // console.log(action.payload.product.name);
      // const item = state.product.find((i) => i.name === action.payload.name);

      // if (state.length !== undefined) {
      //   console.log("actionnnnnnnnnnnnnnnnnn RRRRRRRRRRRRRRRRRRRRRRRRR-5 item");
      //   state.map((i) => console.log(i.product.name));
      //   console.log("actionnnnnnnnnnnnnnnnnn RRRRRRRRRRRRRRRRRRRRRRRRR-3 item");

      //   console.log("item");
      // } else {
      //   console.log(
      //     "actionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn RRRRRRRRRRRRRRRRRRRRRRRRR-2 item"
      //   );
      // }

      // console.log(
      //   "actionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn RRRRRRRRRRRRRRRRRRRRRRRRR-1 item"
      // );
      // console.log(state);
      // console.log(
      //   "actionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn RRRRRRRRRRRRRRRRRRRRRRRRR-6 item"
      // );
      // console.log(state.cartItems);
      return [...state, action.payload];
    case REMOVE_FROM_CART:
      return state.filter((cartItem) => cartItem !== action.payload);
    // case REMOVE_FROM_CART:
    //   return state.filter((item) => item.id !== action.payload);
    case CLEAR_CART:
      return (state = []);
  }
  return state;
};

export default cartItems;
