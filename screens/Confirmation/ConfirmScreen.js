import React, { useState, useEffect, useContext } from "react";
// import io from "socket.io-client";
// import { format } from "date-fns";
// import * as moment from "moment";
import moment from "moment";
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
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { ScrollView } from "native-base";
import { connect } from "react-redux";
import AuthGlobal from "../../Context/store/AuthGlobal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

import * as actions from "../../assets/Redux/Actions/cartActions";
// import { orderedExtractInObject } from "native-base/lib/typescript/theme/v33x-theme/tools";
// const socket = io.connect("http://localhost:3000");

const { width } = Dimensions.get("screen");
import { OrderData } from "../../Context/data/orderData";
export const orderDb = new OrderData();

import { UserData } from "../../Context/data/userData";
export const userDb = new UserData();

// const ConsultaionScreen = ({ navigation, route }) => {
const confirmScreen = (props) => {
  // console.log(
  //   "finalOrder rrrrr1222222222RRRRRRRRRRRRRRRRRRRRRRRRRRRRRR-10000000000000000"
  // );
  // console.log(props);
  const context = useContext(AuthGlobal);

  const finalOrder = props.route.params;
  // console.log("finalOrder rrrrr1222222222RRRRRRRRRRRRRRRRRRRRRRRRRRRRRR-1");
  // console.log(finalOrder.order);
  // console.log("finalOrder rrrrr1222222222RRRRRRRRRRRRRRRRRRRRRRRRRRRRRR-2");
  // console.log(finalOrder.discountAmountKaka);

  // console.log("finalOrder rrrrr1333333333 AAAAAA");
  // console.log(finalOrder.order.order.order);
  // console.log("finalOrder rrrrr1444444444 here");
  // console.log(finalOrder.order.order.orderItems);
  // console.log(finalOrder.order.order.orderItems);
  // console.log("finalOrder rrrrr155555555555");
  // console.log(finalOrder.order.order.orderItems[1]);
  // console.log(finalOrder.order.order.city);

  // Add this
  const [updatedUserData, setUpdatedUserData] = useState();
  const [userProfile, setUserProfile] = useState([]);
  const [productUpdate, setProductUpdate] = useState();
  // const [updatedUserWithNotification, SetUpdatedUserWithNotification] =
  useState([]);
  // Add this

  useEffect(() => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        axios
          .get(`${baseURL}users/${context.stateUser.user.userId}`, {
            headers: { Authorization: `Bearer ${res}` },
          })
          .then((user) => {
            setUserProfile(user.data);
            // setCreatedDate(user.data.dateCreated.split("T")[0]);
          });
      })
      .catch((error) => console.log(error));

    return () => {
      // setProductUpdate();
      // setUserProfile();
    };
  }, []);

  // console.log("testtttttttttttttttttt 55 000000000000000000 taza");
  // console.log(userProfile);
  // console.log(userProfile.name);

  // const orderdStuff = (order) => {
  //   // if (username !== "" && room !== "") {
  //   // socket.emit("join_room", room);
  //   socket.emit("productOrdered", order);
  //   // setShowChat(true);
  //   // }
  // };

  useEffect(() => {
    if (finalOrder) {
      setProductUpdate(finalOrder.order.order.order.orderItems.cartItems);
    }
    return () => {
      setProductUpdate();
      // setUserProfile();
    };
  }, [props]);

  const confirmOrder = () => {
    const url = `${baseURL}orders`;
    const order = finalOrder.order.order.order;
    const discountToBackend = finalOrder.discountAmountKaka;
    // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk-1");
    postOrders(url, order, discountToBackend);
    // const order2 = 500000000000000000000000;
    // axios
    //   // .post(`${baseURL}orders`, order)
    //   .post(`${baseURL}orders`, { order, discountToBackend })
    //   .then((res) => {
    //     if (res.status == 200) {
    //       updatingProductNumber();
    //       // console.log("kakaaaaaaaaaaaaaaaaaaa now");
    //       // Toast.show({
    //       //   topOffset: 60,
    //       //   type: "success",
    //       //   // text1: "Order Completed",
    //       //   // text2: "",
    //       // });
    //       // orderdStuff(order);
    //       setTimeout(() => {
    //         // updatingProductNumber();
    //         // notificationForAdmin();
    //         props.clearCart();
    //         // props.navigation.navigate("Cart Screen");
    //         // props.navigation.navigate("TabBarScreen");
    //         props.navigation.navigate("Home");
    //       }, 500);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     // Toast.show({
    //     //   topOffset: 60,
    //     //   type: "error",
    //     //   // text1: "Something went wrong",
    //     //   // text2: "Please try again",
    //     // });
    //   });

    // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk-2");
    updatingProductNumber();
    // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk-3");
    notificationForAdmin();
    setTimeout(() => {
      props.clearCart();
      props.navigation.navigate("Home");
    }, 500);
  };

  // console.log("productUpdateeeeeeeeeeeeee2");
  // console.log(productUpdate);

  const postOrders = async (url, order, discountToBackend) => {
    try {
      const data = await orderDb.postOrderData(url, order, discountToBackend);
      // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk-12000");
      // console.log(data);
    } catch (error) {}
  };

  const updatingProductNumber = () => {
    {
      productUpdate
        ? // productSent == true
          productUpdate.map((x) => {
            // console.log(console.log("kakaaaaaaaaaaaaaaaaaaa now 2"));
            // console.log(x.product._id);
            // console.log(x);
            // console.log("productUpdateeeeeeeeeeeeee nowwwwwwwwwww 666666666");
            // console.log(x.quantity);
            const qtty = x.quantity;
            let formData = new FormData();
            formData.append("qtty", qtty);

            axios
              .put(
                `${baseURL}products/${x.product._id}/updateproductafterselling`,
                formData
              )
              .then((res) => {
                // alert("kaka");
                // console.log(res);
                if (res.status == 201) {
                  // Toast.show({
                  //   topOffset: 60,
                  //   type: "success",
                  //   // text1: "Product successfuly updated",
                  //   // text2: "",
                  // });
                  // setTimeout(() => {
                  //   props.navigation.navigate("Products");
                  // }, 500);
                } else if (res.status == 400) {
                  alert("you have comment already");
                }
              });
          })
        : // .catch((error) => {
          //   alert("you have comment already shex");
          // })
          null;
    }
  };

  // const changeDoctorStatus = () => {
  const notificationForAdmin = () => {
    const info = {
      userIDD: context.stateUser.user.userId,
      useNAMEE: userProfile.name,
      // phone: phoneNumber,
      // isAdmin: false,
      // //messageText: couponList.couponMessage,
      // //discountAmount: couponList.discount,
    };
    const urlForUpdateUser = `${baseURL}users/admin-notifications`;
    // console.log("hello 2023333333333333333-1001");
    updateUserWithNotification(urlForUpdateUser, info);
    // axios
    //   .put(`${baseURL}users/admin-notifications`, info)
    //   .then((res) => {
    //     // console.log("hello 2023333333333333333-1002");
    //     // console.log(res.data.success);
    //     // console.log(res.data);
    //     setUpdatedUserData([res.data.data]);
    //     // SetUpdatedUserWithNotification(res.data.data.unseenNotifications);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     // Toast.show({
    //     //   topOffset: 60,
    //     //   type: "error",
    //     //   text1: "Something has gone wrong",
    //     //   text2: "Please try again",
    //     // });
    //   });
    // // try {
    // //   const resposne = await axios.put(
    // //     `${baseURL}users/change-appointment-account-status`,

    // //     {
    // //       // appointmentId: elementId,
    // //       doctorId: "params.doctorId",
    // //       patientNameKaka: "patientName",
    // //     },
    // //     {
    // //       headers: { Authorization: `Bearer ${token}` },
    // //     }
    // //   );

    // //   if (resposne.data.success) {
    // //     alert("resposne.data.message");
    // //   }
    // // } catch (error) {
    // //   // toast.error("Error changing doctor account status");
    // //   console.log(error);
    // //   // dispatch(hideLoading());
    // // }
  };
  const updateUserWithNotification = async (urlForUpdateUser, info) => {
    try {
      const data = await userDb.updateUserDataWithNotification(
        urlForUpdateUser,
        info
      );
      // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk-12000");
      // console.log(data);
      setUpdatedUserData([res.data.data]);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log("inside ConfirmScree-1005");
  // console.log(updatedUserData);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor={Colors.primary} />

      {/* <View style={{ flex: 1, backgroundColor: "white" }}> */}
      <View>
        {header()}
        {/* {doctorInfo()} */}
        {userCard()}
      </View>
      {/* <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}> */}
      <View>
        {divider()}
        {divider()}
        {/* {phone()} */}
        {/* {addressOne()} */}
        {/* {addressTwo()} */}
        {/* {yourCity()} */}
        {/* {yourCountry()} */}
        {/* {yourZip()} */}
        {appintmentText()}
        {patients()}

        {/* {dateAndTime()} */}
        {/* {divider()} */}

        {/* {patients()} */}
        {/* {addPatient()} */}
        {/* {confirmPayButton()}  */}
      </View>
      {confirmButton()}
      {/* </ScrollView> */}
    </SafeAreaView>
  );

  function userCard() {
    return (
      <View style={styles.labAndCheckUpContainer}>
        {props.route.params ? (
          <View style={styles.labInformationContainer}>
            <Text numberOfLines={3} style={{ ...Fonts.black16Bold }}>
              To: {userProfile.name ? userProfile.name : null}
            </Text>
            <Text numberOfLines={3} style={{ ...Fonts.black16Bold }}>
              Phone: {userProfile.phone ? userProfile.phone : null}
            </Text>
            <Text numberOfLines={3} style={{ ...Fonts.black16Bold }}>
              Address: {finalOrder.order.order.order.shippingAddress1}
            </Text>
            <Text numberOfLines={3} style={{ ...Fonts.black16Bold }}>
              Address: {finalOrder.order.order.order.shippingAddress2}
            </Text>
            <Text numberOfLines={3} style={{ ...Fonts.black16Bold }}>
              City: {finalOrder.order.order.order.city}
            </Text>
            <Text numberOfLines={3} style={{ ...Fonts.black16Bold }}>
              Country: {finalOrder.order.order.order.country}
            </Text>
            <View style={styles.callNowButtonStyle}>
              <Text style={{ ...Fonts.primaryColorBold }}>
                {" "}
                Date of order:{" "}
                {moment(finalOrder.order.order.order.dateOrdered).format(
                  "MM-DD-YYYY"
                )}
                {/* {finalOrder.order.order.order.dateOrdered.toLocaleString()} */}
              </Text>
            </View>
            {/* <Text numberOfLines={3} style={{ ...Fonts.black16Bold }}>
              Date of order: {finalOrder.order.order.order.dateOrdered}
            </Text> */}
            {/* <Text numberOfLines={3} style={{ ...Fonts.black16Bold }}>
            {props.name.length > 15
              ? props.name.substring(0, 23 - 3) + "..."
              : props.name}
          </Text> */}
            {/* <Text
              numberOfLines={2}
              style={{ ...Fonts.grayBold, marginTop: Sizes.fixPadding - 5.0 }}
            >
              <Text style={styles.price}>${"props.price"}</Text>
            </Text> */}
            {/* <View style={styles.callNowButtonStyle}>
              <Text style={{ ...Fonts.primaryColorBold }}>Call Now</Text>
            </View> */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                marginLeft: 15,
                marginTop: 15,
              }}
            >
              {/* <View style={styles.favoritecircle}>
                <TouchableOpacity>
                  <Ionicons name="md-heart-outline" size={25} color="black" />
                </TouchableOpacity>
              </View> */}
              {/* {props.countInStock > 0 ? (
              <View>
                <TouchableOpacity style={styles.addcircle}>
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
        ) : null}
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
      <View style={styles.payButtonContainerStyle}>
        <TouchableOpacity
          style={styles.test1}
          activeOpacity={0.99}
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
          onPress={confirmOrder}
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
          {/* <View style={styles.bookAppointmentButtonStyle}> */}
          <View style={styles.payButtonStyle}>
            <Text style={{ color: "white" }}>Place Order</Text>
          </View>
        </TouchableOpacity>
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
        <Text style={{ ...Fonts.black24Bold, margin: Sizes.fixPadding * 2.0 }}>
          Order Details
        </Text>
      </View>
    );
  }

  function patients() {
    const renderItem = ({ item }) => {
      return (
        <View
          style={{
            flexDirection: "row",
            // marginTop: 20,

            // marginHorizontal: Sizes.fixPadding * 2.0,
            // marginBottom: 100,
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
              // style={{
              //   ...Fonts.gray17Regular,
              //   marginTop: Sizes.fixPadding - 2.0,
              // }}
              style={{
                ...Fonts.primaryColor16Regular,
                marginTop: Sizes.fixPadding - 7.0,
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

  function confirmPayButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.99}
        style={styles.confirmAndPayButtonStyle}
        onPress={() => navigation.navigate("PaymentMethod")}
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
      <View style={styles.headerWrapStyle}>
        <MaterialIcons
          name="arrow-back"
          color={"black"}
          size={22}
          onPress={() => props.navigation.pop()}
        />
        <Text
          style={{ ...Fonts.black20Bold, marginLeft: Sizes.fixPadding + 5.0 }}
        >
          All detail of your order
        </Text>
      </View>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  };
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
    marginTop: 80,
    // flexDirection: "row",
  },
  // ///////////
  container: {
    width: width / 2 - 20,
    height: width / 1.55,
    padding: 0,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 7,
    marginLeft: 10,
    // alignItems: 'center',
    elevation: 4,
    backgroundColor: "green",

    borderTopLeftRadius: Sizes.fixPadding + 5.0,
    borderTopRightRadius: Sizes.fixPadding + 5.0,
    // overflow: 'hidden',
  },
  image: {
    width: width / 2 - 20,
    height: width / 2 - 20 - 30,
    // backgroundColor: 'transparent',
    borderTopLeftRadius: Sizes.fixPadding + 5.0,
    borderTopRightRadius: Sizes.fixPadding + 5.0,
    borderBottomLeftRadius: Sizes.fixPadding + 5.0,
    borderBottomRightRadius: Sizes.fixPadding + 5.0,
    // position: 'absolute',
    // top: -45
  },
  card: {
    marginTop: 10,
    // padding: 2,
    // marginBottom: 5,
    marginRight: 15,
    // height: width / 2 - 20,
    backgroundColor: "transparent",
    width: width / 2 - 20,
  },
  title: {
    marginTop: 10,
    marginLeft: 10,
    color: "gray",
    // fontWeight: 'bold',
    fontSize: 14,
    // textAlign: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.pink,
    marginTop: 8,
    marginLeft: 10,
  },
  addcircle: {
    marginTop: 10,
    borderRadius: 100,
    backgroundColor: Colors.pink,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
  },
  disaddcircle: {
    marginTop: 10,
    borderRadius: 100,
    backgroundColor: "gray",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  favoritecircle: {
    marginTop: 10,
    marginRight: 10,
    borderRadius: 100,
    backgroundColor: "#F7F7F8",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  labAndCheckUpContainer: {
    flexDirection: "row",
    // height: 200.0,
    width: width - 40,
    alignSelf: "center",
    borderRadius: Sizes.fixPadding + 5.0,
    backgroundColor: Colors.lightGray,
    borderColor: "black",
    borderWidth: 1.0,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 4.0,
    marginBottom: 5.0,
    overflow: "hidden",
  },
  labInformationContainer: {
    marginLeft: Sizes.fixPadding,
    marginRight: Sizes.fixPadding,
    // width: width - 220,
    marginTop: Sizes.fixPadding + 5.0,
  },
  payButtonContainerStyle: {
    backgroundColor: "white",
    height: 75.0,
    position: "absolute",
    bottom: 0.0,
    width: "100%",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    justifyContent: "center",
    borderTopColor: Colors.lightGray,
    borderTopWidth: 0.8,
  },
  payButtonStyle: {
    backgroundColor: Colors.primary,
    paddingVertical: Sizes.fixPadding + 3.0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.fixPadding + 5.0,
  },
});

// export default ConsultaionScreen;
export default connect(null, mapDispatchToProps)(confirmScreen);
