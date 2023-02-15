// import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../Constants";

import { ADD_TO_FAV, CLEAR_FAV, REMOVE_FROM_FAV } from "../Constants/constants";

const favItems = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_FAV:
      return [...state, action.payload];
    case REMOVE_FROM_FAV:
      return state.filter((favItem) => favItem !== action.payload);
    // case REMOVE_FROM_CART:
    //   return state.filter((item) => item.id !== action.payload);
    case CLEAR_FAV:
      return (state = []);
  }
  return state;
};

export default favItems;
