import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {DEVICE_OS, iOS} from '../../actions/constants';

export const CustomTextRow = props => {
  const {inputTextStyle, labelStyle, containerStyle} = styles;
  const {label, onPress, placeholder, value} = props;
  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <Text style={[labelStyle, props.labelStyle]}>{label}</Text>
      <View style={styles.inputContainer}>
        <Text
          style={[
            styles.input,
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
    height: 50,
    marginHorizontal: 45,
    marginTop: 15,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  inputContainer: {
    minHeight: 43,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  input: {
    // placeholderTextColor: '#b6b9bf',
    fontFamily: 'SFUIText-Regular',
    color: '#111',
    fontSize: 15,
    lineHeight: 18,
    flex: 1,
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
