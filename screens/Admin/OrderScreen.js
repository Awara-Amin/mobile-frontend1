import React, { useState, useCallback } from "react";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";

import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import OrderCard from "../../components/OrderCard";

var { height, width } = Dimensions.get("window");
// const Orders = (props) => {
const OrderScreen = (props) => {
  const [orderList, setOrderList] = useState();

  useFocusEffect(
    useCallback(() => {
      getOrders();
      return () => {
        // for unmounting/cleaning
        setOrderList();
      };
    }, [])
  );

  const getOrders = () => {
    axios
      .get(`${baseURL}orders`)
      .then((x) => {
        setOrderList(x.data);
      })
      .catch((error) => console.log(error));
  };
  console.log("orderList tttttttttttttttttttttt");
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor={Colors.primary} />
      <View>
        {header()}
        {allOrders()}
      </View>
    </SafeAreaView>
  );

  function allOrders() {
    return (
      <View style={styles.infoWrapStyle}>
        <FlatList
          data={orderList}
          renderItem={({ item }) => (
            // <Text>{item.shippingAddress1}</Text>
            <OrderCard
              navigation={props.navigation}
              {...item}
              editMode={true}
            />
          )}
          keyExtractor={(item) => item.id}
        />
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
          style={{ ...Fonts.black20Bold, marginLeft: Sizes.fixPadding + 5.0 }}
        >
          Back to Dashboard
        </Text>
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
    marginBottom: 160,
    backgroundColor: "white",
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
  // buttonContainer: {
  //   margin: 20,
  //   alignSelf: "center",
  //   flexDirection: "row",
  // },
  // buttonText: {
  //   marginLeft: 4,
  //   color: "white",
  // },

  // inputview: {
  //   height: 60,

  //   flexDirection: "row",
  //   alignItems: "flex-start",
  //   backgroundColor: "#E7EAED",
  //   padding: 0,
  // },
});

export default OrderScreen;
