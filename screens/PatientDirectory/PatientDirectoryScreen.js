// import React from "react";
import React, { useState, useEffect, useContext, useCallback } from "react";

import {
  Text,
  View,
  StatusBar,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AuthGlobal from "../../Context/store/AuthGlobal";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import OrderCard from "../../components/OrderCard";
import { ScrollView } from "native-base";
import { UserData } from "../../Context/data/userData";
import OrderCardUser from "../../components/OrderCardUser";
export const userDb = new UserData();

// const patientList = [
//   {
//     id: "1",
//     name: "Allison Perry",
//     image: require("../../assets/images/user/user_3.jpg"),
//   },
//   {
//     id: "2",
//     name: "John Smith",
//     image: null,
//   },
// ];

// const PatientDirectoryScreen = ({ navigation }) => {
const PatientDirectoryScreen = (props) => {
  // console.log("props ssssssssssssssssssssssssss-1");
  // console.log(props);
  const context = useContext(AuthGlobal);
  // console.log("userId");
  //   console.log(context.stateUser.user);
  //   console.log("sub");
  //   console.log(context.stateUser.user.sub);
  const [userProfile, setUserProfile] = useState();
  const [orders, setOrders] = useState("");

  useFocusEffect(
    useCallback(() => {
      // lets first check if the user has logedin or nor/ in this case user directly has started sending procudts into baskets
      //   if (
      //     context.stateUser.isAuthenticated === false ||
      //     context.stateUser.isAuthenticated === null
      //   ) {
      //     props.navigation.navigate("Login");
      //   }

      // through this we get the user
      let url = `${baseURL}users/${context.stateUser.user.userId}`;
      let headerObj;
      AsyncStorage.getItem("jwt").then((res) => {
        headerObj = { headers: { Authorization: `Bearer ${res}` } };
        getUserById(url, headerObj);
      });
      ////////////////////////////////////////////////////////////////////////
      // AsyncStorage.getItem("jwt")
      //   .then((res) => {
      //     axios
      //       .get(`${baseURL}users/${context.stateUser.user.userId}`, {
      //         headers: { Authorization: `Bearer ${res}` },
      //       })
      //       .then((user) => setUserProfile(user.data));
      //   })
      //   .catch((error) => console.log(error));
      /////////////
      //   console.log("UserProfile 11111111111111111 taza");
      //   console.log(userProfile);

      axios
        .get(`${baseURL}orders`)
        .then((x) => {
          const data = x.data;
          //   console.log("userOrders1 11111111111111111");
          //   console.log(data);
          //   console.log("userOrders1 2222222222222222222");
          const userOrders = data.filter(
            (order) => order.user._id === context.stateUser.user.userId
          );
          //   console.log("userOrders2");
          //   console.log(userOrders);
          setOrders(userOrders);
        })
        .catch((error) => console.log(error));

      return () => {
        setUserProfile();
        setOrders();
      };
    }, [context.stateUser.isAuthenticated])
  );

  const getUserById = async (url, headerObj) => {
    const data = await userDb.fetchUserData(url, headerObj);
    console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk-12000");
    console.log(data);
    setUserProfile(data.name);
  };
  // console.log("orders 11111111111111111 taza2");
  // console.log(orders);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar translucent={false} backgroundColor={Colors.primary} />
        {header()}
        {myAllOrders()}
        <ScrollView>{allOrders()}</ScrollView>
        {/* {allOrders()} */}
        {/* {patients()} */}
        {/* {addButton()} */}
      </View>
    </SafeAreaView>
  );

  function allOrders() {
    return (
      <View style={styles.infoWrapStyle}>
        {orders ? (
          orders.map((x) => {
            return (
              <OrderCardUser key={x.id} {...x} navigation={props.navigation} />
            );
          })
        ) : (
          <View>
            <View style={styles.order}>
              <Text>You have no orders</Text>
            </View>
            <View style={styles.order}>
              <Text>Go back for shopping part</Text>
            </View>
          </View>
        )}

        {/* <FlatList
          data={orders}
          renderItem={({ item }) => (
            // <Text>{item.shippingAddress1}</Text>
            <OrderCard
              navigation={props.navigation}
              {...item}
              editMode={true}
            />
          )}
          keyExtractor={(item) => item.id}
        /> */}
      </View>
    );
  }
  //   function patients() {
  //     const renderItem = ({ item }) => {
  //       return (
  //         <View
  //           style={{
  //             flexDirection: "row",
  //             alignItems: "center",
  //             marginBottom: Sizes.fixPadding - 5.0,
  //           }}
  //         >
  //           <View style={styles.patientImageContainer}>
  //             {item.image === null ? (
  //               <Ionicons name="person" size={24} color="gray" />
  //             ) : (
  //               <Image
  //                 source={item.image}
  //                 resizeMode="contain"
  //                 style={{
  //                   height: 80.0,
  //                   width: 80.0,
  //                   borderRadius: Sizes.fixPadding * 4.0,
  //                 }}
  //               />
  //             )}
  //           </View>
  //           <Text
  //             style={{
  //               ...Fonts.black16Bold,
  //               marginLeft: Sizes.fixPadding,
  //               marginBottom: Sizes.fixPadding,
  //             }}
  //           >
  //             {item.name}
  //           </Text>
  //         </View>
  //       );
  //     };
  //     return (
  //       <View>
  //         <FlatList
  //           data={patientList}
  //           keyExtractor={(item) => `${item.id}`}
  //           renderItem={renderItem}
  //           contentContainerStyle={{
  //             paddingHorizontal: Sizes.fixPadding * 2.0,
  //             paddingVertical: Sizes.fixPadding * 2.0,
  //           }}
  //         />
  //       </View>
  //     );
  //   }

  function addButton() {
    return (
      <View style={styles.addButtonStyle}>
        <MaterialIcons name="add" size={30} color="white" />
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
          Home
        </Text>
      </View>
    );
  }
};

function myAllOrders() {
  return (
    <View>
      <Text style={{ ...Fonts.black24Bold, margin: Sizes.fixPadding * 2.0 }}>
        My Orders
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    elevation: 2.0,
    marginBottom: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
  },
  patientImageContainer: {
    height: 80.0,
    width: 80.0,
    borderRadius: Sizes.fixPadding * 4.0,
    backgroundColor: "#F5F5F5",
    borderColor: Colors.lightGray,
    borderWidth: 1.0,
    marginRight: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Sizes.fixPadding + 3.0,
    shadowColor: Colors.lightGray,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: Sizes.fixPadding,
    elevation: 2.0,
    overflow: "hidden",
  },
  addButtonStyle: {
    backgroundColor: "#2196F3",
    width: 60.0,
    height: 60.0,
    borderRadius: Sizes.fixPadding * 3.0,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: Sizes.fixPadding * 2.0,
    right: Sizes.fixPadding * 2.0,
    elevation: 10.0,
  },
  order: {
    marginTop: 20,
    alignItems: "center",
    marginBottom: 60,
  },
});

export default PatientDirectoryScreen;
