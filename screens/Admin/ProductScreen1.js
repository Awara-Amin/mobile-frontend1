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
import { Colors } from "../../constant/styles";
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

const ProductScreen = (props) => {
  const [productList, setProductList] = useState();
  const [productFilter, setProductFilter] = useState();
  const [loading, setLoading] = useState(false);
  // const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();

  const pastDataList = [
    {
      id: "1",
      name: "Shoes",
      description: "10:30 AM",
      richDescription: "Beatriz Watson",
      image:
        "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
      brand: "Tea",
      price: "100",
      category: "10:30 AM",
      countInStock: "1",
      rating: "2 Oct 2020",
      numReview: "10:30 AM",
      isFeatured: "1",
      reviews: "2 Oct 2020",
    },
    {
      id: "2",
      name: "bags",
      description: "10:30 AM",
      richDescription: "Beatriz Watson",
      image:
        "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
      brand: "Tea2",
      price: "200",
      category: "10:30 AM",
      countInStock: "1",
      rating: "2 Oct 2020",
      numReview: "10:30 AM",
      isFeatured: "1",
      reviews: "2 Oct 2020",
    },
  ];
  useFocusEffect(
    useCallback(() => {
      // get our Token
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));

      axios.get(`${baseURL}products`).then((res) => {
        console.log("res.data aaaaaaaaaaaaaaaaaa 1");
        console.log(res.data);
        setProductList(res.data);
        setProductFilter(res.data);
        setLoading(false);
      });

      return () => {
        setProductList();
        setProductFilter();
        setLoading(true);
      };
    }, [])
  );

  const searchProduct = (text) => {
    if (text == "") {
      setProductFilter(productList);
    }
    setProductFilter(
      productList.filter((i) =>
        i.name.toLowerCase().includes(text.toLowerCase())
      )
    );
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
        {theTopButton()}
        {search()}
      </View>
      {/* <ScrollView showsHorizontalScrollIndicator={false}> */}
      {ListHeader()}
      {insider()}
      {/* </ScrollView> */}
    </SafeAreaView>
  );

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
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => props.navigation.navigate("Orders")}
            >
              <FontAwesome5 name="shopping-cart" size={24} color="red" />
              <Text style={styles.buttonText}>Orders</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttons}
              onPress={() => props.navigation.navigate("ProductForm")}
            >
              {/* <Ionicons name="plus" size={16} color="white" /> */}
              <FontAwesome5 name="plus" size={24} color="red" />
              <Text style={styles.buttonText}>Products</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttons}
              onPress={() => props.navigation.navigate("Categories")}
            >
              {/* <Ionicons name="plus" size={16} color="white" /> */}
              <FontAwesome5 name="plus" size={24} color="red" />
              <Text style={styles.buttonText}>Category</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttons}
              onPress={() => props.navigation.navigate("Users")}
            >
              {/* <Ionicons name="plus" size={16} color="white" /> */}
              <FontAwesome5 name="plus" size={24} color="red" />
              <Text style={styles.buttonText}>Users</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttons}
              // onPress={() => props.navigation.navigate("Coupons")}
              onPress={() => props.navigation.navigate("CouponMainScreen")}
            >
              {/* <Ionicons name="plus" size={16} color="white" /> */}
              <FontAwesome5 name="plus" size={24} color="red" />
              <Text style={styles.buttonText}>Coupons</Text>
            </TouchableOpacity>

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
      <View style={styles.inputview}>
        <Input
          style={styles.input}
          placeholder="Search"
          //   onFocus={openList}
          // onChangeText={(text) => searchProduct(text)}
        />
      </View>
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
                // delete={deleteProduct}
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
});

export default ProductScreen;
// export default Products;
