import React from "react";
import { View, Text, TextInput } from "react-native";

const CustomInput = (props) => {
  const { labelStyle, containerStyle } = styles;
  const { label, placeholder, value, onChangeText, secureTextEntry } = props;
  return (
    <View style={containerStyle}>
      <Text style={[labelStyle]}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          {...props}
          placeholderTextColor="#b6b9bf"
          multiline={false}
          onSubmitEditing={() => {}}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChangeText}
          style={styles.input}
        />
      </View>
    </View>
  );
};

const styles = {
  containerStyle: {
    // backgroundColor: '#909087',
    height: 50,
    marginHorizontal: 45,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  inputContainer: {
    minHeight: 43,
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  input: {
    fontFamily: "SFUIText-Regular",
    color: "#111",
    fontSize: 15,
    lineHeight: 18,
    flex: 1,
    paddingLeft: 0,
  },
  labelStyle: {
    marginBottom: 2,
    paddingTop: 0,
    height: 20,
    fontFamily: "SFUIText-Medium",
    fontSize: 14,
    color: "#423486",
    alignSelf: "stretch",
  },
};

export { CustomInput };
