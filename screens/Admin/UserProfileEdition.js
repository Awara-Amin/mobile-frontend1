import React, { useContext, useState, useCallback, useEffect } from "react";
import { Checkbox } from "native-base";

import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Input,
  Text,
} from "react-native";
// import { Checkbox } from "react-native-elements";
// import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

import AuthGlobal from "../../Context/store/AuthGlobal";
import { logoutUser } from "../../Context/actions/Auth.actions";
import { useNavigation } from "@react-navigation/native";
// import Colors from "../Shared/StyledComponents/color";
// import Colors from "../../Shared/StyledComponents/color";
import Toast from "react-native-toast-message";

// import FormContainer from "../Shared/Form/FormContainer";
// import Input from "../Shared/Form/Input";
// import EasyButton from "../Shared/StyledComponents/EasyButton";
import { useFocusEffect } from "@react-navigation/native";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("screen");

const UserProfileEdition = (props) => {
  const navigation = useNavigation();
  const context = useContext(AuthGlobal);
  const [token, setToken] = useState();

  // Edition
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [item, setItem] = useState(null); // the item will come from the UserList.js inside admin after we press on each user for Edit

  useEffect(() => {
    if (!props.route.params) {
      setItem(null); // if there no change, then setItem stays as it is
    } else {
      //if we have change, then the form before update (when you open it for update) populates with these data below :)
      setItem(props.route.params.item); // itme comes from listItme.js, it means do edit for this item
      setName(props.route.params.item.name);
      // setEmail(props.route.params.item.email);
      setPhone(props.route.params.item.phone);
      setIsAdmin(props.route.params.item.isAdmin);
    }
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    return () => {
      setName();
      setEmail();
      setIsAdmin();
    };
  }, []);

  //   const addProduct = () => {
  const editeUser = () => {
    let formData = new FormData();

    formData.append("name", name);
    // formData.append("email", email);
    formData.append("phone", phone);
    formData.append("isAdmin", isAdmin);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    console.log("formData aaaaaaaaaaaaaaaaaaaa");
    console.log(formData);

    if (item !== null) {
      console.log("formData iddddddddddddddd");
      console.log(item.id);
      axios
        // .put(`${baseURL}products/${item.id}`, formData, config)
        .put(`${baseURL}users/${item.id}`, formData, config)
        .then((res) => {
          console.log(res);
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: "success",
              // text1: "User successfuly updated",
              // text2: "",
            });
            setTimeout(() => {
              // getUser();
              props.navigation.navigate("Users");
            }, 10);
          }
        })
        .catch((error) => {
          console.log(error);
          Toast.show({
            topOffset: 60,
            type: "error",
            // text1: "Something went wrong",
            // text2: "Please try again",
          });
        });
    }
  };

  // const getUser = () => {
  //   AsyncStorage.getItem("jwt")
  //     .then((res) => {
  //       setToken(res);
  //       axios
  //         .get(`${baseURL}users`, {
  //           headers: { Authorization: `Bearer ${res}` },
  //         })
  //         .then((user) => {
  //           setUsers(user.data);
  //           // setUserId(user.data.id);
  //         });
  //     })

  //     .catch((error) => console.log(error));
  // };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor={Colors.primary} />
      <View>{header()}</View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {/* {peroductImage()} */}
        {userName()}
        {userPhone()}
        {/* {userEmail()} */}
        {checkIfUserIsAdmin()}
        {submitButton()}

        {/* {productBrand()} */}
        {/* {productPrice()} */}
        {/* {productDescription()} */}
        {/* {productInStock()} */}
        {/* {productDiscount()} */}
        {/* {productCategory()} */}
        {/* {submitButton()} */}
      </ScrollView>
    </SafeAreaView>

    // <FormContainer title="Edit Users">
    //   <View style={styles.label}>
    //     <Text style={{ textDecorationLine: "underline" }}>Name</Text>
    //   </View>
    //   <Input
    //     placeholder="Name"
    //     name="name"
    //     id="name"
    //     value={name}
    //     onChangeText={(text) => setName(text)}
    //   />
    //   <View style={styles.label}>
    //     <Text style={{ textDecorationLine: "underline" }}>Eamil</Text>
    //   </View>
    //   <Input
    //     placeholder="Email"
    //     name="email"
    //     id="email"
    //     value={email}
    //     onChangeText={(text) => setEmail(text)}
    //   />
    //   <View style={styles.label}>
    //     <Text style={{ textDecorationLine: "underline" }}>isAdmin</Text>
    //   </View>
    //   <Checkbox
    //     // type="checkbox"
    //     // placeholder="isAdmin"
    //     name="isAdmin"
    //     id="isAdmin"
    //     value={isAdmin}
    //     onChange={setIsAdmin}

    //     // checked={isAdmin}
    //     // onChange={(e) => setIsAdmin(e.target.checked)}
    //   />
    //   {/* <View style={styles.label}>
    //     <Text style={{ textDecorationLine: "underline" }}>Count in Stock</Text>
    //   </View>
    //   <Input
    //     placeholder="Stock"
    //     name="stock"
    //     id="stock"
    //     value={countInStock}
    //     keyboardType={"numeric"}
    //     onChangeText={(text) => setCountInStock(text)}
    //   /> */}
    //   {/* <View style={styles.label}>
    //     <Text style={{ textDecorationLine: "underline" }}>Description</Text>
    //   </View>
    //   <Input
    //     placeholder="Description"
    //     name="description"
    //     id="description"
    //     value={description}
    //     onChangeText={(text) => setDescription(text)}
    //   /> */}
    //   {/* <Box w="3/4" maxW="300">
    //     <Select
    //       iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
    //       style={{ width: undefined }}
    //       placeholder="Select your Category"
    //       selectedValue={selectValue}
    //       placeholderStyle={{ color: "#007aff" }}
    //       placeholderIconColor="#007aff"
    //       onValueChange={(e) => [setSelectValue(e), setCategory(e)]}
    //     >
    //       {categories.map((c) => {
    //         return <Select.Item key={c.id} label={c.name} value={c.id} />;
    //       })}
    //     </Select>
    //   </Box> */}

    //   {/* {err ? <Error message={err} /> : null} */}
    //   <View style={styles.buttonContainer}>
    //     <EasyButton large primary onPress={() => addProduct()}>
    //       <Text style={styles.buttonText}>Submit Edition</Text>
    //     </EasyButton>
    //   </View>
    // </FormContainer>

    // <Box h="full" px={5}>
    //   <ScrollView showsVerticalScrollIndicator={false}>
    //     <VStack space={10} mt={5} pb={5}>
    //       <FormControl>
    //         <FormControl.Label
    //           _text={{
    //             fontSize: "12px",
    //             fontWeight: "bold",
    //           }}
    //         >
    //           Name
    //         </FormControl.Label>
    //         <Input
    //           borderWidth={0.5}
    //           bg={Colors.subBlue}
    //           _focus={{
    //             bg: Colors.white,
    //             borderColor: Colors.subBlue,
    //             borderWidth: 1,
    //           }}
    //           py={3}
    //           color={Colors.main}
    //           fontSize={16}
    //           value={userProfile ? userProfile.name : ""}
    //         />
    //         <FormControl.Label
    //           _text={{
    //             fontSize: "12px",
    //             fontWeight: "bold",
    //           }}
    //           mt={5}
    //         >
    //           Email
    //         </FormControl.Label>
    //         <Input
    //           borderWidth={0.5}
    //           bg={Colors.subBlue}
    //           _focus={{
    //             bg: Colors.white,
    //             borderColor: Colors.subBlue,
    //             borderWidth: 1,
    //           }}
    //           py={3}
    //           color={Colors.main}
    //           fontSize={16}
    //           value={userProfile ? userProfile.email : ""}
    //         />
    //         <FormControl.Label
    //           _text={{
    //             fontSize: "12px",
    //             fontWeight: "bold",
    //           }}
    //           mt={5}
    //         >
    //           Phone
    //         </FormControl.Label>
    //         <Input
    //           InputLeftElement={
    //             <Text style={styles.iconStyle} color={Colors.lightBlack}>
    //               +964
    //             </Text>
    //           }
    //           borderWidth={0.5}
    //           bg={Colors.subBlue}
    //           keyboardType={"numeric"}
    //           _focus={{
    //             bg: Colors.white,
    //             borderColor: Colors.subBlue,
    //             borderWidth: 1,
    //           }}
    //           py={3}
    //           color={Colors.main}
    //           fontSize={16}
    //           value={userProfile ? userProfile.phone : ""}
    //         />
    //       </FormControl>

    //       <Button
    //         rounded={10}
    //         bg={Colors.main}
    //         onPress={() => [
    //           AsyncStorage.removeItem("jwt"),
    //           logoutUser(context.dispatch),
    //         ]}
    //       >
    //         Update Profile
    //       </Button>
    //     </VStack>
    //     {/* <HStack mt={5} alignItems="center" justifyContent="center">
    //       <Button
    //         rounded={10}
    //         bg={Colors.red}
    //         w={100}
    //         onPress={() => [
    //           AsyncStorage.removeItem("jwt"),
    //           logoutUser(context.dispatch),
    //         ]}
    //       >
    //         Sign Out
    //       </Button>
    //     </HStack> */}
    //   </ScrollView>
    // </Box>
  );

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
          Edite User Profile
        </Text>
      </View>
    );
  }

  function userName() {
    return (
      <View style={styles.infoWrapStyle}>
        <TextInput
          placeholder="Name"
          name="name"
          id="name"
          value={name}
          style={{ color: "black" }}
          placeholderTextColor="green"
          onChangeText={(text) => setName(text)}
        />
      </View>
    );
  }

  function userPhone() {
    return (
      <View style={styles.infoWrapStyle}>
        <TextInput
          placeholder="Phone"
          name="phone"
          id="phone"
          value={phone}
          style={{ color: "black" }}
          placeholderTextColor="green"
          onChangeText={(text) => setPhone(text)}
        />
      </View>
    );
  }
  // function userEmail() {
  //   return (
  //     <View style={styles.infoWrapStyle}>
  //       <TextInput
  //         placeholder="Email"
  //         name="email"
  //         id="email"
  //         value={email}
  //         style={{ color: "black" }}
  //         placeholderTextColor="green"
  //         onChangeText={(text) => setEmail(text)}
  //       />
  //     </View>
  //   );
  // }

  function checkIfUserIsAdmin() {
    return (
      <View style={styles.checkBoxStyle}>
        <View style={styles.label}>
          <Text style={{ textDecorationLine: "underline", marginRight: 120 }}>
            isAdmin
          </Text>
        </View>
        <Checkbox
          name="isAdmin"
          id="isAdmin"
          isChecked={isAdmin}
          onChange={setIsAdmin}
        />
      </View>
    );
  }

  function submitButton() {
    return (
      <TouchableOpacity
        style={styles.test1}
        activeOpacity={0.99}
        onPress={() => editeUser()}
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
          <Text style={{ ...Fonts.primaryColorBold }}>Submit</Text>
        </View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  subContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  order: {
    marginTop: 20,
    alignItems: "center",
    marginBottom: 60,
  },
  iconStyle: {
    marginLeft: 10,
    fontSize: 16,
  },
  infoWrapStyle: {
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: "rgba(205,255,255,0.7)",
    borderRadius: 25.0,
    marginTop: 20,
    paddingVertical: Sizes.fixPadding + 3.0,
    paddingHorizontal: 45.0,
  },
  checkBoxStyle: {
    flexDirection: "row",
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: "rgba(205,255,255,0.7)",
    borderRadius: 25.0,
    marginTop: 20,
    paddingVertical: Sizes.fixPadding + 3.0,
    paddingHorizontal: 45.0,
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

export default UserProfileEdition;
