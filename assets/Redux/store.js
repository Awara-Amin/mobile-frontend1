import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import cartItems from "./Reducers/cartItem";
import favItems from "./Reducers/favItem";
// import socketItems from "./Reducers/socketItem";
// import favItems from "./Reducers/favItem";

// const initialState = {
//   favorite: {
//     favoriteItems: localStorage.getItem("favoriteItems")
//       ? JSON.parse(localStorage.getItem("favoriteItems"))
//       : [],
//   },
// };

// import { productReviewCreateReducer } from "./Reducers/productReducers";

// const initialState = {
//   userSignin: {
//     userInfo: localStorage.getItem("userInfo")
//       ? JSON.parse(localStorage.getItem("userInfo"))
//       : null,
//   },
// };
const reducers = combineReducers({
  cartItems: cartItems,
  favItems: favItems,
  // socket: socketItems,
});

const store = createStore(
  reducers,
  // initialState,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;
