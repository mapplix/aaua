import React, {Component} from 'react';
import {View, Text} from 'react-native';

import I18n from '@aaua/i18n';

import TextInput from '@aaua/components/common/Inputs/TextInputWithLabel';

import styles from './styles';

const PhoneInput = props => {
  const {containerStyle} = styles;
  const {onChangeText, label, placeholder, value, secureTextEntry, onBlur} =
    props;

  const handleChange = text => {
    if (text.length <= 1) {
      text = '+380' + text;
    }

    onChangeText(text);
  };

  const handleOnFocus = () => {
    if (value == '') {
      onChangeText('+380');
    }
  };

  return (
    <View style={containerStyle}>
      <TextInput
        label={label || I18n.t('labels.phone_number')}
        placeholder={placeholder || '+380'}
        {...props}
        onFocus={handleOnFocus}
        onBlur={onBlur}
        placeholderTextColor="#b6b9bf"
        multiline={false}
        maxLength={13}
        keyboardType="phone-pad"
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={handleChange}
      />
    </View>
  );
};

export default PhoneInput;
