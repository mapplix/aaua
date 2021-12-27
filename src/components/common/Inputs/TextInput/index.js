import React from 'react';
import {View} from 'react-native';

import TextInputWithLabel from '../TextInputWithLabel';

import styles from './styles';

const DefaultTextInput = props => {
  const {containerStyle} = styles;
  const {placeholder, value, onChangeText, secureTextEntry} = props;
  return (
    <View style={containerStyle}>
      <TextInputWithLabel
        {...props}
        multiline={false}
        onSubmitEditing={() => {}}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
};

export default DefaultTextInput;
