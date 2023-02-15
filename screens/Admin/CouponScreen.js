import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import { Checkbox } from "native-base";
import { Item, Select, Button, Box } from "native-base";
import SelectDropdown from "react-native-select-dropdown";
import { useNavigation } from "@react-navigation/native";

import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { Picker } from "@react-native-picker/picker";

import {
  MaterialIcons,
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const { width } = Dimensions.get("screen");
// const catgs = [
//   { id: "0", label: "Football", value: "football" },
//   { id: "1", label: "Baseball", value: "baseball" },
//   { id: "2", label: "Hockey", value: "hockey" },
// ];
const CouponScreen = (props) => {
  const navigation = useNavigation();
  console.log(props);
  console.log("coupon creationnnnnnnnn -1111111111AA-3");
  // console.log(props.route.params.item.discount);
  console.log("coupon creationnnnnnnnn -1111111111AA-2");
  //   console.log(props.route.params.item.discount);
  const [discount, setDiscount] = useState();
  const [total, setTotal] = useState();
  const [isActive, setIsActive] = useState(false);
  const [token, setToken] = useState();
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (!props.route.params) {
      setItem(null);
    } else {
      setItem(props.route.params.item);
      setDiscount(props.route.params.item.discount);
      setTotal(props.route.params.item.total);
      setIsActive(props.route.params.item.isActive);
    }

    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    return () => {
      setDiscount();
      setTotal();
      setIsActive();
    };
  }, []);

  const addCoupon = () => {
    // do validation first
    if (discount === "" || total === "") {
      setError("Please fill in the form correctly");
    } else {
      // 4-1 backend accepts formData, so we have to append the data via formData
      let formData = new FormData();

      formData.append("discount", discount);
      formData.append("total", total);
      formData.append("isActive", isActive);
      //   formData.append("name", name);
      //   formData.append("brand", brand);
      //   formData.append("price", price);
      //   formData.append("discount", discount);
      //   formData.append("description", description);
      //   formData.append("category", category);
      //   formData.append("countInStock", countInStock);
      //   formData.append("richDescription", richDescription);
      //   formData.append("rating", rating);
      //   formData.append("numReviews", numReviews);
      //   formData.append("isFeatured", isFeatured);
      // 4-2
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      // console.log(formData);

      // 4-4-2 the API call using AXIOS, first we did post then put
      if (item !== null) {
        console.log(item.id);
        // 5-2 THIS FUCKING item which comes from the listItem.js after pressing EDIT, so if this item is not null
        // API                               , data you want to upload
        axios
          //   .put(`${baseURL}products/${item.id}`, formData, config)
          .put(`${baseURL}coupons/${item.id}`, formData, config)
          .then((res) => {
            console.log(res);
            if (res.status == 200 || res.status == 201) {
              Toast.show({
                topOffset: 60,
                type: "success",
                // text1: "Product successfuly updated",
                // text2: "",
              });
              setTimeout(() => {
                // props.navigation.navigate("Products");
                props.navigation.navigate("CouponMainScreen");
              }, 500);
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
      //   else if (item !== null && images.length !== 0) {
      //     // 5-2 THIS FUCKING item which comes from the listItem.js after pressing EDIT, so if this item is not null
      //     // API                               , data you want to upload
      //     axios
      //       .put(`${baseURL}products/gallery-images/${item.id}`, formData, config)

      //       // axios
      //       //   .put(`${baseURL}products/${item.id}`, formData, config)
      //       .then((res) => {
      //         console.log("ressssssssssssssssssssssssss");
      //         console.log(res);
      //         if (res.status == 200 || res.status == 201) {
      //           Toast.show({
      //             topOffset: 60,
      //             type: "success",
      //             // text1: "Product successfuly updated",
      //             // text2: "",
      //           });
      //           setTimeout(() => {
      //             props.navigation.navigate("Products");
      //           }, 500);
      //         }
      //       })
      //       .catch((error) => {
      //         console.log(error);
      //         Toast.show({
      //           topOffset: 60,
      //           type: "error",
      //           // text1: "Something went wrong",
      //           // text2: "Please try again",
      //         });
      //       });
      //   }
      else {
        // 4-4-1
        axios
          //   .post(`${baseURL}products`, formData, config)
          .post(`${baseURL}coupons`, formData, config)
          .then((res) => {
            console.log("res of add produccccccccccccccccct");
            console.log(res);
            if (res.status == 200 || res.status == 201) {
              Toast.show({
                topOffset: 60,
                type: "success",
                // text1: "New Product added",
                // text2: "",
              });
              setTimeout(() => {
                // props.navigation.navigate("Products");
                props.navigation.navigate("CouponMainScreen");
              }, 500);
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
    }
  };
  console.log("coupon creationnnnnnnnn -1111111111AA-1");
  console.log("totalKaka");
  console.log(total);
  // console.log(item.id);

  // console.log("hi kase xare");
  // console.log(images);
  // console.log(images.length);
  // console.log(image);
  // console.log(images.length);
  // console.log(setImages);
  // const deleteFileHandler = async (fileName) => {
  //   setImages(images.filter((x) => x !== fileName));
  //   console.log("hi");
  // };
  // the UI
  // console.log("hi kase xare 22222222222222222");
  // console.log(setMainImage);
  // console.log(props.route.params.item.image);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor={Colors.primary} />
      <View>{header()}</View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {couponDiscount()}
        {couponTotal()}
        {checkIfCouponIsActive()}
        {submitButton()}
        {/* {peroductImage()} */}
        {/* {productName()} */}
        {/* {productBrand()} */}
        {/* {productPrice()} */}
        {/* {productDescription()} */}
        {/* {productInStock()} */}
        {/* {productDiscount()} */}
        {/* {productCategory()} */}
        {/* {submitButton()} */}
      </ScrollView>
    </SafeAreaView>
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
          Creating Coupon
        </Text>
      </View>
    );
  }

  //   function peroductImage() {
  //     return (
  //       <View style={styles.photoContainerStyle}>
  //         <View style={styles.imageContainer}>
  //           {image && <Image style={styles.image} source={{ uri: image }} />}
  //           <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
  //             <MaterialCommunityIcons
  //               name="camera-plus"
  //               size={24}
  //               color={Colors.primary}
  //             />
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //       // <View style={styles.imageContainer}>
  //       //   <Image
  //       //     style={styles.image}
  //       //     source={{ uri: image }}
  //       //     // source={{
  //       //     //   uri: props.route.params.item.image,
  //       //     //   // uri: "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
  //       //     // }}
  //       //     resizeMode="contain"
  //       //     alt={"image"}
  //       //   />
  //       //   <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
  //       //     <Icon style={{ color: "white" }} name="camera" />
  //       //   </TouchableOpacity>
  //       // </View>
  //     );
  //   }

  //   function productName() {
  //     return (
  //       <View style={styles.infoWrapStyle}>
  //         <TextInput
  //           placeholder="Name"
  //           name="name"
  //           id="name"
  //           value={name}
  //           style={{ color: "black" }}
  //           placeholderTextColor="green"
  //           onChangeText={(text) => setName(text)}
  //         />
  //       </View>
  //     );
  //   }

  //   function productBrand() {
  //     return (
  //       <View style={styles.infoWrapStyle}>
  //         <TextInput
  //           placeholder="Brand"
  //           name="brand"
  //           id="brand"
  //           value={brand}
  //           style={{ color: "black" }}
  //           placeholderTextColor="green"
  //           onChangeText={(text) => setBrand(text)}
  //         />
  //       </View>
  //     );
  //   }

  function couponTotal() {
    return (
      <View style={styles.infoWrapStyle}>
        <TextInput
          placeholder="Total"
          name="total"
          id="total"
          value={total}
          // value={total}
          style={{ color: "black" }}
          placeholderTextColor="black"
          onChangeText={(text) => setTotal(text)}
        />
      </View>
    );
  }
  function checkIfCouponIsActive() {
    return (
      <View style={styles.checkBoxStyle}>
        <View style={styles.label}>
          <Text style={{ textDecorationLine: "underline", marginRight: 120 }}>
            isActive
          </Text>
        </View>
        <Checkbox
          style={{ marginTop: 10 }}
          name="isActive"
          id="isActive"
          isChecked={isActive}
          onChange={setIsActive}
        />
      </View>
    );
  }
  //   function productDescription() {
  //     return (
  //       <View style={styles.infoWrapStyle}>
  //         <TextInput
  //           placeholder="Description"
  //           name="description"
  //           id="description"
  //           value={description}
  //           style={{ color: "black" }}
  //           placeholderTextColor="green"
  //           onChangeText={(text) => setDescription(text)}
  //         />
  //       </View>
  //     );
  //   }

  //   function productInStock() {
  //     return (
  //       <View style={styles.infoWrapStyle}>
  //         <TextInput
  //           placeholder="Numbers in stock"
  //           name="stock"
  //           id="stock"
  //           value={countInStock}
  //           style={{ color: "black" }}
  //           placeholderTextColor="green"
  //           onChangeText={(text) => setCountInStock(text)}
  //         />
  //       </View>
  //     );
  //   }

  function couponDiscount() {
    return (
      <View style={styles.infoWrapStyle}>
        <TextInput
          placeholder="Discount"
          name="discount"
          id="discount"
          value={discount}
          style={{ color: "black" }}
          placeholderTextColor="black"
          onChangeText={(text) => setDiscount(text)}
        />
      </View>
    );
  }

  function productCategory() {
    return (
      <View style={styles.infoWrapStyle}>
        <Text
          style={{
            ...Fonts.black16Regular,
            marginHorizontal: 2,
            marginTop: 2,
          }}
        >
          Category
        </Text>
        <View style={styles.selectPickerStyle}>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue, itemIndex) => {
              setCategory(itemValue);
              console.log(itemValue);
            }}
          >
            {categories.map((item, index) => {
              return (
                <Picker.Item label={item.name} value={item.id} key={index} />
              );
            })}
            {/* {categories.map((c) => {
            <Picker.Item key={c.id} label={c.name} value={c.id} />
          })} */}
          </Picker>
        </View>
        {/* <SelectDropdown
          data={catgs}
          onSelect={(selectValue, index) => {
            console.log(selectValue, index);
          }}
          defaultButtonText={"Select Category"}
          buttonTextAfterSelection={(selectValue, index) => {
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectValue.label;
          }}
          rowTextForSelection={(item, index) => {
            return item.label;
          }}
          onValueChange={(e) => [setSelectValue(e), setCategory(e)]}
        ></SelectDropdown> */}
      </View>
    );
  }

  function submitButton() {
    return (
      <TouchableOpacity
        style={styles.test1}
        activeOpacity={0.99}
        onPress={() => addCoupon()}
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
          <Text style={{ ...Fonts.primaryColorBold }}>Save</Text>
        </View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  label: {
    width: "80%",
    marginTop: 10,
  },
  buttonContainer: {
    width: "80%",
    marginBottom: 80,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  photoContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding * 3.0,
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderStyle: "solid",
    borderWidth: 8,
    padding: 0,
    justifyContent: "center",
    borderRadius: 100,
    borderColor: "#E0E0E0",
    elevation: 10,
    alignContent: "center",
    // marginTop: 20,
    // marginLeft: 90,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  imagePicker: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "red",
    padding: 8,
    borderRadius: 100,
    elevation: 20,
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
  selectPickerStyle: {
    backgroundColor: "white",
    borderRadius: 15.0,
    marginTop: Sizes.fixPadding - 2.0,
    // paddingVertical: Sizes.fixPadding + 1.0,
    paddingHorizontal: 10.0,
    marginBottom: Sizes.fixPadding + 5.0,
    // borderWidth: 1,
    borderColor: Colors.primary,
    elevation: 3.0,
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
});

// export default ProductForm;
export default CouponScreen;
