import React from "react";
import { StyleSheet } from "react-native";
import { Badge, Text } from "native-base";

import { connect } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";

const FavIcon = (props) => {
  return (
    <>
      {props.favItems.length ? (
        <Badge
          style={styles.badge}
          rounded="full"
          h={6}
          paddingRight={4}
          marginBottom={4}
        >
          <Text style={styles.text}>{props.favItems.length}</Text>
        </Badge>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  const { favItems } = state;
  return {
    favItems: favItems,
  };
};

const styles = StyleSheet.create({
  badge: {
    width: 20,
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    top: -1,
    right: -16,
    backgroundColor: "red",
  },
  text: {
    fontSize: 15,
    width: 9,
    fontWeight: "bold",
    color: "white",
  },
});

export default connect(mapStateToProps)(FavIcon);
