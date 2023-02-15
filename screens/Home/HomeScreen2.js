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

// socket io part
import io from "socket.io-client";
const socket = io.connect("http://localhost:3000");

// Mahdi-1 to minimize load on sever
export var db = new Map();
const { width } = Dimensions.get("window");
const bannerData = [
  {
    id: "1",
    image: require("../../assets/images/images/ban1.png"),
  },
  {
    id: "2",
    image: require("../../assets/images/images/ban1.png"),
  },
  {
    id: "3",
    image: require("../../assets/images/images/ban3.jpg"),
  },
];
// const specialistsList = [
//   {
//     id: "1",
//     name: "Cough & Fever",
//     image: require("../../assets/images/icons/patient.png"),
//   },
//   {
//     id: "2",
//     name: "Homoeopath",
//     image: require("../../assets/images/icons/stethoscope.png"),
//   },
//   {
//     id: "3",
//     name: "Gynecologist",
//     image: require("../../assets/images/icons/woman.png"),
//   },
//   {
//     id: "4",
//     name: "Pediatrician",
//     image: require("../../assets/images/icons/pediatrician.png"),
//   },
//   {
//     id: "5",
//     name: "Physiotherapist",
//     image: require("../../assets/images/icons/physiotherapist.png"),
//   },
//   {
//     id: "6",
//     name: "Nutritionist",
//     image: require("../../assets/images/icons/nutritionist.png"),
//   },
//   {
//     id: "7",
//     name: "Spine and Pain Specialist",
//     image: require("../../assets/images/icons/pain.png"),
//   },
// ];
const specialistsList = [
  {
    id: "1",
    name: "Flowers",
    image: require("../../assets/images/images/flower.png"),
  },
  {
    id: "2",
    name: "Gift",
    image: require("../../assets/images/images/gift-box.png"),
  },
  {
    id: "3",
    name: "Balloons",
    image: require("../../assets/images/images/balloons.png"),
  },
  {
    id: "4",
    name: "Letters",
    image: require("../../assets/images/images/l1.jpg"),
  },
  {
    id: "5",
    name: "Physiotherapist",
    image: require("../../assets/images/icons/physiotherapist.png"),
  },
  {
    id: "6",
    name: "Nutritionist",
    image: require("../../assets/images/icons/nutritionist.png"),
  },
  {
    id: "7",
    name: "Spine and Pain Specialist",
    image: require("../../assets/images/icons/pain.png"),
  },
];
// const labAndCheckUpList = [
//   {
//     id: "1",
//     labName: "New York City DOHMH Public Health Laboratory",
//     labAddress: "455 1st Avenue, New York, NY 10016, United States",
//     image: require("../../assets/images/lab/lab_1.jpg"),
//   },
//   {
//     id: "2",
//     labName: "Enzo Clinical Labs-Upper East Side (STAT Lab)",
//     labAddress: "44 E 67th St, New York, NY 10022, United States",
//     image: require("../../assets/images/lab/lab_2.jpg"),
//   },
//   {
//     id: "3",
//     labName: "New York Startup Lab LLC",
//     labAddress: "244 5th Ave #2575, New York, NY 10001, United States",
//     image: require("../../assets/images/lab/lab_3.jpg"),
//   },
//   {
//     id: "4",
//     labName: "MEDTRICS LAB LLC",
//     labAddress: "138 W 25th St 10th floor, New York, NY 10001, United States",
//     image: require("../../assets/images/lab/lab_4.jpg"),
//   },
//   {
//     id: "5",
//     labName: "Enzo Clinical Labs",
//     labAddress: "15005 21st Ave ,Flushing, NY 11357, United States",
//     image: require("../../assets/images/lab/lab_5.jpg"),
//   },
//   {
//     id: "6",
//     labName: "Shiel Medical",
//     labAddress: "128 Mott St,New York, NY 10013,United States",
//     image: require("../../assets/images/lab/lab_6.jpg"),
//   },
// ];
const products = [
  {
    id: "1",
    name: "Flower Gift",
    description: "25",
    image: require("../../assets/images/images/p1.jpg"),
    countInStock: 0,
    price: "25",
  },
  {
    id: "2",
    name: "Flower Box",
    description:
      "Anndason Flower Box Round Rotation Flower Boxes Paperboard Gift Boxes Luxury Flower Gift Arrangements for Home Decoration, Wedding, Birthday Valentines Day",
    image: require("../../assets/images/images/p2.jpg"),
    countInStock: 5,
    price: "25",
  },
  {
    id: "3",
    name: "New York Startup Lab LLC",
    description: "25",
    image: require("../../assets/images/images/p3.jpg"),
    countInStock: 0,
    price: "25",
  },
  {
    id: "4",
    name: "MEDTRICS LAB LLC",
    description: "30",
    image: require("../../assets/images/images/p4.jpg"),
    countInStock: 45,
    price: "25",
  },
  {
    id: "5",
    name: "Enzo Clinical Labs",
    description: "10",
    image: require("../../assets/images/images/p5.jpg"),
    countInStock: 12,
    price: "25",
  },
  {
    id: "6",
    name: "Shiel Medical",
    description: "50",
    image: require("../../assets/images/images/p6.jpg"),
    countInStock: 13,
    price: "25",
  },
];
var { height } = Dimensions.get("window");
const HomeScreen = ({ navigation }) => {
  console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk-3000");
  const [connectStatus, setConnectStatus] = useState(false);

  // internet connection part
  // const netInfo = useNetInfo();
  // const [netChecking, setNetChecking] = useState(netInfo.isConnected);
  const [products, setProducts] = useState([]);
  const [productsID, setProductsID] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [loading, setLoading] = useState(false);

  // socket io variables
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  // internet checking variables
  const [isLoading, setLoading] = useState(false);
  const [isOffline, setOfflineStatus] = useState(false);
  const [offlineChecking, setOfflineCkecking] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  // useEffect(() => {
  //   netInfo !== null ? setOfflineCkecking(netInfo.isConnected) : null;
  //   console.log("test-1RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR-7000");
  //   console.log(offlineChecking);
  //   // checkConnected().then((res) => {
  //   //   // this will be either true or false
  //   //   setConnectStatus(res);
  //   //   // setConnectStatus(false);
  //   // });
  // }, []);

  // socket from Fuad
  useEffect(() => {
    socket.on("connect", () => {
      console.log("use connected to socket", new Date().getMilliseconds());
      setIsConnected(true);
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, [isConnected]);

  const sendPing = () => {
    const data = { hi: "hello" };
    console.log("ping cicked", new Date());
    socket.emit("ping", data);
  };

  socket.on("disconnect", () => {
    setIsConnected(false);
  });

  useEffect(() => {
    socket.on("pong", (data) => {
      let item = db.get(data.updatedProduct._id);
      console.log("test-1RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR-8000");
      console.log(item.id); //for this item change the countInStock
      db.set(item.id, {
        ...item,
        countInStock: data.updatedProduct.countInStock,
      });
      const myData = [];
      for (const value of db.values()) {
        myData.push(value);
      }
      setProducts(myData);
      // setProductsID(myData.id);
      // setProductsFiltered(res.data);
      setProductsFiltered(myData);
      setProductsCtg(myData);
      setInitialState(myData);
      console.log(db.get(item._id, item));
    });

    // onRefresh();
    // getUserInfo();
    // setFocus(false);
    // setActive(-1);
    // getCategories();

    axios
      .get(`${baseURL}categories`)
      .then((res) => {
        // console.log("res.data kakaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaa13");
        // console.log(res.data);
        setCategories(res.data);
      })
      // .finally(() => {
      //   setLoading(false);
      // })
      .catch((error) => {
        console.log("Api call has error");
      });
    // if (context.stateUser.isAuthenticated === true) {
    //   socket.emit('join_room', 'products');
    // }
    // socket.on('productUpdate', (data) => {
    //   // setMessageList((list) => [...list, data]);
    //   // on the client side
    //   console.log(data);
    //   let item = db.get(data._id);
    //   db.set(item.id, { ...item, countInStock: data.countInStock });
    // });

    return () => {
      setProducts([]);
      //setProductsFiltered([]);
      setFocus();
      //setCategories([]);
      setActive();
      setInitialState();
      // setUserProfile("");
    };
  }, []);
  // useEffect(() => {
  //   const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
  //     const offline = !(state.isConnected && state.isInternetReachable);
  //     setOfflineStatus(offline);
  //   });

  //   fetchUsers();

  //   return () => removeNetInfoSubscription();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      // setLoading(true);
      setFocus(false);
      setActive(-1);

      // const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      //   const offline = !(state.isConnected && state.isInternetReachable);
      //   console.log("test-1RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR-3000");
      //   console.log(offline);
      //   setOfflineStatus(offline);
      // });
      // removeNetInfoSubscription();
      // products
      axios
        .get(`${baseURL}products`)
        .then((res) => {
          res?.data.forEach((item) => {
            db.set(item.id, item);
          });
          const myData = [];
          console.log(myData);
          for (const value of db.values()) {
            myData.push(value);
          }
          // console.log("test-1RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR-2");
          // setProducts(res.data);
          setProducts(myData);
          setProductsID(myData.id);
          // setProductsFiltered(res.data);
          setProductsFiltered(myData);
          setProductsCtg(myData);
          setInitialState(myData);
          setLoading(false);
        })
        // .finally(() => {
        //   setLoading(false);
        // })
        .catch((error) => console.log("Api call has error"));

      // categories
      axios
        .get(`${baseURL}categories`)
        .then((res) => {
          // console.log("res.data kakaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaa13");
          // console.log(res.data);
          setCategories(res.data);
        })
        // .finally(() => {
        //   setLoading(false);
        // })
        .catch((error) => {
          console.log("Api call has error");
        });

      return () => {
        // removeNetInfoSubscription();
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

  // console.log("test-1RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR-2000");
  // console.log(products);
  // console.log(products.length);
  // console.log(isOffline);
  // console.log(products._id);
  // console.log(productsID);

  // Product Methods
  const searchProduct = (text) => {
    setProductsFiltered(
      // products.filter((i) => console.log(i.name))
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };
  // console.log("test-1");
  // console.log(productsFiltered);

  const openList = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };

  //
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      //getInfo();
    }, 500);
  };

  // Categories
  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(
              products.filter((i) => i.category._id === ctg),
              setActive(true)
            ),
          ];
    }
  };
  // console.log("res.data kakaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaa14");
  // console.log(productsCtg);
  useEffect(() => {
    joinRoom();
  }, []);

  const joinRoom = () => {
    // if (username !== "" && room !== "") {
    // socket.emit("join_room", room);
    socket.emit("products", "room");
    // setShowChat(true);
    // }
  };

  // useEffect(() => {
  //   // socket.on("receive_message", (data) => {
  //   socket.on("productUpdate", (data) => {
  //     // setMessageList((list) => [...list, data]);
  //     console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk-22");
  //     // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
  //     console.log(data.message);
  //     let item = db.get(data.productid);
  //     db.set(item.id, { ...item, qty: data - qty });
  //   });
  // }, [socket]);

  // const Button = ({ children, ...props }) => (
  //   <TouchableOpacity style={styles.button} {...props}>
  //     <Text style={styles.buttonText}>{children}</Text>
  //   </TouchableOpacity>
  // );

  // const NoInternetModal = ({ show, onRetry, isRetrying }) => (
  //   <Modal isVisible={show} style={styles.modal} animationInTiming={600}>
  //     <View style={styles.modalContainer}>
  //       <Text style={styles.modalTitle}>Connection Error</Text>
  //       <Text style={styles.modalText}>
  //         Oops! Looks like your device is not connected to the Internet.
  //       </Text>
  //       <Button onPress={onRetry} disabled={isRetrying}>
  //         Try Again
  //       </Button>
  //     </View>
  //   </Modal>
  // );

  // const fetchUsers = useCallback(() => {
  //   setLoading(true);

  //   axios
  //     .get(`${baseURL}products`)
  //     .then((res) => {
  //       res?.data.forEach((item) => {
  //         db.set(item.id, item);
  //       });
  //       const myData = [];
  //       console.log(myData);
  //       for (const value of db.values()) {
  //         myData.push(value);
  //       }
  //       console.log("test-1RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR-2");
  //       // setProducts(res.data);
  //       setProducts(myData);
  //       // setProductsID(myData.id);
  //       // setProductsFiltered(res.data);
  //       setProductsFiltered(myData);
  //       setProductsCtg(myData);
  //       setInitialState(myData);
  //       // setLoading(false);
  //       isOffline && setOfflineStatus(false);
  //       // .get('https://randomuser.me/api/?results=30')
  //       // .then(({data}) => {
  //       // const {results} = data;
  //       // setUsers(results);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, [isOffline]);

  const checkConnectedttt = () => {
    alert("i am clicked sir");
    checkConnected().then((res) => {
      // this will be either true or false
      setConnectStatus(res);
      // setConnectStatus(false);
    });
  };
  // }, [connectStatus]);

  // render of the data
  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.99}
      onPress={() =>
        navigation.navigate("LabTestAndCheckUp", {
          image: item.image,
          name: item.labName,
          address: item.labAddress,
        })
      }
      style={styles.labAndCheckUpContainer}
    >
      <Image
        source={item.image}
        style={{
          height: 199.0,
          width: width - 230.0,
          borderTopLeftRadius: Sizes.fixPadding + 5.0,
          borderBottomLeftRadius: Sizes.fixPadding + 5.0,
          overflow: "hidden",
        }}
        resizeMode="cover"
      />
      <View style={styles.labInformationContainer}>
        <Text numberOfLines={3} style={{ ...Fonts.black16Bold }}>
          {item.labName}
        </Text>
        <Text
          numberOfLines={2}
          style={{ ...Fonts.grayBold, marginTop: Sizes.fixPadding - 5.0 }}
        >
          {item.labAddress}
        </Text>
        <View style={styles.callNowButtonStyle}>
          <Text style={{ ...Fonts.primaryColorBold }}>Call Now2</Text>
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginRight: Sizes.fixPadding + 10.0,
        }}
      >
        <Ionicons name="chevron-forward" size={25} color="black" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar translucent={false} backgroundColor={Colors.primary} />
      {/* <View> */}
      {/* <Pressable onPress={checkConnectedttt}>
          <Text>Send ping</Text>
        </Pressable> */}
      {/* <Pressable  onPress={} /> */}
      {/* {connectStatus ? (
          <Text>Connected: {netInfo.type}</Text>
        ) : (
          <Text>DisConnecetd "sherrrr"</Text>
        )} */}
      {/* <Text>Type: {netInfo.type}</Text> */}
      {/* <Text>Is Connected? {netInfo.isConnected.toString()}</Text> */}
      {/* </View> */}

      {header()}
      {search()}
      {/* <FlatList
        ListHeaderComponent={
          <>
            {header()}
            {search()}
            {newlyLanched()}
            {title({ title: "Find your doctor by speciality" })}
            {specialists()}
            {viewAll()}
          </>
        }
        // data={labAndCheckUpList}
        data={products}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      /> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {Banner()}
        {/* <NoInternetModal
          show={isOffline}
          onRetry={fetchUsers}
          isRetrying={isLoading}
        /> */}
        {/* {newlyLanched()} */}
        {/* {title({ title: "Find your doctor by speciality" })} */}
        {theCategories()}
        {viewAll()}
        {productsCtg.length > 0 ? (
          <View>
            {/* {products.map((item, index) => { */}
            {productsCtg.map((item, index) => {
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
                  // props.categoryFilter("all"), props.setActive(-1);
                  changeCtg(item._id),
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
