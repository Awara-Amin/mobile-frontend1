// import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from "../constants";

import { ADD_TO_FAV, CLEAR_FAV, REMOVE_FROM_FAV } from "../Constants/constants";

export const addToFav = (payload) => {
  return {
    type: ADD_TO_FAV,
    payload,
  };
};

export const removeFromFav = (payload) => {
  return {
    type: REMOVE_FROM_FAV,
    payload,
  };
};

export const clearFav = () => {
  return {
    type: CLEAR_FAV,
  };
};
