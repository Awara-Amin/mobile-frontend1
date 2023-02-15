import React, { useState, useCallback, useContext, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Button,
  List,
  Box,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import { Badge, Input } from "native-base";

import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native";
// import ListItem from "./ListItem";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import EasyButton from "../Shared/StyledComponents/EasyButton";
import ListItem from "./ListItem";
import { Pressable } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import AuthGlobal from "../../Context/store/AuthGlobal";

import io from "socket.io-client";
const socket = io.connect("http://localhost:3000");

var { height, width } = Dimensions.get("window");

function ListHeader() {
  return (
    <View elevation={1} style={styles.listHeader}>
      {/* <View style={styles.headerItem}></View> */}

      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Image</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Brand</Text>
      </View>

      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Name</Text>
      </View>

      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600", width: 50 }}>Stock</Text>
      </View>

      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Price</Text>
      </View>
    </View>
  );
}

const ProductScreen = (props) => {
  const context = useContext(AuthGlobal);
  const [productList, setProductList] = useState([]);
  const [productFilter, setProductFilter] = useState();
  const [loading, setLoading] = useState(false);
  // const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();

  const [ourUsers, setOurUsers] = useState([]);
  const [userFilter, setUserFilter] = useState();
  const [orderList, setOrderList] = useState([]);
  const [updatedUserWithNotification, SetUpdatedUserWithNotification] =
    useState([]);

  const pastDataList = [
    {
      id: "1",
      name: "Shoes",
      description: "10:30 AM",
      richDescription: "Beatriz Watson",
      image:
        "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
      brand: "Tea",
      price: "100",
      category: "10:30 AM",
      countInStock: "1",
      rating: "2 Oct 2020",
      numReview: "10:30 AM",
      isFeatured: "1",
      reviews: "2 Oct 2020",
    },
    {
      id: "2",
      name: "bags",
      description: "10:30 AM",
      richDescription: "Beatriz Watson",
      image:
        "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
      brand: "Tea2",
      price: "200",
      category: "10:30 AM",
      countInStock: "1",
      rating: "2 Oct 2020",
      numReview: "10:30 AM",
      isFeatured: "1",
      reviews: "2 Oct 2020",
    },
  ];
  // useFocusEffect(
  //   useCallback(() => {
  //     // get our Token
  //     AsyncStorage.getItem("jwt")
  //       .then((res) => {
  //         setToken(res);
  //       })
  //       .catch((error) => console.log(error));

  //     axios.get(`${baseURL}products`).then((res) => {
  //       console.log("res.data aaaaaaaaaaaaaaaaaa 1");
  //       console.log(res.data);
  //       setProductList(res.data);
  //       setProductFilter(res.data);
  //       setLoading(false);
  //     });

  //     return () => {
  //       setProductList();
  //       setProductFilter();
  //       setLoading(true);
  //     };
  //   }, [])
  // );

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));

      axios
        .get(`${baseURL}users`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          // console.log("kakakakakakakakakak 11111");
          // console.log(res);
          // console.log("kakakakakakakakakak 22222");
          // console.log(res.data);
          setOurUsers(res.data);
          // SetUpdatedUserWithNotification(res.data.data.unseenNotifications);

          // setUserFilter(res.data);
        })
        //   .catch((error) => alert("Error to load Users kaka"));
        .catch((error) => console.log(error));

      axios
        .get(`${baseURL}users/${context.stateUser.user.userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          // console.log("kakakakakakakakakak 11111");
          // console.log(res);
          // console.log("kakakakakakakakakak 22222");
          // console.log(res.data.name);
          setOurUsers(res.data.name);
          SetUpdatedUserWithNotification(res.data.unseenNotifications);

          // setUserFilter(res.data);
        })
        //   .catch((error) => alert("Error to load Users kaka"));
        .catch((error) => console.log(error));

      console.log("test-1TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT-2000");
      console.log(updatedUserWithNotification);

      axios.get(`${baseURL}products`).then((res) => {
        // console.log("res.data aaaaaaaaaaaaaaaaaa 1");
        // console.log(res);
        // console.log(res.data);
        setProductList(res.data);
        setLoading(false);
      });

      axios.get(`${baseURL}orders`).then((x) => {
        setOrderList(x.data);
      });

      return () => {
        setOurUsers([]);
        setProductList([]);
        setOrderList([]);
        // setUserFilter();
        setToken();
      };
    }, [props])
  );
  // console.log(ourUsers.length);
  // console.log("reached hereeeeee eeeeeeeeeeeee-12-2023-11");
  // console.log(updatedUserWithNotification);

  // console.log("reached hereeeeee eeeeeeeeeeeee-13-2023-22");
  // console.log(updatedUserWithNotification.length);

  // const updateNotificationByAdmin = (id) => {
  const updateNotificationByAdmin = () => {
    // console.log(
    //   "iam updated getting updated by admin mateEEEEEEEEEEEEEEEE wwwwwwwwwwwwwwwwwwwww-2001"
    // );
    // console.log(id);
    // let info2 = {
    //   userIDD: context.stateUser.user.userId,
    //   useNAMEE: userProfile,
    //   couponNumber: coupon,
    //   // discountAmount: couponList.discount,
    // };
    // console.log(
    //   "hello modal kakaaaaaa12 EEEEEEEEEEEwwwwwwwwwwwwwwwwwwwww-2003"
    // );
    axios

      // .put(`${baseURL}users/a-coupon`, info2)
      .put(`${baseURL}users/admin-updates-notification`)
      .then((res) => {
        // console.log("reached hereeeeee EEEEEEEEEEEwwwwwwwwwwwwwwwwwwwww-2002");
        // console.log(res.data.success);
        // console.log(res.data);
        SetUpdatedUserWithNotification(res.data.data.unseenNotifications);
        // setUpdatedUserData([res.data.data]);
        // SetUpdatedUserWithNotification(res.data.data.unseenNotifications);
      })
      .catch((error) => {
        console.log(error);
        // Toast.show({
        //   topOffset: 60,
        //   type: "error",
        //   text1: "Something has gone wrong",
        //   text2: "Please try again",
        // });
      });
  };
  ///////

  // useEffect(() => {
  //   socket.off("notif").on("notif", (data) => {
  //     // socket.on("orderNotification", (data) => {
  //     // let currentProduct = db.get(data.productId); // productId this id is the same with the one is sent to backend
  //     // let currentItem = db.get(data);
  //     // console.log(data);
  //     SetUpdatedUserWithNotification(
  //       data.updatedUserSocket.unseenNotifications
  //     );
  //     console.log("test-1TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT- 4000");

  //     // currentProduct.reviews.push(data.review);
  //     // db.set(currentProduct.id, currentProduct);
  //     // setSokReviews(currentProduct.reviews);
  //     // setNoReviews(currentProduct.reviews.length);
  //     // setComment("");
  //     // setRating("");

  //     // db.set(currentProduct.id, {
  //     //   currentProduct,
  //     //   // ...currentItem,
  //     //   // reviews: pushReview,
  //     // });
  //     // setSokReviews(db.get(data.productId).reviews); // propedItem.id = productId , these two sre the same
  //     // setSokReviews(db.get(currentItem.reviews)); // propedItem.id = productId , these two sre the same
  //   });
  // }, [socket]);

  // useEffect(() => {
  socket.on("notif", (data) => {
    // socket.on("orderNotification", (data) => {
    // let currentProduct = db.get(data.productId); // productId this id is the same with the one is sent to backend
    // let currentItem = db.get(data);
    console.log(data);
    SetUpdatedUserWithNotification(data.updatedUserSocket.unseenNotifications);
    console.log("2023 3333333333333333333333333- 4000");

    // currentProduct.reviews.push(data.review);
    // db.set(currentProduct.id, currentProduct);
    // setSokReviews(currentProduct.reviews);
    // setNoReviews(currentProduct.reviews.length);
    // setComment("");
    // setRating("");

    // db.set(currentProduct.id, {
    //   currentProduct,
    //   // ...currentItem,
    //   // reviews: pushReview,
    // });
    // setSokReviews(db.get(data.productId).reviews); // propedItem.id = productId , these two sre the same
    // setSokReviews(db.get(currentItem.reviews)); // propedItem.id = productId , these two sre the same
  });
  // }, [updatedUserWithNotification]);
  // console.log("test-1TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT-1100044");
  // console.log(sokReviews);

  const searchProduct = (text) => {
    if (text == "") {
      setProductFilter(productList);
    }
    setProductFilter(
      productList.filter((i) =>
        i.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const deleteProduct = (id) => {
    axios
      .delete(`${baseURL}products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const products = productFilter.filter((item) => item.id !== id);
        setProductFilter(products);
      })
      .catch((error) => console.log(error));
  };

  // the Ui
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor={Colors.primary} />
      <View>
        {theTopButton()}
        {/* {search()} */}
      </View>
      {/* <ScrollView showsHorizontalScrollIndicator={false}> */}
      {/* {ListHeader()} */}
      {viewAll()}
      {/* {insider()} */}

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {dashboardUsersPart()}
        {dashboardProductsPart()}
        {dashboardOrdersPart()}

        {/* {viewAll()} */}
        {/* {productsCtg.length > 0 ? (
          <View>
            {productsCtg.map((item, index) => {
              return (
                <ProductList navigation={navigation} key={index} item={item} />
              );
            })}
          </View>
        ) : (
          <View style={[styles.center, { height: height / 2 }]}>
            <Text>No products found</Text>
          </View>
        )} */}
      </ScrollView>
      {/* </ScrollView> */}
    </SafeAreaView>
  );

  function viewAll() {
    return (
      <TouchableOpacity
        activeOpacity={0.99}
        // onPress={() => navigation.navigate("ViewAll")}
      >
        <View style={styles.viewAllStyle}>
          <Text
            style={{
              ...Fonts.primaryColor17Bold,
              marginRight: Sizes.fixPadding - 5.0,
            }}
          >
            DASHBOARD
          </Text>
          {/* <Ionicons name="chevron-forward" size={23} color="black" /> */}
        </View>
      </TouchableOpacity>
    );
  }

  function dashboardUsersPart() {
    return (
      <View style={styles.labAndCheckUpContainer}>
        {/* <Image
          style={{
            height: 199.0,
            width: width - 200.0,
            borderTopLeftRadius: Sizes.fixPadding + 5.0,
            borderBottomLeftRadius: Sizes.fixPadding + 5.0,
            overflow: "hidden",
          }}
          resizeMode="cover"
          source={{ uri: props.image }}
          // source={props.image}
        /> */}
        <View style={styles.labInformationContainer}>
          {/* <Text numberOfLines={3} style={{ ...Fonts.black16Bold }}>
            {props.name.length > 15
              ? props.name.substring(0, 23 - 3) + "..."
              : props.name}
          </Text> */}
          <Text
            numberOfLines={2}
            style={{ ...Fonts.grayBold, marginTop: Sizes.fixPadding - 5.0 }}
          >
            <Text style={styles.price}>USERS</Text>
          </Text>
          <View style={styles.callNowButtonStyle}>
            <Text style={{ ...Fonts.primaryColorBold }}>{ourUsers.length}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              marginLeft: 15,
              marginTop: 15,
            }}
          >
            <View style={styles.favoritecircle}>
              <TouchableOpacity
              // onPress={() => {
              //   // props.addItemToFav(props, qty);
              //   props.addItemToFav(props, qty);
              //   // Toast.show({
              //   //   topOffset: 60,
              //   //   type: "success",
              //   //   text1: `${item.name} added to Cart`,
              //   //   text2: "Go to your cart to complete order",
              //   // });
              // }}
              >
                {/* <Ionicons name="md-heart-outline" size={25} color="black" /> */}
                {/* <Ionicons name="md-heart-sharp" size={24} color="black" /> */}
              </TouchableOpacity>
            </View>

            {/* {props.countInStock > 0 ? (
              <View>
                <TouchableOpacity
                  style={styles.addcircle}
                  onPress={() => {
                    props.addItemToCart(props, qty);
                    // Toast.show({
                    //   topOffset: 60,
                    //   type: "success",
                    //   text1: `${item.name} added to Cart`,
                    //   text2: "Go to your cart to complete order",
                    // });
                  }}
                >
                  <Entypo disabled name="plus" size={24} color="green" />
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <TouchableOpacity disabled style={styles.disaddcircle}>
                  <Entypo disabled name="plus" size={24} color="red" />
                </TouchableOpacity>
              </View>
            )} */}
          </View>
        </View>

        <View>
          <TouchableOpacity
            disabled
            style={{
              position: "absolute",
              right: 7,
              bottom: 30,
              zIndex: 1,
            }}
          >
            <FontAwesome5 name="user" size={60} color="red" />
            {/* <FontAwesome5 size={24} name="product-hunt" color="red" /> */}
            {/* <Entypo disabled name="plus" size={24} color="red" /> */}
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function dashboardProductsPart() {
    return (
      <View style={styles.labAndCheckUpContainer}>
        {/* <Image
          style={{
            height: 199.0,
            width: width - 200.0,
            borderTopLeftRadius: Sizes.fixPadding + 5.0,
            borderBottomLeftRadius: Sizes.fixPadding + 5.0,
            overflow: "hidden",
          }}
          resizeMode="cover"
          source={{ uri: props.image }}
          // source={props.image}
        /> */}
        <View style={styles.labInformationContainer}>
          {/* <Text numberOfLines={3} style={{ ...Fonts.black16Bold }}>
            {props.name.length > 15
              ? props.name.substring(0, 23 - 3) + "..."
              : props.name}
          </Text> */}
          <Text
            numberOfLines={2}
            style={{ ...Fonts.grayBold, marginTop: Sizes.fixPadding - 5.0 }}
          >
            <Text style={styles.price}>PRODUCTS</Text>
          </Text>
          <View style={styles.callNowButtonStyle}>
            <Text style={{ ...Fonts.primaryColorBold }}>
              {productList.length}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              marginLeft: 15,
              marginTop: 15,
            }}
          >
            <View style={styles.favoritecircle}>
              <TouchableOpacity
              // onPress={() => {
              //   // props.addItemToFav(props, qty);
              //   props.addItemToFav(props, qty);
              //   // Toast.show({
              //   //   topOffset: 60,
              //   //   type: "success",
              //   //   text1: `${item.name} added to Cart`,
              //   //   text2: "Go to your cart to complete order",
              //   // });
              // }}
              >
                {/* <Ionicons name="md-heart-outline" size={25} color="black" /> */}
                {/* <Ionicons name="md-heart-sharp" size={24} color="black" /> */}
              </TouchableOpacity>
            </View>
            {/* {props.countInStock > 0 ? (
              <View>
                <TouchableOpacity
                  style={styles.addcircle}
                  onPress={() => {
                    props.addItemToCart(props, qty);
                    // Toast.show({
                    //   topOffset: 60,
                    //   type: "success",
                    //   text1: `${item.name} added to Cart`,
                    //   text2: "Go to your cart to complete order",
                    // });
                  }}
                >
                  <Entypo disabled name="plus" size={24} color="green" />
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <TouchableOpacity disabled style={styles.disaddcircle}>
                  <Entypo disabled name="plus" size={24} color="red" />
                </TouchableOpacity>
              </View>
            )} */}
          </View>
        </View>
        <View>
          <TouchableOpacity
            disabled
            style={{
              position: "absolute",
              right: 7,
              bottom: 30,
              zIndex: 1,
            }}
          >
            {/* <FontAwesome5 name="user" size={60} color="red" /> */}
            <FontAwesome5 size={60} name="product-hunt" color="red" />
            {/* <Entypo disabled name="plus" size={24} color="red" /> */}
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function dashboardOrdersPart() {
    return (
      <View style={styles.labAndCheckUpContainer}>
        {/* <Image
          style={{
            height: 199.0,
            width: width - 200.0,
            borderTopLeftRadius: Sizes.fixPadding + 5.0,
            borderBottomLeftRadius: Sizes.fixPadding + 5.0,
            overflow: "hidden",
          }}
          resizeMode="cover"
          source={{ uri: props.image }}
          // source={props.image}
        /> */}
        <View style={styles.labInformationContainer}>
          {/* <Text numberOfLines={3} style={{ ...Fonts.black16Bold }}>
            {props.name.length > 15
              ? props.name.substring(0, 23 - 3) + "..."
              : props.name}
          </Text> */}
          <Text
            numberOfLines={2}
            style={{ ...Fonts.grayBold, marginTop: Sizes.fixPadding - 5.0 }}
          >
            <Text style={styles.price}>ORDERS</Text>
          </Text>
          <View style={styles.callNowButtonStyle}>
            <Text style={{ ...Fonts.primaryColorBold }}>
              {orderList.length}
              {/* {updatedUserWithNotification.length} */}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              marginLeft: 15,
              marginTop: 15,
            }}
          >
            <View>
              {/* {updatedUserWithNotification.length > 0 ? (
                <Badge
                  style={styles.badge}
                  rounded="full"
                  h={6}
                  paddingRight={4}
                  marginBottom={4}
                >
                  <Text style={styles.text}>
                    {updatedUserWithNotification.length}
                  </Text>
                </Badge>
              ) : null} */}
              <TouchableOpacity
                onPress={() => updateNotificationByAdmin()}
                // onPress={() => {
                //   // props.addItemToFav(props, qty);
                //   props.addItemToFav(props, qty);
                //   // Toast.show({
                //   //   topOffset: 60,
                //   //   type: "success",
                //   //   text1: `${item.name} added to Cart`,
                //   //   text2: "Go to your cart to complete order",
                //   // });
                // }}
              >
                {updatedUserWithNotification.length > 0 ? (
                  <Badge
                    style={styles.badge}
                    rounded="full"
                    h={6}
                    paddingRight={4}
                    marginBottom={4}
                  >
                    <Text style={styles.text}>
                      {updatedUserWithNotification.length}
                    </Text>
                  </Badge>
                ) : null}
                {/* <Ionicons name="md-heart-outline" size={25} color="black" /> */}
                {/* <Ionicons name="md-heart-sharp" size={24} color="black" /> */}
              </TouchableOpacity>
            </View>
            {/* {props.countInStock > 0 ? (
              <View>
                <TouchableOpacity
                  style={styles.addcircle}
                  onPress={() => {
                    props.addItemToCart(props, qty);
                    // Toast.show({
                    //   topOffset: 60,
                    //   type: "success",
                    //   text1: `${item.name} added to Cart`,
                    //   text2: "Go to your cart to complete order",
                    // });
                  }}
                >
                  <Entypo disabled name="plus" size={24} color="green" />
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <TouchableOpacity disabled style={styles.disaddcircle}>
                  <Entypo disabled name="plus" size={24} color="red" />
                </TouchableOpacity>
              </View>
            )} */}
          </View>
        </View>

        <View>
          <TouchableOpacity
            disabled
            style={{
              position: "absolute",
              right: 7,
              bottom: 30,
              zIndex: 1,
            }}
          >
            {/* <FontAwesome5 name="user" size={60} color="red" /> */}
            {/* <FontAwesome5 size={24} name="product-hunt" color="red" /> */}
            <FontAwesome5 name="first-order" size={60} color="red" />
            {/* <Entypo disabled name="plus" size={24} color="red" /> */}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  function theTopButton() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <ScrollView
            rounded={10}
            bg={Colors.main}
            horizontal={true}
            showsHorizontalScrollIndicator={true}
          >
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => props.navigation.navigate("Orders")}
            >
              {/* {updatedUserWithNotification.length > 0 ? (
                <Badge
                  style={styles.badge}
                  rounded="full"
                  h={6}
                  paddingRight={4}
                  marginBottom={4}
                  onPress={() => updateNotificationByAdmin()}
                >
                  <Text style={styles.text}>
                    {updatedUserWithNotification.length}
                  </Text>
                </Badge>
              ) : null} */}
              {/* <FontAwesome5 name="shopping-cart" size={24} color="red" /> */}
              <FontAwesome5 name="first-order" size={24} color="red" />
              {/* <FontAwesomeIcon icon="fa-light fa-chart-tree-map" /> */}
              {/* <FontAwesomeIcon icon="fab fa-first-order" /> */}
              <Text style={styles.buttonText}>Orders</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={styles.buttons}
              onPress={() => props.navigation.navigate("ProductForm")}
            >
              <FontAwesome5 name="plus" size={24} color="red" />
              <Text style={styles.buttonText}>Products</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              style={styles.buttons}
              onPress={() => props.navigation.navigate("ProductMainScreen")}
            >
              {/* <Ionicons name="plus" size={16} color="white" /> */}
              {/* <FontAwesome5 name="plus" size={24} color="red" /> */}
              <FontAwesome5 size={24} name="product-hunt" color="red" />
              <Text style={styles.buttonText}>Products</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttons}
              onPress={() => props.navigation.navigate("Categories")}
            >
              {/* <Ionicons name="plus" size={16} color="white" /> */}
              {/* <FontAwesome5 name="plus" size={24} color="red" /> */}
              <FontAwesome5 name="circle" size={24} color="red" />
              <Text style={styles.buttonText}>Category</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttons}
              onPress={() => props.navigation.navigate("Users")}
            >
              {/* <Ionicons name="plus" size={16} color="white" /> */}
              <FontAwesome5 name="user" size={24} color="red" />
              {/* <FontAwesomeIcon icon="fa-solid fa-user" /> */}
              <Text style={styles.buttonText}>Users</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttons}
              // onPress={() => props.navigation.navigate("Coupons")}
              onPress={() => props.navigation.navigate("CouponMainScreen")}
            >
              {/* <Ionicons name="plus" size={16} color="white" /> */}
              <FontAwesome5 name="gift" size={24} color="red" />
              {/* <FontAwesomeIcon icon="fa-solid fa-gift" /> */}
              <Text style={styles.buttonText}>Coupons</Text>
            </TouchableOpacity>

            {/* <EasyButton
          secondary
          medium
          onPress={() => props.navigation.navigate("ProductForm")}
        >
          <Icon name="plus" size={16} color="white" />
          <Text style={styles.buttonText}>Products</Text>
        </EasyButton> */}

            {/* <EasyButton
          secondary
          medium
          onPress={() => props.navigation.navigate("Categories")}
        >
          <Icon name="plus" size={16} color="white" />
          <Text style={styles.buttonText}>Categories</Text>
        </EasyButton> */}

            {/* <EasyButton
          secondary
          medium
          onPress={() => props.navigation.navigate("Users")}
        >
          <Icon name="user" size={16} color="white" />
          <Text style={styles.buttonText}>Users</Text>
        </EasyButton> */}
          </ScrollView>
        </View>

        {/* <View style={styles.inputview}>
          <Input
            style={styles.input}
            placeholder="Search"
            //   onFocus={openList}
            // onChangeText={(text) => searchProduct(text)}
          />
        </View> */}

        {/* <View style={styles.spinner}>
          {loading ? (
            // the spiner
            <View>
              <ActivityIndicator size="large" color="red" />
            </View>
          ) : (
            <FlatList
              // data={productFilter}
              data={pastDataList}
              ListHeaderComponent={ListHeader}
              renderItem={({ item, index }) => (
                // <Text>{item.name}</Text>
                <ListItem
                  {...item}
                  navigation={props.navigation}
                  index={index}
                  // delete={deleteProduct}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          )}
        </View> */}
      </View>
      // <TouchableOpacity
      //   activeOpacity={0.99}
      //   style={styles.confirmAndPayButtonStyle}
      //   onPress={() => navigation.navigate("PaymentMethod")}
      // >
      //   <View style={styles.confirmButtonStyle}>
      //     <Text style={{ ...Fonts.white20Regular }}>Confirm & Pay</Text>
      //   </View>
      // </TouchableOpacity>
    );
  }

  function search() {
    return (
      <View style={styles.inputview}>
        <Input
          style={styles.input}
          placeholder="Search"
          //   onFocus={openList}
          // onChangeText={(text) => searchProduct(text)}
        />
      </View>
    );
  }

  function insider() {
    return (
      <View style={styles.spinner}>
        {loading ? (
          // the spiner
          <View>
            <ActivityIndicator size="large" color="red" />
          </View>
        ) : (
          <FlatList
            data={productFilter}
            // data={pastDataList}
            // ListHeaderComponent={ListHeader}
            renderItem={({ item, index }) => (
              // <Text>{item.name}</Text>
              <ListItem
                {...item}
                navigation={props.navigation}
                index={index}
                // delete={deleteProduct}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "gainsboro",
  },
  headerItem: {
    margin: 3,
    width: width / 6,
  },
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    marginBottom: 10,
    backgroundColor: "green",
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center",
    flexDirection: "row",
  },
  buttonText: {
    margin: 4,
    color: "black",
  },

  inputview: {
    height: 60,
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#E7EAED",
    padding: 0,
  },

  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#fff",
    margin: 10,
    borderColor: "#ccc",
    borderWidth: 0,
    borderRadius: 15,
    fontSize: 16,
  },
  buttons: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "gainsboro",
    borderRadius: 15,
    margin: 4,
  },
  viewAllStyle: {
    // flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding,
  },
  labAndCheckUpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // height: 200.0,
    width: width - 40,
    alignSelf: "center",
    borderRadius: Sizes.fixPadding + 5.0,
    backgroundColor: "white",
    borderColor: Colors.lightGray,
    borderWidth: 2.0,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 4.0,
    marginBottom: 20.0,
    overflow: "hidden",
    zIndex: -10,
  },
  labInformationContainer: {
    marginLeft: Sizes.fixPadding,
    marginRight: Sizes.fixPadding,
    width: width - 220,
    marginTop: Sizes.fixPadding + 5.0,
  },
  disaddcircle1: {
    position: "absolute",
    right: 15,
    bottom: 40,
    // top: 55,
    // backgroundColor: "white",
    // padding: 8,
    // borderRadius: 100,
    // elevation: 20,
    // marginBottom: 40,
    zIndex: 1,
  },
  badge: {
    width: 7,
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    top: -70,
    left: 40,
    backgroundColor: "red",
  },
  text: {
    fontSize: 12,
    width: 7,
    fontWeight: "bold",
    color: "white",
  },
});

export default ProductScreen;
// export default Products;
