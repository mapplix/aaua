import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { DEVICE_OS, iOS } from "../../actions/constants";

class PasswordInput extends Component {
  state = { hidePass: true };

  managePasswordVisibility = () => {
    this.setState({ hidePass: !this.state.hidePass });
  };

  render() {
    const { inputStyle, labelStyle, containerStyle, inputContainer } = styles;
    const { label, placeholder, value, onChangeText } = this.props;
    return (
      <View style={containerStyle}>
        <Text style={[labelStyle, this.props.labelStyle]}>{label}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor="#b6b9bf"
            placeholder={placeholder}
            secureTextEntry={this.state.hidePass}
            value={value}
            onChangeText={onChangeText}
            style={styles.input}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.visibilityBtn}
            onPress={this.managePasswordVisibility}
          >
            <Image
              source={
                this.state.hidePass
                  ? require("../../images/hide.png")
                  : require("../../images/view.png")
              }
              style={styles.btnImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  inputContainer: {
    minHeight: 43,
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    // placeholderTextColor: '#b6b9bf',
    fontFamily: "SFUIText-Regular",
    color: "#111",
    fontSize: 15,
    lineHeight: 18,
    flex: 1,
    paddingLeft: 0,
  },
  containerStyle: {
    // backgroundColor:"#289",
    height: 63,
    marginLeft: 45,
    marginRight: 45,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  labelStyle: {
    // backgroundColor: '#283',
    // marginLeft: 4,
    marginBottom: 2,
    paddingTop: 0,
    height: 22,
    fontFamily: "SFUIText-Medium",
    fontSize: 14,
    color: "#423486",
    width: 160,
  },
  visibilityBtn: {
    position: "absolute",
    right: 3,
    height: 30,
    width: 25,
  },
  btnImage: {
    resizeMode: "contain",
    height: "100%",
    width: "100%",
  },
  inputContainer: {
    height: 40,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: DEVICE_OS == iOS ? "center" : "flex-start",
  },
  inputStyle: {
    // placeholderTextColor: '#b6b9bf',
    paddingTop: 0,
    marginTop: 0,
    fontFamily: "SFUIText-Regular",
    color: "#111",
    fontSize: 15,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
};

export { PasswordInput };
