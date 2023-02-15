import { FontAwesome } from "@expo/vector-icons";
import { HStack, Text, Box } from "native-base";
import React, { useEffect, useState } from "react";
import { Colors } from "../constant/styles";
// import Colors from "../../Shared/StyledComponents/color";

function Rating(props) {
  const size = 15;
  const color = Colors.yellow;
  const { value, text } = props;

  // const value = useState(x);
  // useEffect(() => {
  //   setValue(x);
  // });
  // console.log("value eeeeeeeeeeeeeee");
  // console.log(value);
  // console.log(typeof value);
  return (
    // <Text>hi kaka</Text>
    <Box>
      <HStack space={0.4} mt={1} alignItems="center">
        <FontAwesome
          name={value >= 1 ? "star" : value >= 0.5 ? "star-half-o" : "star-o"}
          color={color}
          size={size}
        />

        <FontAwesome
          name={value >= 2 ? "star" : value >= 1.5 ? "star-half-o" : "star-o"}
          color={color}
          size={size}
        />

        <FontAwesome
          name={value >= 3 ? "star" : value >= 2.5 ? "star-half-o" : "star-o"}
          color={color}
          size={size}
        />

        <FontAwesome
          name={value >= 4 ? "star" : value >= 3.5 ? "star-half-o" : "star-o"}
          color={color}
          size={size}
        />

        <FontAwesome
          name={value >= 5 ? "star" : value >= 4.5 ? "heart-half-o" : "star-o"}
          color={color}
          size={size}
        />
        {/* {text && (
        <Text fontSize={12} ml={2}>
          {text && text}
        </Text>
      )} */}
        {/* <Text fontSize={12} ml={2}>
        {text && text}
      </Text> */}
      </HStack>
    </Box>
  );
}

export default Rating;
