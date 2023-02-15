import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Button,
  List,
  Box,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { Input } from "native-base";

import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native";
// import ListItem from "./ListItem";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import EasyButton from "../Shared/StyledComponents/EasyButton";
import ListItem from "./ListItem";
import { Pressable } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";

var { height, width } = Dimensions.get("window");

function ListHeader() {
  return (
    <View elevation={1} style={styles.listHeader}>
      {/* <View style={styles.headerItem}></View> */}

      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Image</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Brand</Text>
      </View>

      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Name</Text>
      </View>

      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600", width: 50 }}>Stock</Text>
      </View>

      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Price</Text>
      </View>
    </View>
  );
}

const ProductMainScreen = (props) => {
  const [productList, setProductList] = useState([]);
  const [productFilter, setProductFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const [focus, setFocus] = useState();
  const [active, setActive] = useState();

  //   const pastDataList = [
  //     {
  //       id: "1",
  //       name: "Shoes",
  //       description: "10:30 AM",
  //       richDescription: "Beatriz Watson",
  //       image:
  //         "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
  //       brand: "Tea",
  //       price: "100",
  //       category: "10:30 AM",
  //       countInStock: "1",
  //       rating: "2 Oct 2020",
  //       numReview: "10:30 AM",
  //       isFeatured: "1",
  //       reviews: "2 Oct 2020",
  //     },
  //     {
  //       id: "2",
  //       name: "bags",
  //       description: "10:30 AM",
  //       richDescription: "Beatriz Watson",
  //       image:
  //         "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
  //       brand: "Tea2",
  //       price: "200",
  //       category: "10:30 AM",
  //       countInStock: "1",
  //       rating: "2 Oct 2020",
  //       numReview: "10:30 AM",
  //       isFeatured: "1",
  //       reviews: "2 Oct 2020",
  //     },
  //   ];
  useFocusEffect(
    useCallback(() => {
      //   setFocus(false);
      setFocus(true);
      setActive(-1);
      // get our Token
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));

      axios.get(`${baseURL}products`).then((res) => {
        console.log("res.data aaaaaaaaaaaaaaaaaa 1");
        console.log(res);
        console.log(res.data);
        setProductList(res.data);
        setProductFilter(res.data);
        setLoading(false);
      });

      return () => {
        setProductList([]);
        setProductFilter([]);
        setLoading(true);
        setFocus();
        setActive();
      };
    }, [])
  );

  console.log("res.data aaaaaaaaaaaaaaaaaa 2");
  console.log(productList);
  console.log(productList.length);
  console.log(productList.brand);

  //   const searchProduct = (text) => {
  //     if (text == "") {
  //       setProductFilter(productList);
  //     }
  //     setProductFilter(
  //       productList.filter((i) =>
  //         i.name.toLowerCase().includes(text.toLowerCase())
  //       )
  //     );
  //   };
  const searchProduct = (text) => {
    setProductFilter(
      productList.filter((i) =>
        i.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const openList = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };

  const deleteProduct = (id) => {
    axios
      .delete(`${baseURL}products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const products = productFilter.filter((item) => item.id !== id);
        setProductFilter(products);
      })
      .catch((error) => console.log(error));
  };

  // the Ui
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor={Colors.primary} />
      <View>
        {header()}
        {/* {theTopButton()} */}
        {search()}
        {focus == true ? insider() : null}
        {/* {insider()} */}
      </View>
      {addProductButton()}
      {/* <ScrollView showsHorizontalScrollIndicator={false}>
        {allProoductsContent()}
        {ListHeader()}
      </ScrollView> */}
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
          Back to Dashboard
        </Text>
      </View>
    );
  }

  function addProductButton() {
    return (
      <View style={styles.payButtonContainerStyle}>
        <TouchableOpacity
          // onPress={() => setModalVisible(true)}
          // activeOpacity={0.9}
          onPress={() => props.navigation.navigate("ProductForm")}

          //   onPress={() =>
          //     props.navigation.navigate("OrderDetail", {
          //       order: order,
          //     })
          //   }
        >
          <View
            style={styles.payButtonStyle}
            onPress={() => props.navigation.navigate("ProductForm")}

            // onPress={() =>
            //   props.navigation.navigate("OrderDetail", {
            //     order: order,
            //   })
            // }
          >
            <Text style={{ ...Fonts.white20Regular }}> Add Products</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  function allProoductsContent() {
    return (
      <View style={styles.labAndCheckUpContainer}>
        {productFilter.map((item, index) => (
          <View key={index}>
            <Image
              style={{
                height: 199.0,
                width: width - 200.0,
                borderTopLeftRadius: Sizes.fixPadding + 5.0,
                borderBottomLeftRadius: Sizes.fixPadding + 5.0,
                overflow: "hidden",
              }}
              resizeMode="cover"
              source={{
                uri: item.image
                  ? item.image
                  : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
              }}
              //   resizeMode="contain"
              //   style={styles.image}
              //   alt={props.name}
              //   source={{ uri: productFilter.image }}
              // source={props.image}
            />
            <View style={styles.labInformationContainer}>
              {/* <Text numberOfLines={3} style={{ ...Fonts.black16Bold }}>
            {props.name.length > 15
              ? props.name.substring(0, 23 - 3) + "..."
              : props.name}
          </Text> */}
              <Text
                numberOfLines={2}
                style={{ ...Fonts.grayBold, marginTop: Sizes.fixPadding - 5.0 }}
              >
                <Text style={styles.price}>{item.countInStock}</Text>
              </Text>
              <View style={styles.callNowButtonStyle}>
                <Text style={{ ...Fonts.primaryColorBold }}>{item.brand}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  marginLeft: 15,
                  marginTop: 15,
                }}
              >
                <View style={styles.favoritecircle}>
                  <TouchableOpacity
                  // onPress={() => {
                  //   // props.addItemToFav(props, qty);
                  //   props.addItemToFav(props, qty);
                  //   // Toast.show({
                  //   //   topOffset: 60,
                  //   //   type: "success",
                  //   //   text1: `${item.name} added to Cart`,
                  //   //   text2: "Go to your cart to complete order",
                  //   // });
                  // }}
                  >
                    {/* <Ionicons name="md-heart-outline" size={25} color="black" /> */}
                    {/* <Ionicons name="md-heart-sharp" size={24} color="black" /> */}
                  </TouchableOpacity>
                </View>
                {/* {props.countInStock > 0 ? (
              <View>
                <TouchableOpacity
                  style={styles.addcircle}
                  onPress={() => {
                    props.addItemToCart(props, qty);
                    // Toast.show({
                    //   topOffset: 60,
                    //   type: "success",
                    //   text1: `${item.name} added to Cart`,
                    //   text2: "Go to your cart to complete order",
                    // });
                  }}
                >
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
          </View>
        ))}
        {/* <View></View> */}
      </View>
    );
  }

  function theTopButton() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <ScrollView
            rounded={10}
            bg={Colors.main}
            horizontal={true}
            showsHorizontalScrollIndicator={true}
          >
            {/* <TouchableOpacity
              style={styles.buttons}
              onPress={() => props.navigation.navigate("Orders")}
            >
              <FontAwesome5 name="shopping-cart" size={24} color="red" />
              <Text style={styles.buttonText}>Orders</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              style={styles.buttons}
              onPress={() => props.navigation.navigate("ProductForm")}
            >
              {/* <Ionicons name="plus" size={16} color="white" /> */}
              {/* <FontAwesome5 name="plus" size={24} color="red" /> */}
              <Text style={styles.buttonText}>Products</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={styles.buttons}
              onPress={() => props.navigation.navigate("Categories")}
            >
              <FontAwesome5 name="plus" size={24} color="red" />
              <Text style={styles.buttonText}>Category</Text>
            </TouchableOpacity> */}

            {/* <TouchableOpacity
              style={styles.buttons}
              onPress={() => props.navigation.navigate("Users")}
            >
              <FontAwesome5 name="plus" size={24} color="red" />
              <Text style={styles.buttonText}>Users</Text>
            </TouchableOpacity> */}

            {/* <TouchableOpacity
              style={styles.buttons}
              onPress={() => props.navigation.navigate("CouponMainScreen")}
            >
              <FontAwesome5 name="plus" size={24} color="red" />
              <Text style={styles.buttonText}>Coupons</Text>
            </TouchableOpacity> */}

            {/* <EasyButton
          secondary
          medium
          onPress={() => props.navigation.navigate("ProductForm")}
        >
          <Icon name="plus" size={16} color="white" />
          <Text style={styles.buttonText}>Products</Text>
        </EasyButton> */}

            {/* <EasyButton
          secondary
          medium
          onPress={() => props.navigation.navigate("Categories")}
        >
          <Icon name="plus" size={16} color="white" />
          <Text style={styles.buttonText}>Categories</Text>
        </EasyButton> */}

            {/* <EasyButton
          secondary
          medium
          onPress={() => props.navigation.navigate("Users")}
        >
          <Icon name="user" size={16} color="white" />
          <Text style={styles.buttonText}>Users</Text>
        </EasyButton> */}
          </ScrollView>
        </View>

        {/* <View style={styles.inputview}>
          <Input
            style={styles.input}
            placeholder="Search"
            //   onFocus={openList}
            // onChangeText={(text) => searchProduct(text)}
          />
        </View> */}

        {/* <View style={styles.spinner}>
          {loading ? (
            // the spiner
            <View>
              <ActivityIndicator size="large" color="red" />
            </View>
          ) : (
            <FlatList
              // data={productFilter}
              data={pastDataList}
              ListHeaderComponent={ListHeader}
              renderItem={({ item, index }) => (
                // <Text>{item.name}</Text>
                <ListItem
                  {...item}
                  navigation={props.navigation}
                  index={index}
                  // delete={deleteProduct}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          )}
        </View> */}
      </View>
      // <TouchableOpacity
      //   activeOpacity={0.99}
      //   style={styles.confirmAndPayButtonStyle}
      //   onPress={() => navigation.navigate("PaymentMethod")}
      // >
      //   <View style={styles.confirmButtonStyle}>
      //     <Text style={{ ...Fonts.white20Regular }}>Confirm & Pay</Text>
      //   </View>
      // </TouchableOpacity>
    );
  }

  function search() {
    return (
      <View style={styles.searchContainerStyle}>
        {focus == true ? (
          <Ionicons name="close" size={24} color="red" onPress={onBlur} />
        ) : null}
        <Ionicons name="search" size={24} color="gray" onPress={openList} />
        {/* <Ionicons name="close" size={24} color="red" /> */}
        <View style={{ flex: 1 }}>
          <TextInput
            type="search"
            placeholder="Search for doctors & labs"
            style={{ ...Fonts.gray17Regular, marginLeft: Sizes.fixPadding }}
            onFocus={openList}
            onChangeText={(text) => searchProduct(text)}
          />
        </View>
      </View>
      //   <View style={styles.inputview}>
      //     <Input
      //       style={styles.input}
      //       placeholder="Search"
      //       onFocus={openList}
      //       onChangeText={(text) => searchProduct(text)}
      //     />
      //   </View>
    );
  }

  function insider() {
    return (
      <View style={styles.spinner}>
        {loading ? (
          // the spiner
          <View>
            <ActivityIndicator size="large" color="red" />
          </View>
        ) : (
          <FlatList
            data={productFilter}
            // data={pastDataList}
            // ListHeaderComponent={ListHeader}
            renderItem={({ item, index }) => (
              // <Text>{item.name}</Text>
              <ListItem
                {...item}
                navigation={props.navigation}
                index={index}
                delete={deleteProduct}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "gainsboro",
  },
  headerItem: {
    margin: 3,
    width: width / 6,
  },
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    marginBottom: 10,
    backgroundColor: "green",
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center",
    flexDirection: "row",
  },
  buttonText: {
    margin: 4,
    color: "black",
  },

  inputview: {
    height: 60,
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#E7EAED",
    padding: 0,
    marginBottom: 10,
  },

  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#fff",
    margin: 10,
    borderColor: "#ccc",
    borderWidth: 0,
    borderRadius: 15,
    fontSize: 16,
  },
  buttons: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "gainsboro",
    borderRadius: 15,
    margin: 4,
  },
  labAndCheckUpContainer: {
    flexDirection: "row",
    // height: 200.0,
    width: width,
    alignSelf: "center",
    borderRadius: 20,
    backgroundColor: "white",
    borderColor: Colors.lightGray,
    borderWidth: 1.0,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 4.0,
    marginBottom: 20.0,
    overflow: "hidden",
  },
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: '#000000',
    // marginBottom: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 3.0,
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
  searchContainerStyle: {
    backgroundColor: "#F5F5F5",
    borderRadius: 30.0,
    height: 45.0,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: Sizes.fixPadding + 5.0,
    marginBottom: 10,
  },
});

export default ProductMainScreen;
// export default Products;
