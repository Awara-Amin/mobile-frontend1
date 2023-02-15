import React, { useRef, useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  Image,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Button,
} from "react-native";
import {
  Select,
  Heading,
  Box,
  VStack,
  CheckIcon,
  TextArea,
  FormControl,
  Badge,
} from "native-base";
// import IconBadge from "react-native-icon-badge";
// import { Badge } from "native-base";
import Toast from "react-native-toast-message";
import NumericInput from "react-native-numeric-input";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import MapView, { Marker } from "react-native-maps";
import {
  Feather,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../assets/Redux/Actions/cartActions";
import AuthGlobal from "../../Context/store/AuthGlobal";
import baseURL from "../../assets/common/baseUrl";
import Rating from "../../components/Rating";

import { productDb } from "../Home/HomeScreen";
import { UserData } from "../../Context/data/userData";
export const userDb = new UserData();

import io from "socket.io-client";
const socket = io.connect("http://localhost:3000");

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("screen");

// const ProductDetails = ({ navigation, route }) => {
const ProductDetails = (props) => {
  const context = useContext(AuthGlobal);
  // console.log("props 31");
  // console.log(context);
  // console.log(route.params.item);
  // console.log("props 21");
  // console.log(props);
  // console.log("props 22");
  // console.log(props.route.params);
  const [propedItem, setPropedItem] = useState(props.route.params.item);
  // console.log("props 23 23");
  // console.log(propedItem);
  // console.log(propedItem.id);
  // console.log(propedItem._id);
  // console.log(propedItem.reviews.length);

  // bq
  // getTotal(); //make it active
  // console.log("props 24");
  // console.log(props.cartItems);
  // console.log(props.cartItems.cartItems.length);
  // const image = route.params.image;
  // const name = route.params.name;
  // const description = route.params.description;
  // const countInStock = route.params.countInStock;
  // const price = route.params.price;
  const [qty, setQty] = useState(1);
  const [totalPrice, setTotalPrice] = useState();
  // let totalPrice = price;

  const [userProfile, setUserProfile] = useState();
  const [token, setToken] = useState();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [noReviews, setNoReviews] = useState("");

  //
  // const [socketItem, setSocketItem] = useState(props.route.params.item);
  // const [sokreviews, setSokReviews] = useState(props.route.params.item);
  const [sokReviews, setSokReviews] = useState(props.route.params.item.reviews);

  const methods = [
    { name: "1", value: 1 },
    { name: "2", value: 2 },
    { name: "3", value: 3 },
    { name: "4", value: 4 },
    { name: "5", value: 5 },
  ];

  useEffect(() => {
    let url = `${baseURL}users/${context.stateUser.user.userId}`;
    let headerObj;
    AsyncStorage.getItem("jwt").then((res) => {
      headerObj = { headers: { Authorization: `Bearer ${res}` } };
      getUserById(url, headerObj);
    });
    // through this we get the user
    // AsyncStorage.getItem("jwt")
    //   .then((res) => {
    //     setToken(res);

    //     axios
    //       .get(`${baseURL}users/${context.stateUser.user.userId}`, {
    //         headers: { Authorization: `Bearer ${token}` },
    //       })
    //       .then((user) => setUserProfile(user.data.name));
    //   })
    //   .catch((error) => console.log(error));
  }, []);

  const getUserById = async (url, headerObj) => {
    try {
      const data = await userDb.fetchUserData(url, headerObj);
      // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk-11000");
      // console.log(data);
      setUserProfile(data.name);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log("UserProfile 11111111111111111 taza");
  // console.log(userProfile);
  // console.log("UserProfile 22222222222222222 taza");
  // console.log(name);

  useEffect(() => {
    setComment(props.route.params.item.reviews.comment);
    setName(userProfile);
  }, [userProfile]);

  useEffect(() => {
    setTotalPrice(qty * propedItem.price);
  }, [totalPrice]);

  const handleSubmit = () => {
    // e.preventDefault();
    if (comment == "" || rating == "") {
      // setError("Please fill in the form correctly");
      alert("Please fill in the form correctly");
    }

    // let data = new FormData();
    let formData = new FormData();
    formData.append("name", name);
    formData.append("rating", rating);
    formData.append("comment", comment);
    // console.log("......................data");
    // console.log(serializeJSON({ formData }));
    // console.log(formData);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    if (propedItem !== null) {
      // console.log("......................data 2");
      axios
        .put(`${baseURL}products/${propedItem.id}/reviews`, formData, config)
        .then((res) => {
          // console.log("......................data 3");
          // console.log(res);

          if (res.status === 201) {
            Toast.show({
              topOffset: 60,
              type: "success",
              // text1: "Product successfuly updated",
              // text2: "",
            });
            // getComments();
            setTimeout(() => {
              // getComments();
              // props.navigation.navigate("Products");
            }, 1000);
          } else if (res.status == 401) {
            alert(res.status.message);
            setTimeout(() => {
              // props.navigation.navigate("Products");
              props.navigation.navigate("ProductDetails");
            }, 500);
          }
        })

        .catch((error) => {
          alert("you have comment already shex");
          console.log(error);
          // Toast.show({
          //   topOffset: 60,
          //   type: "error",
          //   // text1: "Something went wrong",
          //   // text2: "Please try again",
          // });
        });
    }
  };

  // useEffect(() => {
  //   socket.on("pong2", (data) => {
  //     // let item = db.get(data.updatedProduct._id);
  //     console.log("test-1TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT-9000");
  //     console.log(data); //for this item change the countInStock
  //     console.log(data.updatedProduct.reviews);
  //     setSocketItem(data.updatedProduct.reviews);
  //     setPropedItem(data.updatedProduct);
  //   });

  //   // axios
  //   //   .get(`${baseURL}categories`)
  //   //   .then((res) => {
  //   //     setCategories(res.data);
  //   //   })

  //   //   .catch((error) => {
  //   //     console.log("Api call has error");
  //   //   });

  //   // return () => {
  //   //   setProducts([]);
  //   //   setFocus();
  //   //   setActive();
  //   //   setInitialState();
  //   // };
  // }, []);

  // console.log("test-1TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT-1100011");
  // console.log(socketItem);
  // console.log(sokreviews);

  useEffect(() => {
    getComments();
  }, [sokReviews]);

  // 1
  const getComments = () => {
    let currentProductreview = productDb.getProduct(propedItem.id);
    // console.log("test-1TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT-1100033");
    // console.log(currentProductreview);
    if (currentProductreview) {
      let reviews = currentProductreview.reviews;
      // console.log("test-1TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT-1100055");
      // console.log(reviews);
      setSokReviews(reviews);

      // setNoReviews(currentProductreview.numReviews);
    }
    // console.log("test-1TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT-1100066");
    // console.log(sokReviews);
  };

  // console.log("test-1TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT-2200066");
  // console.log(noReviews);

  socket.off("addProductReview").on("addProductReview", (data) => {
    // console.log("test-1TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT-1100033");
    // console.log(data);
    let currentProduct = productDb.getProduct(data.productId); // productId this id is the same with the one is sent to backend
    // let currentItem = db.get(data);
    // console.log("test-1TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT-1100022");
    // console.log(currentItem);

    // let pushReview = [];
    // pushReview.push(data.review);
    currentProduct.reviews.push(data.review);
    productDb.setProduct(currentProduct.id, currentProduct);
    setSokReviews(currentProduct.reviews);
    setNoReviews(currentProduct.reviews.length);
    setComment("");
    setRating("");
    // db.set(currentProduct.id, {
    //   currentProduct,
    //   // ...currentItem,
    //   // reviews: pushReview,
    // });
    // setSokReviews(db.get(data.productId).reviews); // propedItem.id = productId , these two sre the same
    // setSokReviews(db.get(currentItem.reviews)); // propedItem.id = productId , these two sre the same
  });
  // console.log("test-1TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT-1100044");
  // console.log(sokReviews);

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          ...styles.facilitiesContainerStyle,
          marginTop: item.id == "1" ? Sizes.fixPadding + 5.0 : 0.0,
        }}
      >
        <Feather name="check" size={17} color="black" />
        <Text style={{ ...Fonts.blackRegular, marginLeft: Sizes.fixPadding }}>
          {item.facility}{" "}
        </Text>
      </View>
    );
  };

  const totalAmount = () => {
    totalAmount = qty * propedItem.price;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor={Colors.primary} translucent={false} />
      {header()}
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {productInfo()}
        {reviewInfo()}
        {divider()}
        {/* <View>{reviews()}</View> */}
      </ScrollView>
      {/* <FlatList
        ListHeaderComponent={
          <>
            
            {divider()}
            {titleInfo({ title: 'Address' })}
            {addressInfo()}
            {mapInfo()}
            {titleInfo({ title: 'Facilities' })}
          </>
        }
        data={facilitiesList}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Sizes.fixPadding * 9.0,
          borderTopLeftRadius: Sizes.fixPadding + 5.0,
    borderTopRightRadius: Sizes.fixPadding + 5.0,
    backgroundColor:'pink'
        }}
      /> */}
      {/* {reviews()} */}
      {addToCartButton()}
    </SafeAreaView>
  );

  function productInfo() {
    return (
      <View
      // style={{
      //   flex: 1,
      // }}
      >
        <View
          style={{
            alignItems: "center",
            borderRadius: Sizes.fixPadding + 5.0,
          }}
        >
          <Image
            source={{ uri: propedItem.image }}
            // source={propedItem.image}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={styles.productInfo}>
          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // marginLeft: 35,
              // marginTop: 10,
            }}
          > */}
          <Text style={{ ...Fonts.brownColor20Bold }}>
            Name: {propedItem.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: Sizes.fixPadding - 5.0,
            }}
          >
            <Rating value={propedItem.rating}></Rating>
            {/* <FontAwesome
              name="star"
              size={18}
              color="#F3C844"
              style={{ marginRight: Sizes.fixPadding - 7.0 }}
            /> */}
            {/* <FontAwesome
              name="star"
              size={18}
              color="#F3C844"
              style={{ marginRight: Sizes.fixPadding - 7.0 }}
            />
            <FontAwesome
              name="star"
              size={18}
              color="#F3C844"
              style={{ marginRight: Sizes.fixPadding - 7.0 }}
            />
            <FontAwesome
              name="star"
              size={18}
              color="#F3C844"
              style={{ marginRight: Sizes.fixPadding - 7.0 }}
            />
            <FontAwesome
              name="star"
              size={18}
              color="#F3C844"
              style={{ marginRight: Sizes.fixPadding - 7.0 }}
            /> */}
            {/* <Text style={{ ...Fonts.brownColor16Bold }}>6.5</Text> */}
            <Text style={{ ...Fonts.brownColor16Bold, padding: 5 }}>
              {Math.trunc(propedItem.rating)}
            </Text>
          </View>
          <View>
            <TouchableOpacity style={styles.favoritecircle}>
              <Ionicons name="md-heart-outline" size={28} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.favoritecircle}
              onPress={() =>
                // props.navigation.navigate("Scedule", {
                props.navigation.navigate(
                  "TabBarScreen"
                  //   {
                  //   cartItems: props,
                  // }
                )
              }
            >
              {/*  bq */}
              {/* {props.cartItems.length ? ( */}
              {props.cartItems.cartItems.length ? (
                <Badge
                  style={styles.badge}
                  rounded="full"
                  h={6}
                  paddingRight={4}
                  marginBottom={4}
                >
                  {/* <Text style={styles.text}>{props.cartItems.length}</Text> */}
                  <Text style={styles.text}>
                    {props.cartItems.cartItems.length}
                  </Text>
                </Badge>
              ) : null}
              <Text>
                <MaterialCommunityIcons
                  // style={{ marginLeft: 10 }}
                  name="cart-plus"
                  size={24}
                  color="white"
                />
                {/* {props.cartItems.map((x) => {
                  return x.quantity;
                })} */}
              </Text>
              {/* <Ionicons name="md-heart-sharp" size={24} color="black" /> */}
              {/* </View> */}
            </TouchableOpacity>
          </View>

          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignSelf: "space-around",
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  marginVertical: Sizes.fixPadding + 10.0,
                  marginHorizontal: Sizes.fixPadding + 5.0,
                }}
              >
                <Text
                  style={{
                    ...Fonts.pinkColor20Bold,
                  }}
                >
                  Price of each: $ {propedItem.price}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: Sizes.fixPadding + 10.0,
                  marginHorizontal: Sizes.fixPadding + 5.0,
                  justifyContent: "center",
                  borderRadius: 50,
                  borderColor: "black",
                }}
              >
                {propedItem.countInStock > 0 && (
                  <NumericInput
                    value={qty}
                    totalWidth={140}
                    totalHeight={40}
                    iconSize={60}
                    step={1}
                    maxValue={propedItem.countInStock}
                    minValue={1}
                    editable={false}
                    valueType="integer"
                    borderColor={Colors.lightGray}
                    rounded
                    textColor="black"
                    iconStyle={{ color: "white" }}
                    rightButtonBackgroundColor={Colors.primary}
                    leftButtonBackgroundColor={Colors.primary}
                    onChange={(value) => {
                      setQty(value);
                      setTotalPrice(value * propedItem.price);
                    }}
                  />
                )}
              </View>
            </View>

            <Text style={{ ...Fonts.brownColor16Regular }}>
              Availablity: {propedItem.countInStock}
            </Text>
            <Text
              style={{
                ...Fonts.black16Bold,
                marginTop: Sizes.fixPadding + 5.0,
                textAlign: "justify",
              }}
            >
              Description
            </Text>
            <Text
              numberOfLines={6}
              style={{
                ...Fonts.grayRegular,
                marginVertical: Sizes.fixPadding - 5.0,
                textAlign: "justify",
              }}
            >
              {propedItem.description}
            </Text>
          </View>
          {/* {reviews()} */}
        </View>
      </View>
    );
  }

  /////////////
  function reviewInfo() {
    return (
      <View
        style={{
          // flex: 1,
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            ...Fonts.black16Bold,
            marginTop: Sizes.fixPadding + 5.0,
            marginBottom: Sizes.fixPadding + 1.0,
            textAlign: "justify",
          }}
        >
          Reviews
        </Text>
        {propedItem.reviews.length === 0 ? (
          <View>
            <Text bg={Colors.deepGray} rounded={5} p={4} bold>
              No Reviews
            </Text>
          </View>
        ) : (
          <View p={1} bg={Colors.deepGray} mt={5} rounded={5}>
            {/* {propedItem.reviews.map((x, index) => { */}
            {/* {sokreviews.length !== 0
              ?  */}
            {
              sokReviews.map((x, index) => {
                return (
                  <View key={index}>
                    <Text fontSize="15" color={Colors.black}>
                      <Text>{x.name}</Text>
                    </Text>
                    {/* <Text italic>{x.rating}</Text> */}
                    <Rating value={x.rating}></Rating>
                    <Text my={1}>{x.createdAt}</Text>
                    <View style={styles.labAndCheckUpContainer}>
                      <Text
                        numberOfLines={6}
                        style={{
                          ...Fonts.grayRegular,
                          marginVertical: Sizes.fixPadding - 5.0,
                          textAlign: "justify",
                        }}
                      >
                        {x.comment} Your burden may literally treble if you
                        design and maintain apps for iOS, Android,
                      </Text>
                    </View>
                  </View>
                );
              })
              // : null}
            }
          </View>
        )}
        {/* <View style={styles.productInfo}>
          <Text style={{ ...Fonts.brownColor20Bold }}>{propedItem.name}</Text>
          <View>
            <TouchableOpacity style={styles.favoritecircle}>
              <Ionicons name="md-heart-outline" size={28} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.favoritecircle}
              onPress={() =>
                // props.navigation.navigate("Scedule", {
                props.navigation.navigate("TabBarScreen")
              }
            >
              {props.cartItems.cartItems.length ? (
                <Badge
                  style={styles.badge}
                  rounded="full"
                  h={6}
                  paddingRight={4}
                  marginBottom={4}
                >
                  <Text style={styles.text}>
                    {props.cartItems.cartItems.length}
                  </Text>
                </Badge>
              ) : null}
              <Text>
                <MaterialCommunityIcons
                  name="cart-plus"
                  size={24}
                  color="white"
                />
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignSelf: "space-around",
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  marginVertical: Sizes.fixPadding + 10.0,
                  marginHorizontal: Sizes.fixPadding + 5.0,
                }}
              >
                <Text
                  style={{
                    ...Fonts.pinkColor20Bold,
                  }}
                >
                  $ {propedItem.price}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: Sizes.fixPadding + 10.0,
                  marginHorizontal: Sizes.fixPadding + 5.0,
                  justifyContent: "center",
                  borderRadius: 50,
                  borderColor: "black",
                }}
              >
                {propedItem.countInStock > 0 && (
                  <NumericInput
                    value={qty}
                    totalWidth={140}
                    totalHeight={40}
                    iconSize={60}
                    step={1}
                    maxValue={propedItem.countInStock}
                    minValue={1}
                    editable={false}
                    valueType="integer"
                    borderColor={Colors.lightGray}
                    rounded
                    textColor="black"
                    iconStyle={{ color: "white" }}
                    rightButtonBackgroundColor={Colors.primary}
                    leftButtonBackgroundColor={Colors.primary}
                    onChange={(value) => {
                      setQty(value);
                      setTotalPrice(value * propedItem.price);
                    }}
                  />
                )}
              </View>
            </View>

            <Text style={{ ...Fonts.brownColor16Regular }}>
              Availablity: {propedItem.countInStock}
            </Text>
            <Text
              style={{
                ...Fonts.black16Bold,
                marginTop: Sizes.fixPadding + 5.0,
                textAlign: "justify",
              }}
            >
              Description
            </Text>
            <Text
              numberOfLines={6}
              style={{
                ...Fonts.grayRegular,
                marginVertical: Sizes.fixPadding - 5.0,
                textAlign: "justify",
              }}
            >
              {propedItem.description}
            </Text>
          </View>
          {reviews()}
        </View> */}
      </View>
    );
  }
  ////////////////////////
  function divider() {
    return (
      <View style={{ padding: 20 }}>
        <VStack space={6} alignItems="center" justifyContent="center">
          {/* {context.stateUser.isAuthenticated ? ( */}
          <>
            <View mt={2}>
              <Heading fontSize={15} bold>
                REVIEWS THIS PRODUCT
              </Heading>
            </View>

            <FormControl>
              <FormControl.Label
                _text={{
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                Rating
              </FormControl.Label>
              {/* <Box w="3/4" maxW="300"> */}
              <Select
                bg={Colors.subGreen}
                // iosIcon={<Icon name="arrow-down" color={Colors.black} />}
                selectedValue={rating}
                placeholder="Choose Rate"
                borderWidth={1}
                py={4}
                round={5}
                borderColor="black"
                placeholderIconColor="#007aff"
                onValueChange={(e) => setRating(e)}
                h="12"
                _selectedItem={{
                  bg: Colors.subGreen,
                  endIcon: <CheckIcon size={3} />,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {methods.map((c, index) => {
                  return (
                    <Select.Item
                      name="rating"
                      key={index}
                      label={c.name}
                      value={c.name}
                      // label={c.value}
                      // value={c.name}
                    />
                  );
                })}
              </Select>
            </FormControl>

            <FormControl>
              <FormControl.Label
                _text={{
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                Comment
              </FormControl.Label>
              <TextArea
                h={24}
                w="full"
                borderColor="black"
                borderWidth={1}
                placeholder="This Product id good..."
                // borderWidth={0.5}
                bg={Colors.white}
                value={comment}
                py={2}
                _focus={{
                  bg: Colors.white,
                }}
                onChangeText={(text) => setComment(text)}
              />
            </FormControl>
            <View style={styles.buttonGroup}>
              <Button
                color="red"
                fontWeight="bold"
                title="Submit"
                onPress={() => handleSubmit()}
              >
                {/* <Text styel={{ color: "white", fontWeight: "bold" }}>Delete</Text> */}
              </Button>
              {/* <Button
                    title="Submit"
                    type="submit"
                    onPress={() => handleSubmit()}
                  >
                  </Button> */}
            </View>
          </>
        </VStack>
      </View>
    );
  }

  function titleInfo({ title }) {
    return (
      <Text
        style={{
          ...Fonts.primaryColor20Bold,
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginTop: Sizes.fixPadding * 2.0,
        }}
      >
        {title}
      </Text>
    );
  }

  function addressInfo() {
    return (
      <Text
        numberOfLines={2}
        style={{ ...Fonts.blackBold, ...styles.addressTextStyle }}
      >
        {address}
      </Text>
    );
  }

  function mapInfo() {
    return (
      <View style={styles.mapContainerStyle}>
        <MapView
          style={{ height: 270.0 }}
          initialRegion={{
            latitude: 37.33233141,
            longitude: -122.0312186,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          <Marker
            coordinate={{ latitude: 37.33233141, longitude: -122.0312186 }}
            pinColor={"red"}
          />
        </MapView>
      </View>
    );
  }

  function addToCartButton() {
    return (
      <View style={styles.addButton}>
        <Text style={{ ...styles.totalPriceStyle, ...Fonts.pinkColor20Bold }}>
          <Text style={{ ...Fonts.black18Regular }}>Total:</Text> ${totalPrice}
        </Text>
        {propedItem.countInStock > 0 ? (
          <TouchableOpacity
            activeOpacity={0.99}
            // onPress={() => navigation.goBack()}
            style={{ ...styles.addButtonStyle }}
            onPress={() => {
              props.addItemToCart(propedItem, qty);
              // Toast.show({
              //   topOffset: 60,
              //   type: "success",
              //   text1: `${item.name} added to Cart`,
              //   text2: "Go to your cart to complete order",
              // });
            }}
          >
            <Text style={{ ...Fonts.white17Bold }}>
              Add to cart{"    "}
              {/* <MaterialCommunityIcons
                // style={{ marginLeft: 10 }}
                name="cart-plus"
                size={24}
                color="white"
              /> */}
              {/* {props.cartItems.map((x) => {
                return x.quantity;
              })} */}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.99}
            disabled
            onPress={() => props.navigation.goBack()}
            style={{
              ...styles.addButtonStyle,
              backgroundColor: Colors.lightGray,
            }}
          >
            <Text style={{ ...Fonts.white17Bold }}>
              Out of Stock{"    "}
              <MaterialCommunityIcons
                // style={{ marginLeft: 10 }}
                name="cart-plus"
                size={24}
                color="white"
              />
            </Text>
          </TouchableOpacity>
        )}
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
          style={{
            ...Fonts.black16Regular,
            marginLeft: Sizes.fixPadding + 5.0,
          }}
        >
          Product Details
        </Text>
      </View>
    );
  }

  // function reviews() {
  //   const renderItem = ({ item }) => (
  //     <View>
  //       <Text bold fontSize="15" marginLeft="2">
  //         REVIEWS
  //       </Text>

  //       {item.reviews.length === 0 ? (
  //         <View>
  //           <Text bg={Colors.deepGray} rounded={5} p={4} bold>
  //             NO REVIEW
  //           </Text>
  //         </View>
  //       ) : (
  //         <View p={1} bg={Colors.deepGray} mt={5} rounded={5}>
  //           {item.reviews.map((x, index) => {
  //             return (
  //               <View key={index}>
  //                 <Text fontSize="15" color={Colors.black}>
  //                   <Text>{x.name}</Text>
  //                 </Text>

  //                 <Text italic>{x.rating}</Text>
  //                 {/* <Rating value={x.rating}></Rating> */}

  //                 <Text my={1}>{x.createdAt}</Text>

  //                 <Text
  //                   color={Colors.black}
  //                   bg={Colors.white}
  //                   w="full"
  //                   h="12"
  //                   mb={7}
  //                 >
  //                   {x.comment} Your burden may literally treble if you design
  //                   and maintain apps for iOS, Android,
  //                 </Text>
  //               </View>
  //             );
  //           })}
  //         </View>
  //       )}
  //       {/* <Text
  //         style={{
  //           ...Fonts.blackRegular,
  //           marginTop: Sizes.fixPadding - 5,
  //           marginHorizontal: Sizes.fixPadding - 5,
  //           textAlign: "center",
  //         }}
  //       >
  //         {item.name}
  //       </Text> */}

  //       {/* <Text
  //           style={{
  //             ...Fonts.black15Bold,
  //             marginTop: Sizes.fixPadding,
  //             marginHorizontal: Sizes.fixPadding,
  //             textAlign: 'center',
  //           }}
  //         >
  //           {item.name}
  //         </Text> */}
  //     </View>
  //   );

  //   return (
  //     <FlatList
  //       // horizontal
  //       // showsHorizontalScrollIndicator={false}
  //       data={reviewList}
  //       keyExtractor={(item) => `${item.id}`}
  //       renderItem={renderItem}
  //       // contentContainerStyle={{ marginHorizontal: Sizes.fixPadding }}
  //     />
  //   );
  // }
  function reviews() {
    return (
      <View>
        <Text
          style={{
            ...Fonts.black16Bold,
            marginTop: Sizes.fixPadding + 5.0,
            marginBottom: Sizes.fixPadding + 1.0,
            textAlign: "justify",
          }}
        >
          Reviews
        </Text>
        {reviewList.length === 0 ? (
          <View>
            <Text bg={Colors.deepGray} rounded={5} p={4} bold>
              Noo Reviews
            </Text>
          </View>
        ) : (
          <View p={1} bg={Colors.deepGray} mt={5} rounded={5}>
            {reviewList.map((x, index) => {
              return (
                <View key={index}>
                  <Text fontSize="15" color={Colors.black}>
                    <Text>{x.name}</Text>
                  </Text>

                  {/* <Text italic>{x.rating}</Text> */}
                  {/* <Rating value={x.rating}></Rating> */}

                  {/* <Text my={1}>{x.createdAt}</Text> */}

                  <Text
                    numberOfLines={6}
                    style={{
                      ...Fonts.grayRegular,
                      marginVertical: Sizes.fixPadding - 5.0,
                      textAlign: "justify",
                    }}
                  >
                    {x.comment} Your burden may literally treble if you design
                    and maintain apps for iOS, Android,
                  </Text>
                </View>
              );
            })}
          </View>
        )}
      </View>
      // <FlatList
      //   // horizontal
      //   // showsHorizontalScrollIndicator={false}
      //   data={reviewList}
      //   keyExtractor={(item) => `${item.id}`}
      //   renderItem={renderItem}
      //   // contentContainerStyle={{ marginHorizontal: Sizes.fixPadding }}
      // />
    );
  }
};

// via redux, we need to map the state of our store to props, by this we can get the state of the store as props
const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};
const mapToDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
    addItemToCart: (product, qty) =>
      dispatch(actions.addToCart({ quantity: qty, product })),
  };
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: '#000000',
    // marginBottom: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 3.0,
  },
  productInfoContainerStyle: {
    // backgroundColor: 'red',
    alignItems: "center",
    // flexDirection: 'row',
    // paddingHorizontal: Sizes.fixPadding,
    // marginVertical: Sizes.fixPadding,
  },
  productInfo: {
    // flex: 1,
    // height: height,
    flexDirection: "column",
    padding: 10,
    // borderRadius: 10,
    marginTop: -10,
    padding: Sizes.fixPadding + 5.0,
    // marginLeft: 10,
    // alignItems: 'center',
    // elevation: 4,
    backgroundColor: "#F4F4F5",
    // backgroundColor: 'pink',

    borderTopLeftRadius: Sizes.fixPadding + 5.0,
    borderTopRightRadius: Sizes.fixPadding + 5.0,
    // overflow: 'hidden',
  },
  image: {
    width: width - 20,
    height: width - 100,
    // backgroundColor: 'transparent',
    borderTopLeftRadius: Sizes.fixPadding + 5.0,
    borderTopRightRadius: Sizes.fixPadding + 5.0,
    borderBottomLeftRadius: Sizes.fixPadding + 5.0,
    borderBottomRightRadius: Sizes.fixPadding + 5.0,
    // position: 'absolute',
    // top: -45
  },
  favoritecircle: {
    marginTop: Sizes.fixPadding - 110,
    marginRight: 12,
    borderRadius: 100,
    backgroundColor: Colors.pink,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    flexDirection: "row",
  },

  input: {
    width: 35,
    height: 35,
    backgroundColor: Colors.whiteColor,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.primary,
  },
  // addressTextStyle: {
  //   marginHorizontal: Sizes.fixPadding * 2.0,
  //   marginVertical: Sizes.fixPadding,
  //   backgroundColor: '#000000',
  // },
  // mapContainerStyle: {
  //   borderRadius: Sizes.fixPadding + 5.0,
  //   marginTop: 5,
  //   overflow: 'hidden',
  //   backgroundColor: '#000000',
  //   elevation: 3.0,
  //   marginHorizontal: Sizes.fixPadding * 2.0,
  // },
  // facilitiesContainerStyle: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginHorizontal: Sizes.fixPadding * 2.0,
  //   marginBottom: Sizes.fixPadding - 3.0,
  //   borderTopLeftRadius: Sizes.fixPadding + 5.0,
  //   borderTopRightRadius: Sizes.fixPadding + 5.0,
  //   backgroundColor: 'pink',
  // },
  addButton: {
    position: "absolute",
    alignSelf: "flex-end",
    height: 60.0,
    backgroundColor: "white",
    bottom: 0.0,
    left: 0.0,
    right: 0.0,
    flexDirection: "row",
    flex: 1,
    borderTopColor: Colors.lightGray,
    borderTopWidth: 0.5,
    paddingVertical: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding,
  },
  totalPriceStyle: {
    flex: 0.5,
    backgroundColor: "white",
    marginVertical: Sizes.fixPadding - 5,
  },
  addButtonStyle: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.fixPadding + 5,
    elevation: 2.0,
    backgroundColor: Colors.primary,
  },
  badge: {
    width: 20,
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    top: -1,
    right: -10,
    backgroundColor: "red",
  },
  text: {
    fontSize: 15,
    width: 9,
    fontWeight: "bold",
    color: "white",
  },
  labAndCheckUpContainer: {
    flexDirection: "row",
    // height: 200.0,
    width: width - 40,
    alignSelf: "center",
    // borderRadius: Sizes.fixPadding + 5.0,
    borderRadius: 5,
    backgroundColor: Colors.lightGray,
    borderColor: "black",
    borderWidth: 0.3,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 4.0,
    marginBottom: 20.0,
    overflow: "hidden",
    padding: 10,
  },
});

// export default ProductDetails;
// export default connect(null, mapToDispatchToProps)(ProductDetails);
export default connect(mapStateToProps, mapToDispatchToProps)(ProductDetails);
