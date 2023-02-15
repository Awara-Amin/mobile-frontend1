import React from "react";
import {
  Text,
  View,
  Image,
  StatusBar,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Fonts, Colors, Sizes } from "../../constant/styles";

const doctorsList = [
  {
    id: "1",
    image: require("../../assets/images/doctor/doctor-1.png"),
    name: "Dr.Ronan Peiterson",
    message: "Hello, How can i help you?",
    time: "1d ago",
    isActive: true,
  },
  {
    id: "2",
    image: require("../../assets/images/doctor/doctor-2.png"),
    name: "Dr.Brayden Trump",
    message: "Okay",
    time: "1d ago",
    isActive: false,
  },
  {
    id: "3",
    image: require("../../assets/images/doctor/doctor-3.png"),
    name: "Dr.Apollonia Ellison",
    message: "Good",
    time: "5d ago",
    isActive: false,
  },
  {
    id: "4",
    image: require("../../assets/images/doctor/doctor-4.png"),
    name: "Dr.Beatriz Waston",
    message: "Take Care.",
    time: "1w ago",
    isActive: false,
  },
  {
    id: "5",
    image: require("../../assets/images/doctor/doctor-1.png"),
    name: "Dr.Ronan Peiterson",
    message: "Hello, How can i help you?",
    time: "1d ago",
    isActive: true,
  },
  {
    id: "6",
    image: require("../../assets/images/doctor/doctor-2.png"),
    name: "Dr.Brayden Trump",
    message: "Okay",
    time: "1d ago",
    isActive: false,
  },
  {
    id: "7",
    image: require("../../assets/images/doctor/doctor-3.png"),
    name: "Dr.Apollonia Ellison",
    message: "Good",
    time: "5d ago",
    isActive: false,
  },
  {
    id: "8",
    image: require("../../assets/images/doctor/doctor-4.png"),
    name: "Dr.Beatriz Waston",
    message: "Take Care.",
    time: "1w ago",
    isActive: false,
  },
];

const ChatScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar translucent={false} backgroundColor={Colors.primary} />
      <View style={styles.headerContainerStyle}>
        <Text
          style={{
            ...Fonts.black20Bold,
            marginHorizontal: Sizes.fixPadding * 2.0,
          }}
        >
          Chats
        </Text>
      </View>
      {doctors()}
    </SafeAreaView>
  );

  function doctors() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate("Message", { name: item.name })}
        >
          <View
            style={{
              marginHorizontal: Sizes.fixPadding * 2.0,
              marginTop: Sizes.fixPadding * 2.0,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={styles.imageContainerStyle}>
                  <Image
                    source={item.image}
                    style={{
                      width: 80.0,
                      height: 80.0,
                      borderRadius: Sizes.fixPadding * 4.0,
                    }}
                    resizeMode="contain"
                  />
                </View>
                <View style={{ marginLeft: Sizes.fixPadding }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ ...Fonts.black16Bold }}>{item.name}</Text>
                    {item.isActive == true ? (
                      <View
                        style={{
                          width: Sizes.fixPadding,
                          height: Sizes.fixPadding,
                          borderRadius: Sizes.fixPadding - 5.0,
                          backgroundColor: Colors.primary,
                          marginLeft: Sizes.fixPadding - 5.0,
                        }}
                      ></View>
                    ) : null}
                  </View>
                  <Text style={{ ...Fonts.gray14Regular }}>{item.message}</Text>
                </View>
              </View>
              <Text style={{ ...Fonts.gray14Regular }}>{item.time}</Text>
            </View>
            <View
              style={{
                height: 0.5,
                backgroundColor: Colors.lightGray,
                marginTop: Sizes.fixPadding * 2.0,
              }}
            />
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <FlatList
        data={doctorsList}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
      />
    );
  }
};

const styles = StyleSheet.create({
  imageContainerStyle: {
    width: 80.0,
    height: 80.0,
    borderRadius: Sizes.fixPadding * 4.0,
    borderColor: "#B3BCFC",
    borderWidth: 1.0,
    overflow: "hidden",
  },
  headerContainerStyle: {
    height: 55.0,
    width: "100%",
    justifyContent: "center",
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1.0,
  },
});

export default ChatScreen;
