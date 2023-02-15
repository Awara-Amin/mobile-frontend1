import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";

// import Icon from "react-native-vector-icons/FontAwesome";
// import { useFocusEffect } from "@react-navigation/native";
// import ListItem from "./ListItem";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import EasyButton from "../Shared/StyledComponents/EasyButton";
import { useFocusEffect } from "@react-navigation/native";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";

import UsersList from "./UsersList";
import { StatusBar } from "react-native";

var { height, width } = Dimensions.get("window");

const ListHeader = () => {
  return (
    <View elevation={1} style={styles.listHeader}>
      <View style={styles.headerItem}></View>

      {/* <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>ID</Text>
      </View> */}

      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Name</Text>
      </View>

      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Phone/EMAIL</Text>
      </View>

      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>IS ADMIN</Text>
      </View>
    </View>
  );
};

const UsersScreen = (props) => {
  const [ourUsers, setOurUsers] = useState([]);
  const [userFilter, setUserFilter] = useState([]);
  const [token, setToken] = useState();

  const [phone, setPhone] = useState();
  const [isDoctor, setIsDoctor] = useState();

  const [userId, setUserId] = useState();
  const [isAdmin, setIsAdmin] = useState();
  // const toast = useToast();

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));

      axios
        .get(`${baseURL}users`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log("kakakakakakakakakak 11111");
          console.log(res.data);
          setOurUsers(res.data);
          setUserFilter(res.data);
        })
        //   .catch((error) => alert("Error to load Users kaka"));
        .catch((error) => console.log(error));

      return () => {
        setOurUsers([]);
        setUserFilter([]);
        setToken();
      };
    }, [])
  );
  console.log(ourUsers);

  const deleteUser = (id) => {
    axios
      // .delete(`${baseURL}products/${id}`, {
      .delete(`${baseURL}users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const users = userFilter.filter((item) => item.id !== id);
        setUserFilter(users);
      })
      .catch((error) => console.log(error));
  };

  // the Ui
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor={Colors.primary} />
      <View>
        {header()}
        {listOfUsers()}
      </View>
      {/* <View style={styles.container}>
        <View>
          <FlatList
            data={ourUsers}
            ListHeaderComponent={ListHeader}
            renderItem={
              ({ item, index }) => (
                // <Text>{item.name}</Text>
                <UsersList
                  {...item}
                  navigation={props.navigation}
                  index={index}
                  // delete={deleteProduct}
                  delete={deleteUser}
                />
              )

              // <Item item={item} index={index} />
            }
            keyExtractor={(item) => item.id}
          />
        </View>

        <View>
          <Text> here is inside User</Text>
        </View>
      </View> */}
    </SafeAreaView>
  );

  function listOfUsers() {
    return (
      <View style={styles.container}>
        <View>
          <FlatList
            data={userFilter}
            ListHeaderComponent={ListHeader}
            renderItem={
              ({ item, index }) => (
                // <Text>{item.name}</Text>
                <UsersList
                  {...item}
                  navigation={props.navigation}
                  index={index}
                  // delete={deleteProduct}
                  delete={deleteUser}
                />
              )

              // <Item item={item} index={index} />
            }
            keyExtractor={(item) => item.id}
          />
        </View>

        <View>
          <Text> here is inside User</Text>
        </View>
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
  buttonContainer: {
    margin: 20,
    alignSelf: "center",
    flexDirection: "row",
  },
  buttonText: {
    marginLeft: 4,
    color: "white",
  },

  inputview: {
    height: 60,

    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#E7EAED",
    padding: 0,
  },

  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#fff",
    margin: 10,
    borderColor: "#ccc",
    borderWidth: 0,
    borderRadius: 15,
    fontSize: 16,
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
});
//  user3@email.com   123456
// export default Users;
export default UsersScreen;
