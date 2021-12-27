import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles'

const ButtonRoundet = props => {
  const {onPress, children, isDisabled} = props;
  const {buttonStyle, textStyle, buttonWrapper} = styles;

  return (
    <View style={buttonWrapper}>
        <TouchableOpacity
        disabled={isDisabled}
        style={[buttonStyle, props.style]}
        onPress={onPress}>
        <Text style={[textStyle, props.textStyle]}>{children}</Text>
        </TouchableOpacity>
    </View>
  );
};

export default ButtonRoundet;
