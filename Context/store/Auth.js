import React, { useState, useEffect, useReducer } from "react";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authReducers from "../reducers/Auth.reducer";

import { setCurrentUser } from "../actions/Auth.actions";
import AuthGlobal from "./AuthGlobal";

const Auth = (props) => {
  // using useReducer just like useState
  const [stateUser, dispatch] = useReducer(authReducers, {
    isAuthenticated: null,
    user: {},
  });
  // adding another useState
  const [showChild, setShowChild] = useState(false);

  // when it is render for the first time
  useEffect(() => {
    setShowChild(true);
    if (AsyncStorage.jwt) {
      const decoded = AsyncStorage.jwt ? AsyncStorage.jwt : "";
      if (setShowChild) {
        dispatch(setCurrentUser(jwt_decode(decoded)));
      }
    }
    // cleaning here
    return () => setShowChild(false);
  }, []);

  // if doesnot exist the showChild
  if (!showChild) {
    return null;
  } else {
    return (
      <AuthGlobal.Provider
        value={{
          stateUser,
          dispatch,
        }}
      >
        {props.children}
      </AuthGlobal.Provider>
    );
  }
};
export default Auth;
