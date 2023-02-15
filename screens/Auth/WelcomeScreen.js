import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Fonts, Sizes } from "../../constant/styles";
import { useFocusEffect } from "@react-navigation/native";

// import IntlPhoneInput from "react-native-intl-phone-input";

import AuthGlobal from "../../Context/store/AuthGlobal";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser, logoutUser } from "../../Context/actions/Auth.actions";

const WelcomeScreen = ({ navigation }) => {
  const context = useContext(AuthGlobal);
  // console.log("props 12");
  // console.log(context.stateUser.user.isAdmin);

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useFocusEffect(
    useCallback(() => {
      // setLoading(true);

      return () => {
        // removeNetInfoSubscription();
        // to make them empty again, no memorries for later

        setPhone();
        setPassword();
      };
    }, [])
  );
  ////////////////////
  useEffect(() => {
    // is the context user or not? if it is the user do this
    if (context.stateUser.isAuthenticated === true) {
      console.log("context.stateUser 22222222");
      // console.log(context.stateUser);
      // props.navigation.navigate("User Profile")
      // props.navigation.navigate("Home Screen");
      navigation.navigate("BottomTabScreen");
    }

    return () => {
      setPhone();
      setPassword();
    };
  }, [context.stateUser.isAuthenticated, navigation]);

  const handleSubmit = () => {
    const user = {
      phone: phone,
      password: password,
      // isDoctor,
    };

    if (phone === "" || password === "") {
      setError("Please fill in your credentials");
      alert("Please fill in your credentials");
    } else {
      loginUser(user, context.dispatch);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground
        style={{ flex: 1 }}
        // source={require("../../assets/images/doctor_bg.jpg")}
        source={require("../../assets/images/flower_bg.jpeg")}
      >
        <LinearGradient // this is for background color kaka
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          colors={["black", "rgba(0,0.10,0,0.80)", "rgba(0,0,0,0.20)"]}
          style={{ flex: 1, paddingHorizontal: Sizes.fixPadding * 2.0 }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
          >
            <Text style={{ ...Fonts.white30Bold, marginTop: 100.0 }}>
              Welcome back
            </Text>
            <Text
              style={{ ...Fonts.white16Regular, marginTop: Sizes.fixPadding }}
            >
              Login in your account
            </Text>
            {phoneNumberInput()}
            {passwordInput()}
            {logIn()}
            {continueButton()}
            {/* {otpText()} */}
            {/* {facebookButton()} */}
            {/* {googleButton()} */}
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );

  // function phoneNumberInput() {
  //   return (
  //     <IntlPhoneInput
  //       onChangeText={({ phoneNumber }) => setPhoneNumber(phoneNumber)}
  //       defaultCountry="US"
  //       containerStyle={styles.phoneNumberContainerStyle}
  //       placeholder="Phone Number"
  //       dialCodeTextStyle={{ ...Fonts.white16Regular }}
  //       phoneInputStyle={{
  //         flex: 1,
  //         marginLeft: Sizes.fixPadding + 20.0,
  //         ...Fonts.white16Regular,
  //       }}
  //     />
  //   );
  // }

  function phoneNumberInput() {
    return (
      <View style={styles.infoWrapStyle}>
        <TextInput
          onChangeText={(text) => setPhone(text)}
          placeholder="Phone Number"
          style={{ ...Fonts.white16Regular }}
          placeholderTextColor="white"
        />
      </View>
    );
  }

  function passwordInput() {
    return (
      <View style={styles.infoWrapStyle}>
        <TextInput
          placeholder="Password"
          style={{ ...Fonts.white16Regular }}
          placeholderTextColor="white"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
    );
  }

  function logIn() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        // onPress={() => navigation.navigate("Verification")}
        onPress={() => handleSubmit()}
        // onPress={() => [handleSubmit(), navigation.navigate("BottomTabScreen")]}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={["rgba(68,114,152,0.99)", "rgba(25,118,210,0.5)"]}
          style={{
            paddingVertical: Sizes.fixPadding + 5.0,
            borderRadius: Sizes.fixPadding * 3.0,
            alignItems: "center",
            justifyContent: "center",
            marginTop: Sizes.fixPadding * 5.0,
          }}
        >
          <Text style={{ ...Fonts.white16Regular }}>Log In</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  function continueButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate("Verification")}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={["rgba(68,114,152,0.99)", "rgba(25,118,210,0.5)"]}
          style={{
            paddingVertical: Sizes.fixPadding + 5.0,
            borderRadius: Sizes.fixPadding * 3.0,
            alignItems: "center",
            justifyContent: "center",
            marginTop: Sizes.fixPadding * 5.0,
          }}
        >
          {/* <Text style={{ ...Fonts.white16Regular }}>Countinue</Text> */}
          <Text style={{ ...Fonts.white16Regular }}>Register</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  function otpText() {
    return (
      <Text
        style={{
          ...Fonts.white16Regular,
          textAlign: "center",
          marginTop: Sizes.fixPadding * 2.0,
        }}
      >
        We'll send OTP for Verification
      </Text>
    );
  }

  function facebookButton() {
    return (
      <View style={styles.faceBookButtonContainerStyle}>
        <Image
          source={require("../../assets/images/facebook.png")}
          style={{ height: 30.0, width: 30.0 }}
          resizeMode="contain"
        />
        <Text style={{ ...Fonts.white16Regular, marginLeft: Sizes.fixPadding }}>
          Log in with Facebook
        </Text>
      </View>
    );
  }

  function googleButton() {
    return (
      <View style={styles.googleButtonContainerStyle}>
        <Image
          source={require("../../assets/images/google.png")}
          style={{ height: 30.0, width: 30.0 }}
          resizeMode="contain"
        />
        <Text style={{ ...Fonts.black16Regular, marginLeft: Sizes.fixPadding }}>
          Log in with Google
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  phoneNumberContainerStyle: {
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: Sizes.fixPadding + 15.0,
    marginTop: Sizes.fixPadding * 9.0,
  },
  faceBookButtonContainerStyle: {
    paddingVertical: Sizes.fixPadding + 5.0,
    borderRadius: Sizes.fixPadding * 3.0,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 5.0,
    backgroundColor: "#3B5998",
  },
  googleButtonContainerStyle: {
    paddingVertical: Sizes.fixPadding + 5.0,
    borderRadius: Sizes.fixPadding * 3.0,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 4.0,
    backgroundColor: "white",
  },
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

export default WelcomeScreen;
