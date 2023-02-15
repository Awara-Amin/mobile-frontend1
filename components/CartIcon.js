import React from "react";
import { StyleSheet } from "react-native";
import { Badge, Text } from "native-base";

import { connect } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";

const CartIcon = (props) => {
  // bq
  // getTotal(); //just added
  // console.log(props.cartItems.cartItems.length);
  return (
    <>
      {/* {props.cartItems.length ? ( */}
      {props.cartItems.cartItems.length ? ( // bq
        <Badge
          style={styles.badge}
          rounded="full"
          h={6}
          paddingRight={4}
          marginBottom={4}
        >
          <Text style={styles.text}>{props.cartItems.cartItems.length}</Text>
          {/* <Text style={styles.text}>{props.cartItems.length}</Text> */}
        </Badge>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const styles = StyleSheet.create({
  badge: {
    width: 20,
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    top: -1,
    right: -16,
    backgroundColor: "red",
  },
  text: {
    fontSize: 15,
    width: 9,
    fontWeight: "bold",
    color: "white",
  },
});

export default connect(mapStateToProps)(CartIcon);
