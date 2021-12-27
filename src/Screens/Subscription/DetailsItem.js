import React from 'react';
import {View, Text} from 'react-native';
import {Icon} from '@aaua/components/common';

const DetailsItem = ({children}) => {
  const {container, iconStyle, textStyle} = styles;
  return (
    <View style={container}>
      <Icon
        style={iconStyle}
        imageSrc={require('@aaua/images/icons/checkbox_small.png')}
      />
      <Text style={textStyle}>{children}</Text>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  iconStyle: {
    width: 17,
    height: 17,
    marginRight: 27,
  },
  textStyle: {
    fontFamily: 'SFUIText-Regular',
    fontSize: 14,
    color: '#1b1b1b',
  },
};
export default DetailsItem;
