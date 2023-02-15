// import React from "react";
import React, { useState, useEffect } from "react";
import { useToast } from "react-native-toast-notifications";

import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { Button } from "native-base";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import Toast from "react-native-toast-message";
import { MaterialIcons, Entypo, Ionicons } from "@expo/vector-icons";
// import EasyButton from "../../Shared/StyledComponents/EasyButton"

import { connect } from "react-redux";
import * as actions from "../../assets/Redux/Actions/cartActions";
import * as actionsfav from "../../assets/Redux/Actions/favActions";

var { width } = Dimensions.get("window");

const ProductCard = (props) => {
  const toast = useToast();
  // console.log("tessssssssssssst-1");
  // console.log(props);
  // console.log(props.name);

  // bq
  // getTotal(); //make it active
  // console.log(props.cartItems);
  // console.log(props.cartItems.cartItems);

  // console.log(props.image);
  // const { name, image, description, countInStock, price } = props;
  //const { item } =props;

  const [qty, setQty] = useState(1);

  return (
    <View style={styles.labAndCheckUpContainer}>
      <Image
        style={{
          height: 199.0,
          width: width - 200.0,
          borderTopLeftRadius: Sizes.fixPadding + 5.0,
          borderBottomLeftRadius: Sizes.fixPadding + 5.0,
          overflow: "hidden",
        }}
        resizeMode="cover"
        source={{ uri: props.image }}
        // source={props.image}
      />
      <View style={styles.labInformationContainer}>
        <Text numberOfLines={3} style={{ ...Fonts.black16Bold }}>
          {props.name.length > 15
            ? props.name.substring(0, 23 - 3) + "..."
            : props.name}
        </Text>
        <Text
          numberOfLines={2}
          style={{ ...Fonts.grayBold, marginTop: Sizes.fixPadding - 5.0 }}
        >
          <Text style={styles.price}>${props.price}</Text>
        </Text>
        <View style={styles.callNowButtonStyle}>
          <Text style={{ ...Fonts.primaryColorBold }}>Call Now</Text>
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
              onPress={() => {
                // props.addItemToFav(props, qty);
                props.addItemToFav(props, qty);
                toast.show("item added to fav list", {
                  type: "success",
                  placement: "top",
                  duration: 4000,
                  offset: 30,

                  animationType: "slide-in",
                });
                // Toast.show({
                //   topOffset: 60,
                //   type: "success",
                //   text1: `${item.name} added to Cart`,
                //   text2: "Go to your cart to complete order",
                // });
              }}
            >
              <Ionicons name="md-heart-outline" size={25} color="black" />
              {/* <Ionicons name="md-heart-sharp" size={24} color="black" /> */}
            </TouchableOpacity>
          </View>
          {props.countInStock > 0 ? (
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
          )}
        </View>
      </View>
      {/* <View style={styles.card} /> */}
      {/* <Text style={styles.title}>
        {name.length > 15 ? name.substring(0, 23 - 3) + "..." : name}
      </Text> */}
      {/* <View
        style={{
          flexDirection: "row",
          marginTop: 3,
          width: 130,
          borderBottomColor: Colors.pink,
          borderBottomWidth: 1,
        }}
      ></View> */}
      <View
      // style={{
      //   flexDirection: "row",
      // }}
      >
        {/* <Text style={styles.price}>${price}</Text> */}
        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            marginLeft: 35,
            marginTop: 15,
          }}
        >
          <View style={styles.favoritecircle}>
            <TouchableOpacity>
              <Ionicons name="md-heart-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          {countInStock > 0 ? (
            <View>
              <TouchableOpacity style={styles.addcircle}>
                <Entypo disabled name="plus" size={24} color="white" />
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity disabled style={styles.disaddcircle}>
                <Entypo disabled name="plus" size={24} color="white" />
              </TouchableOpacity>
            </View>
          )}
        </View> */}
        {/* <Text style={styles.price}>{description}</Text> */}
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};
const mapToDispatchToProps = (dispatch) => {
  return {
    // clearCart: () => dispatch(actions.clearCart()),
    // removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
    addItemToCart: (product, qty) =>
      dispatch(actions.addToCart({ quantity: qty, product })),
    addItemToFav: (product, qty) =>
      dispatch(actionsfav.addToFav({ quantity: qty, product })),
  };
};

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 20,
    height: width / 1.55,
    padding: 0,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 7,
    marginLeft: 10,
    // alignItems: 'center',
    elevation: 4,
    backgroundColor: "green",

    borderTopLeftRadius: Sizes.fixPadding + 5.0,
    borderTopRightRadius: Sizes.fixPadding + 5.0,
    // overflow: 'hidden',
  },
  image: {
    width: width / 2 - 20,
    height: width / 2 - 20 - 30,
    // backgroundColor: 'transparent',
    borderTopLeftRadius: Sizes.fixPadding + 5.0,
    borderTopRightRadius: Sizes.fixPadding + 5.0,
    borderBottomLeftRadius: Sizes.fixPadding + 5.0,
    borderBottomRightRadius: Sizes.fixPadding + 5.0,
    // position: 'absolute',
    // top: -45
  },
  card: {
    marginTop: 10,
    // padding: 2,
    // marginBottom: 5,
    marginRight: 15,
    // height: width / 2 - 20,
    backgroundColor: "transparent",
    width: width / 2 - 20,
  },
  title: {
    marginTop: 10,
    marginLeft: 10,
    color: "gray",
    // fontWeight: 'bold',
    fontSize: 14,
    // textAlign: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.pink,
    marginTop: 8,
    marginLeft: 10,
  },
  addcircle: {
    marginTop: 10,
    borderRadius: 100,
    backgroundColor: Colors.pink,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
  },
  disaddcircle: {
    marginTop: 10,
    borderRadius: 100,
    backgroundColor: "gray",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  favoritecircle: {
    marginTop: 10,
    marginRight: 10,
    borderRadius: 100,
    backgroundColor: "#F7F7F8",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  labAndCheckUpContainer: {
    flexDirection: "row",
    height: 200.0,
    width: width - 40,
    alignSelf: "center",
    borderRadius: Sizes.fixPadding + 5.0,
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
  labInformationContainer: {
    marginLeft: Sizes.fixPadding,
    marginRight: Sizes.fixPadding,
    width: width - 220,
    marginTop: Sizes.fixPadding + 5.0,
  },
});

// export default ProductCard;
export default connect(mapStateToProps, mapToDispatchToProps)(ProductCard);
