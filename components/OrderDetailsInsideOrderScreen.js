import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Toast from "react-native-toast-message";
import axios from "axios";
// import baseURL from "../../assets/common/baseUrl";

// import { Fonts, Colors, Sizes } from "../../constant/styles";
import { Fonts, Colors, Sizes } from "../constant/styles";
import AwesomeAlert from "react-native-awesome-alerts";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import baseURL from "../assets/common/baseUrl";

const { width } = Dimensions.get("screen");

const OrderDetailsInsideOrderScreen = (props) => {
  // console.log("details inside my orderrrrrrrrrrrrrrrrrrrr 2");
  // console.log(props);
  const [orderInfo, setOrderInfo] = useState([]);
  const [deliveryDetail, setDeliveryDetail] = useState([]);
  const [totalPrice, setTotalPrice] = useState("");
  const [token, setToken] = useState();

  useEffect(() => {
    getOrder();
    return () => {
      //setOrderInfo();
      //setDeliveryDetail();
    };
  }, []);

  const getOrder = () => {
    axios
      // .get(`${baseURL}orders/${props.route.params.id}`)
      .get(`${baseURL}orders/inside-myorder/${props.route.params.id}`)
      .then((x) => {
        // console.log("details inside my orderrrrrrrrrrrrrrrrrrrr 1");
        // console.log(x);
        const orderView = x.data.data;
        setOrderInfo(x.data.data.orderItems);
        setDeliveryDetail(orderView);
        setTotalPrice(x.data.data.totalPrice);
      })
      .catch((error) => console.log(error));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F7F8" }}>
      <StatusBar translucent={false} backgroundColor={Colors.primary} />
      <View
        style={{
          flex: 1,
          backgroundColor: "#F7F7F8",
          marginBottom: Sizes.fixPadding * 7.0,
        }}
      >
        {header()}
        {deliveryInfo()}
        <Text
          style={{
            ...Fonts.black16Bold,
            marginLeft: Sizes.fixPadding + 2.0,
            marginTop: Sizes.fixPadding,
          }}
        >
          Items
        </Text>
        {orderDetails()}
      </View>
      {confirmButton()}
      {/* {successModal()} */}
    </SafeAreaView>
  );

  function deliveryInfo() {
    return (
      <View
        style={{
          ...styles.orderDetailsStyle,
          marginTop: Sizes.fixPadding,
        }}
      >
        <View style={styles.deliveryContainerStyle}>
          <Text
            style={{
              ...Fonts.black16Bold,
              // marginLeft: Sizes.fixPadding + 2.0,
            }}
          >
            Delivery Address
          </Text>
        </View>
        <View style={styles.orderContainerStyle}>
          <Text
            style={{
              ...Fonts.black16Regular,
              marginLeft: Sizes.fixPadding + 2.0,
              marginBottom: Sizes.fixPadding - 2.0,
            }}
          >
            Phone: {deliveryDetail.phone}
          </Text>
          <Text
            style={{
              ...Fonts.black16Regular,
              marginLeft: Sizes.fixPadding + 2.0,
              marginBottom: Sizes.fixPadding - 2.0,
            }}
          >
            {/* Address: {deliveryDetail.DeleveryAddress} */}
            Address: {deliveryDetail.shippingAddress1}
          </Text>

          <Text
            style={{
              ...Fonts.black16Regular,
              marginLeft: Sizes.fixPadding + 2.0,
            }}
          >
            City: {deliveryDetail.city}
          </Text>
        </View>
      </View>
    );
  }

  function orderDetails() {
    const renderItem = ({ item }) => {
      return (
        <View style={{ flex: 1, backgroundColor: "#F7F7F8" }}>
          {orderInfo.length > 0 ? (
            <View style={styles.container}>
              <Image
                style={styles.image}
                resizeMode="cover"
                source={{ uri: item.product.image }}
              />
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 3,
                    width: 130,
                    borderBottomColor: Colors.pink,
                    borderBottomWidth: 1,
                  }}
                >
                  <Text style={styles.title}>
                    {item.product.name.length > 15
                      ? item.product.name.substring(0, 23 - 3) + "..."
                      : item.product.name}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    // alignItems: 'space-between',
                  }}
                >
                  <Text style={styles.price}>${item.product.price}</Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-end",
                      marginHorizontal: Sizes.fixPadding * 5.0,
                      marginVertical: Sizes.fixPadding - 2,
                    }}
                  >
                    <Text
                      style={{
                        ...Fonts.black16Bold,
                        marginVertical: Sizes.fixPadding - 3,
                      }}
                    >
                      {item.quantity}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.center} mt={20}>
              <Text style={{ alignSelf: "center" }}>
                No products match the selected criteria
              </Text>
            </View>
          )}
        </View>
      );
    };

    return (
      <FlatList
        data={orderInfo}
        showsVerticalScrollIndicator={false}
        // keyExtractor={(item, index) => `key-${index}`}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: 5.0,
          paddingTop: Sizes.fixPadding,
        }}
      />
    );
  }

  function confirmButton() {
    return (
      <View style={styles.payButtonContainerStyle}>
        <View style={styles.payButtonStyle}>
          <Text style={{ ...Fonts.primaryColor17Bold }}>
            Total Price
            <Text style={{ ...Fonts.pinkColor20Bold }}>
              {" "}
              $ {totalPrice}
            </Text>{" "}
          </Text>
        </View>
      </View>
    );
  }

  function successModal() {
    return (
      <AwesomeAlert
        show={modalVisible}
        contentContainerStyle={{ borderRadius: Sizes.fixPadding }}
        customView={
          <View style={styles.successModalStyle}>
            <View style={styles.successIconContainerStyle}>
              <Ionicons
                name="md-checkmark-sharp"
                size={40}
                color={Colors.primary}
              />
            </View>
            <Text
              style={{ ...Fonts.gray14Bold, marginTop: Sizes.fixPadding * 2.0 }}
            >
              Success!
            </Text>
          </View>
        }
        closeOnTouchOutside={true}
        onDismiss={() => props.navigation.navigate("Orders")}
      />
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <MaterialIcons
          name="arrow-back"
          color={Colors.black20Bold}
          size={22}
          onPress={() => props.navigation.pop()}
        />
        <Text
          style={{ ...Fonts.black16Bold, marginLeft: Sizes.fixPadding + 5.0 }}
        >
          Order Details
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
  },
  orderDetailsStyle: {
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 0.5,
    borderColor: Colors.primary,
    borderRadius: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    marginHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
    // paddingHorizontal: Sizes.fixPadding,
  },
  orderContainerStyle: {
    marginVertical: Sizes.fixPadding,
  },
  deliveryContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    width: width - 20,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    //  MarginHorizontal: Sizes.fixPadding * 5.0,
    // justifyContent: 'center',
    // alignItems: 'center',
    elevation: 4,
    backgroundColor: "white",
    borderTopLeftRadius: Sizes.fixPadding + 5.0,
    borderTopRightRadius: Sizes.fixPadding + 5.0,
  },
  image: {
    width: width / 2 - 20,
    height: width / 3 - 20,
    borderTopLeftRadius: Sizes.fixPadding + 5.0,
    borderBottomLeftRadius: Sizes.fixPadding + 5.0,
  },
  card: {
    marginTop: 5,
    marginRight: 15,
    backgroundColor: "transparent",
    width: width / 2 - 20,
  },
  title: {
    padding: Sizes.fixPadding,
    color: "gray",
    marginTop: Sizes.fixPadding - 10,
    fontSize: 14,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.pink,
    marginTop: Sizes.fixPadding,
    marginLeft: Sizes.fixPadding,
  },

  payInfoContainerStyle: {
    height: 70.0,
    backgroundColor: "#D2D5EE",
    justifyContent: "center",
    paddingHorizontal: 20.0,
  },
  paymentMethodContainerStyle: {
    height: 70.0,
    borderWidth: 1.0,
    borderRadius: 7.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding * 2.0,
  },
  radioButtonContainerStyle: {
    height: 20.0,
    width: 20.0,
    borderColor: Colors.pink,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonInnerContainerStyle: {
    height: 11.0,
    width: 11.0,
    borderRadius: 6.0,
    backgroundColor: Colors.pink,
  },
  withoutRadioButtonContainerStyle: {
    height: 20.0,
    width: 20.0,
    borderRadius: Sizes.fixPadding,
    borderColor: Colors.lightGray,
    borderWidth: 1.0,
  },
  payButtonContainerStyle: {
    backgroundColor: "white",
    height: 65.0,
    position: "absolute",
    bottom: 0.0,
    width: "100%",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    justifyContent: "center",
    borderTopColor: Colors.lightGray,
    borderTopWidth: 0.6,
  },
  payButtonStyle: {
    // backgroundColor: Colors.primary,
    paddingVertical: Sizes.fixPadding + 3.0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Sizes.fixPadding * 1.0,
    // borderRadius: Sizes.fixPadding + 5.0,
  },
  successIconContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.0,
    borderColor: Colors.primary,
    height: 70.0,
    width: 70.0,
    borderRadius: 35.0,
    backgroundColor: "white",
  },
  successModalStyle: {
    height: 150.0,
    width: width * 0.6,
    backgroundColor: "white",
    borderRadius: 40.0,
    alignItems: "center",
    justifyContent: "center",
  },
});
// export default OrderDetails;
export default OrderDetailsInsideOrderScreen;
