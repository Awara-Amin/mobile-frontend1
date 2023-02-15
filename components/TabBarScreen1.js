import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  useWindowDimensions,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { TabView, TabBar } from "react-native-tab-view";
import { Fonts, Colors, Sizes } from "../constant/styles";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import Dialog from "react-native-dialog";
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";

//
import { connect } from "react-redux";
import * as actions from "../assets/Redux/Actions/cartActions";
import AuthGlobal from "../Context/store/AuthGlobal";
const { height } = Dimensions.get("screen");
const pastDataList = [
  {
    id: "1",
    date: "2 Oct 2020",
    time: "10:30 AM",
    doctor: "Dr.Beatriz Watson",
    type: "Dentist",
  },
  {
    id: "2",
    date: "25 Sept 2020",
    time: "5:30 PM",
    doctor: "Dr.Beatriz Watson",
    type: "Dentist",
  },
  {
    id: "3",
    date: "20 Aug 2020",
    time: "10:00 AM",
    doctor: "Dr.Diego Williams",
    type: "General Physician",
  },
  {
    id: "4",
    date: "10 July 2020",
    time: "11:00 AM",
    doctor: "Dr.Shira Gates",
    type: "Nutritian",
  },
];

const cancelledDataList = [
  {
    id: "1",
    date: "9 July 2020",
    time: "5:00 PM",
    doctor: "Dr.Shira Gates",
    type: "Nutritian",
  },
  {
    id: "2",
    date: "15 June 2020",
    time: "1:30 PM",
    doctor: "Dr.Linnea Bezos",
    type: "Cough & Fever",
  },
];

const PastAppointmentScreen = () => {
  const renderItem = ({ item }) => (
    <View style={{ marginHorizontal: 20.0 }}>
      <View style={{ flexDirection: "row", marginVertical: 20.0 }}>
        <View style={styles.pasetCircleStyle}>
          <Text
            style={{ textAlign: "center", color: Colors.primary, fontSize: 18 }}
          >
            {item.date}
          </Text>
        </View>
        <View style={{ marginLeft: 10.0 }}>
          <Text style={{ ...Fonts.black18Bold }}>{item.time}</Text>
          <Text style={{ marginVertical: 8.0, ...Fonts.black16Regular }}>
            {item.doctor}
          </Text>
          <Text style={{ ...Fonts.primaryColorRegular }}>{item.type}</Text>
        </View>
      </View>
      <View style={{ backgroundColor: Colors.lightGray, height: 0.5 }}></View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={pastDataList}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
      />
    </View>
  );
};

const CancelledAppointmentScreen = () => {
  const renderItem = ({ item }) => (
    <View style={{ marginHorizontal: 20.0 }}>
      <View style={{ flexDirection: "row", marginVertical: 20.0 }}>
        <View style={styles.cancellCircleStyle}>
          <Text style={{ textAlign: "center", color: "#F88C85", fontSize: 18 }}>
            {item.date}
          </Text>
        </View>
        <View style={{ marginLeft: Sizes.fixPadding }}>
          <Text style={{ ...Fonts.black18Bold }}>{item.time}</Text>
          <Text
            style={{
              marginVertical: Sizes.fixPadding - 2.0,
              ...Fonts.black16Regular,
            }}
          >
            {item.doctor}
          </Text>
          <Text style={{ ...Fonts.primaryColorRegular }}>{item.type}</Text>
        </View>
      </View>
      <View style={{ backgroundColor: Colors.lightGray, height: 0.5 }}></View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={cancelledDataList}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
      />
    </View>
  );
};

const { width } = Dimensions.get("screen");

const TabBarScreen = (props) => {
  const context = useContext(AuthGlobal);
  console.log("I need userrrrrrrrr1");
  console.log(context);
  console.log("I need userrrrrrrrr2");
  console.log(context.stateUser);
  console.log("inside TabBarScreen 000");
  console.log(props.cartItems2.cartItems);
  console.log("inside TabBarScreen 111");
  console.log(props);
  console.log("inside TabBarScreen 2");
  const [propedCartItem, setPropedCartItem] = useState();
  const [forRendering, setForRendering] = useState(false);

  // props.cartItems.route.params.cartItems.cartItems
  console.log(propedCartItem);

  useEffect(() => {
    setPropedCartItem(props.cartItems.route.params.cartItems.cartItems);
    setForRendering(false);
    console.log("forRendering 32 in");
    console.log(forRendering);
    // getTotal();
    // return () => {
    // setProductUpdate();
    // setTotalPrice();
    // };
  }, [propedCartItem, forRendering]);
  console.log("forRendering 31 out");
  console.log(forRendering);

  // console.log(props.cartItems.route.params.cartItems.cartItems);
  const [activeDataList, setActiveDataList] = React.useState([
    {
      id: "1",
      date: "15 Oct 2020",
      time: "10:00 AM",
      doctor: "Dr.Ronan Peiterson",
      type: "General Physician",
    },
    {
      id: "2",
      date: "18 Oct 2020",
      time: "12:30 PM",
      doctor: "Dr.Brayden Trump",
      type: "Cardiologist",
    },
    {
      id: "3",
      date: "22 Oct 2020",
      time: "6:00 AM",
      doctor: "Dr.Apollonia Ellison",
      type: "Dentist",
    },
  ]);
  const doctorsList = [
    {
      id: "1",
      name: "Dr.Ronan Peiterson",
      yearsOfExperience: 8,
      rating: 4.9,
      reviews: 135,
      image: require("../assets/images/doctor/doctor-1.png"),
    },
    {
      id: "2",
      name: "Dr.Brayden Trump",
      yearsOfExperience: 10,
      rating: 4.7,
      reviews: 235,
      image: require("../assets/images/doctor/doctor-2.png"),
    },
    {
      id: "3",
      name: "Dr.Appollonia Ellison",
      yearsOfExperience: 7,
      rating: 4.8,
      reviews: 70,
      image: require("../assets/images/doctor/doctor-3.png"),
    },
    {
      id: "4",
      name: "Dr.Beatriz Watson",
      yearsOfExperience: 5,
      rating: 5.0,
      reviews: 50,
      image: require("../assets/images/doctor/doctor-4.png"),
    },
    {
      id: "5",
      name: "Dr.Diego Williams",
      yearsOfExperience: 15,
      rating: 4.9,
      reviews: 512,
      image: require("../assets/images/doctor/doctor-5.png"),
    },
    {
      id: "6",
      name: "Dr.Shira Gates",
      yearsOfExperience: 4,
      rating: 4.4,
      reviews: 15,
      image: require("../assets/images/doctor/doctor-6.png"),
    },
    {
      id: "7",
      name: "Dr.Antonia Warner",
      yearsOfExperience: 7,
      rating: 4.6,
      reviews: 99,
      image: require("../assets/images/doctor/doctor-7.png"),
    },
    {
      id: "8",
      name: "Dr.Linnea Bezos",
      yearsOfExperience: 2,
      rating: 4.5,
      reviews: 9,
      image: require("../assets/images/doctor/doctor-8.png"),
    },
  ];
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: "first", title: "Active" },
    { key: "second", title: "Past" },
    { key: "third", title: "Cancelled" },
  ]);

  const [showModal, setShowModal] = React.useState(false);

  const [id, setId] = useState("");

  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case "first":
        return <ActiveAppointmentScreen jumpTo={jumpTo} />;
      case "second":
        return <PastAppointmentScreen jumpTo={jumpTo} />;
      case "third":
        return <CancelledAppointmentScreen jumpTo={jumpTo} />;
    }
  };

  const removeActive = (id) => {
    let filterArray = activeDataList.filter((val, i) => {
      if (val.id !== id) {
        return val;
      }
    });
    setActiveDataList(filterArray);
  };

  const showDialog = () => {
    return (
      <Dialog.Container
        visible={showModal}
        contentStyle={styles.dialogContainerStyle}
      >
        <View style={styles.dialogStyle}>
          <Text style={{ textAlign: "center", ...Fonts.black16Regular }}>
            Are you sure you want to cancel this appointment?
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginTop: Sizes.fixPadding * 2.0,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                setShowModal(false);
              }}
              style={styles.dialogNoButtonStyle}
            >
              <Text style={{ ...Fonts.primaryColor17Bold }}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                setShowModal(false);
                removeActive(id);
              }}
              style={styles.dialogYesButtonStyle}
            >
              <Text style={{ ...Fonts.white17Bold }}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Dialog.Container>
    );
  };

  const ActiveAppointmentScreen = () => {
    const renderItem = ({ item }) => (
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: Sizes.fixPadding * 2.0,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={styles.activeCircleStyle}>
              <Text
                style={{ textAlign: "center", color: "#8ECC90", fontSize: 18 }}
              >
                {item.date}
              </Text>
            </View>
            <View style={{ marginLeft: Sizes.fixPadding }}>
              <Text style={{ ...Fonts.black18Bold }}>{item.time}</Text>
              <Text style={{ marginVertical: 8.0, ...Fonts.black16Regular }}>
                {item.doctor}
              </Text>
              {/* <Text style={{ ...Fonts.primaryColorRegular }}>{item.type}</Text> */}
            </View>
          </View>
          <Entypo
            name="cross"
            size={24}
            color="black"
            onPress={() => {
              setShowModal(true);
              setId(item.id);
            }}
          />
        </View>
        <View style={{ backgroundColor: Colors.lightGray, height: 0.5 }}></View>
        {showDialog()}
      </View>
    );

    return activeDataList.length === 0 ? (
      <View style={styles.noActiveDataContainerStyle}>
        <FontAwesome5 name="calendar-alt" size={70} color="gray" />
        <Text
          style={{ ...Fonts.gray17Regular, marginTop: Sizes.fixPadding * 2.0 }}
        >
          No Active Appointments
        </Text>
      </View>
    ) : (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <FlatList
          data={activeDataList}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }} backgroundColor="rgba(0,0,0,0)">
      <StatusBar translucent={false} backgroundColor={Colors.primary} />
      <View style={{ flex: 1, backgroundColor: "white" }}>
        {header()}
        {/* {search()} */}

        {doctors()}
        {/* {totalPricee()} */}
      </View>
      <View>{payInfo()}</View>

      {addToCartButton()}
    </SafeAreaView>

    // <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
    //   <StatusBar backgroundColor={Colors.primary} />
    //   {header()}
    //   {/* <TabView
    //     navigationState={{ index, routes }}
    //     renderScene={renderScene}
    //     onIndexChange={setIndex}
    //     initialLayout={{ width: layout.width }}
    //     renderTabBar={(props) => (
    //       <TabBar
    //         {...props}
    //         indicatorStyle={{ backgroundColor: "#2497F3" }}
    //         tabStyle={{ width: layout.width / 3 }}
    //         scrollEnabled={true}
    //         style={{ backgroundColor: "white" }}
    //         renderLabel={({ route, focused, color }) => (
    //           <View
    //             style={{
    //               flexDirection: "row",
    //               alignItems: "center",
    //               justifyContent: "center",
    //             }}
    //           >
    //             <Text style={{ ...Fonts.blackRegular, marginRight: 5.0 }}>
    //               {route.title}
    //             </Text>
    //             <View
    //               style={{
    //                 width: 24.0,
    //                 height: 24.0,
    //                 borderRadius: 12.5,
    //                 backgroundColor: Colors.primary,
    //                 alignItems: "center",
    //                 justifyContent: "center",
    //               }}
    //             >
    //               {route.title == "Active" ? (
    //                 <Text style={{ ...Fonts.whiteRegular }}>
    //                   {activeDataList.length}
    //                 </Text>
    //               ) : route.title == "Past" ? (
    //                 <Text style={{ ...Fonts.whiteRegular }}>
    //                   {pastDataList.length}
    //                 </Text>
    //               ) : (
    //                 <Text style={{ ...Fonts.whiteRegular }}>
    //                   {cancelledDataList.length}
    //                 </Text>
    //               )}
    //             </View>
    //           </View>
    //         )}
    //       />
    //     )}
    //   /> */}
    // </SafeAreaView>
  );
  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <MaterialIcons
          name="arrow-back"
          color={"black"}
          size={22}
          onPress={() => props.cartItems.navigation.goBack()}
        />
        <Text
          style={{
            ...Fonts.black16Regular,
            marginLeft: Sizes.fixPadding + 5.0,
          }}
        >
          {/* Product Details */}
        </Text>
      </View>
    );
  }

  function payInfo() {
    return (
      <View style={styles.payInfoContainerStyle}>
        <Text style={{ ...Fonts.black20Bold }}> Total Pay: $39</Text>
      </View>
    );
  }

  function doctors() {
    const renderItem = ({ item }) => {
      return (
        <View style={{ justifyContent: "center", marginTop: 15.0 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.doctorImageContainerStyle}>
              <Image
                // source={item.image}
                source={item.product.image}
                // resizeMode="contain"
                resizeMode="cover"
                style={{
                  height: 109.0,
                  width: 109.0,
                  borderRadius: 75.0,
                  overflow: "hidden",
                }}
              />
            </View>
            <View>
              {/* <Text style={{ ...Fonts.black16Bold }}>{item.name}</Text> */}
              <Text style={{ ...Fonts.black16Bold }}>{item.product.name}</Text>

              {/* <Text
                style={{
                  ...Fonts.gray17Regular,
                  marginTop: Sizes.fixPadding - 7.0,
                }}
              >
                {type}
              </Text> */}
              <Text
                style={{
                  ...Fonts.gray17Regular,
                  marginTop: Sizes.fixPadding - 7.0,
                }}
              >
                ${item.product.price}
              </Text>
              {/* <Text
                style={{
                  ...Fonts.primaryColor16Regular,
                  marginTop: Sizes.fixPadding - 7.0,
                }}
              >
                {item.yearsOfExperience} Years Experience
              </Text> */}
              <Text
                style={{
                  ...Fonts.primaryColor16Regular,
                  marginTop: Sizes.fixPadding - 7.0,
                }}
              >
                Quantity: {item.quantity}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: Sizes.fixPadding - 7.0,
                }}
              >
                <FontAwesome name="star" size={20} color="#CDDC39" />
                <Text
                  style={{
                    ...Fonts.black16Regular,
                    marginLeft: Sizes.fixPadding,
                    marginRight: Sizes.fixPadding * 2.0,
                  }}
                >
                  {item.rating}
                </Text>
                <MaterialIcons name="rate-review" size={24} color="gray" />
                <Text
                  style={{
                    ...Fonts.black16Regular,
                    marginLeft: Sizes.fixPadding,
                  }}
                >
                  {item.reviews} Reviews
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.bookContainerStyle}>
            <TouchableOpacity
              activeOpacity={0.99}
              onPress={() =>
                navigation.navigate("TimeSlots", {
                  image: item.image,
                  name: item.name,
                  type: type,
                  experience: item.yearsOfExperience,
                  rating: item.rating,
                })
              }
            >
              {/* <View style={styles.bookVideoConsultButtonStyle}>
                <Text style={{ ...Fonts.orangeColorBold }}>
                  Book Video Consult
                </Text>
              </View> */}
            </TouchableOpacity>
            {/* <TouchableOpacity
              activeOpacity={0.99}
              onPress={() =>
                navigation.navigate("TimeSlots", {
                  image: item.image,
                  name: item.name,
                  type: type,
                  experience: item.yearsOfExperience,
                  rating: item.rating,
                })
              }
            >
              <View style={styles.bookAppointmentButtonStyle}>
                <Text style={{ ...Fonts.primaryColorBold }}>
                  Book Appointment
                </Text>
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity
              activeOpacity={0.99}
              onPress={() => {
                // alert("hi kaka");
                [
                  props.cartItems2.cartItems.removeFromCart(item),
                  setForRendering(true),
                ];
              }}
              // onPress={() =>
              //   navigation.navigate("TimeSlots", {
              //     image: item.image,
              //     name: item.name,
              //     type: type,
              //     experience: item.yearsOfExperience,
              //     rating: item.rating,
              //   })
              // }
            >
              <View style={styles.bookAppointmentButtonStyle}>
                <Text style={{ ...Fonts.primaryColorBold }}>Delete</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.dividerStyle}></View>
        </View>
      );
    };

    return (
      <FlatList
        // data={doctorsList}
        data={propedCartItem}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
      />
    );
  }

  function addToCartButton() {
    return (
      <View style={styles.addButton}>
        <TouchableOpacity
          activeOpacity={0.99}
          // onPress={() => navigation.goBack()}
          style={{ ...styles.addButtonStyle }}
          // onPress={() => {
          //   props.addItemToCart(propedItem, qty);
          //   // Toast.show({
          //   //   topOffset: 60,
          //   //   type: "success",
          //   //   text1: `${item.name} added to Cart`,
          //   //   text2: "Go to your cart to complete order",
          //   // });
          // }}
        >
          <Text style={{ ...Fonts.white17Bold }}>Clear All</Text>
        </TouchableOpacity>
        {/* <Text style={{ ...styles.totalPriceStyle, ...Fonts.pinkColor20Bold }}>
          <Text style={{ ...Fonts.black18Regular }}>Total:</Text> $
          {"totalPrice"}
        </Text> */}
        {context.stateUser.isAuthenticated ? (
          <TouchableOpacity
            activeOpacity={0.99}
            // onPress={() => navigation.goBack()}
            style={{ ...styles.addButtonStyle }}
            onPress={() => {
              props.cartItems.navigation.navigate("Consultation");
              // Toast.show({
              //   topOffset: 60,
              //   type: "success",
              //   text1: `${item.name} added to Cart`,
              //   text2: "Go to your cart to complete order",
              // });
            }}
          >
            <Text style={{ ...Fonts.white17Bold }}>
              Check Out{"    "}
              {/* <MaterialCommunityIcons
                // style={{ marginLeft: 10 }}
                name="cart-plus"
                size={24}
                color="white"
              /> */}
              {/* {props.cartItems.map((x) => {
                return x.quantity;
              })} */}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.99}
            // onPress={() => navigation.goBack()}
            style={{ ...styles.addButtonStyle }}
            onPress={() => {
              props.cartItems.navigation.navigate("Consultation");
              // Toast.show({
              //   topOffset: 60,
              //   type: "success",
              //   text1: `${item.name} added to Cart`,
              //   text2: "Go to your cart to complete order",
              // });
            }}
          >
            <Text style={{ ...Fonts.white17Bold }}>
              Log In{"    "}
              {/* <MaterialCommunityIcons
                // style={{ marginLeft: 10 }}
                name="cart-plus"
                size={24}
                color="white"
              /> */}
              {/* {props.cartItems.map((x) => {
                return x.quantity;
              })} */}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  function totalPricee() {
    return (
      <View style={styles.addButton}>
        <Text style={{ ...styles.totalPriceStyle, ...Fonts.pinkColor20Bold }}>
          <Text>Total:</Text> ${"totalPrice"}
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  pasetCircleStyle: {
    height: 90.0,
    width: 90.0,
    borderRadius: 45.0,
    backgroundColor: "#E9EBFE",
    borderColor: Colors.primary,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10.0,
  },
  activeCircleStyle: {
    height: 90.0,
    width: 90.0,
    borderRadius: 45.0,
    backgroundColor: "#E8F5E9",
    borderColor: "#8ECC90",
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10.0,
  },
  cancellCircleStyle: {
    height: 90.0,
    width: 90.0,
    borderRadius: 45.0,
    backgroundColor: "#FFEBEE",
    borderColor: "#F88C85",
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10.0,
  },
  noActiveDataContainerStyle: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: Sizes.fixPadding * 2.0,
    justifyContent: "center",
    alignItems: "center",
  },
  dialogStyle: {
    height: 110.0,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  dialogNoButtonStyle: {
    flex: 0.5,
    backgroundColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
    height: 50.0,
    borderRadius: 8.0,
    marginRight: 15.0,
  },
  dialogYesButtonStyle: {
    flex: 0.5,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    height: 50.0,
    borderRadius: 8.0,
    marginLeft: 15.0,
  },
  dialogContainerStyle: {
    borderRadius: Sizes.fixPadding,
    width: width - 90,
    paddingHorizontal: Sizes.fixPadding * 3.0,
    paddingTop: -Sizes.fixPadding,
    paddingBottom: Sizes.fixPadding * 2.0,
  },
  headerSearchStyle: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: Sizes.fixPadding,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    alignItems: "center",
    paddingVertical: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding,
  },
  headerContainerStyle: {
    backgroundColor: "white",
    flexDirection: "row",
    height: 40.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding,
    alignItems: "center",
  },
  doctorImageContainerStyle: {
    height: 110.0,
    width: 110.0,
    borderRadius: 75.0,
    backgroundColor: "white",
    borderColor: "#B3BCFC",
    borderWidth: 1.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding + 3.0,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: Sizes.fixPadding,
    elevation: 20.0,
    overflow: "hidden",
  },
  bookContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  bookVideoConsultButtonStyle: {
    width: width / 2 - 30,
    borderColor: "#FF9B07",
    borderWidth: 1.0,
    backgroundColor: "#FFEDD2",
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
    alignItems: "center",
  },
  bookAppointmentButtonStyle: {
    width: width / 2 - 30,
    borderColor: Colors.primary,
    borderWidth: 1.0,
    backgroundColor: "#E3E6FE",
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
    alignItems: "center",
  },
  dividerStyle: {
    backgroundColor: Colors.lightGray,
    height: 0.8,
    marginTop: Sizes.fixPadding * 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
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
  productInfoContainerStyle: {
    // backgroundColor: 'red',
    alignItems: "center",
    // flexDirection: 'row',
    // paddingHorizontal: Sizes.fixPadding,
    // marginVertical: Sizes.fixPadding,
  },
  productInfo: {
    // flex: 1,
    height: height,
    flexDirection: "column",
    padding: 10,
    // borderRadius: 10,
    marginTop: -10,
    padding: Sizes.fixPadding + 5.0,
    // marginLeft: 10,
    // alignItems: 'center',
    // elevation: 4,
    backgroundColor: "#F4F4F5",
    // backgroundColor: 'pink',

    borderTopLeftRadius: Sizes.fixPadding + 5.0,
    borderTopRightRadius: Sizes.fixPadding + 5.0,
    // overflow: 'hidden',
  },
  image: {
    width: width - 20,
    height: width - 100,
    // backgroundColor: 'transparent',
    borderTopLeftRadius: Sizes.fixPadding + 5.0,
    borderTopRightRadius: Sizes.fixPadding + 5.0,
    borderBottomLeftRadius: Sizes.fixPadding + 5.0,
    borderBottomRightRadius: Sizes.fixPadding + 5.0,
    // position: 'absolute',
    // top: -45
  },
  favoritecircle: {
    marginTop: Sizes.fixPadding - 100,
    marginRight: 12,
    borderRadius: 100,
    backgroundColor: Colors.pink,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    flexDirection: "row",
  },

  input: {
    width: 35,
    height: 35,
    backgroundColor: Colors.whiteColor,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.primary,
  },
  // addressTextStyle: {
  //   marginHorizontal: Sizes.fixPadding * 2.0,
  //   marginVertical: Sizes.fixPadding,
  //   backgroundColor: '#000000',
  // },
  // mapContainerStyle: {
  //   borderRadius: Sizes.fixPadding + 5.0,
  //   marginTop: 5,
  //   overflow: 'hidden',
  //   backgroundColor: '#000000',
  //   elevation: 3.0,
  //   marginHorizontal: Sizes.fixPadding * 2.0,
  // },
  // facilitiesContainerStyle: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginHorizontal: Sizes.fixPadding * 2.0,
  //   marginBottom: Sizes.fixPadding - 3.0,
  //   borderTopLeftRadius: Sizes.fixPadding + 5.0,
  //   borderTopRightRadius: Sizes.fixPadding + 5.0,
  //   backgroundColor: 'pink',
  // },
  addButton: {
    position: "absolute",
    alignSelf: "flex-end",
    height: 60.0,
    backgroundColor: "white",
    bottom: 0.0,
    left: 0.0,
    right: 0.0,
    flexDirection: "row",
    flex: 1,
    borderTopColor: Colors.lightGray,
    borderTopWidth: 0.5,
    paddingVertical: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding,
  },
  totalPriceStyle: {
    flex: 0.5,
    backgroundColor: "white",
    marginVertical: Sizes.fixPadding - 5,
  },
  addButtonStyle: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.fixPadding + 5,
    elevation: 2.0,
    backgroundColor: Colors.primary,
  },
  badge: {
    width: 20,
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    top: -1,
    right: -10,
    backgroundColor: "red",
  },
  text: {
    fontSize: 15,
    width: 9,
    fontWeight: "bold",
    color: "white",
  },
  //
  payInfoContainerStyle: {
    // height: 70.0,
    // backgroundColor: "#D2D5EE",
    // justifyContent: "center",
    // paddingHorizontal: 20.0,
    // borderRadius: 15,

    position: "absolute",
    alignSelf: "flex-end",
    height: 60.0,
    backgroundColor: "#D2D5EE",
    bottom: 60.0,
    left: 0.0,
    right: 0.0,
    flexDirection: "row",
    flex: 1,
    borderTopColor: Colors.lightGray,
    borderTopWidth: 0.5,
    paddingVertical: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding,
    borderRadius: 15,
  },
});
const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
  };
};
export default TabBarScreen;

// export default connect(mapStateToProps, mapDispatchToProps)(Cart);
// export default connect(mapStateToProps, mapDispatchToProps)(Cart);
