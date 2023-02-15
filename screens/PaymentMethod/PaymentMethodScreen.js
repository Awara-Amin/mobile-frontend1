import React, { useState, useEffect } from "react";
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
import { Fonts, Colors, Sizes } from "../../constant/styles";
import AwesomeAlert from "react-native-awesome-alerts";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("screen");

const paymentMethosList = [
  {
    id: "1",
    icon: require("../../assets/images/payment_icon/cash_on_delivery.png"),
    name: "Pay on Visit",
  },
];

// const PaymentMethodScreen = ({ navigation }) => {
const PaymentMethodScreen = (props) => {
  // console.log("Payment.jsssssssssssssssssssss1");
  const order = props.route.params;
  // console.log(order);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedMethod, setSelectedMethod] = React.useState("");

  return (
    // <View style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FAFAFA" }}
      className="paymentTest"
    >
      <StatusBar translucent={false} backgroundColor={Colors.primary} />
      <View>
        {header()}
        {paymentMethod()}
        {/* {payInfo()} */}
      </View>
      {payButton()}
      {/* {successModal()} */}
      {/* </View> */}
    </SafeAreaView>
  );

  function payInfo() {
    return (
      <View style={styles.payInfoContainerStyle}>
        <Text style={{ ...Fonts.black20Bold }}>Pay:$39</Text>
      </View>
    );
  }

  function paymentMethod() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          onPress={() => setSelectedMethod(item.id)}
          activeOpacity={0.9}
        >
          <View
            style={{
              ...styles.paymentMethodContainerStyle,
              borderColor:
                selectedMethod === item.id ? Colors.primary : Colors.lightGray,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={item.icon}
                resizeMode="contain"
                style={{ width: 50.0, height: 50.0 }}
              />
              <Text
                style={{
                  ...Fonts.primaryColor17Bold,
                  marginLeft: Sizes.fixPadding + 5.0,
                }}
              >
                {item.name}
              </Text>
            </View>
            {selectedMethod === item.id ? (
              <View style={styles.radioButtonContainerStyle}>
                <View style={styles.radioButtonInnerContainerStyle}></View>
              </View>
            ) : (
              <View style={styles.withoutRadioButtonContainerStyle}></View>
            )}
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <FlatList
        data={paymentMethosList}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: 200.0,
          paddingTop: Sizes.fixPadding,
        }}
      />
    );
  }

  function payButton() {
    return (
      <View style={styles.payButtonContainerStyle}>
        <TouchableOpacity
          // onPress={() => setModalVisible(true)}
          // activeOpacity={0.9}
          onPress={() =>
            props.navigation.navigate("OrderDetail", {
              order: order,
            })
          }
        >
          <View
            style={styles.payButtonStyle}
            onPress={() =>
              props.navigation.navigate("OrderDetail", {
                order: order,
              })
            }
          >
            <Text style={{ ...Fonts.white20Regular }}>Pay</Text>
          </View>
        </TouchableOpacity>
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
              You seleceted Successfully the payment method! Now click on
              Continue again to go to the next page.
            </Text>
          </View>
        }
        closeOnTouchOutside={true}
        // onDismiss={() => navigation.navigate("BottomTabScreen")}
        onDismiss={() =>
          props.navigation.navigate("OrderDetail", {
            order: order,
          })
        }
      />
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <MaterialIcons
          name="arrow-back"
          color={Colors.whiteColor}
          size={22}
          onPress={() => props.navigation.pop()}
        />
        <Text
          style={{ ...Fonts.white20Bold, marginLeft: Sizes.fixPadding + 5.0 }}
        >
          Select Payment Method
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    borderRadius: 5,
  },
  payInfoContainerStyle: {
    height: 70.0,
    backgroundColor: "#D2D5EE",
    justifyContent: "center",
    paddingHorizontal: 20.0,
    borderRadius: 15,
  },
  paymentMethodContainerStyle: {
    height: 100.0,
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
    borderColor: Colors.primary,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonInnerContainerStyle: {
    height: 11.0,
    width: 11.0,
    borderRadius: 6.0,
    backgroundColor: Colors.primary,
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

export default PaymentMethodScreen;
