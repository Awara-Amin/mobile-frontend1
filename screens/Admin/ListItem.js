import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableHightLight,
  TouchableOpacity,
  Dimensions,
  Button,
  Modal,
} from "react-native";

import { Image } from "native-base";
import { MaterialIcons, Entypo, Ionicons } from "@expo/vector-icons";

import Icon from "react-native-vector-icons/FontAwesome";
import { Colors, Sizes, Fonts } from "../../constant/styles";
// import EasyButton from "../Shared/StyledComponents/EasyButton";

var { width } = Dimensions.get("window");

// function divider() {
//   return (
//       <View style={styles.dividerStyle}>
//       </View>
//   )
// }

const ListItem = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [test, setTest] = useState(props);
  console.log("props aaaaaaaaaaaaaaaaaaaaa 2");
  // console.log(props);
  console.log(test.brand);
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
        alt="image"
        source={{
          uri: test.image
            ? test.image
            : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
        }}
        //   resizeMode="contain"
        //   style={styles.image}
        //   alt={props.name}
        //   source={{ uri: productFilter.image }}
        // source={props.image}
      />
      <View style={styles.labInformationContainer}>
        <Text
          numberOfLines={2}
          style={{ ...Fonts.grayBold, marginTop: Sizes.fixPadding - 5.0 }}
        >
          <Text style={styles.price}>{test.brand}</Text>
        </Text>
        <View style={styles.dividerStyle}></View>
        <View style={styles.callNowButtonStyle}>
          <Text style={{ ...Fonts.primaryColorBold }}>${test.price}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            marginLeft: 15,
            marginTop: 15,
          }}
        >
          {/* {props.countInStock > 0 ? ( */}
          <View style={styles.editeAndDelete}>
            <TouchableOpacity
              style={styles.addcircle}
              onPress={() => [
                props.navigation.navigate("ProductForm", { item: props }),
              ]}
              // onPress={() => {
              //   alert("edite");
              //   props.delete(test.id);

              //   //   // Toast.show({
              //   //   //   topOffset: 60,
              //   //   //   type: "success",
              //   //   //   text1: `${item.name} added to Cart`,
              //   //   //   text2: "Go to your cart to complete order",
              //   //   // });
              // }}
            >
              <Entypo
                style={{
                  paddingRight: 10,
                }}
                name="edit"
                size={24}
                color="red"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addcircle}
              onPress={() => {
                alert("delete");
                props.delete(test._id);

                //   props.addItemToCart(props, qty);
                //   // Toast.show({
                //   //   topOffset: 60,
                //   //   type: "success",
                //   //   text1: `${item.name} added to Cart`,
                //   //   text2: "Go to your cart to complete order",
                //   // });
              }}
            >
              <Icon
                style={{
                  paddingLeft: 10,
                }}
                name="edit"
                size={24}
                color="red"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* <View></View> */}
    </View>
    // <View>
    //   <Modal
    //     AnimationType="fade"
    //     transparent={true}
    //     visible={modalVisible}
    //     onRequestClose={() => {
    //       setModalVisible(false);
    //     }}
    //   >
    //     <View style={styles.centeredView}>
    //       <View style={styles.modalView}>
    //         <TouchableOpacity
    //           underlayColor="#E8E8E8"
    //           onPress={() => {
    //             setModalVisible(false);
    //           }}
    //           style={{
    //             alignSelf: "flex-end",
    //             position: "absolute",
    //             top: 5,
    //             right: 10,
    //           }}
    //         >
    //           <Icon name="close" size={20} />
    //         </TouchableOpacity>

    //         <Button
    //           title="Edit"
    //           onPress={() => [
    //             props.navigation.navigate("ProductForm", { item: props }),
    //             setModalVisible(false),
    //           ]}
    //         />
    //         <Button
    //           title="Delete"
    //           onPress={() => [
    //             // props.navigation.navigate("ProductForm"),
    //             alert("Hi"),
    //             setModalVisible(false),
    //           ]}
    //         />
    //         {/* <EasyButton
    //           medium
    //           secondary
    //           onPress={() => [
    //             props.navigation.navigate("ProductForm", { item: props }),
    //             setModalVisible(false),
    //           ]}
    //         >
    //           <Text style={styles.textStyle}>Edit</Text>
    //         </EasyButton> */}

    //         {/* <EasyButton
    //           medium
    //           danger
    //           onPress={() => [props.delete(props._id), setModalVisible(false)]}
    //         >
    //           <Text style={styles.textStyle}>Delete</Text>
    //         </EasyButton> */}
    //       </View>
    //     </View>
    //   </Modal>

    //   <TouchableOpacity
    //     onPress={() => {
    //       props.navigation.navigate("Product Detail", { item: props });
    //     }}
    //     onLongPress={() => setModalVisible(true)}
    //     style={[
    //       styles.container,
    //       { backgroundColor: props.index % 2 == 0 ? "white" : "gainsboro" },
    //     ]}
    //   >
    //     <Image
    //       source={{
    //         uri: test.image
    //           ? test.image
    //           : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
    //       }}
    //       resizeMode="contain"
    //       style={styles.image}
    //       alt={props.name}
    //     />
    //     <Text style={styles.item}>{test.brand}</Text>
    //     <Text style={styles.item}>{test.name}</Text>
    //     <Text style={styles.item}>{test.countInStock}</Text>
    //     <Text style={styles.item}>{test.price}</Text>
    //     {/* <Text numberOfLines={1} ellipse="tail">
    //       {props.name}
    //     </Text> */}

    //     {/* <Text style={styles.item} numberOfLines={1} ellipse="tail">
    //    {props.category.name}

    //     </Text> */}

    //     {/* <Text style={styles.item}>${props.price}</Text> */}
    //   </TouchableOpacity>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    width: width,
  },

  image: {
    borderRadius: 50,
    width: width / 6,
    height: 20,
    margin: 2,
    resizeMode: "contain",
  },

  item: {
    flexWrap: "wrap",
    margin: 3,
    width: width / 6,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
  labAndCheckUpContainer: {
    flexDirection: "row",
    height: 120.0,
    width: width,
    alignSelf: "center",
    borderRadius: 20,
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
  editeAndDelete: {
    flexDirection: "row",
    justifyContent: "space-between",
    // height: 120.0,
    // width: width,
    alignSelf: "center",
    // borderRadius: 20,
    // backgroundColor: "white",
    // borderColor: Colors.lightGray,
    // borderWidth: 1.0,
    // shadowColor: "black",
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 0.5,
    // shadowRadius: 10,
    // elevation: 4.0,
    // marginBottom: 20.0,
    // overflow: "hidden",
    marginLeft: 50,
  },
  labInformationContainer: {
    marginLeft: Sizes.fixPadding,
    marginRight: Sizes.fixPadding,
    width: width - 220,
    marginTop: Sizes.fixPadding + 5.0,
  },
  dividerStyle: {
    backgroundColor: "black",
    height: 0.9,
    width: "80%",
    marginBottom: Sizes.fixPadding,
  },
});

export default ListItem;
