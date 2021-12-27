import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const ButtonRoundet = props => {
  const {onPress, children, isDisabled} = props;
  const {buttonStyle, textStyle, disabledButton} = style;
  return (
    <TouchableOpacity
      disabled={isDisabled}
      style={[buttonStyle, props.style, !isDisabled || disabledButton]}
      onPress={onPress}>
      <Text style={[textStyle, props.textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

const style = {
  textStyle: {
    fontFamily: 'SFUIText-Regular',
    alignSelf: 'center',
    color: '#fff',
    fontSize: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#423486',
    borderWidth: 1,
    borderRadius: 22,
    borderColor: '#423486',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#7f77a6',
  },
};

export {ButtonRoundet};
