import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {DEVICE_OS, iOS} from '../../actions/constants';
import styles from './styles';

const Input = props => {
  const {inputStyle, labelStyle, wrapper, inputWrapper, labelWrapper} = styles;
  const {
    label,
    value,
    placeholder,
    secureTextEntry,
    onChangeText,
    customLabelStyle,
    customInputStyle,
  } = props;

  return (
    <View style={wrapper}>
      <View style={labelWrapper}>
        <Text style={[labelStyle, customLabelStyle]}>{label}</Text>
      </View>
      <View style={inputWrapper}>
        <TextInput
          {...props}
          placeholderTextColor="#b6b9bf"
          placeholder={placeholder}
          secureTextEntry={secureTextEntry || false}
          value={value}
          onChangeText={onChangeText}
          style={[inputStyle, customInputStyle]}
        />
      </View>
    </View>
  );
};

export default Input;
