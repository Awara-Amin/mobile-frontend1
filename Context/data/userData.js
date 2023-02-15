// import React, { useState, useEffect, useContext, useCallback } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserByIdApi } from "../api";
import axios from "axios";
// import AuthGlobal from "../store/AuthGlobal";
// import AuthGlobal from "./store/AuthGlobal";

export class UserData {
  data;

  constructor() {
    this.data = new Map();
  }

  setUser(id, item) {
    this.data.set(id, item);
  }
  updateUser(id, options) {
    let user = this.data.get(id);

    if (user) {
      this.data.set(id, {
        ...user,
        ...options,
      });
      return this.data.get(id);
    }
  }
  getUser(id) {
    return this.data?.get(id);
  }

  getAllUsers() {
    return Array.from(this.data.values());
  }

  async fetchUserData(url, headerObj) {
    // const context = useContext(AuthGlobal);
    // console.log(context);
    // const [token, setToken] = useState();
    // if (this.data.size != 0) {
    //   return new Promise((resolve, rej) => {
    //     resolve(this.getAllProducts());
    //   });
    // } else {
    //   this.data.clear();
    return new Promise((resolve, rej) => {
      axios.get(url, headerObj).then((res) => {
        // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk-9000");
        // console.log(res);
        resolve(res.data);
      });
      // });
      //   getUserByIdApi(baseURL).then((res) => {
      //     console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk-5000");
      //     console.log(res);
      //     // getAllCategoriesApi(baseURL).then((res) => {

      //     //   res.forEach((category) => {
      //     //     this.setCategory(category.id, category);
      //     //   });
      //     //   resolve(this.getAllCategories());
      //     resolve(this.getUser());
      //   });
    });
    // }
  }

  // update product, giving notification to admin
  async updateUserDataWithNotification(urlForUpdateUser, info) {
    // if (this.data.size != 0) {
    //   return new Promise((resolve, rej) => {
    //     resolve(this.getAllProducts());
    //   });
    // } else {
    // this.data.clear();
    return new Promise((resolve, rej) => {
      axios.put(urlForUpdateUser, info).then((res) => {
        // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk-9000");
        // console.log(res);
        resolve(res.data);
      });
    });
    // }
  }
}
