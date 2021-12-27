import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {DEVICE_OS, iOS} from '../../actions/constants';

import styles from './styles';

export const ClickableTextRow = props => {
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
