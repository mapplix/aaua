import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import Tabs from 'react-native-tabs';
import {useSelector, useDispatch} from 'react-redux';
import I18n from '@aaua/i18n';

import {MainCard, CardItem, Header, Spiner} from '@aaua/components/common';
import CategoriesTab from '../Catalog';
import DiscountsListTab from '../DiscountsList';

import {DEVICE_OS, iOS} from '@aaua/actions/constants';
import {loadCategories, loadCards} from '@aaua/actions/DiscountsAction';

import styles from './styles';

const TabsComponent = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState('1');

  const {
    discounts,
    auth: {user},
  } = useSelector(state => state);

  const {categories, loadingCategories: loading, discountsCards} = discounts;

  useEffect(() => {
    if (user) {
      const {token} = user;
      dispatch(loadCategories(token));
      dispatch(loadCards(token));
    }
  }, [user]);

  const renderTabs = () => {
    console.log('renderTabs', page);
    if (loading) {
      return <Spiner />;
    }
    switch (page) {
      case '1':
        return <CategoriesTab categories={categories} />;
      case '2':
        return <DiscountsListTab discountsCards={discountsCards}/>;
      default:
        return <Spiner />;
    }
  };

  const {container, tabText, selectedTabText, selectedTab} = styles;

  return (
    <MainCard>
      <Header burger goToMain={DEVICE_OS == iOS ? true : false}>
        {I18n.t('discounts_screen.screen_header')}
      </Header>
      <CardItem style={container}>
        <Tabs
          selected={page}
          style={{
            top: 0,
          }}
          selectedStyle={selectedTabText}
          onSelect={el => setPage(el.props.name)}>
          <Text selectedIconStyle={selectedTab} style={tabText} name="1">
            {I18n.t('discounts_screen.catalog')}
          </Text>
          <Text style={tabText} name="2" selectedIconStyle={selectedTab}>
            {I18n.t('discounts_screen.discount_cards')}
          </Text>
        </Tabs>
      </CardItem>
      <CardItem>{renderTabs()}</CardItem>
    </MainCard>
  );
};

export default TabsComponent;
