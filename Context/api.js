// import React, { useState, useEffect, useContext, useCallback } from "react";

import axios from "axios";
import AuthGlobal from "./store/AuthGlobal";
// import AuthGlobal from "./store/AuthGlobal";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAllProductsApi = async (baseURL) => {
  return new Promise((resolve, rej) => {
    axios.get(`${baseURL}products`).then((res) => {
      resolve(res.data);
    });
  });
};

export const getAllCategoriesApi = async (baseURL) => {
  return new Promise((resolve, rej) => {
    axios.get(`${baseURL}categories`).then((res) => {
      resolve(res.data);
    });
  });
};

export const getAllUsersApi = async (baseURL) => {
  return new Promise((resolve, rej) => {
    axios.get(`${baseURL}users`).then((res) => {
      resolve(res.data);
    });
  });
};

export const getAllCouponsApi = async (baseURL) => {
  return new Promise((resolve, reh) => {
    axios.get(`${baseURL}coupons`).then((res) => {
      resolve(res.data);
    });
  });
};

export const getUserByIdApi = async (baseURL) => {
  // const context = useContext(AuthGlobal);
  // console.log(context);
  // const [token, setToken] = useState();
  // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk-10000");
  return new Promise((resolve, reh) => {
    AsyncStorage.getItem("jwt").then((res) => {
      setToken(res);
      axios
        .get(`${baseURL}users/${context.stateUser.user.userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk-9000");
          // console.log(res);
          resolve(res.data);
        });
    });
  });
};
