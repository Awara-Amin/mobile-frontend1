import {
  MaterialIcons,
  Ionicons,
  FontAwesome5,
  Entypo,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import {
  TouchableOpacity,
  StyleSheet,
  View,
  BackHandler,
  Text,
} from "react-native";
import HomeScreen from "../screens/Home/HomeScreen";
import ScheduleScreen from "../screens/Schedule/ScheduleScreen";
import ChatScreen from "../screens/Chat/ChatScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import { Colors, Fonts, Sizes } from "../constant/styles";

import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthGlobal from "../Context/store/AuthGlobal";
import TabBarScreen from "./TabBarScreen";
import TabBarScreenFavourite from "./TabBarScreenFavourite";
import CartIcon from "./CartIcon";
import FavIcon from "./FavIcon";
import SupportScreen from "../screens/SupportScreen/SupportScreen";
import ProductScreen from "../screens/Admin/ProductScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const context = useContext(AuthGlobal);
  // console.log("userId kaka 3");
  // console.log(context);
  // console.log(context.stateUser.user.isAdmin);

  const backAction = () => {
    backClickCount == 1 ? BackHandler.exitApp() : _spring();
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [backAction])
  );

  function _spring() {
    setBackClickCount(1);
    setTimeout(() => {
      setBackClickCount(0);
    }, 1000);
  }

  const [backClickCount, setBackClickCount] = useState(0);

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: "#8F8E93",
          tabBarLabelStyle: {
            fontSize: 14.0,
            fontFamily: "Montserrat_SemiBold",
          },
          tabBarStyle: {
            height: 65.0,
            elevation: 0.0,
            borderTopWidth: 0,
            backgroundColor: Colors.whiteColor,
          },
        }}
      >
        <Tab.Screen
          name={"Home"}
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused, color }) =>
              focused ? (
                <View style={styles.circleStyle}>
                  <Entypo name="home" size={24} color={color} />
                </View>
              ) : (
                <Entypo name="home" size={24} color={color} />
              ),
          }}
        />
        {/* <Tab.Screen
          name={"Scedule"}
          component={ScheduleScreen}
          options={{
            tabBarIcon: ({ focused, color }) =>
              focused ? (
                <View style={styles.circleStyle}>
                  <FontAwesome5 name="calendar-alt" size={24} color={color} />
                </View>
              ) : (
                <FontAwesome5 name="calendar-alt" size={24} color={color} />
              ),
          }}
        /> */}
        <Tab.Screen
          name={"TabBarScreen"}
          component={TabBarScreen}
          options={{
            tabBarIcon: ({ focused, color }) =>
              focused ? (
                <View style={styles.circleStyle}>
                  <FontAwesome5 name="shopping-cart" size={24} color={color} />
                  <CartIcon />
                </View>
              ) : (
                <View>
                  <FontAwesome5 name="shopping-cart" size={24} color={color} />
                  <CartIcon />
                </View>
              ),
          }}
        />
        <Tab.Screen
          name={"TabBarScreenFavourite"}
          component={TabBarScreenFavourite}
          options={{
            tabBarIcon: ({ focused, color }) =>
              focused ? (
                <View style={styles.circleStyle}>
                  <FontAwesome5 name="heart" size={24} color={color} />
                  {/* <CartIcon /> */}
                  <FavIcon />
                </View>
              ) : (
                <View>
                  <FontAwesome5 name="heart" size={24} color={color} />
                  <FavIcon />
                </View>
              ),
          }}
        />
        {context.stateUser.user.isAdmin == true ? (
          <Tab.Screen
            name={"Admin"}
            // component={ChatScreen}
            component={ProductScreen}
            options={{
              tabBarIcon: ({ focused, color }) =>
                focused ? (
                  <TouchableOpacity style={styles.circleStyle}>
                    <MaterialIcons name="person" size={24} color="red" />
                  </TouchableOpacity>
                ) : (
                  <MaterialIcons name="person" size={24} color="red" />
                ),
            }}
          />
        ) : null}

        {/* <Tab.Screen
          name={"Chat"}
          component={ChatScreen}
          options={{
            tabBarIcon: ({ focused, color }) =>
              focused ? (
                <TouchableOpacity style={styles.circleStyle}>
                  <MaterialIcons name="chat" size={24} color={color} />
                </TouchableOpacity>
              ) : (
                <MaterialIcons name="chat" size={24} color={color} />
              ),
          }}
        /> */}
        {/* <Tab.Screen
          name={"Suport"}
          component={SupportScreen}
          options={{
            tabBarIcon: ({ focused, color }) =>
              focused ? (
                <TouchableOpacity style={styles.circleStyle}>
                  <MaterialIcons name="chat" size={24} color={color} />
                </TouchableOpacity>
              ) : (
                <MaterialIcons name="chat" size={24} color={color} />
              ),
          }}
        /> */}
        <Tab.Screen
          name={"Profile"}
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused, color }) =>
              focused ? (
                <TouchableOpacity style={styles.circleStyle}>
                  <Ionicons name="person" size={24} color={color} />
                </TouchableOpacity>
              ) : (
                <Ionicons name="person" size={24} color={color} />
              ),
          }}
        />
      </Tab.Navigator>
      {exitInfo()}
    </>
  );

  function exitInfo() {
    return backClickCount == 1 ? (
      <View style={[styles.animatedView]}>
        <Text style={{ ...Fonts.white13Regular }}>
          Press back once again to exit
        </Text>
      </View>
    ) : null;
  }
};

const styles = StyleSheet.create({
  circleStyle: {
    height: 50.0,
    width: 50.0,
    backgroundColor: "#F5F5F5",
    borderRadius: 25.0,
    alignItems: "center",
    justifyContent: "center",
  },
  animatedView: {
    backgroundColor: "#333333",
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TabNavigator;
