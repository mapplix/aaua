import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Tabs from 'react-native-tabs';

import I18n from '@aaua/i18n';

import {MainCard, CardItem, Header} from '../common';
import CategoriesScreen from './CategoriesScreen';
import DiscontsListScreen from './DiscontsListScreen';
import {DEVICE_OS, iOS, Android} from '../../actions/constants';

const TabsComponent = () => {
  //   constructor(props) {
  //     super(props);
  //     this.state = {page: '1'};
  //   }

  const renderTabs = () => {
    switch (this.state.page) {
      case '1':
        return <CategoriesScreen />;
      case '2':
        return <DiscontsListScreen />;
    }
  };
  const {tabText, selectedTabText, selectedTab} = styles;
  return (
    <MainCard>
      <Header burger goToMain={DEVICE_OS == iOS ? true : false}>
        ДИСКОНТЫ
      </Header>
      <CardItem
        style={{
          flex: 0,
          height: 50,
        }}>
        <Tabs
          selected={this.state.page}
          style={{
            top: 0,
          }}
          selectedStyle={selectedTabText}
          onSelect={el => this.setState({page: el.props.name})}>
          <Text selectedIconStyle={selectedTab} style={tabText} name="1">
            Каталог
          </Text>
          <Text style={tabText} name="2" selectedIconStyle={selectedTab}>
            Дисконтные карты
          </Text>
        </Tabs>
      </CardItem>
      <CardItem>{this.renderTabs()}</CardItem>
    </MainCard>
  );
};

const styles = {
  container: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#61c9eb',
  },
  tabText: {
    fontFamily: 'SFUIText-Medium',
    fontSize: 14,
    color: '#1b1b1b',
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#ffc200',
  },
  selectedTabText: {
    color: '#ffc200',
  },
};
export default TabsComponent;
