import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Item from '@aaua/components/Question_answear/Item';
import {MainCard, CardItem, Header} from '@aaua/components/common';
import {DEVICE_OS, iOS, Android} from '@aaua/actions/constants';

import I18n from '@aaua/i18n';

const List = () => {

  return (
    <MainCard>
      <Header burger goToMain={DEVICE_OS == iOS ? true : false}>
        {I18n.t('questions_screen.header')}
      </Header>
      <ScrollView>
        <Item
          id={1}
          style={{
            marginTop: 25,
          }}
          title={I18n.t('questions_screen.what_is_aaua.header')}>
          {I18n.t('questions_screen.what_is_aaua.description')}
        </Item>
        <Item id={2} title={I18n.t('questions_screen.how_get_card.header')}>
          {I18n.t('questions_screen.how_get_card.description')}
        </Item>
        <Item id={3} title={I18n.t('questions_screen.card_coast.header')}>
          {I18n.t('questions_screen.card_coast.description')}
        </Item>
        <Item id={4} title={I18n.t('questions_screen.bonuses.header')}>
          {I18n.t('questions_screen.bonuses.description')}
        </Item>
        <Item id={5} title={I18n.t('questions_screen.when_get_bonuses.header')}>
          {I18n.t('questions_screen.when_get_bonuses.description')}
        </Item>
        <Item id={6} title={I18n.t('questions_screen.bonuses_counts.header')}>
        {I18n.t('questions_screen.bonuses_counts.description')}
        </Item>
        <Item id={7} title={I18n.t('questions_screen.card_period.header')}>
        {I18n.t('questions_screen.card_period.description')}
        </Item>
        <Item id={8} title={I18n.t('questions_screen.bonuses_period.header')}>
        {I18n.t('questions_screen.bonuses_period.description')}
        </Item>
        <Item id={9} title={I18n.t('questions_screen.bonuses_exchange.header')}>
        {I18n.t('questions_screen.bonuses_exchange.description')}
        </Item>
        <Item id={10} title={I18n.t('questions_screen.bonuses_wog.header')}>
        {I18n.t('questions_screen.bonuses_wog.description')}
        </Item>
        <Item id={11} title={I18n.t('questions_screen.how_register.header')}>
        {I18n.t('questions_screen.how_register.description')}
        </Item>
      </ScrollView>
    </MainCard>
  );
};

export default List;
