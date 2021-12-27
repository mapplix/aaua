import React, {useState} from 'react';
import {View, Image} from 'react-native';
import {SvgXml} from 'react-native-svg';

import TextInputWithLabel from '@aaua/components/common/Inputs/TextInputWithLabel';

import okGreen from '@aaua/assets/ok_green';
import okGrey from '@aaua/assets/ok_grey';

import styles from './styles';

const TextInputWithIcon = props => {
  const {inputWrapper, wrapper, btnImage, visibilityBtn, hideRightButton} =
    styles;
  const {rightButton} = props;
  console.log('---render TextInput with icon--', rightButton == 1, props);
  return (
    <View style={wrapper}>
      <View style={inputWrapper}>
        <TextInputWithLabel {...props} />
      </View>

      <View style={rightButton == 1 ? visibilityBtn : hideRightButton}>
        <SvgXml xml={okGreen} width={20} height={20} />
      </View>
    </View>
  );
};

export default TextInputWithIcon;
