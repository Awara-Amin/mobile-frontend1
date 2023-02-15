import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  TextInput,
} from "react-native";
import {
  Badge,
  Modal,
  Center,
  VStack,
  HStack,
  Button,
  FormControl,
  Input,
  Box,
  useToast,
  Toast,
} from "native-base";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { ScrollView } from "native-base";
import { connect } from "react-redux";
import AuthGlobal from "../../Context/store/AuthGlobal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import { useFocusEffect } from "@react-navigation/native";

import { CouponData } from "../../Context/data/couponData";
export const couponDb = new CouponData();
import { CategoryData } from "../../Context/data/categoryData";
export const categoryDb = new CategoryData();
import { UserData } from "../../Context/data/userData";
export const userDb = new UserData();
// import { CategoryData } from "../../Context/data/categoryData";

const { width } = Dimensions.get("screen");

// const ConsultaionScreen = ({ navigation, route }) => {
const OrderDetailScreen = (props) => {
  const context = useContext(AuthGlobal);
  const finalOrder = props.route.params;
  // console.log("finalOrder rrrrr1111111111111111111111-T");
  // console.log(props);
  // console.log("finalOrder rrrrr1222222222");
  // console.log(finalOrder.order);
  // console.log("finalOrder rrrrr1333333333");
  // console.log(finalOrder.order.order);
  // console.log("finalOrder rrrrr1444444444 here");
  // console.log(finalOrder.order.order.orderItems.cartItems);

  // console.log(finalOrder.order.order.orderItems);
  // console.log("finalOrder rrrrr155555555555");
  // console.log(finalOrder.order.order.orderItems[1]);
  // console.log(finalOrder.order.order.city);
  const [token, setToken] = useState();
  const [updatedUserWithNotification, SetUpdatedUserWithNotification] =
    useState([]);

  // console.log("testtttttttttttttttttt 55 000000000000000000 Order Details---1");
  // console.log(context);
  // console.log(context.stateUser.user.userId);
  // console.log(token);

  // Add this
  const [updatedUserData, setUpdatedUserData] = useState();
  const [userProfile, setUserProfile] = useState();
  const [productUpdate, setProductUpdate] = useState();
  const [showModel, setShowModel] = useState(false);

  const [userName, setUserName] = useState("");
  const [coupon, setCoupon] = useState("");
  // const [phone, setPhone] = useState("");
  const [showModel2, setShowModel2] = useState(false);
  const [categories, setCategories] = useState([]);

  const [couponList, setCouponList] = useState();
  // const [productFilter, setProductFilter] = useState();

  const [userGivenCoupon, setUserGivenCoupon] = useState();
  const [initialCoupons, setInitialCoupons] = useState();
  const [initialCouponsDiscount, setInitialCouponsDiscount] = useState();
  const [initialCouponsTotal, setInitialCouponsTotal] = useState();

  const [totalPrice, setTotalPrice] = useState(0);
  const [showPriceAfterCoupon, setShowPriceAfterCoupon] = useState(false);
  const [discountAmountKaka, setDiscountAmountKaka] = useState(0);

  useFocusEffect(
    useCallback(() => {
      console.log(showPriceAfterCoupon);
      // setFocus(false);
      // setActive(-1);

      getCoupons();
      // axios
      //   .get(`${baseURL}coupons`)
      //   // .get(`${baseURL}products`)
      //   .then((res) => {
      //     // setProducts(res.data);
      //     setInitialCoupons(res.data);
      //     setInitialCouponsTotal(res.data[0].total);
      //     setInitialCouponsDiscount(res.data[0].discount);
      //     // setProductsFiltered(res.data);
      //     // setProductsCtg(res.data);
      //     // setInitialState(res.data);
      //     // setLoading(false);
      //   })
      //   .catch((error) => {
      //     console.log("Api call has error");
      //   });
      getCategories();
      // categories
      // axios
      //   .get(`${baseURL}categories`)
      //   .then((res) => {
      //     setCategories(res.data);
      //   })
      //   .catch((error) => {
      //     console.log("Api call has error, so check it kaka");
      //   });

      return () => {
        // to make them empty again, no memorries for later
        setInitialCoupons([]);
        // setProducts([]);
        // setProductsFiltered([]);
        // setFocus();
        // setCategories([]);
        // setActive();
        // setInitialState();
      };
    }, [])
  );
  // console.log(
  //   "testtttttttttttttttttt 55 000000000000000000 Order Details---3001"
  // );
  // console.log(initialCoupons);
  // console.log(initialCouponsTotal);
  // console.log(initialCouponsDiscount);
  // ("testtttttttttttttttttt 55 000000000000000000 Order Details---40000000000001");
  // console.log(showPriceAfterCoupon);
  const getCoupons = async () => {
    try {
      const data = await couponDb.fetchCouponData(baseURL);
      // setProducts(data);
      setInitialCoupons(data);
      // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk-6000");
      // console.log(data);
      setInitialCouponsTotal(data[0].total);
      setInitialCouponsDiscounsetLoading(false);
    } catch (err) {}
  };

  const getCategories = async () => {
    try {
      const data = await categoryDb.fetchCategoryData(baseURL);
      // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk-7000");
      // console.log(data);
      setCategories(data);
    } catch (error) {}
  };

  /////////////////////////////
  useEffect(() => {
    // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk-8000");
    let url = `${baseURL}users/${context.stateUser.user.userId}`;
    let headerObj;
    AsyncStorage.getItem("jwt").then((res) => {
      setToken(res);
      headerObj = { headers: { Authorization: `Bearer ${res}` } };
      getUserById(url, headerObj);
    });

    //       .then((user) => {
    //         // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk-6000");
    //         // console.log(user.data);
    //         // setUserData(user.data);
    //         setUserProfile(user.data.name);
    //         // setCreatedDate(user.data.dateCreated.split("T")[0]);
    //         setUserGivenCoupon(user.data.isCouponGiven);
    //       });
    //   })
    //   .catch((error) => console.log(error));

    return () => {
      // setProductUpdate();
      setUserProfile();
    };
  }, []);
  const getUserById = async (url, headerObj) => {
    try {
      const data = await userDb.fetchUserData(url, headerObj);
      // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk-7000");
      // console.log(data);
      setUserProfile(data.name);
      // setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log("testtttttttttttttttttt 55 000000000000000000 Order Details---2");
  // console.log(userProfile);
  // console.log(userGivenCoupon);
  // console.log(userProfile.name);

  useEffect(() => {
    axios.get(`${baseURL}coupons`).then((res) => {
      // console.log("res.data coupons FRONTEND DDDDDDDDDDDDDD-1");
      // console.log(res.data);
      // setProductList(res.data);
      setCouponList(res.data[0]);
      // setProductFilter(res.data);
      // setLoading(false);
    });
    return () => {
      // setProductUpdate();
      // // setUserProfile();
    };
  }, [props]);
  // console.log("res.data coupons FRONTEND DDDDDDDDDDDDDD-2");
  // console.log(couponList);
  // console.log(couponList.couponMessage);

  useEffect(() => {
    if (finalOrder) {
      setProductUpdate(finalOrder.order.order.orderItems.cartItems);
    }
    getTotal(); //make it active
    return () => {
      setProductUpdate();
      // setUserProfile();
    };
  }, []);

  useEffect(() => {
    getTotal(); //make it active
  }, [props]);
  const getTotal = () => {
    var total = 0;
    {
      // bq
      // props.cartItems == null
      props.cartItems.cartItems == null
        ? setTotalPrice(0)
        : props.cartItems.cartItems.forEach((cart) => {
            const price = (total += cart.product.price * cart.quantity);
            setTotalPrice(price);
          });
    }
    // propedCartItem.forEach((cart) => {
    //   const price = (total += cart.product.price * cart.quantity);
    //   setTotalPrice(price);
    // });
  };
  // console.log("setTotalPrice EEEEEEEEEEEEEEEEEEEEEEE-1");
  // console.log(totalPrice);

  // const confirmOrder = () => {
  //   const order = finalOrder.order.order;

  //   axios
  //     .post(`${baseURL}orders`, order)
  //     .then((res) => {
  //       if (res.status == 200 || res.status == 201) {
  //         Toast.show({
  //           topOffset: 60,
  //           type: "success",
  //           // text1: "Order Completed",
  //           // text2: "",
  //         });
  //         setTimeout(() => {
  //           props.clearCart();
  //           // props.navigation.navigate("Cart Screen");
  //           props.navigation.navigate("TabBarScreen");
  //         }, 500);
  //       }
  //     })
  //     .catch((error) => {
  //       Toast.show({
  //         topOffset: 60,
  //         type: "error",
  //         // text1: "Something went wrong",
  //         // text2: "Please try again",
  //       });
  //     });
  // };

  // console.log("productUpdateeeeeeeeeeeeee2");
  // console.log(productUpdate);

  const changeDoctorStatus = () => {
    let info = {
      userIDD: context.stateUser.user.userId,
      useNAMEE: userProfile,
      // phone: phoneNumber,
      // isAdmin: false,
      messageText: couponList.couponMessage,
      discountAmount: couponList.discount,
    };
    console.log("hello modal kakaaaaaa12");
    axios
      .put(`${baseURL}users/notifications`, info)
      .then((res) => {
        // console.log("reached hereeeeee eeeeeeeeeeeee-11");
        // console.log(res.data.success);
        // console.log(res.data);
        setUpdatedUserData([res.data.data]);
        SetUpdatedUserWithNotification(res.data.data.unseenNotifications);
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
    // try {
    //   const resposne = await axios.put(
    //     `${baseURL}users/change-appointment-account-status`,

    //     {
    //       // appointmentId: elementId,
    //       doctorId: "params.doctorId",
    //       patientNameKaka: "patientName",
    //     },
    //     {
    //       headers: { Authorization: `Bearer ${token}` },
    //     }
    //   );

    //   if (resposne.data.success) {
    //     alert("resposne.data.message");
    //   }
    // } catch (error) {
    //   // toast.error("Error changing doctor account status");
    //   console.log(error);
    //   // dispatch(hideLoading());
    // }
  };
  // console.log("reached hereeeeee eeeeeeeeeeeee-12");
  // console.log(updatedUserWithNotification);
  // console.log("reached hereeeeee eeeeeeeeeeeee-19");
  // console.log(updatedUserData);
  // console.log("reached hereeeeee eeeeeeeeeeeee-13");
  // console.log(updatedUserWithNotification.length);
  // console.log(updatedUserWithNotification?.unseenNotifications.length);

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password1, setPassword1] = useState("");
  // const [error, setError] = useState("");
  const [error, setError] = useState("");
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState();

  //   const [user, setUser] = useState();
  //   const image = route.params.image;
  //   const name = route.params.name;
  //   const experience = route.params.experience;
  //   const type = route.params.type;
  //   const slot = route.params.selectedSlot;
  //   const rating = route.params.rating;

  const detailHandler = () => {
    console.log("ia m clicked");
  };

  const updateUserAgain = (id) => {
    // console.log(
    //   "ia m updated user mateEEEEEEEEEEEEEEEE wwwwwwwwwwwwwwwwwwwww-2001"
    // );
    // console.log(id);
    let info2 = {
      userIDD: context.stateUser.user.userId,
      useNAMEE: userProfile,
      couponNumber: coupon,
      // discountAmount: couponList.discount,
    };
    console.log(
      "hello modal kakaaaaaa12 EEEEEEEEEEEwwwwwwwwwwwwwwwwwwwww-2003"
    );
    axios
      // .put(`${baseURL}users/got-coupon/${id}`, info2)
      .put(`${baseURL}users/a-coupon`, info2)
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

  const discountAmountFunction = () => {
    // console.log("setTotalPrice EEEEEEEEEEEEEEEEEEEEEEE-1");
    setDiscountAmountKaka((totalPrice / 100) * initialCouponsDiscount);
    // console.log(totalPrice);
  };
  // console.log("setTotalPrice EEEEEEEEEEEEEEEEEEEEEEE-1");
  // console.log(totalPrice);

  // const discountAmountKaka = (totalPrice / 100) * initialCouponsDiscount;
  // console.log(
  //   "hello modal kakaaaaaa12 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR-20000000000701"
  // );
  // console.log(discountAmountKaka);
  const checkingCoupon = () => {
    updatedUserWithNotification.filter((i) => {
      if (i.message === coupon) {
        // console.log("correct");
        setShowModel2(false),
          setError(),
          // updateUserAgain(item._id),
          discountAmountFunction(),
          setShowPriceAfterCoupon(true);
      } else {
        console.log("wrong");
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something has gone wrong",
          text2: "Please try again",
        });

        //
      }
    });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor={Colors.primary} />

      {/* <View style={{ flex: 1, backgroundColor: "white" }}> */}
      <View style={{ flex: 1, backgroundColor: "white" }}>
        {header()}
        {patients()}
        {/* {confirmButton()} */}
        {/* {doctorInfo()} */}
      </View>
      {/* <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}> */}
      <View>
        {/* {divider()} */}
        {/* {divider()} */}
        {/* {phone()} */}
        {/* {addressOne()} */}
        {/* {addressTwo()} */}
        {/* {yourCity()} */}
        {/* {yourCountry()} */}
        {/* {yourZip()} */}
        {/* {appintmentText()} */}
        {/* {patients()} */}
        {/* {couponOffer()} */}
        {/* {confirmButton()} */}
        {/* {notificationButton()} */}
        {showModel == true ? notificationInfo() : null}
        {/* {showModel2 == true ? applyCouponButton() : null} */}
        {totalPrice > initialCouponsTotal ? applyCouponButton() : null}
        {/* {applyCouponButton()} */}
        {showModel2 == true ? applyCouponForm() : null}
        {showPriceAfterCoupon == true ? payInfoWithCoupon() : payInfo()}
        {/* {payInfo()} */}
        {/* {dateAndTime()} */}
        {/* {divider()} */}

        {/* {patients()} */}
        {/* {addPatient()} */}
        {/* {confirmPayButton()}  */}
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );

  function payInfo() {
    return (
      <View style={styles.payInfoContainerStyle}>
        <Text style={{ ...Fonts.black20Bold }}>
          {" "}
          Total To Pay: ${totalPrice}
        </Text>
        <TouchableOpacity
          activeOpacity={0.99}
          style={styles.bookAppointmentButtonStyle1}
          onPress={() =>
            props.navigation.navigate("Confirm", {
              order: finalOrder,
              discountAmountKaka: discountAmountKaka,
            })
          }
        >
          {/* <View style={styles.bookAppointmentButtonStyle}>
          <Text style={{ ...Fonts.primaryColorBold }}>Continue</Text>
        </View> */}
          <Text
            style={{
              ...Fonts.white17Bold,
              alignItems: "center",
              marginTop: 5,
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
        {/* <Text style={{ ...Fonts.black20Bold }}>
          {" "}
          Total To Pay: ${totalPrice}
        </Text> */}
      </View>
    );
  }

  function payInfoWithCoupon() {
    // const discountAmountKaka = (totalPrice / 100) * initialCouponsDiscount;
    return (
      <View style={styles.payInfoContainerStyle}>
        <View>
          <Text
            style={{ ...Fonts.black20Bold, textDecorationLine: "line-through" }}
          >
            {" "}
            Total : ${totalPrice}
          </Text>
          <Text
            style={{
              ...Fonts.black20Bold,
              color: "red",
            }}
          >
            {" "}
            {/* Total To Pay: ${totalPrice} */}
            Total : ${totalPrice - discountAmountKaka}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.99}
          style={styles.bookAppointmentButtonStyle1}
          onPress={() =>
            props.navigation.navigate("Confirm", {
              order: finalOrder,
              discountAmountKaka: discountAmountKaka,
            })
          }
        >
          {/* <View style={styles.bookAppointmentButtonStyle}>
          <Text style={{ ...Fonts.primaryColorBold }}>Continue</Text>
        </View> */}
          <Text
            style={{
              ...Fonts.white17Bold,
              alignItems: "center",
              marginTop: 5,
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  function doctorInfo() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <View style={styles.doctorImageContainerStyle}>
          {/* <Image
            source={image}
            resizeMode="contain"
            style={{
              height: 90.0,
              width: 90.0,
              borderRadius: 45.0,
              overflow: "hidden",
            }}
          /> */}
        </View>
        <View style={{ justifyContent: "center", marginTop: Sizes.fixPadding }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: width - 140.0,
            }}
          >
            <View style={{ width: width / 3.0 }}>
              <Text style={{ ...Fonts.black16Bold }}>{"name"}</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.99}
              //   onPress={() =>
              //     navigation.navigate("DoctorProfile", {
              //       image,
              //       name,
              //       type,
              //       rating,
              //       experience,
              //     })
              //   }
            >
              <Text style={{ ...Fonts.primaryColor13Bold }}>View Profile</Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              ...Fonts.gray17Regular,
              marginTop: Sizes.fixPadding - 7.0,
            }}
          >
            {"type"}
          </Text>
          <Text
            style={{
              ...Fonts.primaryColor16Regular,
              marginTop: Sizes.fixPadding - 7.0,
            }}
          >
            {"experience"} Years Experience
          </Text>
          <Text
            style={{ ...Fonts.black20Bold, marginTop: Sizes.fixPadding - 2.0 }}
          >
            $39
          </Text>
        </View>
      </View>
    );
  }

  function divider() {
    return (
      <View
        style={{
          backgroundColor: Colors.lightGray,
          height: 0.7,
          marginTop: 10,
        }}
      ></View>
    );
  }

  // function phone() {
  //   return (
  //     <View style={styles.infoWrapStyle}>
  //       <TextInput
  //         placeholder="Phone"
  //         style={{ color: "black" }}
  //         placeholderTextColor="green"
  //         onChangeText={(text) => setPhoneNumber(text)}
  //       />
  //     </View>
  //   );
  // }

  // function addressOne() {
  //   return (
  //     <View style={styles.infoWrapStyle}>
  //       <TextInput
  //         placeholder="Address"
  //         style={{ color: "black" }}
  //         placeholderTextColor="green"
  //         onChangeText={(text) => setAddress(text)}
  //       />
  //     </View>
  //   );
  // }

  // function addressTwo() {
  //   return (
  //     <View style={styles.infoWrapStyle}>
  //       <TextInput
  //         placeholder="Address"
  //         style={{ color: "black" }}
  //         placeholderTextColor="green"
  //         onChangeText={(text) => setAddress2(text)}
  //       />
  //     </View>
  //   );
  // }

  // function yourCity() {
  //   return (
  //     <View style={styles.infoWrapStyle}>
  //       <TextInput
  //         placeholder="City"
  //         style={{ color: "black" }}
  //         placeholderTextColor="green"
  //         onChangeText={(text) => setCity(text)}
  //       />
  //     </View>
  //   );
  // }

  // function yourCountry() {
  //   return (
  //     <View style={styles.infoWrapStyle}>
  //       <TextInput
  //         placeholder="Country"
  //         style={{ color: "black" }}
  //         placeholderTextColor="green"
  //         onChangeText={(text) => setCountry(text)}
  //       />
  //     </View>
  //   );
  // }

  // function yourZip() {
  //   return (
  //     <View style={styles.infoWrapStyle}>
  //       <TextInput
  //         placeholder="Zip"
  //         style={{ color: "black" }}
  //         placeholderTextColor="green"
  //         onChangeText={(text) => setZip(text)}
  //       />
  //     </View>
  //   );
  // }

  function confirmButton() {
    return (
      <TouchableOpacity
        style={styles.test1}
        activeOpacity={0.99}
        onPress={() =>
          props.navigation.navigate("Confirm", {
            order: finalOrder,
            discountAmountKaka: discountAmountKaka,
          })
        }
        // onPress={() =>
        //   navigation.navigate("BottomTabScreen", {
        //     phoneNumber,
        //     name,
        //     address,
        //     address2,
        //     city,
        //     country,
        //     zip,
        //   })
        // }
        // onPress={() =>
        //   navigation.navigate("PaymentMethod", {
        //     phoneNumber,
        //     name,
        //     address,
        //     address2,
        //     city,
        //     country,
        //     zip,
        //   })
        // }
        // onPress={() => {
        //   alert("hi kaka");
        //   // [
        //   //   props.cartItems2.cartItems.removeFromCart(item),
        //   //   setForRendering(true),
        //   // ];
        // }}
        // onPress={() =>
        //   navigation.navigate("TimeSlots", {
        //     image: item.image,
        //     name: item.name,
        //     type: type,
        //     experience: item.yearsOfExperience,
        //     rating: item.rating,
        //   })
        // }
      >
        <View style={styles.bookAppointmentButtonStyle}>
          <Text style={{ ...Fonts.primaryColorBold }}>Continue</Text>
        </View>
      </TouchableOpacity>
    );
  }

  function notificationButton() {
    return (
      <TouchableOpacity
        style={styles.test1}
        activeOpacity={0.99}
        onPress={() => changeDoctorStatus()}
        // onPress={() =>
        //   props.navigation.navigate("Confirm", {
        //     order: finalOrder,
        //   })
        // }
        // onPress={() =>
        //   navigation.navigate("BottomTabScreen", {
        //     phoneNumber,
        //     name,
        //     address,
        //     address2,
        //     city,
        //     country,
        //     zip,
        //   })
        // }
        // onPress={() =>
        //   navigation.navigate("PaymentMethod", {
        //     phoneNumber,
        //     name,
        //     address,
        //     address2,
        //     city,
        //     country,
        //     zip,
        //   })
        // }
        // onPress={() => {
        //   alert("hi kaka");
        //   // [
        //   //   props.cartItems2.cartItems.removeFromCart(item),
        //   //   setForRendering(true),
        //   // ];
        // }}
        // onPress={() =>
        //   navigation.navigate("TimeSlots", {
        //     image: item.image,
        //     name: item.name,
        //     type: type,
        //     experience: item.yearsOfExperience,
        //     rating: item.rating,
        //   })
        // }
      >
        <View style={styles.bookAppointmentButtonStyle}>
          <Text style={{ ...Fonts.primaryColorBold }}>Click Me</Text>
        </View>
      </TouchableOpacity>
    );
  }
  function applyCouponButton() {
    return (
      <View style={styles.addButton}>
        <TouchableOpacity
          // style={styles.test1}
          style={{ ...styles.addButtonStyle }}
          activeOpacity={0.99}
          onPress={() => changeDoctorStatus()}
          // onPress={() => [setShowModel2(true), detailHandler()]}
          // onPress={() => changeDoctorStatus()}
        >
          {/* <View style={styles.bookAppointmentButtonStyle}> */}
          <Text style={{ ...Fonts.white17Bold }}>Get Coupon</Text>
          {/* </View> */}
        </TouchableOpacity>

        <TouchableOpacity
          style={{ ...styles.addButtonStyle }}
          // style={styles.test1}
          activeOpacity={0.99}
          onPress={() => [setShowModel2(true), detailHandler()]}
          // onPress={() => changeDoctorStatus()}
        >
          {/* <View style={styles.bookAppointmentButtonStyle}> */}
          <Text style={{ ...Fonts.white17Bold }}>Apply Coupon</Text>
          {/* </View> */}
        </TouchableOpacity>
      </View>
    );
  }

  function applyCouponForm() {
    const renderItem = ({ item }) => {
      // console.log("itemmmmmmm FRONTEND DDDDDDDDDDDDDD-333333333-1");
      // console.log(item);
      return (
        <Center>
          <Modal isOpen={showModel2} onClose={() => setShowModel2(false)}>
            <Modal.Content maxWidth="400px">
              <Modal.CloseButton />
              <Modal.Header>Insert Coupon</Modal.Header>
              <Modal.Body>
                <FormControl>
                  <FormControl.Label>User Name</FormControl.Label>
                  <Input
                    isRequired={true}
                    placeholder={"user Name"}
                    name="userName"
                    value={item.name}
                    onChangeText={(text) => {
                      setUserName(text);
                    }}
                  />
                </FormControl>

                <FormControl>
                  <FormControl.Label>Coupon</FormControl.Label>
                  <Input
                    isRequired={true}
                    placeholder={"Coupon"}
                    name="Coupon"
                    value={coupon}
                    onChangeText={(text) => {
                      setCoupon(text);
                    }}
                  />
                </FormControl>
                {/* <FormControl>
                  <FormControl.Label>Phone</FormControl.Label>
                  <Input
                    isRequired={true}
                    placeholder={"phone"}
                    name="phone"
                    value={phone}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      setPhone(text);
                    }}
                  />
                </FormControl> */}
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button
                    colorScheme="blueGray"
                    // onPress={() => {
                    //   setShowModel2(false);
                    //   setError();
                    // }}
                    onPress={() => {
                      [
                        checkingCoupon(),
                        // setShowModel2(false),
                        // setError(),
                        // // updateUserAgain(item._id),
                        // discountAmountFunction(),
                        // setShowPriceAfterCoupon(true),
                      ];
                    }}
                  >
                    Apply
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </Center>
        // <Modal
        //   isOpen={showModel2}
        //   onClose={() => setShowModel2(false)}
        //   size="lg"
        // >
        //   <Modal.Content maxWidth={350}>
        //     <Modal.CloseButton />
        //     <Modal.Header>Insert Your Coupon</Modal.Header>
        //     <Modal.Body>
        //       <VStack space={7}>
        //         {/* {OrdersInfos.map((i, index) => {
        //           <HStack
        //             key={index}
        //             alignItems="center"
        //             justifyContent="space-between"
        //           >
        //             <Text fontWeight="medium">{i.title}</Text>
        //             <Text
        //               color={i.color === "main" ? Colors.main : Colors.black}
        //               bold
        //             >
        //               ${i.price}
        //             </Text>
        //           </HStack>;
        //         })} */}
        //         <HStack alignItems="center" justifyContent="space-between">
        //           <Text fontWeight="medium">User is</Text>
        //           <Text color={Colors.black} bold>
        //             {/* ${444.44} */}
        //             {item.data.name}
        //           </Text>
        //         </HStack>

        //         <HStack alignItems="center" justifyContent="space-between">
        //           <Text fontWeight="medium">Copun No. is</Text>
        //           <Text color={Colors.black} bold>
        //             {/* ${0.0} */}
        //             {item.message}
        //           </Text>
        //         </HStack>

        //         {/* <HStack alignItems="center" justifyContent="space-between">
        //           <Text fontWeight="medium">Tax</Text>
        //           <Text color={Colors.black} bold>
        //             ${0.0}
        //           </Text>
        //         </HStack> */}

        //         {/* <HStack alignItems="center" justifyContent="space-between">
        //           <Text fontWeight="medium">Total Price</Text>
        //           <Text color={Colors.main} bold>
        //             ${444.44}
        //           </Text>
        //         </HStack> */}
        //       </VStack>
        //     </Modal.Body>

        //     {/* <Modal.Footer>
        //       <Button
        //         flex={1}
        //         bg={Colors.main}
        //         h={45}
        //         _text={{ color: Colors.white }}
        //         onPress={() => setShowModel(false)}
        //         _pressed={{ bg: Colors.main }}
        //       >
        //         CONFIRM
        //       </Button>
        //     </Modal.Footer> */}
        //   </Modal.Content>
        // </Modal>
        // <View style={{ flexDirection: "row", alignItems: "center" }}>
        //   <View style={styles.patientImageContainer}>
        //     {item.image === null ? (
        //       <Ionicons name="person" size={24} color="gray" />
        //     ) : (
        //       <Image
        //         source={item.image}
        //         resizeMode="contain"
        //         style={{ height: 80.0, width: 80.0, borderRadius: 40.0 }}
        //       />
        //     )}
        //   </View>
        //   <Text
        //     style={{
        //       ...Fonts.black16Bold,
        //       marginLeft: Sizes.fixPadding,
        //       marginBottom: Sizes.fixPadding,
        //     }}
        //   >
        //     {item.name}
        //   </Text>
        // </View>

        // <TouchableOpacity
        //   style={styles.test1}
        //   activeOpacity={0.99}
        //   onPress={() => alert("I am your coupon")}
        // >
        //   <View style={styles.bookAppointmentButtonStyle}>
        //     <Text style={{ ...Fonts.primaryColorBold }}>Add Coupon</Text>
        //   </View>
        // </TouchableOpacity>
      );
    };
    return (
      <View>
        <FlatList
          // data={patientLit}
          // data={updatedUserWithNotification}
          data={updatedUserData}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding * 2.0 }}
        />
      </View>
    );
  }
  // function dateAndTime() {
  //   return (
  //     <View style={styles.dateAndTimeContainerStyle}>
  //       <View style={{ flexDirection: "row", alignItems: "center" }}>
  //         <FontAwesome5 name="calendar-alt" size={16} color="gray" />
  //         <Text
  //           style={{
  //             ...Fonts.black16Regular,
  //             marginLeft: Sizes.fixPadding + 5.0,
  //           }}
  //         >
  //           28-June
  //         </Text>
  //       </View>
  //       <View style={{ flexDirection: "row", alignItems: "center" }}>
  //         <MaterialIcons name="access-time" size={18} color="gray" />
  //         <Text
  //           style={{ ...Fonts.black16Regular, marginLeft: Sizes.fixPadding }}
  //         >
  //           {slot}
  //         </Text>
  //       </View>
  //     </View>
  //   );
  // }

  function appintmentText() {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Text
            style={{ ...Fonts.black24Bold, margin: Sizes.fixPadding * 2.0 }}
          >
            Order Details
          </Text>

          <Ionicons
            name="notifications"
            size={27}
            color="black"
            // onPress={() => navigation.navigate("Notification")}
            // onPress={() => alert("hello man")}
            onPress={() => [setShowModel(true), detailHandler()]}
          />

          {/* <Link className="anchor mx-2" to="/profile">
                {user?.name}
              </Link> */}
        </View>
        {updatedUserWithNotification.length > 0 ? (
          <Badge
            style={styles.badge}
            rounded="full"
            h={6}
            paddingRight={4}
            marginBottom={4}

            // count={user?.unseenNotifications.length}
            // count={"4"}
            // onClick={() => navigate("/notifications")}
          >
            {/* <Text style={styles.text}>{props.cartItems.cartItems.length}</Text> */}
            {/* <Text style={styles.text}>{"5"} </Text> */}
            {/* {updatedUserWithNotification.length === 0 ? (
            <Text style={styles.text}></Text>
          ) : (
            <Text style={styles.text}>{"5"}</Text>
          )} */}

            <Text style={styles.text}>
              {/* {updatedUserWithNotification.length > 0 */}
              {/* ?  */}
              {updatedUserWithNotification.length}
              {/* : null} */}
            </Text>
          </Badge>
        ) : null}

        {divider()}
      </View>
      // <View>
      //   <Text style={{ ...Fonts.black24Bold, margin: Sizes.fixPadding * 2.0 }}>
      //     Order Details
      //   </Text>
      //   {divider()}
      // </View>
    );
  }

  function patients() {
    const renderItem = ({ item }) => {
      return (
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            // marginHorizontal: Sizes.fixPadding * 2.0,
          }}
        >
          <View style={styles.patientImageContainer}>
            {item.image === null ? (
              <Ionicons name="person" size={24} color="gray" />
            ) : (
              <Image
                source={{ uri: item.product.image }}
                // resizeMode="contain"
                resizeMode="cover"
                style={{ height: 80.0, width: 80.0, borderRadius: 40.0 }}
              />
            )}
          </View>

          <View
            style={{ justifyContent: "center", marginTop: Sizes.fixPadding }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: width - 140.0,
              }}
            >
              <View style={{ width: width / 3.0 }}>
                <Text style={{ ...Fonts.black16Bold }}>
                  {item.product.name}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.99}
                //   onPress={() =>
                //     navigation.navigate("DoctorProfile", {
                //       image,
                //       name,
                //       type,
                //       rating,
                //       experience,
                //     })
                //   }
              >
                {/* <Text style={{ ...Fonts.primaryColor13Bold }}>
                  View Profile
                </Text> */}
              </TouchableOpacity>
            </View>
            <Text
              style={{
                ...Fonts.gray17Regular,
                marginTop: Sizes.fixPadding - 7.0,
              }}
            >
              The quantity is: {item.quantity}
            </Text>
            {/* <Text
              style={{
                ...Fonts.primaryColor16Regular,
                marginTop: Sizes.fixPadding - 7.0,
              }}
            >
              The price is: ${item.product.price}
            </Text> */}
            <Text
              style={{
                ...Fonts.gray17Regular,
                marginTop: Sizes.fixPadding - 2.0,
              }}
            >
              $ {item.quantity * item.product.price}
            </Text>
          </View>
        </View>
        // <View style={{ flexDirection: "row", alignItems: "center" }}>
        //   <View style={styles.patientImageContainer}>
        //     {item.image === null ? (
        //       <Ionicons name="person" size={24} color="gray" />
        //     ) : (
        //       <Image
        //         source={item.image}
        //         resizeMode="contain"
        //         style={{ height: 80.0, width: 80.0, borderRadius: 40.0 }}
        //       />
        //     )}
        //   </View>
        //   <Text
        //     style={{
        //       ...Fonts.black16Bold,
        //       marginLeft: Sizes.fixPadding,
        //       marginBottom: Sizes.fixPadding,
        //     }}
        //   >
        //     {item.name}
        //   </Text>
        // </View>
      );
    };

    return (
      <View>
        <FlatList
          // data={patientLit}
          data={productUpdate}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding * 2.0 }}
        />
      </View>
    );
  }

  function couponOffer() {
    const renderItem = ({ item }) => {
      return (
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            // marginHorizontal: Sizes.fixPadding * 2.0,
          }}
        >
          {/* <View style={styles.patientImageContainer}>
            {item.image === null ? (
              <Ionicons name="person" size={24} color="gray" />
            ) : (
              <Image
                source={{ uri: item.product.image }}
                // resizeMode="contain"
                resizeMode="cover"
                style={{ height: 80.0, width: 80.0, borderRadius: 40.0 }}
              />
            )}
          </View> */}

          <View
            style={{ justifyContent: "center", marginTop: Sizes.fixPadding }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: width - 140.0,
              }}
            >
              <View style={{ width: width / 3.0 }}>
                <Text style={{ ...Fonts.black16Bold }}>
                  {item.couponMessage}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.99}
                //   onPress={() =>
                //     navigation.navigate("DoctorProfile", {
                //       image,
                //       name,
                //       type,
                //       rating,
                //       experience,
                //     })
                //   }
              >
                {/* <Text style={{ ...Fonts.primaryColor13Bold }}>
                  View Profile
                </Text> */}
              </TouchableOpacity>
            </View>
            <Text
              style={{
                ...Fonts.gray17Regular,
                marginTop: Sizes.fixPadding - 7.0,
              }}
            >
              The quantity is: {item.discount}
            </Text>
            <Text
              style={{
                ...Fonts.primaryColor16Regular,
                marginTop: Sizes.fixPadding - 7.0,
              }}
            >
              The price is: ${item.total}
            </Text>
            <Text
              style={{
                ...Fonts.gray17Regular,
                marginTop: Sizes.fixPadding - 2.0,
              }}
            >
              $ {"item.quantity * item.product.price"}
            </Text>
          </View>
        </View>
        // <View style={{ flexDirection: "row", alignItems: "center" }}>
        //   <View style={styles.patientImageContainer}>
        //     {item.image === null ? (
        //       <Ionicons name="person" size={24} color="gray" />
        //     ) : (
        //       <Image
        //         source={item.image}
        //         resizeMode="contain"
        //         style={{ height: 80.0, width: 80.0, borderRadius: 40.0 }}
        //       />
        //     )}
        //   </View>
        //   <Text
        //     style={{
        //       ...Fonts.black16Bold,
        //       marginLeft: Sizes.fixPadding,
        //       marginBottom: Sizes.fixPadding,
        //     }}
        //   >
        //     {item.name}
        //   </Text>
        // </View>
      );
    };

    return (
      <View>
        <FlatList
          // data={patientLit}
          data={initialCoupons}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding * 2.0 }}
        />
      </View>
    );
  }

  function confirmPayButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.99}
        style={styles.confirmAndPayButtonStyle}
        onPress={() => props.navigation.navigate("PaymentMethod")}
      >
        <View style={styles.confirmButtonStyle}>
          <Text style={{ ...Fonts.white20Regular }}>Confirm & Pay</Text>
        </View>
      </TouchableOpacity>
    );
  }

  function addPatient() {
    return (
      <View style={styles.addPatientContainerStyle}>
        <MaterialIcons name="add" size={24} color={Colors.primary} />
        <Text
          style={{ ...Fonts.primaryColor17Bold, marginLeft: Sizes.fixPadding }}
        >
          Add Patient
        </Text>
      </View>
    );
  }

  function header() {
    return (
      <View>
        <View style={styles.headerStyle}>
          <View style={styles.test}>
            <MaterialIcons
              name="arrow-back"
              color={"black"}
              size={22}
              onPress={() => props.navigation.pop()}
            />

            <View>
              <Text
                style={{
                  ...Fonts.black20Bold,
                  alignSelf: "center",
                  marginLeft: 10,
                }}
              >
                Order Details
              </Text>
            </View>
          </View>
          <Ionicons
            name="notifications"
            size={27}
            color="black"
            onPress={() => [setShowModel(true), detailHandler()]}
          />
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
          {/* <Badge
            style={styles.badge}
            rounded="full"
            h={6}
            paddingRight={4}
            marginBottom={4}

            
          >
            

            <Text style={styles.text}>
              {updatedUserWithNotification.length > 0
                ? updatedUserWithNotification.length
                : null}
            </Text>
          </Badge> */}
        </View>
        <Text
          style={{
            ...Fonts.primaryColor16Regular,
            marginLeft: 25,
            marginRight: 10,
          }}
        >
          You have %{initialCouponsDiscount} discount if your total perches
          reaches to ${initialCouponsTotal}
        </Text>
        {divider()}
      </View>
    );
  }
  // function header() {
  //   return (
  //     <View>
  //       <View style={styles.headerWrapStyleNew}>
  //         <MaterialIcons
  //           name="arrow-back"
  //           color={"black"}
  //           size={22}
  //           onPress={() => props.navigation.pop()}
  //         />
  //         <Text
  //           style={{ ...Fonts.black20Bold, marginLeft: Sizes.fixPadding + 5.0 }}
  //         >
  //           Order Details
  //         </Text>
  //       </View>
  //       <View>
  //         <Text
  //           style={{
  //             marginLeft: Sizes.fixPadding + 5.0,
  //             color: Fonts.primaryColor16Regular,
  //             fontStyle: "italic",
  //             fontSize: 16,
  //           }}
  //         >
  //           You have %{initialCouponsDiscount} discount if your total perches
  //           reaches to ${initialCouponsTotal}
  //         </Text>
  //       </View>
  //     </View>
  //   );
  // }

  function notificationInfo() {
    const renderItem = ({ item }) => {
      // console.log("reached hereeeeee eeeeeeeeeeeee-14");
      // console.log(item);
      return (
        <Modal isOpen={showModel} onClose={() => setShowModel(false)} size="lg">
          <Modal.Content maxWidth={350}>
            <Modal.CloseButton />
            <Modal.Header>{item.message2}</Modal.Header>
            <Modal.Body>
              <VStack space={7}>
                {/* {OrdersInfos.map((i, index) => {
                  <HStack
                    key={index}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Text fontWeight="medium">{i.title}</Text>
                    <Text
                      color={i.color === "main" ? Colors.main : Colors.black}
                      bold
                    >
                      ${i.price}
                    </Text>
                  </HStack>;
                })} */}
                <HStack alignItems="center" justifyContent="space-between">
                  <Text fontWeight="medium">You are</Text>
                  <Text color={Colors.black} bold>
                    {/* ${444.44} */}
                    {item.data.name}
                  </Text>
                </HStack>

                <HStack alignItems="center" justifyContent="space-between">
                  <Text fontWeight="medium">Copun No. is</Text>
                  <Text color={Colors.black} bold clickable="true">
                    {/* ${0.0} */}
                    {item.message}
                  </Text>
                </HStack>

                <HStack alignItems="center" justifyContent="space-between">
                  <Text fontWeight="medium">Discount rate</Text>
                  <Text color={Colors.black} bold>
                    {/* ${0.0} */}% {item.type}
                  </Text>
                </HStack>

                {/* <HStack alignItems="center" justifyContent="space-between">
                  <Text fontWeight="medium">Total Price</Text>
                  <Text color={Colors.main} bold>
                    ${444.44}
                    {item.message2}
                  </Text>
                </HStack> */}
              </VStack>
            </Modal.Body>

            {/* <Modal.Footer>
              <Button
                flex={1}
                bg={Colors.main}
                h={45}
                _text={{ color: Colors.white }}
                onPress={() => setShowModel(false)}
                _pressed={{ bg: Colors.main }}
              >
                CONFIRM
              </Button>
            </Modal.Footer> */}
          </Modal.Content>
        </Modal>
        // <View style={{ flexDirection: "row", alignItems: "center" }}>
        //   <View style={styles.patientImageContainer}>
        //     {item.image === null ? (
        //       <Ionicons name="person" size={24} color="gray" />
        //     ) : (
        //       <Image
        //         source={item.image}
        //         resizeMode="contain"
        //         style={{ height: 80.0, width: 80.0, borderRadius: 40.0 }}
        //       />
        //     )}
        //   </View>
        //   <Text
        //     style={{
        //       ...Fonts.black16Bold,
        //       marginLeft: Sizes.fixPadding,
        //       marginBottom: Sizes.fixPadding,
        //     }}
        //   >
        //     {item.name}
        //   </Text>
        // </View>
      );
    };

    return (
      <View>
        <FlatList
          // data={patientLit}
          data={updatedUserWithNotification}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding * 2.0 }}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    padingHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
  },

  test: { flexDirection: "row", alignItems: "center" },
  confirmAndPayButtonStyle: {
    position: "absolute",
    left: Sizes.fixPadding * 2.0,
    right: Sizes.fixPadding * 2.0,
    bottom: Sizes.fixPadding,
  },
  dateAndTimeContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: Sizes.fixPadding,
  },
  doctorImageContainerStyle: {
    height: 90.0,
    width: 90.0,
    borderRadius: 45.0,
    backgroundColor: "white",
    borderColor: "#B3BCFC",
    borderWidth: 1.0,
    marginRight: Sizes.fixPadding,
    marginTop: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding + 3.0,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: Sizes.fixPadding,
    elevation: 20.0,
    overflow: "hidden",
  },
  doctorInfoContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  patientImageContainer: {
    height: 80.0,
    width: 80.0,
    borderRadius: 40.0,
    backgroundColor: "#F5F5F5",
    borderColor: Colors.lightGray,
    borderWidth: 1.0,
    marginRight: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Sizes.fixPadding + 3.0,
    shadowColor: Colors.lightGray,
    shadowOffset: { width: 0, height: 0 }, // change this for more shadow
    shadowOpacity: 0.5,
    shadowRadius: Sizes.fixPadding,
    elevation: 2.0,
    overflow: "hidden",
  },
  confirmButtonStyle: {
    backgroundColor: Colors.primary,
    borderRadius: Sizes.fixPadding + 5.0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Sizes.fixPadding + 3.0,
  },
  addPatientContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding,
  },
  //   Register Part
  infoWrapStyle: {
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: "rgba(205,255,255,0.7)",
    borderRadius: 25.0,
    marginTop: 20,
    paddingVertical: Sizes.fixPadding + 3.0,
    paddingHorizontal: 45.0,
  },
  continueButtonStyle: {
    paddingVertical: Sizes.fixPadding + 5.0,
    borderRadius: Sizes.fixPadding * 3.0,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 5.0,
    marginBottom: Sizes.fixPadding * 2.0,
  },
  test1: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  bookAppointmentButtonStyle: {
    width: width / 2,
    borderColor: Colors.primary,
    borderWidth: 1.0,
    backgroundColor: "#E3E6FE",
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
    alignItems: "center",
    // marginTop: 80,
    // flexDirection: "row",
  },
  bookAppointmentButtonStyle1: {
    width: width / 2,
    borderColor: Colors.primary,
    borderWidth: 1.0,
    // backgroundColor: "#E3E6FE",
    backgroundColor: Colors.primary,
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
    alignItems: "center",
    // marginTop: 80,
    // flexDirection: "row",
  },
  badge: {
    width: 20,
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    top: -15,
    right: -5,
    backgroundColor: "red",
  },
  text: {
    fontSize: 15,
    width: 9,
    fontWeight: "bold",
    color: "white",
  },
  // bold: { fontWeight: "bold important " },
  headerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  addButton: {
    position: "absolute",
    alignSelf: "flex-end",
    height: 60.0,
    backgroundColor: "white",
    bottom: 0.0,
    left: 0.0,
    right: 0.0,
    flexDirection: "row",
    flex: 1,
    borderTopColor: Colors.lightGray,
    borderTopWidth: 0.5,
    paddingVertical: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding,
  },
  addButtonStyle: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.fixPadding + 5,
    elevation: 2.0,
    backgroundColor: Colors.primary,
  },
  payInfoContainerStyle: {
    // height: 70.0,
    // backgroundColor: "#D2D5EE",
    // justifyContent: "center",
    // paddingHorizontal: 20.0,
    // borderRadius: 15,

    position: "absolute",
    alignSelf: "flex-end",
    height: 60.0,
    backgroundColor: "#D2D5EE",
    bottom: 60.0,
    left: 0.0,
    right: 0.0,
    flexDirection: "row",
    justifyContent: "space-around",
    // flexDirection: "column",
    flex: 1,
    borderTopColor: Colors.lightGray,
    borderTopWidth: 0.5,
    // paddingVertical: Sizes.fixPadding,
    // paddingHorizontal: Sizes.fixPadding,
    borderRadius: 15,
  },
});

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};
// export default ConsultaionScreen;
// export default OrderDetailScreen;
export default connect(mapStateToProps)(OrderDetailScreen);
