// import React from "react";
import React, { useRef, useState, useEffect, useCallback } from "react";

import {
  Text,
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { Fonts, Sizes, Colors } from "../../constant/styles";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import baseURL from "../../assets/common/baseUrl";

const trendingsList = [
  "Homoeopath",
  "Gynecologist",
  "Pediatrician",
  "Physiotherapist",
  "Nutritionist",
  "Spine and Pain Specialist",
  "Dentist",
  "Cough & Fever",
  "Physiotherapist ",
  "Nutritionist ",
  "Spine and Pain Specialist ",
  "Dentist ",
  "Cough & Fever ",
];

const SearchScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true);
  const recentSearchList = ["Cough & Fever", "Nutrition"];
  useFocusEffect(
    useCallback(() => {
      setFocus(false);
      setActive(-1);

      // products
      axios
        .get(`${baseURL}products`)
        .then((res) => {
          setProducts(res.data);
          setProductsFiltered(res.data);
          setProductsCtg(res.data);
          setInitialState(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Api call has error");
        });

      // categories
      axios
        .get(`${baseURL}categories`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((error) => {
          console.log("Api call has error");
        });

      return () => {
        // to make them empty again, no memorries for later
        setProducts([]);
        setProductsFiltered([]);
        setFocus();
        setCategories([]);
        setActive();
        setInitialState();
      };
    }, [])
  );

  // Product Methods
  const searchProduct = (text) => {
    setProductsFiltered(
      // products.filter((i) => console.log(i.name))
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };
  console.log("test-21");
  console.log(productsFiltered);

  const openList = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };

  return (
    // <View style={{ flex: 1, backgroundColor: 'white' }}>
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor={Colors.primary} />
      {header()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* {recentSearchesText()} */}
        {/* {recentSearches()} */}
        {trendingText()}
        {focus == true ? trendings() : null}
        {/* {trendings()} */}
      </ScrollView>
    </SafeAreaView>
    // </View>
  );

  function recentSearches() {
    return recentSearchList.map((item) => (
      <View key={item} style={styles.recentSearchesListStyle}>
        <MaterialIcons name="history" size={24} color="gray" />
        <Text
          style={{
            marginLeft: Sizes.fixPadding,
            fontSize: Sizes.fixPadding + 5.0,
          }}
        >
          {item}
        </Text>
      </View>
    ));
  }

  function trendingText() {
    return (
      <View style={styles.trendingTextContainerStyle}>
        <Text style={{ ...Fonts.black18Bold }}>
          Search by name of you desired flower
        </Text>
      </View>
    );
  }

  function trendings() {
    // return trendingsList.map((item) => (
    return productsFiltered.length > 0 ? (
      productsFiltered.map((item) => (
        <View key={item} style={styles.trendingListStyle}>
          <MaterialCommunityIcons
            name="arrow-top-right"
            size={24}
            color="#5CB2F6"
          />
          <Text
            style={{
              marginLeft: Sizes.fixPadding,
              fontSize: Sizes.fixPadding + 5.0,
            }}
          >
            {item.name}
          </Text>
        </View>
      ))
    ) : (
      <View alignItems="center" mt={100}>
        <Text bold>No products match the selected criteria</Text>
      </View>
    );
  }

  function header() {
    return (
      <View
        style={{
          backgroundColor: "white",
          elevation: 4.0,
          height: 63.0,
          paddingHorizontal: Sizes.fixPadding * 2.0,
          justifyContent: "center",
        }}
      >
        <MaterialIcons
          name="arrow-back"
          color={"black"}
          size={22}
          onPress={() => navigation.pop()}
        />
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
      </View>
    );
  }

  function recentSearchesText() {
    return (
      <View style={styles.recentSearchesContainerTextStyle}>
        <Text style={{ ...Fonts.black18Bold }}>Your reacnt searches</Text>
        <Text style={{ ...Fonts.primaryColorRegular }}>Show more</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  searchContainerStyle: {
    backgroundColor: "#F5F5F5",
    borderRadius: 30.0,
    height: 45.0,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: Sizes.fixPadding + 5.0,
    marginBottom: 10,
  },
  recentSearchesContainerTextStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding,
    alignItems: "center",
    marginBottom: Sizes.fixPadding,
  },
  recentSearchesListStyle: {
    flexDirection: "row",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding,
    alignItems: "center",
  },
  trendingTextContainerStyle: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding,
    marginVertical: Sizes.fixPadding,
    justifyContent: "center",
  },
  trendingListStyle: {
    flexDirection: "row",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding,
    alignItems: "center",
  },
});

export default SearchScreen;
