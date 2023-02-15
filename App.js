import "react-native-gesture-handler";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Image, Pressable } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { ToastProvider } from "react-native-toast-notifications";
// import io from "socket.io-client";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { LogBox } from "react-native";
import LoadingScreen from "./components/LoadingScreen";
import BottomTabScreen from "./components/BottomTab";
import NotificationScreen from "./screens/Notifications/NotificationScreen";
import SearchScreen from "./screens/Search/SearchScreen";
import ViewAllScreen from "./screens/ViewAll/ViewAllScreen";
import SpecialistScreen from "./screens/Specialist/SpecialistScreen";
import TimeSlotScreen from "./screens/TimeSlots/TimeSlotsScreen";
import ConsultaionScreen from "./screens/ConsultationDetail/ConsultationDetailScreen";
import OrderDetailScreen from "./screens/OrderDetail/OrderDetailScreen";
import PaymentMethodScreen from "./screens/PaymentMethod/PaymentMethodScreen";
import DoctorProfileScreen from "./screens/DoctorProfile/DoctorProfileScreen";
import ReviewScreen from "./screens/Review/ReviewScreen";
import LabTestAndHealthCheckUpScreen from "./screens/LabAndTestCheckup/LabTestAndHealthCheckUpScreen";
import MessageScreen from "./screens/Message/MessageScreen";
import EditProfileScreen from "./screens/EditProfile/EditProfileScreen";
import PatientDirectoryScreen from "./screens/PatientDirectory/PatientDirectoryScreen";
import AboutUsScreen from "./screens/AboutUs/AboutUsScreen";
import WelcomeScreen from "./screens/Auth/WelcomeScreen";
import RegisterScreen from "./screens/Auth/RegisterScreen";
import VerificationScreen from "./screens/Auth/VerificationScreen";
import SplashScreen from "./screens/SplashScreen";

//Redux part + the Provider
// import { Provider } from "react-redux";
// import store from "./Redux/store";

import ProductDetails from "./screens/Products/ProductDetails";
// import ScheduleScreen from "../screens/Schedule/ScheduleScreen";
import ScheduleScreen from "./screens/Schedule/ScheduleScreen";

LogBox.ignoreAllLogs();
import { Provider } from "react-redux";

//
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthGlobal from "./Context/store/AuthGlobal";

// context API
import Auth from "./Context/store/Auth";
import store from "./assets/Redux/store";
import ProductFormScreen from "./screens/Admin/ProductFormScreen";
import CategoriesScreen from "./screens/Admin/CategoriesScreen";
// import Users from "./screens/Admin/UsersScreen";
import UsersScreen from "./screens/Admin/UsersScreen";
import UserProfileEdition from "./screens/Admin/UserProfileEdition";
import confirmScreen from "./screens/Confirmation/ConfirmScreen";
import OrderScreen from "./screens/Admin/OrderScreen";
import ProductScreen from "./screens/Admin/ProductScreen";
import CouponScreen from "./screens/Admin/CouponScreen";
import CouponMainScreen from "./screens/Admin/CouponMainScreen";

import OrderDetailsInsideOrderScreen from "./components/OrderDetailsInsideOrderScreen";

// internet connection
// import checkConnected from "./components/functions";
// import useInternetStatus from "./components/functions";
// import NoConnectionScreen from "./components/NoConnectionScreen";
import NetInfo from "@react-native-community/netinfo";
import { useNetInfo } from "@react-native-community/netinfo";
// const socket = io.connect("http://localhost:3000");
const Stack = createStackNavigator();

import Toast from "react-native-toast-message";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3000");
import ProductMainScreen from "./screens/Admin/ProductMainScreen";
// export const socket = io.connect("http://10.0.2.2:3000");

// https://www.youtube.com/watch?v=26dk9cLfgfU&t=88s
// https://stackoverflow.com/questions/62787980/how-do-i-access-reusable-netinfo-code-from-function-component-to-class-component
// ************************************************************************************************
// const useInternetStatus = () => {
//   const [reachable, setReachable] = useState(false);

//   useEffect(() => {
//     const subscribe = (state) => setReachable(state.isInternetReachable);

//     NetInfo.addEventListener(subscribe);

//     return () => NetInfo.removeEventListener(subscribe);
//   }, []);

//   return reachable;
// };
// ********************************************************************************

const App = () => {
  // const toast = useToast();
  const toast = useToast();
  // const [connectStatus, setConnectStatus] = useState(false);
  // hendi-1
  const netInfo = useNetInfo();
  // const [isConnected, setIsConnected] = useState(false);

  // const isInternetReachable = useInternetStatus();
  // console.log("isInternetReachable aaaaaaaaaaaaaaaaaaaaaaaaaaaa   22");
  // console.log(isInternetReachable);
  // ////////////////////////////////////
  // useEffect(() => {
  //   NetInfo.addEventListener(handleConnectivityChange);
  //   NetInfo.fetch().then((state) => {
  //     setIsConnected(state.isConnected);
  //   });

  //   return () => {
  //     NetInfo.addEventListener((state) => {
  //       setIsConnected(state.isConnected);
  //     });
  //   };
  // }, [NetInfo]);

  // function handleConnectivityChange(state) {
  //   if (state.isConnected) {
  //     setIsConnected(true);
  //   } else {
  //     setIsConnected(false);
  //   }
  // }

  function MiniOfflineSign() {
    return (
      <View style={styles.offlineContainer}>
        <Text style={styles.offlineText}>No Internet Connection</Text>
      </View>
    );
  }

  // if(!isConnected){
  // return (
  //     <View style={{height:30}}>
  //         <MiniOfflineSign />
  //     </View>
  // )
  // }
  // return null;
  // }
  ///////////////////////////////////////////////////////////
  // hendi-2
  // useEffect(() => {
  //   const unsubscribe = NetInfo.addEventListener((state) => {
  //     console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
  //     console.log("Connection type kaka2...", state.type);
  //     console.log("Is connected kaka3.....?", state.isConnected);
  //     setIsConnected(state.isConnected);
  //   });
  //   // unsubscribe();
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  // const checkConnectedwww = () => {
  // useEffect(() => {
  //   checkConnected();
  // }, []);

  // checkConnected().then((res) => {
  //   console.log("connectStatus ssssssssssssssss 30003", connectStatus);
  //   console.log(res);
  //   alert("internet issues");
  //   // this will be either true or false
  //   setConnectStatus(res);
  //   // setConnectStatus(false);
  // });
  // };
  // useEffect(() => {
  // checkConnected().then((res) => {
  //   // this will be either true or false
  //   setConnectStatus(res);
  //   // setConnectStatus(false);
  // });
  // }, [connectStatus]);
  // console.log("connectStatus ssssssssssssssss sss 30004", connectStatus);

  const context = useContext(AuthGlobal);
  // console.log("userId kaka 2");
  // console.log(context);

  // console.log("Is connected?", state.isConnected);
  // useEffect(() => {
  //   joinRoom();
  // }, []);
  // const joinRoom = () => {
  //   // if (username !== "" && room !== "") {
  //   // socket.emit("join_room", room);
  //   socket.emit("products", "room");
  //   // setShowChat(true);
  //   // }
  // };
  // function NoConnectionScreen() {
  //   return (
  //     <View style={{ flex: 1 }}>
  //       <View
  //         style={{
  //           position: "absolute",
  //           bottom: 10,
  //           neight: 50,
  //           width: "100%",
  //           padding: 20,
  //           justifyContent: "center",
  //           borderRadius: 7,
  //           alignItems: "center",
  //           backgroundColor: isConnected ? "red" : "gray",
  //         }}
  //       >
  //         <Text style={{ color: "white" }}>
  //           {isConnected
  //             ? "Back Online"
  //             : "It seems you have Internet Connection problem"}
  //         </Text>
  //         <Button
  //           style={{ color: "white" }}
  //           title="Reload page"
  //           onPress={onCheck}
  //         />
  //       </View>
  //       {/* <Image
  //       source={require("../assets/icon.png")}
  //       style={{ width: "30%", height: "30%" }}
  //       resizeMode="contain"
  //     /> */}
  //       {/* <Pressable onPress={props.onCheck}> */}
  //       {/* <Pressable>
  //         <Text>Check your internet conection please</Text>
  //       </Pressable> */}
  //       {/* <Button title="Reload page" onPress={props.onCheck} /> */}
  //     </View>
  //     // <View style={styles.container}>
  //     //   {/* <Image
  //     //     source={require("../assets/icon.png")}
  //     //     style={{ width: "30%", height: "30%" }}
  //     //     resizeMode="contain"
  //     //   /> */}
  //     //   {/* <Pressable onPress={props.onCheck}> */}
  //     //   <Pressable>
  //     //     <Text>Check your internet conection please</Text>
  //     //   </Pressable>
  //     //   {/* <Button title="Reload page" onPress={props.onCheck} /> */}
  //     // </View>
  //   );
  // }
  // function onCheck() {
  //   alert("Reload the page again");
  //   // {!isConnected ? alert("your internet access has some issue");()
  // }
  socket.on("disconnect", () => {
    console.log("disconnect Awara aaaaaa");
    // toast.show("Socket is disconnected", {
    //   type: "success",
    //   placement: "top",
    //   duration: 4000,
    //   offset: 30,
    //   animationType: "slide-in",
    // });
  });
  socket.on("connection", () => {
    console.log("connect Awara aaaaa");
    // toast.show("Socket is connected", {
    //   type: "success",
    //   placement: "top",
    //   duration: 4000,
    //   offset: 30,
    //   animationType: "slide-in",
    // });
  });
  socket.on("reconnection", (data) => {
    console.log("reconnected kaka Awaraaaaa");
    // toast.show("Socket is reconnected", {
    //   type: "success",
    //   placement: "top",
    //   duration: 4000,
    //   offset: 30,
    //   animationType: "slide-in",
    // });
  });

  // socket.on("disconnect", () => {
  //   // console.log("data hi kaka");
  //   Toast.show({
  //     topOffset: 10,
  //     type: "error",
  //     text1: "Socket is disconnected",
  //     text2: "",
  //   });
  //   // setIsConnected(false);
  // });
  // socket.on("connection", () => {
  //   // Toast.show({
  //   //   topOffset: 10,
  //   //   type: 'success',
  //   //   text1: 'Socket is connected',
  //   //   text2: '',
  //   // });
  //   // setIsConnected(false);
  // });
  // socket.on("reconnection", (data) => {
  //   console.log(data.status);
  //   console.log(data);
  //   Toast.show({
  //     topOffset: 10,
  //     type: "success",
  //     text1: "Socket is re-connected",
  //     text2: "",
  //   });
  //   // setIsConnected(false);
  // });

  return (
    <Auth>
      <ToastProvider>
        <Provider store={store}>
          <NavigationContainer>
            <NativeBaseProvider>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                }}
              >
                <Stack.Screen name="Loading" component={LoadingScreen} />
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen
                  name="Verification"
                  component={VerificationScreen}
                />
                <Stack.Screen
                  name="BottomTabScreen"
                  component={BottomTabScreen}
                />
                <Stack.Screen
                  name="Notification"
                  component={NotificationScreen}
                />
                <Stack.Screen name="Search" component={SearchScreen} />
                <Stack.Screen name="ViewAll" component={ViewAllScreen} />
                <Stack.Screen name="Specialist" component={SpecialistScreen} />
                <Stack.Screen name="TimeSlots" component={TimeSlotScreen} />
                <Stack.Screen
                  name="Consultation"
                  component={ConsultaionScreen}
                />
                {/* new ones */}

                <Stack.Screen
                  name="ProductDetails"
                  component={ProductDetails}
                />
                <Stack.Screen name="Scedule" component={ScheduleScreen} />
                <Stack.Screen
                  name="OrderDetail"
                  component={OrderDetailScreen}
                />
                <Stack.Screen name="Confirm" component={confirmScreen} />

                {/*  */}
                <Stack.Screen
                  name="PaymentMethod"
                  component={PaymentMethodScreen}
                />
                <Stack.Screen
                  name="DoctorProfile"
                  component={DoctorProfileScreen}
                />
                <Stack.Screen name="Review" component={ReviewScreen} />
                <Stack.Screen
                  name="LabTestAndCheckUp"
                  component={LabTestAndHealthCheckUpScreen}
                />
                <Stack.Screen name="Message" component={MessageScreen} />
                <Stack.Screen
                  name="EditProfile"
                  component={EditProfileScreen}
                />
                <Stack.Screen
                  name="PatientDirectory"
                  component={PatientDirectoryScreen}
                />
                <Stack.Screen name="Products" component={ProductScreen} />
                <Stack.Screen
                  name="ProductMainScreen"
                  component={ProductMainScreen}
                />
                <Stack.Screen name="AboutUs" component={AboutUsScreen} />
                <Stack.Screen
                  name="ProductForm"
                  component={ProductFormScreen}
                />
                <Stack.Screen name="Categories" component={CategoriesScreen} />
                <Stack.Screen name="Users" component={UsersScreen} />
                <Stack.Screen
                  name="UserProfileEdition"
                  component={UserProfileEdition}
                />
                <Stack.Screen name="Orders" component={OrderScreen} />
                <Stack.Screen
                  name="OrderDetails"
                  component={OrderDetailsInsideOrderScreen}
                />

                <Stack.Screen
                  name="CouponMainScreen"
                  component={CouponMainScreen}
                />
                <Stack.Screen name="Coupons" component={CouponScreen} />
              </Stack.Navigator>
            </NativeBaseProvider>
          </NavigationContainer>
        </Provider>
      </ToastProvider>
    </Auth>
  );
};

export default App;
