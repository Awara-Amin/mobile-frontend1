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
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = () => {
    // if (email === "" || name === "" || phone === "" || password === "") {
    if (name === "" || phone === "" || password === "") {
      setError("Please fill in the form correctly");
    }

    let user = {
      name: name,
      password: password,
      phone: phone,
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
            props.navigation.navigate("Welcome");
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

            <Box
            //   w="full"
            //   h="full"
            //   position="absolute"
            //   px="6"
            //   top="0"
            //   justifyContent="center"
            >
              {/* <Heading style={styles.title}>SIGN UP</Heading> */}
              {/* <KeyboardAwareScrollView
                  viewIsInsideTabBar={true}
                  extraHeight={200}
                  enableOnAndroid={true}
                > */}
              <FormContainer>
                {/* <Input
              placeholder={"user@gmail.com"}
              name={"email"}
              id={"email"}
              onChangeText={(text) => setEmail(text.toLowerCase())}
            /> */}

                <Input
                  InputLeftElement={
                    <FontAwesome name="email" size={20} color={Colors.main} />
                  }
                  placeholder={"Awara Amini"}
                  name={"name"}
                  id={"name"}
                  onChangeText={(text) => setName(text)}
                />

                <Input
                  placeholder={"Phone Number"}
                  name={"phone"}
                  id={"phone"}
                  keyboardType={"numeric"}
                  onChangeText={(text) => setPhone(text)}
                />

                <Input
                  placeholder={"********"}
                  name={"password"}
                  id={"password"}
                  secureTextEntry={true}
                  onChangeText={(text) => setPassword(text)}
                />

                <View style={styles.buttonGroup}>
                  {error ? <Error message={error} /> : null}
                </View>
                <View>
                  {/* <Button from native base!  /> */}
                  <Button
                    _pressed={{ bg: Colors.main }}
                    my={5}
                    w="40"
                    rounded={50}
                    bg={Colors.main}
                    onPress={() => register()}
                  >
                    SIGN UP
                  </Button>
                </View>

                <Button
                  pressed={{ bg: Colors.main }}
                  my={5}
                  w="40"
                  rounded={50}
                  bg={Colors.main}
                  // title={"Back to Login"}
                  onPress={() => {
                    // props.navigation.navigate("Login");
                    // navigation.navigate("Login");
                    navigation.navigate("Welcome");
                  }}
                >
                  LOGIN
                </Button>

                <View></View>
              </FormContainer>
              {/* </KeyboardAwareScrollView> */}
            </Box>

            {/* {userName()}
            {email()}
            {password()}
            {confirmPassword()}
            {continueButton()} */}
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
        />
      </View>
    );
  }

  //   function password() {
  //     return (
  //       <View style={styles.infoWrapStyle}>
  //         <TextInput
  //           placeholder="Password"
  //           style={{ ...Fonts.white16Regular }}
  //           placeholderTextColor="white"
  //           secureTextEntry={true}
  //         />
  //       </View>
  //     );
  //   }

  function email() {
    return (
      <View style={styles.infoWrapStyle}>
        <TextInput
          placeholder="Email"
          style={{ ...Fonts.white16Regular }}
          placeholderTextColor="white"
        />
      </View>
    );
  }

  function continueButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.99}
        onPress={() => navigation.navigate("BottomTabScreen")}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={["rgba(68,114,152,0.99)", "rgba(25,118,210,0.5)"]}
          style={styles.continueButtonStyle}
        >
          <Text style={{ ...Fonts.white16Regular }}>Countinue</Text>
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
