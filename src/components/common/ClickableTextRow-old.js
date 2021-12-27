import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {DEVICE_OS, iOS} from '../../actions/constants';

export const ClickableTextRow = props => {
  const {inputTextStyle, labelStyle, containerStyle} = styles;
  const {label, onPress, placeholder, value} = props;
  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <Text style={[labelStyle, props.labelStyle]}>{label}</Text>
      <View
        style={{
          minHeight: 43,
          height: 40,
          // marginLeft: 4,
          // backgroundColor: '#ae9d85',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}>
        <Text
          style={[
            inputTextStyle,
            {
              color: value != null ? '#111' : '#b6b9bf',
            },
          ]}>
          {value != null ? value : placeholder}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  containerStyle: {
    height: 65,
    alignSelf: 'stretch',
    marginLeft: 49,
    marginRight: 45,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  inputTextStyle: {
    fontFamily: 'SFUIText-Regular',
    color: '#111',
    fontSize: 15,
  },
  inputStyle: {
    // placeholderTextColor: '#b6b9bf',
    fontFamily: 'SFUIText-Regular',
    flex: 1,
    marginLeft: 4,
  },
  labelStyle: {
    marginBottom: 2,
    paddingTop: 0,
    height: 20,
    fontFamily: 'SFUIText-Medium',
    fontSize: 14,
    color: '#423486',
    alignSelf: 'stretch',
  },
};
