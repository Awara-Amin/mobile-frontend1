// this is to decode the user's passowrd
import jwt_decode from "jwt-decode";
// this is to storage user info when we chage pages like from cart to checkout
import AsyncStorage from "@react-native-async-storage/async-storage";

import Toast from "react-native-toast-message";
import baseURL from "../../assets/common/baseUrl";

// here we have one constat, and we create inside action not like Redux in a different folder
export const SET_CURRENT_USER = "SET_CURRENT_USER";

// the actions are (login, getuserprofile, and logout,)
// 1- login
export const loginUser = (user, dispatch) => {
  fetch(`${baseURL}users/login`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        const token = data.token;
        AsyncStorage.setItem("jwt", token);
        const decoded = jwt_decode(token); // decoded is the token, jwt_decode is helpping us to decode the token
        dispatch(setCurrentUser(decoded, user));
      } else {
        logoutUser(dispatch);
      }
    })
    .catch((err) => {
      // alert("Please provide correct credentials")
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: `Please provide correct credentials`,
        // text2: ``,
      });
      logoutUser(dispatch);
    });
};

// second action
export const getUserProfile = (id) => {
  fetch(`${baseURL}users/${id}`, {
    method: "GET",
    body: JSON.stringify(user),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error)); //new kaka
};

// third action
export const logoutUser = (dispatch) => {
  AsyncStorage.removeItem("jwt");
  dispatch(setCurrentUser({}));
};

export const passwordUpdate = (user, dispatch) => {
  fetch(`${baseURL}users/forgottenpassword`, {
    method: "PUT",
    body: JSON.stringify(user),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        const token = data.token;
        AsyncStorage.setItem("jwt", token);
        const decoded = jwt_decode(token); // decoded is the token, jwt_decode is helpping us to decode the token
        dispatch(setCurrentUser(decoded, user));
      } else {
        logoutUser(dispatch);
      }
    })
    .catch((err) => {
      // alert("Please provide correct credentials")
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: `Please provide correct credentials`,
        // text2: ``,
      });
      logoutUser(dispatch);
    });
};

// we create setCurrentUser too
export const setCurrentUser = (decoded, user) => {
  return {
    type: SET_CURRENT_USER, //we created this above
    payload: decoded,
    userProfile: user,
  };
};
