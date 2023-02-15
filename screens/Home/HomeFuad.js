import React, { useRef, useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  StatusBar,
  TextInput,
  ImageBackground,
  ActivityIndicator,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  RefreshControl,
  Icon,
} from "react-native";
import {
  Ionicons,
  FontAwesome5,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthGlobal from "../../Context/store/AuthGlobal";
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";
import CategoryFilter from "../Products/CategoryFilter";
import ProductList from "../Products/ProductList";
// import RBSheet from 'react-native-raw-bottom-sheet';
// import Swiper from 'react-native-swiper/src';
import Banner from "../../Shared/Banner";

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
// Mahdi-1
export var db = new Map();

const { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

const HomeScreen = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const context = useContext(AuthGlobal);
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [focus, setFocus] = useState();
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState("");
  const [token, setToken] = useState();

  useEffect(() => {
    onRefresh();
    getUserInfo();
    setFocus(false);
    setActive(-1);
    getCategories();
    getProducts();

    return () => {
      // setProducts([]);
      //setProductsFiltered([]);
      setFocus();
      setCategories([]);
      setActive();
      setInitialState();
      //setUserProfile('');
    };
  }, [props]);

  // Get UserInfo
  const getUserInfo = () => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
        axios
          .get(`${baseURL}users/${context.stateUser.user.userId}`, {
            headers: { Authorization: `Bearer ${res}` },
          })
          .then((user) => {
            setUserProfile(user.data.name);
          });
      })
      .catch((error) => console.log(error));
  };
  //Get Categories
  const getCategories = () => {
    axios
      .get(`${baseURL}categories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => console.log(error));
  };

  // Products
  const getProducts = () => {
    // Mahdi-2
    if (db.size == 0) {
      axios
        .get(`${baseURL}products`)
        .then((res) => {
          // console.log(res.data[0]);
          res?.data.forEach((item) => {
            db.set(item.id, item);
          });
          const myData = [];
          for (const value of db.values()) {
            myData.push(value);
          }
          setProducts(myData);
          setProductsFiltered(myData);
          setProductsCtg(myData);
          setInitialState(myData);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  };

  // Categories
  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(
              products.filter((i) => i.category === ctg),
              setActive(true)
            ),
          ];
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getProducts();
      getUserInfo();
      // Categories
      axios
        .get(`${baseURL}categories`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((error) => console.log(error));
      setFocus(false);
      setActive(-1);
      setRefreshing(false);
    }, 500);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F7F8" }}>
      <StatusBar translucent={false} backgroundColor={Colors.primary} />
      {header()}
      {search()}

      {focus == true ? (
        <View style={{ width: width, backgroundColor: "#F7F7F8" }}>
          {searchedProducts()}
        </View>
      ) : (
        <>
          {loading == false ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              <Banner />
              <CategoryFilter
                categories={categories}
                categoryFilter={changeCtg}
                productsCtg={productsCtg}
                active={active}
                setActive={setActive}
              />
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 3,
                  width: "100%",
                  borderBottomColor: Colors.pink,
                  borderBottomWidth: 0.5,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              ></View>
              {/* {categoriesList()} /}
              {/ {viewAll()} */}
              {productsCtg.length > 0 ? (
                <View style={styles.listContainer}>
                  {productsCtg.map((item, index) => {
                    return (
                      <ProductList
                        navigation={props.navigation}
                        key={index}
                        item={item}
                      />
                    );
                  })}
                </View>
              ) : (
                <View style={[styles.center, { height: height / 2 }]}>
                  <Text
                    style={{
                      ...Fonts.black15Bold,
                      marginVertical: Sizes.fixPadding,
                      marginHorizontal: Sizes.fixPadding * 2.0,
                    }}
                  >
                    No products found
                  </Text>
                </View>
              )}
            </ScrollView>
          ) : (
            <View
              flex={1}
              style={[styles.center, { backgroundColor: "#F7F7F8" }]}
            >
              <ActivityIndicator size="large" color="red" />
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );

  function search() {
    return (
      <TouchableOpacity
        activeOpacity={0.99}
        onPress={() => {
          props.navigation.navigate("Search");
        }}
      >
        <View style={styles.searchStyle}>
          <Ionicons name="search" size={24} color={Colors.primary} />
          <Text
            style={{ ...Fonts.gray17Regular, marginLeft: Sizes.fixPadding }}
          >
            Search for products
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  function searchedProducts() {
    const renderItem = ({ item }) => {
      return (
        <View style={{ flex: 1, backgroundColor: "#F7F7F8" }}>
          {productsFiltered.length > 0 ? (
            <View style={styles.container}>
              <Image
                style={styles.image}
                resizeMode="cover"
                source={{ uri: item.image }}
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
                    {item.name.length > 15
                      ? item.name.substring(0, 23 - 3) + "..."
                      : item.name}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    // alignItems: 'space-between',
                  }}
                >
                  <Text style={styles.price}>${item.price}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-end",
                      marginHorizontal: Sizes.fixPadding * 5.0,
                      marginVertical: Sizes.fixPadding - 2,
                    }}
                  >
                    <View style={styles.favoritecircle}>
                      <TouchableOpacity>
                        <Ionicons
                          name="md-heart-outline"
                          size={24}
                          color="black"
                        />
                        {/* <Ionicons name="md-heart-sharp" size={24} color="black" /> /}
                      </TouchableOpacity>
                    </View>
                    {item.countInStock > 0 ? (
                      <View>
                        <TouchableOpacity
                          style={styles.addcircle}
                          onPress={() =>
                            props.navigation.navigate('ProductDetails', {
                              item: item,
                            })
                          }
                        >
                          <Text style={{ color: 'white' }}>View</Text>
                          {/ <MaterialIcons name="preview" size={24} color="white" /> /}
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View>
                        <TouchableOpacity disabled style={styles.disaddcircle}>
                          <Text style={{ color: 'gray' }}>View</Text>
                          {/ <MaterialIcons disabled name="preview" size={24} color="white" /> */}
                      </TouchableOpacity>
                    </View>
                    )}
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.center} mt={20}>
              <Text style={{ alignSelf: "center" }}>
                No productss match the selected criteria
              </Text>
            </View>
          )}
        </View>
      );
    };

    return (
      <FlatList
        data={productsFiltered}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: 5.0,
          //  paddingTop: Sizes.fixPadding,
        }}
      />
    );
  }

  function viewAll() {
    return (
      <TouchableOpacity
        activeOpacity={0.99}
        onPress={() => props.navigation.navigate("ViewAll")}
      >
        <View style={styles.viewAllStyle}>
          <Text
            style={{
              ...Fonts.primaryColor17Bold,
              marginRight: Sizes.fixPadding - 5.0,
            }}
          >
            View All
          </Text>
          <Ionicons name="chevron-forward" size={23} color="black" />
        </View>
      </TouchableOpacity>
    );
  }

  function header() {
    return (
      <View style={styles.headerStyle}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../../assets/images/logo.jpg")}
            style={{ height: 50.0, width: 50.0, borderRadius: 70.0 }}
            resizeMode="contain"
          ></Image>
          {/* <FontAwesome5 name="user-alt" size={24} color="black" />
          <Text style={{ ...Fonts.black18Regular, marginLeft: 10.0 }}>
            {userProfile}
          </Text> */}
        </View>

        <Ionicons
          name="notifications"
          size={24}
          color="black"
          onPress={() => props.navigation.navigate("Notification")}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  searchStyle: {
    height: 45.0,
    backgroundColor: "white",
    borderWidth: 1.0,
    borderColor: Colors.lightGray,
    alignItems: "center",
    borderRadius: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    paddingLeft: Sizes.fixPadding + 5.0,
    marginTop: 2.0,
    marginBottom: 8.0,
    marginHorizontal: 10.0,
    elevation: 5.0,
  },
  container: {
    flexDirection: "row",
    width: width - 20,
    padding: 0,
    borderRadius: 10,
    // marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
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
  addcircle: {
    marginTop: 10,
    borderRadius: 100,
    backgroundColor: Colors.pink,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
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
  viewAllStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding,
  },
  viewButtonStyle: {
    width: 100.0,
    height: 30.0,
    borderColor: Colors.primary,
    borderRadius: Sizes.fixPadding,
    borderWidth: 1.0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: 10.0,
  },
  listContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    marginTop: Sizes.fixPadding,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  labInformationContainer: {
    marginLeft: Sizes.fixPadding,
    marginRight: Sizes.fixPadding,
    width: width - 220,
    marginTop: Sizes.fixPadding + 2.0,
  },
  categoryInfoContainer: {
    height: 90.0,
    width: 90.0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderColor: Colors.lightGray,
    borderWidth: 0.5,
    marginHorizontal: 5.0,
    marginVertical: 5.0,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5.0,
  },
  active: {
    backgroundColor: "#F69821",
  },
  inactive: {
    backgroundColor: "#333333",
  },
});

export default HomeScreen;
