import React from "react";
import { View } from "react-native";

const CardItem = (props) => {
  const { itemStyle } = styles;
  const style= props.style !== undefined ? props.style : {};

  return (
    <View 
        display={props.display || "flex"} 
        style={[itemStyle, style]}
    >
      {props.children}
    </View>
  );
};

const styles = {
  itemStyle: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    position: "relative",
  },
};
export { CardItem };
