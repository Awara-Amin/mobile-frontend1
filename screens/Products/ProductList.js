import React from "react";
// import { TouchableOpacity, View, Dimensions } from "react-native";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  StatusBar,
  ImageBackground,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Fonts, Colors, Sizes } from "../../constant/styles";
// import RBSheet from "react-native-raw-bottom-sheet";
import ProductCard from "./ProductCard";

var { width } = Dimensions.get("window");

const ProductList = (props) => {
  const { item, navigation } = props;

  return (
    <TouchableOpacity
      style={styles.labAndCheckUpContainer}
      onPress={() =>
        props.navigation.navigate(
          "ProductDetails",
          { item: item }
          // {
          //   name: item.name,
          //   image: item.image,
          //   description: item.description,
          //   countInStock: item.countInStock,
          //   price: item.price,
          // }
        )
      }
    >
      {/* Show these here */}
      <View>
        <ProductCard {...item} />
        {/* <ProductCard {...item} navigation={navigation} item={item} /> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  searchStyle: {
    height: 60.0,
    backgroundColor: "white",
    borderWidth: 1.0,
    borderColor: Colors.lightGray,
    alignItems: "center",
    borderRadius: Sizes.fixPadding - 3.0,
    flexDirection: "row",
    paddingLeft: Sizes.fixPadding + 10.0,
    marginTop: 20.0,
    marginHorizontal: 20.0,
  },
  viewAllStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding,
  },
  callNowButtonStyle: {
    width: 80.0,
    height: 40.0,
    borderColor: Colors.primary,
    borderRadius: Sizes.fixPadding,
    borderWidth: 1.0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: 10.0,
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
  specialistInfoContainer: {
    height: 160.0,
    width: 200.0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderColor: Colors.lightGray,
    borderWidth: 1.0,
    marginHorizontal: 10.0,
    marginVertical: 10.0,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5.0,
  },
  //
  // the categories
  categoryInfoContainer: {
    height: 100.0,
    width: 120.0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderColor: Colors.lightGray,
    borderWidth: 1.0,
    marginHorizontal: 10.0,
    marginVertical: 10.0,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5.0,
  },
  //
});
export default ProductList;
