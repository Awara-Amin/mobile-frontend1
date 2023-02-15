import React from "react";
import { Text, View, SafeAreaView } from "react-native";
import { Fonts, Sizes } from "../../constant/styles";
import TabBarScreen from "../../components/TabBarScreen";

const ScheduleScreen = (props) => {
  // console.log("inside ScheduleScreen 1");
  // console.log(props);
  const selecetsItems = props.route.params;
  // console.log("inside ScheduleScreen 2");
  // console.log(selecetsItems);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ height: 55.0, justifyContent: "center" }}>
        <Text
          style={{
            ...Fonts.black20Bold,
            marginHorizontal: Sizes.fixPadding * 2.0,
          }}
        >
          {/* Appointments */}
          Cart
        </Text>
      </View>
      <TabBarScreen cartItems={props} cartItems2={selecetsItems} />
    </SafeAreaView>
  );
};

export default ScheduleScreen;
