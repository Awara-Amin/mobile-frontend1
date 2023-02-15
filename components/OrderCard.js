import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button, TouchableOpacity, Text } from "react-native";
import { Select } from "native-base";

import Icon from "react-native-vector-icons/FontAwesome";
// import TrafficLight from "./StyledComponents/TrafficLight";
import TrafficLight from "./TrafficLight";
import { Fonts, Colors, Sizes } from "../constant/styles";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";

// import EasyButton from "./StyledComponents/EasyButton";
import Toast from "react-native-toast-message";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// import baseURL from "../../assets/common/baseUrl";
// import Colors from "../Shared/StyledComponents/color";
// import OrderDetailView from "./StyledComponents/OrderDetailView";
import baseURL from "../assets/common/baseUrl";

import io from "socket.io-client";
const socket = io.connect("http://localhost:3000");

import { OrderData } from "../Context/data/orderData";
export const orderDb = new OrderData();

const codes = [
  { name: "Pending", code: "3" },
  { name: "Shipping", code: "2" },
  { name: "Delivered", code: "1" },
];

const OrderCard = (props) => {
  console.log("inside OrderCard kakaaaaaaaa11");
  // console.log(props);
  //   console.log(props.user.name);
  const [propedOrder, setPropedOrder] = useState(props);
  const [orderStatus, setOrderStatus] = useState();
  const [statusText, setStatusText] = useState();
  const [statusChange, setStatusChange] = useState();
  const [token, setToken] = useState();
  const [cardColor, setCardColor] = useState();
  const [orderFilter, setOrderFilter] = useState([props]);
  // const [newEdit, setNewEdit] = useState();
  const [showModel, setShowModel] = useState(false);
  // console.log("inside OrderCard kakaaaaaaaa13");
  // console.log(propedOrder);
  // console.log("inside OrderCard kakaaaaaaaa");
  // console.log(props.orderItems);
  // {
  //   props.orderItems.map((i, index) => {
  //     console.log("jjjjjjjjjjjjjjjjjj");
  //     return console.log(i);
  //     // <List key={index}>
  //     //   <Text>{"jjjjjjjjjjjjjjjjjj"}</Text>
  //     // </List>;
  //   });
  // }

  // console.log("kakaaaaaaaa wwwwwwwwwwwwwwwwww 1");
  // console.log(orderFilter.length);
  // console.log("test-1TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT-21000");
  // console.log(propedOrder);
  // console.log(propedOrder.status);

  useEffect(() => {
    // we have this, see console.log results
    // if (props.editMode) {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));
    // }

    if (propedOrder.status == "3") {
      setOrderStatus(<TrafficLight unavailable></TrafficLight>);
      setStatusText("pending");
      setCardColor("#E74C3C");
    } else if (propedOrder.status == "2") {
      setOrderStatus(<TrafficLight limited></TrafficLight>);
      setStatusText("shipped");
      setCardColor("#F1C40F");
    } else {
      setOrderStatus(<TrafficLight available></TrafficLight>);
      setStatusText("delivered");
      setCardColor("#2ECC71");
    }

    return () => {
      setOrderStatus();
      setStatusText();
      setCardColor();
    };
  }, [propedOrder]);

  const updateOrder = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const order = {
      city: propedOrder.city,
      country: propedOrder.country,
      dateOrdered: propedOrder.dateOrdered,
      id: propedOrder.id,
      orderItems: propedOrder.orderItems,
      phone: propedOrder.phone,
      shippingAddress1: propedOrder.shippingAddress1,
      shippingAddress2: propedOrder.shippingAddress2,
      status: statusChange,
      totalPrice: propedOrder.totalPrice,
      user: propedOrder.user,
      zip: propedOrder.zip,
    };
    // forEditeMode = props.editMode;
    axios
      .put(`${baseURL}orders/${propedOrder.id}`, order, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          //   Toast.show({
          //     topOffset: 60,
          //     type: "success",
          //     // text1: "Order Edited",
          //     // text2: "",
          //   });
          // setTimeout(() => {
          //   props.navigation.navigate("Products");
          // }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          // text1: "Something went wrong",
          // text2: "Please try again",
        });
      });
  };

  const deleteOrder = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`${baseURL}orders/${propedOrder.id}`, config)
      .then((res) => {
        const orders = orderFilter.filter((item) => item.id !== id);
        setOrderFilter(orders);
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            // text1: "Order Edited",
            // text2: "",
          });
          setTimeout(() => {
            props.navigation.navigate("Products");
          }, 500);
        }
      })
      .catch((error) => {
        console.log(error);
        // Toast.show({
        //   topOffset: 60,
        //   type: "error",
        //   // text1: "Something went wrong",
        //   // text2: "Please try again",
        // });
      });
  };
  socket.off("changeStatus").on("changeStatus", (data) => {
    // let order = orderDb.getOrder(data.orderId);
    // orderDb.updateOrder(order._id, { status: data.status });
    // const allorders = orderDb.getAllOrders();
    setPropedOrder(data.order);
  });
  // useEffect(() => {
  // socket.on("updateOrderBySocket", (data) => {
  //   // console.log("test-1TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT-12000");
  //   // console.log(data);
  //   // console.log("test-1TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT-22000");
  //   // console.log(data.updatedOrderById);
  //   // let newEdit = data.updatedOrderById; // productId this id is the same with the one is sent to backend

  //   // setPropedOrder(data.updatedOrderById);
  //   // let currentProduct = productDb.getProduct(data.productId); // productId this id is the same with the one is sent to backend
  //   // newEdit.editMode = true;
  //   // console.log("test-1TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT-14000");
  //   // console.log(newEdit);
  //   // console.log("test-1TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT-15000");
  //   // console.log(newEdit.editMode);
  //   // console.log(newEdit.status);
  //   console.log("test-1TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT-19000");
  //   setPropedOrder(data.updatedOrderById);
  //   setPropedOrderT(data.updatedOrderById);

  //   // console.log(propedOrder);
  //   // console.log(propedOrder.status);

  //   // currentProduct.reviews.push(data.review);
  //   // productDb.setProduct(currentProduct.id, currentProduct);
  //   // setSokReviews(currentProduct.reviews);
  //   // setNoReviews(currentProduct.reviews.length);
  //   // setComment("");
  //   // setRating("");

  //   // console.log(propedOrder.status);
  // });
  // }, [props]);
  console.log("test-1TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT-31000");
  console.log(propedOrder);

  // console.log("test-1TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT-17000");
  // console.log(propedOrder);
  return (
    <View style={[{ backgroundColor: cardColor }, styles.container]}>
      <View
        style={{
          marginBottom: 5,
          backgroundColor: Colors.lightGray,
          padding: 8,
          borderRadius: 5,
        }}
      >
        {props.user.name ? (
          <Text style={styles.titleText}>
            Customer's Name: {props.user.name}
          </Text>
        ) : null}
        <Text style={{ fontWeight: "italic", fontSize: 14 }}>
          Order Number is :
          <Text style={{ textDecorationLine: "underline", fontSize: 14 }}>
            {props.id}
          </Text>
        </Text>
        <Text style={{ fontWeight: "italic", fontSize: 14 }}>
          Date Ordered: {props.dateOrderd.split("T")[0]}
        </Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ padding: 5, margin: 5 }}>Status:{statusText}</Text>
          <Text style={{ padding: 5, marginTop: 13 }}>{orderStatus}</Text>
        </View>
        {/* <Text>
          Address: {props.shippingAddress1}
          {props.shippingAddress2}
        </Text> */}

        {/* <Text>City:{props.city}</Text> */}
        {/* <Text>Country:{props.country}</Text> */}
        {/* <Text>Date Ordered: {props.dateOrderd.split("T")[0]}</Text> */}
        <View>
          <View style={styles.priceContainer}>
            <Text>TOTAL PRICE: </Text>
            <Text style={styles.price}>$ {props.totalPrice}</Text>
          </View>
          <View style={styles.priceContainer}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                props.navigation.navigate("OrderDetails", {
                  id: props._id,
                });
              }}
            >
              <Text style={{ ...Fonts.white16Regular }}>View Order1</Text>
            </TouchableOpacity>
            {/* <Text>TOTAL PRICE: </Text>
            <Text style={styles.price}>$ {props.totalPrice}</Text> */}
          </View>

          {/* <View style={styles.priceContainer2}>
            <Button
              title="View More"
              bg={Colors.black}
              color={Colors.white}
              mt={5}
              onPress={() => setShowModel(true)}
            ></Button>
            <Modal
              isOpen={showModel}
              onClose={() => setShowModel(false)}
              size="lg"
            >
              <Modal.Content maxWidth={350}>
                <Modal.CloseButton />
                <Modal.Header>Order Summery</Modal.Header>
                <Modal.Body>
                  <VStack space={7}>
                    <HStack alignItems="center" justifyContent="space-between">
                      <Text fontWeight="medium">Order</Text>
                      <Text color={Colors.black} bold>
                        ID is: {props.id}
                      </Text>
                    </HStack>

                    <HStack alignItems="center" justifyContent="space-between">
                      <Text fontWeight="medium">Coustomer:</Text>
                      <Text color={Colors.black} bold>
                        {props.user.name}
                      </Text>
                    </HStack>

                    <HStack alignItems="center" justifyContent="space-between">
                      <Text fontWeight="medium">orderdID</Text>
                      <Text color={Colors.black} bold>
                        {props.orderItems.map((i, index) => {
                          <HStack
                            key={index}
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Text fontWeight="medium">{i}</Text>
                          </HStack>;
                        })}
                      </Text>
                    </HStack>

                    <HStack alignItems="center" justifyContent="space-between">
                      <Text fontWeight="medium">Total Price</Text>
                      <Text color={Colors.main} bold>
                        ${444.44}
                      </Text>
                    </HStack>
                  </VStack>
                </Modal.Body>
              </Modal.Content>
            </Modal>
          </View> */}
        </View>

        <View>
          <View>
            <Select
              bg={Colors.white}
              mode="dropdown"
              iosIcon={<Icon color={"#000000"} name="arrow-down" />}
              style={[{ fontSize: 17 }, { width: undefined }]}
              selectedValue={statusChange}
              placeholder="Change Status"
              placeholderTextColor={Colors.main}
              placeholderIconColor={{ color: "#FFFFFF" }}
              onValueChange={(e) => setStatusChange(e)}
            >
              {codes.map((c) => {
                return (
                  <Select.Item key={c.code} label={c.name} value={c.code} />
                );
              })}
            </Select>
            <View space={16}>
              {/* <EasyButton secondary large onPress={() => updateOrder()}>
                  <Text style={{ color: "white" }}>Update Order</Text>
                </EasyButton> */}
              <TouchableOpacity
                style={styles.loginScreenButton}
                onPress={() => updateOrder()}
                underlayColor="#fff"
              >
                <Text style={styles.loginText}>Update Order</Text>
              </TouchableOpacity>
              {/* <Button
                  title="Update Order"
                  color="white"
                  backgroundColor="white"
                  onPress={() => updateOrder()}
                ></Button> */}
              <TouchableOpacity
                style={styles.loginScreenButton}
                onPress={() => deleteOrder(props._id)}
                underlayColor="#fff"
              >
                <Text style={styles.loginText}>Delete Order</Text>
              </TouchableOpacity>
              {/* <EasyButton
                  secondary
                  large
                  onPress={() => deleteOrder(props._id)}
                >
                  <Text style={{ color: "white" }}>Delete Order</Text>
                </EasyButton> */}
            </View>
          </View>
        </View>
      </View>
    </View>
    // <View>
    //   <Text>qqqq</Text>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  title: {
    backgroundColor: "#62B1f6",
    padding: 5,
  },
  priceContainer: {
    marginTop: 10,
    marginBottom: 15,
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  priceContainer2: {
    marginTop: 10,
    alignSelf: "flex-start",
    flexDirection: "row",
  },

  price: {
    color: "white",
    fontWeight: "bold",
  },
  //
  loginScreenButton: {
    // marginRight: 40,
    // marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#1E6738",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  loginText: {
    color: "#fff",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  titleText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
export default OrderCard;
