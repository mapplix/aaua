import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect, useSelector, useDispatch} from 'react-redux';

import I18n from '@aaua/i18n';

import {
  MainCard,
  CardItem,
  BottomMenu,
  ButtonRoundet,
  BottomMenuItem,
  Header,
} from '@aaua/components/common';
import {RATIO} from '@aaua/styles/constants';
import {DEVICE_OS, iOS} from '@aaua/actions/constants';

import styles from './styles';

const ValetComponent = () => {
  const addToBalance = () => {
    console.log('add to balance');
  };


  const valetAmount = 22;
  let amountTitle = I18n.t('valet_screen.grivna_5');

  if (valetAmount > 4) {
    amountTitle = I18n.t('valet_screen.grivna_5');
  } else if (valetAmount > 1) {
    amountTitle = I18n.t('valet_screen.grivna_2');
  } else if (valetAmount > 0) {
    amountTitle = I18n.t('valet_screen.grivna_1');
  }

  const {
    amountContainer,
    amountStyle,
    textStyle,
    amountContainerWrapper,
    textContainer,
    buttonStyle,
    buttonContainer,
  } = styles;

  return (
    <MainCard>
      <Header burger goToMain={DEVICE_OS == iOS ? true : false}>
        {I18n.t('valet_screen.screen_header')}
      </Header>
      <CardItem style={amountContainerWrapper}>
        <View style={amountContainer}>
          <Text style={amountStyle}>{valetAmount}</Text>
          <Text style={textStyle}>{amountTitle}</Text>
        </View>
      </CardItem>
      <CardItem style={buttonContainer}>
        <ButtonRoundet
          style={buttonStyle}
          textStyle={{color: '#1B1B1B'}}
          onPress={addToBalance}>
          {I18n.t('valet_screen.add_to_balance')}
        </ButtonRoundet>
      </CardItem>
      <CardItem style={textContainer}>
        <Text>{I18n.t('valet_screen.service_develop')}</Text>
      </CardItem>
    </MainCard>
  );
};

export default ValetComponent;
