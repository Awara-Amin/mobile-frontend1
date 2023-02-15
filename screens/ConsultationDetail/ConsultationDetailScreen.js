import React, { useState, useEffect, useContext } from "react";
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
import AuthGlobal from "../../Context/store/AuthGlobal";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { connect } from "react-redux";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const { width } = Dimensions.get("screen");

const patientLit = [
  {
    id: "1",
    name: "Allison Perry",
    image: require("../../assets/images/user/user_3.jpg"),
  },
  {
    id: "2",
    name: "John Smith",
    image: null,
  },
];

// const ConsultaionScreen = ({ navigation, route }) => {
const ConsultaionScreen = (props) => {
  // console.log("naw checkout");
  // console.log(props);
  const context = useContext(AuthGlobal);

  const [orderItems, setOrderItems] = useState();
  const [name, setName] = useState("");
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState("");
  const [password1, setPassword1] = useState("");
  const [user, setUser] = useState();

  // const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [adress1Error, setAdress1Error] = useState("");
  const [adress2Error, setAdress2Error] = useState("");
  const [cityError, setCityError] = useState("");
  const [zipError, setZipError] = useState("");

  const [userProfile, setUserProfile] = useState([]);

  // console.log("testtttttttttttttttttt 55 000000000000000000 taza");
  // console.log(userProfile);
  // console.log(userProfile.name);

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

  useEffect(() => {
    setOrderItems(props.cartItems);

    if (context.stateUser.isAuthenticated) {
      setUser(context.stateUser.user.userId);
    } else {
      props.navigation.navigate("Cart");
      Toast.show({
        topOffset: 60,
        type: "error",
        // text1: "Please Login to Checkout",
        // text2: "",
      });
    }

    return () => {
      setOrderItems();
    };
  }, []);

  //   const [user, setUser] = useState();
  //   const image = route.params.image;
  //   const name = route.params.name;
  //   const experience = route.params.experience;
  //   const type = route.params.type;
  //   const slot = route.params.selectedSlot;
  //   const rating = route.params.rating;
  // console.log(" Checkout-user.susb.3.js");
  // console.log("This user is " + user);

  // console.log("orders inside ConsultationDetailScreen.js");
  const checkOut = () => {
    // alert(
    //   "'Email: youremail@gmail.com, '\nAdress1,2: 10-Tayrawa/Hawler, ' \nCity: Hawler or Duhok,'\nZip:964, ' '\nCountry:Iraq, ' ' \nare required please '"
    // );
    // for starts and contion on inputs
    // https://ninza7.medium.com/show-validation-error-message-in-the-form-using-react-native-expo-31e35e28bd0f
    var phoneValid = false;
    if (!phone) {
      setPhoneError("Phone is required kaka");
    } else {
      setPhoneError("");
      phoneValid = true;
    }

    var adress1Valid = false;
    if (!address) {
      setAdress1Error("House number is required kaka");
    } else {
      setAdress1Error("");
      adress1Valid = true;
    }

    var adress2Valid = false;
    if (!address2) {
      setAdress2Error(" Area name and/or Streen name is required kaka");
    } else {
      setAdress2Error("");
      adress2Valid = true;
    }

    var cityValid = false;
    if (!city) {
      setCityError(" City name is required kaka");
    } else {
      setCityError("");
      cityValid = true;
    }

    var zipValid = false;
    if (!zip) {
      setZipError(" Zip code is required kaka");
    } else {
      setZipError("");
      zipValid = true;
    }
    if (phoneValid && adress1Valid && adress2Valid && cityValid && zipValid) {
      // console.log("orders inside Checkouttttttttt.js");
      // console.log("orders", orderItems);
      let order = {
        city,
        country,
        dateOrdered: Date.now(),
        orderItems,
        phone,
        shippingAddress1: address,
        shippingAddress2: address2,
        status: "3",
        user: user,
        zip,
        // couponDiscountPrice,
      };

      props.navigation.navigate("PaymentMethod", { order: order });
    }
    // console.log("orders inside Checkouttttttttt.js");
    // console.log("orders", orderItems);
    // let order = {
    //   city,
    //   country,
    //   dateOrdered: Date.now(),
    //   orderItems,
    //   phone,
    //   shippingAddress1: address,
    //   shippingAddress2: address2,
    //   status: "3",
    //   user: user,
    //   zip,
    // };

    // props.navigation.navigate("Payment", { order: order });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor={Colors.primary} />

      {/* <View style={{ flex: 1, backgroundColor: "white" }}> */}
      <View>
        {header()}
        {doctorInfo()}
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {divider()}
        {phoneNumber()}
        {addressOne()}
        {addressTwo()}
        {yourCity()}
        {yourCountry()}
        {yourZip()}
        {confirmButton()}
        {/* {dateAndTime()}
      {divider()}
      {appintmentText()}
      {patients()}
      {addPatient()}
      {confirmPayButton()} */}
      </ScrollView>
    </SafeAreaView>
  );

  function doctorInfo() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: Sizes.fixPadding * 4.0,
          alignSelf: "flex-end",
          width: 100,
        }}
      >
        {/* <View style={styles.doctorImageContainerStyle}>
          <Image
            source={image}
            resizeMode="contain"
            style={{
              height: 90.0,
              width: 90.0,
              borderRadius: 45.0,
              overflow: "hidden",
            }}
          />
        </View> */}
        <View
          style={{
            justifyContent: "center",
            marginTop: Sizes.fixPadding,
            marginBottom: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: width - 140.0,
            }}
          >
            <View>
              <Text
                style={{
                  ...Fonts.primaryColor16Regular,
                  marginTop: Sizes.fixPadding - 7.0,
                }}
              >
                You are {userProfile.name}
              </Text>
            </View>
            {/* <TouchableOpacity
              activeOpacity={0.99}
                onPress={() =>
                  navigation.navigate("DoctorProfile", {
                    image,
                    name,
                    type,
                    rating,
                    experience,
                  })
                }
            >
              <Text style={{ ...Fonts.primaryColor13Bold }}>View Profile</Text>
            </TouchableOpacity> */}
          </View>
          {/* <Text
            style={{
              ...Fonts.gray17Regular,
              marginTop: Sizes.fixPadding - 7.0,
            }}
          >
            {"type"}
          </Text> */}
          {/* <Text
            style={{
              ...Fonts.primaryColor16Regular,
              marginTop: Sizes.fixPadding - 7.0,
            }}
          >
            {"experience"} Years Experience
          </Text> */}
          {/* <Text
            style={{ ...Fonts.black20Bold, marginTop: Sizes.fixPadding - 2.0 }}
          >
            $39
          </Text> */}
        </View>
      </View>
    );
  }

  function divider() {
    return (
      <View style={{ backgroundColor: Colors.lightGray, height: 0.7 }}></View>
    );
  }

  function phoneNumber() {
    return (
      <View style={styles.infoWrapStyle}>
        <TextInput
          placeholder={userProfile.phone}
          // value={userProfile.phone}
          style={{ color: "black" }}
          placeholderTextColor="green"
          onChangeText={(text) => setPhone(text)}
        />
      </View>
    );
  }

  function addressOne() {
    return (
      <View style={styles.infoWrapStyle}>
        <TextInput
          placeholder="Address"
          style={{ color: "black" }}
          placeholderTextColor="green"
          onChangeText={(text) => setAddress(text)}
        />
      </View>
    );
  }

  function addressTwo() {
    return (
      <View style={styles.infoWrapStyle}>
        <TextInput
          placeholder="Address"
          style={{ color: "black" }}
          placeholderTextColor="green"
          onChangeText={(text) => setAddress2(text)}
        />
      </View>
    );
  }

  function yourCity() {
    return (
      <View style={styles.infoWrapStyle}>
        <TextInput
          placeholder="City"
          style={{ color: "black" }}
          placeholderTextColor="green"
          onChangeText={(text) => setCity(text)}
        />
      </View>
    );
  }

  function yourCountry() {
    return (
      <View style={styles.infoWrapStyle}>
        <TextInput
          placeholder="Country"
          style={{ color: "black" }}
          placeholderTextColor="green"
          onChangeText={(text) => setCountry(text)}
        />
      </View>
    );
  }

  function yourZip() {
    return (
      <View style={styles.infoWrapStyle}>
        <TextInput
          placeholder="Zip"
          style={{ color: "black" }}
          placeholderTextColor="green"
          onChangeText={(text) => setZip(text)}
        />
      </View>
    );
  }

  function confirmButton() {
    return (
      <TouchableOpacity
        style={styles.test1}
        activeOpacity={0.99}
        // onPress={() =>
        //   // navigation.navigate("PaymentMethod", {
        //   props.navigation.navigate("PaymentMethod", {
        //     phone,
        //     name,
        //     address,
        //     address2,
        //     city,
        //     country,
        //     zip,
        //   })
        // }
        onPress={() => {
          checkOut();
        }}
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

  function dateAndTime() {
    return (
      <View style={styles.dateAndTimeContainerStyle}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome5 name="calendar-alt" size={16} color="gray" />
          <Text
            style={{
              ...Fonts.black16Regular,
              marginLeft: Sizes.fixPadding + 5.0,
            }}
          >
            28-June
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name="access-time" size={18} color="gray" />
          <Text
            style={{ ...Fonts.black16Regular, marginLeft: Sizes.fixPadding }}
          >
            {slot}
          </Text>
        </View>
      </View>
    );
  }

  function appintmentText() {
    return (
      <Text style={{ ...Fonts.black24Bold, margin: Sizes.fixPadding * 2.0 }}>
        Appointment for?
      </Text>
    );
  }

  function patients() {
    const renderItem = ({ item }) => {
      return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.patientImageContainer}>
            {item.image === null ? (
              <Ionicons name="person" size={24} color="gray" />
            ) : (
              <Image
                source={item.image}
                resizeMode="contain"
                style={{ height: 80.0, width: 80.0, borderRadius: 40.0 }}
              />
            )}
          </View>
          <Text
            style={{
              ...Fonts.black16Bold,
              marginLeft: Sizes.fixPadding,
              marginBottom: Sizes.fixPadding,
            }}
          >
            {item.name}
          </Text>
        </View>
      );
    };

    return (
      <View>
        <FlatList
          data={patientLit}
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
          Delivery Adress
        </Text>
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
    marginTop: 20,
    // flexDirection: "row",
  },
});

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};
// export default ConsultaionScreen;
export default connect(mapStateToProps)(ConsultaionScreen);
