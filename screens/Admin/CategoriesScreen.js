import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TextInput,
  StyleSheet,
  Button,
  SafeAreaView,
} from "react-native";
// import EasyButton from "../Shared/StyledComponents/EasyButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../assets/common/baseUrl";
import { StatusBar } from "react-native";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";

// import { add } from "react-native-reanimated";

var { width } = Dimensions.get("window");

const Item = (props) => {
  return (
    <View style={styles.item}>
      <Text>{props.item.name}</Text>
      {/* <EasyButton danger medium onPress={() => props.delete(props.item._id)}>
        <Text styel={{ color: "white", fontWeight: "bold" }}>Delete</Text>
      </EasyButton> */}
      <Button
        color="red"
        fontWeight="bold"
        title="Delete"
        onPress={() => props.delete(props.item._id)}
      >
        {/* <Text styel={{ color: "white", fontWeight: "bold" }}>Delete</Text> */}
      </Button>
    </View>
  );
};

const CategoriesScreen = (props) => {
  console.log(props);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    axios
      .get(`${baseURL}categories`)
      .then((res) => setCategories(res.data))
      .catch((error) => alert("Error to load Categories"));

    return () => {
      setCategories();
      setToken();
    };
  }, []);
  console.log(categories);

  // add
  const addCategory = () => {
    const category = {
      name: categoryName,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${baseURL}categories`, category, config)
      .then((res) => setCategories([...categories, res.data]))
      .catch((error) => alert("Error to load categories"));
    // to clean up the box after adding
    setCategoryName("");
  };

  const deleteCategory = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`${baseURL}categories/${id}`, config)
      .then((res) => {
        const newCategories = categories.filter((item) => item.id !== id);
        setCategories(newCategories);
      })
      .catch((error) => alert("Error to load categories"));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor={Colors.primary} />
      {header()}
      {categoryOfProducts()}
    </SafeAreaView>
  );

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

  function categoryOfProducts() {
    return (
      <View style={{ position: "relative", height: "100%" }}>
        <View style={{ marginBottom: 60 }}>
          <FlatList
            data={categories}
            renderItem={({ item, index }) => (
              // <Text>{item.name}</Text>
              <Item item={item} index={index} delete={deleteCategory} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View style={styles.bottomBar}>
          <View>
            <Text>Add Category here</Text>
          </View>

          <View styel={{ width: width / 2.5 }}>
            <TextInput
              value={categoryName}
              style={styles.input}
              onChangeText={(text) => setCategoryName(text)}
            />
          </View>
          {/* <EasyButton medium primary onPress={() => addCategory()}>
          <Text styel={{ color: "white", fontWeight: "bold" }}>Submit</Text>
        </EasyButton> */}
          <Button type="button" title="Submit" onPress={() => addCategory()}>
            {/* <Text styel={{ color: "white", fontWeight: "bold" }}>Submit</Text> */}
          </Button>

          <View></View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: "white",
    width: width,
    height: 60,
    padding: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  input: {
    height: 40,
    width: width / 3,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  item: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
    padding: 5,
    margin: 5,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 5,
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
// export default Categories;
export default CategoriesScreen;
