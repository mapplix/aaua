import React from 'react';
import {Dimensions, StatusBar, Platform, SafeAreaView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import styles from './styles';

const MainCard = props => {
  const {height, width} = Dimensions.get('window');
  const statusBarHeight =
    Platform.OS == 'android' ? StatusBar.currentHeight : 0;
  return (
    <KeyboardAwareScrollView>
      <SafeAreaView
        style={[
          styles.containerStyle,
          props.style,
          {height: height - statusBarHeight},
        ]}>
        {props.children}
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default MainCard;
