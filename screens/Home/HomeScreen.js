import React, { useRef, useState, useEffect, useCallback } from "react";
import NetInfo from "@react-native-community/netinfo";
import { useNetInfo } from "@react-native-community/netinfo";
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
  TextInput,
  RefreshControl,
  Modal,
  Pressable,
} from "react-native";

import { HStack, Badge } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

import { Ionicons } from "@expo/vector-icons";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import RBSheet from "react-native-raw-bottom-sheet";
//
import ProductList from "../Products/ProductList";
import Swiper from "react-native-swiper";
import baseURL from "../../assets/common/baseUrl";

import { checkConnected } from "../../components/functions";
import NoConnectionScreen from "../../components/NoConnectionScreen";

import { ProductData } from "../../Context/data/productData";
import { CategoryData } from "../../Context/data/categoryData";

// socket io part
// import io from "socket.io-client";
// const socket = io.connect("http://localhost:3000");
// import { socket } from "../../App";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3000");
// Mahdi-1 to minimize load on sever
export const productDb = new ProductData();
export const categoryDb = new CategoryData();

// export const productDb = new Map();
const { width } = Dimensions.get("window");

var { height } = Dimensions.get("window");
const HomeScreen = ({ navigation }) => {
  console.log("categoryDB inside homeScreen-3000");
  // console.log(productDb);
  console.log(categoryDb);
  const [connectStatus, setConnectStatus] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cat, setCat] = useState("all");
  const [catList, setCatList] = useState([]);
  const [productsID, setProductsID] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  // const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true);

  // socket io variables
  // const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  // internet checking variables
  const [isOffline, setOfflineStatus] = useState(false);
  const [offlineChecking, setOfflineCkecking] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // setLoading(true);
      setFocus(false);
      setActive(-1);
      getProducts();
      // axios.get(`${baseURL}products`).then((res) => {
      //   res?.data.forEach((item) => {
      //     productDb.data.set(item.id, item);
      //     console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk-4000");
      //     console.log(productDb.data);
      //   });
      //   const myData = [];
      //   console.log(myData);
      //   for (const value of productDb.data.values()) {
      //     // for (const value of productDb.values()) {
      //     myData.push(value);
      //   }
      //   // console.log("test-1RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR-2");
      //   // setProducts(res.data);
      //   setProducts(myData);
      //   // setProductsID(myData.id);
      //   // // setProductsFiltered(res.data);
      //   // setProductsFiltered(myData);
      //   // setProductsCtg(myData);
      //   // setInitialState(myData);
      //   // setLoading(false);
      // });

      // .catch((error) => console.log("Api call has error"));

      // categories
      getCategories();
      // axios
      //   .get(`${baseURL}categories`)
      //   .then((res) => {
      //     // console.log("res.data kakaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaa13");
      //     // console.log(res.data);
      //     setCategories(res.data);
      //   })
      //   .catch((error) => {
      //     console.log("Api call has error");
      //   });

      return () => {
        // removeNetInfoSubscription();
        // to make them empty again, no memorries for later
        setProducts([]);
        // setProductsFiltered([]);
        setFocus();
        // setCategories([]);
        setActive();
        // setInitialState();
      };
    }, [])
  );

  // Products
  const getProducts = async () => {
    try {
      const data = await productDb.fetchProductData(baseURL);
      setProducts(data);
      setLoading(false);
    } catch (err) {}
  };
  // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk-300011");
  // console.log(products);

  const getCategoryData = () => {
    return cat == "all"
      ? products
      : products.filter((item) => item.category._id == cat);
  };

  const getCategories = async () => {
    try {
      const data = await categoryDb.fetchCategoryData(baseURL);
      setCategories(data);
      setLoading(false);
    } catch (err) {}
  };
  // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk-3000");
  // console.log(categories);
  //Get Categories
  // const getCategories = () => {
  //   axios
  //     .get(`${baseURL}categories`)
  //     .then((res) => {
  //       // const allCategories = categoryDb.getCategory(res.data);
  //       // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk-3000");
  //       // console.log(allCategories);
  //       // setCategories(allCategories);

  //       setCategories(res.data);
  //       setCatList(res.data.map((item) => item));
  //     })
  //     .catch((error) => console.log(error));
  // };

  // productUpdating after place order
  socket.on("ponga", (data) => {
    let item = productDb.getProduct(data.updatedProduct._id);
    productDb.updateProduct(item._id, {
      countInStock: data.updatedProduct.countInStock,
    });
    console.log("socket inside HomeScreen for countInStock updating");
    console.log(data.updatedProduct);
    // const myData = [];
    // for (const value of productDb.data.values()) {
    //   myData.push(value);
    // }
    const allProducts = productDb.getAllProducts();
    setProducts(allProducts);
  });
  // socket.on("pong", (data) => {
  //   // let item = db.get(data.updatedProduct._id);
  //   let item = productDb.getProduct(data.updatedProduct._id);
  //   // console.log("test-1RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR-5000");
  //   // console.log(item.id); //for this item change the countInStock
  //   console.log("kaka20");
  //   productDb.updatedProduct(item._id, {
  //     // ...item,
  //     countInStock: data.updatedProduct.countInStock,
  //   });

  //   // const allProducts = productDb.getAllProducts();
  //   // console.log("test-1RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR-6000");
  //   // console.log(allProducts);
  //   // setProducts(allProducts);
  // });

  // const searchProduct = (text) => {
  //   setProductsFiltered(
  //     // products.filter((i) => console.log(i.name))
  //     products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
  //   );
  // };

  const openList = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };

  //
  // const onRefresh = () => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     setRefreshing(false);
  //     //getInfo();
  //   }, 500);
  // };

  const changeCtg = (cat) => {
    setCat(cat);
    // {
    //   cat === "all"
    //     ? products
    //     : [
    //         setProducts(
    //           products.filter((i) => i.category._id === cat),
    //           setActive(true)
    //         ),
    //       ];
    // }
    // // {
    //   ctg === "all"
    //     ? [setProductsCtg(initialState), setActive(true)]
    //     : [
    //         setProductsCtg(
    //           products.filter((i) => i.category._id === ctg),
    //           setActive(true)
    //         ),
    //       ];
    // }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar translucent={false} backgroundColor={Colors.primary} />

      {header()}
      {search()}

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
      >
        {Banner()}
        {theCategories()}
        {viewAll()}

        {/* {productsCtg.length > 0 ? ( */}
        {products?.length > 0 ? (
          <View>
            {/* {products.map((item, index) => { */}
            {getCategoryData().map((item, index) => {
              return (
                <ProductList navigation={navigation} key={index} item={item} />
                // <ProductList />
              );
            })}
          </View>
        ) : (
          <View style={[styles.center, { height: height / 2 }]}>
            <Text>No products found</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );

  function applyCouponForm() {
    return <View></View>;
  }
  function search() {
    return (
      <TouchableOpacity
        activeOpacity={0.99}
        onPress={() => {
          navigation.navigate("Search");
        }}
      >
        <View style={styles.searchStyle} onFocus={openList}>
          <Ionicons name="search" size={24} color="gray" />
          <Text
            style={{ ...Fonts.gray17Regular, marginLeft: Sizes.fixPadding }}
          >
            Search for the type of flower?
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  // function newlyLanched() {
  //   return (
  //     <ImageBackground
  //       source={require("../../assets/images/banner.jpg")}
  //       resizeMode="stretch"
  //       style={{
  //         height: 100.0,
  //         marginTop: Sizes.fixPadding + 5.0,
  //         marginHorizontal: Sizes.fixPadding * 2.0,
  //       }}
  //       borderRadius={5}
  //     ></ImageBackground>
  //   );
  // }

  function title({ title }) {
    return (
      <Text
        style={{
          ...Fonts.black18Bold,
          marginVertical: Sizes.fixPadding,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        {title}
      </Text>
    );
  }

  function specialists() {
    const renderItem = ({ item }) => (
      <TouchableHighlight
        underlayColor="white"
        activeOpacity={0.99}
        onPress={() => navigation.navigate("Specialist", { name: item.name })}
      >
        <View style={styles.specialistInfoContainer}>
          <Image
            source={item.image}
            resizeMode="contain"
            style={{ height: 80.0, width: 80.0 }}
          />
          <Text
            style={{
              ...Fonts.black15Bold,
              marginTop: Sizes.fixPadding,
              marginHorizontal: Sizes.fixPadding,
              textAlign: "center",
            }}
          >
            {item.name}
          </Text>
        </View>
      </TouchableHighlight>
    );

    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={specialistsList}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{ marginHorizontal: Sizes.fixPadding }}
      />
    );
  }

  function theCategories() {
    // const renderItem = ({ item }) => (
    //   <TouchableHighlight
    //     underlayColor="white"
    //     activeOpacity={0.99}
    //     onPress={() =>
    //       navigation.navigate(
    //         "Specialist",
    //         { name: item.name },
    //         { name1: item },
    //         // (name2 = { productsCtg })
    //         (name3 = { changeCtg })
    //       )
    //     }
    //   >
    //     <View style={styles.categoryInfoContainer}>
    //       {/* <Image
    //         // source={item.image}
    //         // source={{
    //         //   uri: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngfind.com%2Fmpng%2FiibJRwT_tulip-gift-flower-bouquet-box-plastic-flower-hd%2F&psig=AOvVaw1jpkcEa3ke-MOl5hNCUIMR&ust=1671305500150000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCKCF9Kfw_vsCFQAAAAAdAAAAABAI",
    //         // }}
    //         source={{ uri: "../../assets/images/images/flower.png" }}
    //         resizeMode="contain"
    //         style={{ height: 50.0, width: 50.0 }}
    //       /> */}
    //       <Image
    //         // source={item.image}
    //         // source={{
    //         //   uri: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngfind.com%2Fmpng%2FiibJRwT_tulip-gift-flower-bouquet-box-plastic-flower-hd%2F&psig=AOvVaw1jpkcEa3ke-MOl5hNCUIMR&ust=1671305500150000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCKCF9Kfw_vsCFQAAAAAdAAAAABAI",
    //         // }}
    //         source={{ uri: "../../assets/images/images/flower.png" }}
    //         // resizeMode="contain"
    //         // style={{ height: 50.0, width: 50.0 }}
    //       />

    //       <Text
    //         style={{
    //           ...Fonts.blackRegular,
    //           marginTop: Sizes.fixPadding - 5,
    //           marginHorizontal: Sizes.fixPadding - 5,
    //           textAlign: "center",
    //         }}
    //       >
    //         {item.name}
    //       </Text>

    //       {/* <Text
    //         style={{
    //           ...Fonts.black15Bold,
    //           marginTop: Sizes.fixPadding,
    //           marginHorizontal: Sizes.fixPadding,
    //           textAlign: 'center',
    //         }}
    //       >
    //         {item.name}
    //       </Text> */}
    //     </View>
    //   </TouchableHighlight>
    // );

    return (
      <ScrollView
        bounces={true}
        horizontal={true}
        style={{ backgroundColor: "#f2f2f2" }}
      >
        {/* <HStack style={{ margin: 5, padding: 0, borderRadius: 0 }}> */}
        <View style={styles.mainCatigories}>
          {/* <View> */}
          <TouchableHighlight
            underlayColor="white"
            activeOpacity={0.99}
            key={1}
            onPress={() => {
              // props.categoryFilter("all"), props.setActive(-1);
              // changeCtg("all"), setActive(-1);
              changeCtg("all"), setActive(-1);
            }}
          >
            <View style={styles.categoryInfoContainer}>
              {/* <Image
                // source={item.image}
                // source={{
                //   uri: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngfind.com%2Fmpng%2FiibJRwT_tulip-gift-flower-bouquet-box-plastic-flower-hd%2F&psig=AOvVaw1jpkcEa3ke-MOl5hNCUIMR&ust=1671305500150000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCKCF9Kfw_vsCFQAAAAAdAAAAABAI",
                // }}
                source={{ uri: "../../assets/images/images/flower.png" }}
                resizeMode="contain"
                style={{ height: 50.0, width: 50.0 }}
              /> */}
              <View
                style={[
                  styles.center,
                  { margin: 5 },
                  { width: 110 },
                  { height: 90 },
                  { borderRadius: 15 },
                  active == -1 ? styles.active : styles.inactive,
                  // props.active == -1 ? styles.active : styles.inactive,
                ]}
              >
                <Text>All</Text>
              </View>
            </View>
            {/* <Badge
            style={[
              styles.center,
              { margin: 5 },
              active == -1 ? styles.active : styles.inactive,
              // props.active == -1 ? styles.active : styles.inactive,
            ]}
          >
            <Text style={{ color: "black" }}>All</Text>
          </Badge> */}
          </TouchableHighlight>
          {/* </View> */}
          <View style={styles.mainCatigories}>
            {categories.map((item) => (
              <TouchableHighlight
                key={item._id}
                underlayColor="white"
                activeOpacity={0.99}
                onPress={() => {
                  // console.log(item);
                  // props.categoryFilter("all"), props.setActive(-1);
                  changeCtg(item.id),
                    setActive(-1),
                    setActive(categories.indexOf(item));
                }}
              >
                <View style={styles.categoryInfoContainer}>
                  {/* <Image
                // source={item.image}
                // source={{
                //   uri: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngfind.com%2Fmpng%2FiibJRwT_tulip-gift-flower-bouquet-box-plastic-flower-hd%2F&psig=AOvVaw1jpkcEa3ke-MOl5hNCUIMR&ust=1671305500150000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCKCF9Kfw_vsCFQAAAAAdAAAAABAI",
                // }}
                source={{ uri: "../../assets/images/images/flower.png" }}
                resizeMode="contain"
                style={{ height: 50.0, width: 50.0 }}
              /> */}
                  <View
                    style={[
                      styles.center,
                      { margin: 5 },
                      { width: 110 },
                      { height: 90 },
                      { borderRadius: 15 },
                      // props.active == props.categories.indexOf(item)
                      active == categories.indexOf(item)
                        ? styles.active
                        : styles.inactive,
                    ]}
                  >
                    <Text
                    // style={{
                    //   ...Fonts.blackRegular,
                    //   marginTop: Sizes.fixPadding - 5,
                    //   marginHorizontal: Sizes.fixPadding - 5,
                    //   textAlign: "center",
                    // }}
                    >
                      {item.name}
                    </Text>
                  </View>
                </View>
                {/* <Badge
            style={[
              styles.center,
              { margin: 5 },
              active == -1 ? styles.active : styles.inactive,
              // props.active == -1 ? styles.active : styles.inactive,
            ]}
          >
            <Text style={{ color: "black" }}>All</Text>
          </Badge> */}
              </TouchableHighlight>
            ))}
          </View>
        </View>

        {/* map through the categories */}
        {/* {props.categories.map((item) => ( */}
        {/* {categories.map((item) => (
          <TouchableOpacity
            key={item._id}
            onPress={() => {
              // props.categoryFilter(item._id),
              changeCtg(item._id),
                // props.categoryFilter(item._id.$oid),
                // props.setActive(props.categories.indexOf(item));
                setActive(categories.indexOf(item));
            }}
          >
            <Badge
              style={[
                styles.center,
                { margin: 5 },
                // props.active == props.categories.indexOf(item)
                active == categories.indexOf(item)
                  ? styles.active
                  : styles.inactive,
              ]}
            >
              <Text style={{ color: "black" }}>{item.name}</Text>
            </Badge>
          </TouchableOpacity>
        ))} */}
        {/* </HStack> */}
      </ScrollView>

      // <FlatList
      //   horizontal
      //   showsHorizontalScrollIndicator={false}
      //   // data={specialistsList}
      //   data={categories}
      //   keyExtractor={(item) => `${item.id}`}
      //   renderItem={renderItem}
      //   contentContainerStyle={{ marginHorizontal: Sizes.fixPadding }}
      // />
    );
  }
  // function theCategories() {
  //   const renderItem = ({ item }) => (
  //     <TouchableHighlight
  //       underlayColor="white"
  //       activeOpacity={0.99}
  //       onPress={() =>
  //         navigation.navigate(
  //           "Specialist",
  //           { name: item.name },
  //           { name1: item },
  //           // (name2 = { productsCtg })
  //           (name3 = { changeCtg })
  //         )
  //       }
  //     >
  //       <View style={styles.categoryInfoContainer}>
  //         {/* <Image
  //           // source={item.image}
  //           // source={{
  //           //   uri: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngfind.com%2Fmpng%2FiibJRwT_tulip-gift-flower-bouquet-box-plastic-flower-hd%2F&psig=AOvVaw1jpkcEa3ke-MOl5hNCUIMR&ust=1671305500150000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCKCF9Kfw_vsCFQAAAAAdAAAAABAI",
  //           // }}
  //           source={{ uri: "../../assets/images/images/flower.png" }}
  //           resizeMode="contain"
  //           style={{ height: 50.0, width: 50.0 }}
  //         /> */}
  //         <Image
  //           // source={item.image}
  //           // source={{
  //           //   uri: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngfind.com%2Fmpng%2FiibJRwT_tulip-gift-flower-bouquet-box-plastic-flower-hd%2F&psig=AOvVaw1jpkcEa3ke-MOl5hNCUIMR&ust=1671305500150000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCKCF9Kfw_vsCFQAAAAAdAAAAABAI",
  //           // }}
  //           source={{ uri: "../../assets/images/images/flower.png" }}
  //           // resizeMode="contain"
  //           // style={{ height: 50.0, width: 50.0 }}
  //         />

  //         <Text
  //           style={{
  //             ...Fonts.blackRegular,
  //             marginTop: Sizes.fixPadding - 5,
  //             marginHorizontal: Sizes.fixPadding - 5,
  //             textAlign: "center",
  //           }}
  //         >
  //           {item.name}
  //         </Text>

  //         {/* <Text
  //           style={{
  //             ...Fonts.black15Bold,
  //             marginTop: Sizes.fixPadding,
  //             marginHorizontal: Sizes.fixPadding,
  //             textAlign: 'center',
  //           }}
  //         >
  //           {item.name}
  //         </Text> */}
  //       </View>
  //     </TouchableHighlight>
  //   );

  //   return (
  //     <FlatList
  //       horizontal
  //       showsHorizontalScrollIndicator={false}
  //       // data={specialistsList}
  //       data={categories}
  //       keyExtractor={(item) => `${item.id}`}
  //       renderItem={renderItem}
  //       contentContainerStyle={{ marginHorizontal: Sizes.fixPadding }}
  //     />
  //   );
  // }
  //
  function viewAll() {
    return (
      <TouchableOpacity
        activeOpacity={0.99}
        onPress={() => navigation.navigate("ViewAll")}
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
    const refRBSheet = useRef();
    const [city, setCity] = useState("Wallington");
    const cityList = ["Wallingtone", "Central Park", "Nerobi"];

    return (
      <View style={styles.headerStyle}>
        <TouchableOpacity
          activeOpacity={0.99}
          onPress={() => refRBSheet.current.open()}
        >
          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
            height={200}
            openDuration={250}
            customStyles={{
              container: {
                paddingHorizontal: Sizes.fixPadding * 2.0,
              },
            }}
          >
            <View>
              <Text style={{ ...Fonts.black20Bold, alignSelf: "center" }}>
                Choose City
              </Text>
              {cityList.map((city) => (
                <TouchableOpacity
                  activeOpacity={0.99}
                  key={city}
                  onPress={() => {
                    setCity(city);
                    refRBSheet.current.close();
                  }}
                >
                  <Text
                    style={{
                      ...Fonts.black16Regular,
                      marginVertical: Sizes.fixPadding,
                    }}
                  >
                    {city}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </RBSheet>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="location-sharp" size={22} />
            <Text style={{ ...Fonts.black18Regular, marginLeft: 10.0 }}>
              {city}
            </Text>
          </View>
        </TouchableOpacity>
        <Ionicons
          name="notifications"
          size={24}
          color="black"
          onPress={() => navigation.navigate("Notification")}
        />
      </View>
    );
  }

  // const Banner = () => {
  function Banner() {
    const [bannerData, setBannerData] = useState([]);

    useEffect(() => {
      setBannerData([
        "https://www.teahub.io/photos/full/176-1762310_photo-wallpaper-love-flowers-heart-roses-frame-valentines.jpg",
        "https://c1.wallpaperflare.com/preview/311/80/7/roses-gift-board-greeting-card.jpg",
        "https://thumbs.dreamstime.com/b/rectangular-wooden-wedding-arch-chairs-decorated-flowers-fabric-ceremony-meadow-137818135.jpg",
      ]);

      return () => {
        setBannerData([]);
      };
    }, []);

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.swiper}>
            <Swiper
              style={{ height: width / 2 }}
              showButtons={false}
              autoplay={true}
              autoplayTimeout={2}
            >
              {bannerData.map((item, index) => {
                return (
                  <Image
                    key={index}
                    style={styles.imageBanner}
                    resizeMode="contain"
                    // borderRadius="20"
                    source={{ uri: item }}
                  />
                );
              })}
            </Swiper>
            <View style={{ height: 20 }}></View>
          </View>
        </View>
      </ScrollView>
    );
  }
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
  mainCatigories: {
    flexDirection: "row",
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
    // alignItems: "center",
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
  container: {
    flex: 1,
    backgroundColor: "gainsboro",
    marginTop: 10,
    marginBottom: 12,
    borderRadius: 5,
  },
  swiper: {
    width: width,
    alignItems: "center",
    marginTop: 10,
  },
  imageBanner: {
    height: width / 2,
    width: width - 50,
    borderRadius: 40,
    marginHorizontal: 25,
    borderWidth: 1.0,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: "#03bafc",
  },
  inactive: {
    backgroundColor: "#a0e1eb",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "600",
  },
  modalText: {
    fontSize: 18,
    color: "#555",
    marginTop: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});

export default HomeScreen;
