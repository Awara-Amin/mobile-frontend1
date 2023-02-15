import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Box, Heading, Button } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { Fonts, Sizes, Colors } from "../../constant/styles";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
// import FormContainer from "../../../Shared/Form/FormContainer";
// import Input from "../../../Shared/Form/Input";
// import { Fonts, Colors, Sizes } from "../../constant/styles";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import FormContainer from "../Shared/Form/FormContainer";
import Input from "../Shared/Form/Input";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password1, setPassword1] = useState("");
  const [error, setError] = useState("");

  const register = () => {
    // if (email === "" || name === "" || phone === "" || password === "") {
    if (name === "" || phone === "" || password === "") {
      setError("Please fill in the form correctly");
    }

    let user = {
      name: name,
      password: password1,
      phone: phoneNumber,
      isAdmin: false,
    };

    axios
      .post(`${baseURL}users/register`, user)
      .then((res) => {
        // console.log(res.status.message);
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "fill the all fields",
            text2: "Please try again",
          });
        } else if (res.status == 202) {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "user already exist",
            text2: "please use different mobile number",
          });
        } else if (res.status == 200) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Registration Succeeded",
            text2: "Please Login into your account",
          });

          setTimeout(() => {
            // props.navigation.navigate("Login");
            navigation.navigate("Welcome");
            // Welcome
          }, 500);
        }
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
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground
        style={{ flex: 1 }}
        // source={require('../../assets/images/doctor_bg.jpg')}
        source={require("../../assets/images/flower_bg.jpeg")}
      >
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          colors={["black", "rgba(0,0.10,0,0.80)", "rgba(0,0,0,0.20)"]}
          style={{ flex: 1, paddingHorizontal: Sizes.fixPadding * 2.0 }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ paddingBottom: Sizes.fixPadding * 2.0 }}
          >
            <Ionicons
              name="arrow-back-sharp"
              size={24}
              color="white"
              style={{ marginTop: Sizes.fixPadding * 6.0 }}
              onPress={() => navigation.goBack()}
            />
            <Text
              style={{
                ...Fonts.white30Bold,
                marginTop: Sizes.fixPadding * 4.0,
              }}
            >
              Register
            </Text>
            <Text
              style={{ ...Fonts.white16Regular, marginTop: Sizes.fixPadding }}
            >
              Create account
            </Text>
            {userName()}
            {/* {email()} */}
            {phone()}
            {password()}
            {confirmPassword()}
            {continueButton()}
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );

  function userName() {
    return (
      <View style={styles.infoWrapStyle}>
        <TextInput
          placeholder="UserName"
          style={{ ...Fonts.white16Regular }}
          placeholderTextColor="white"
          onChangeText={(text) => setName(text)}
        />
      </View>
    );
  }

  function phone() {
    return (
      <View style={styles.infoWrapStyle}>
        <TextInput
          placeholder="Phone"
          style={{ ...Fonts.white16Regular }}
          placeholderTextColor="white"
          onChangeText={(text) => setPhoneNumber(text)}
        />
      </View>
    );
  }

  function password() {
    return (
      <View style={styles.infoWrapStyle}>
        <TextInput
          placeholder="Password"
          style={{ ...Fonts.white16Regular }}
          placeholderTextColor="white"
          secureTextEntry={true}
          onChangeText={(text) => setPassword1(text)}
        />
      </View>
    );
  }

  //   function email() {
  //     return (
  //       <View style={styles.infoWrapStyle}>
  //         <TextInput
  //           placeholder="Email"
  //           style={{ ...Fonts.white16Regular }}
  //           placeholderTextColor="white"

  //         />
  //       </View>
  //     );
  //   }

  function continueButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.99}
        // onPress={() => navigation.navigate("BottomTabScreen")}
        onPress={() => register()}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={["rgba(68,114,152,0.99)", "rgba(25,118,210,0.5)"]}
          style={styles.continueButtonStyle}
        >
          {/* <Text style={{ ...Fonts.white16Regular }}>Countinue</Text> */}
          <Text style={{ ...Fonts.white16Regular }}>Sign Up</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  function confirmPassword() {
    return (
      <View style={styles.infoWrapStyle}>
        <TextInput
          placeholder="Confirm Password"
          style={{ ...Fonts.white16Regular }}
          placeholderTextColor="white"
          secureTextEntry={true}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  infoWrapStyle: {
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 25.0,
    marginTop: Sizes.fixPadding * 5.0,
    paddingVertical: Sizes.fixPadding + 3.0,
    paddingHorizontal: 25.0,
  },
  continueButtonStyle: {
    paddingVertical: Sizes.fixPadding + 5.0,
    borderRadius: Sizes.fixPadding * 3.0,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 5.0,
    marginBottom: Sizes.fixPadding * 2.0,
  },
});

export default RegisterScreen;
