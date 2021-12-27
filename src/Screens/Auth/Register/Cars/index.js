import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import I18n from '@aaua/i18n';

import {MainCard, Header} from '@aaua/components/common';
import AutocompleteScreen from '@aaua/components/common/AutocompleteScreen';
import {DEVICE_OS, iOS} from '@aaua/actions/constants';

const {width} = Dimensions.get('window');
const iconSearch = require('@aaua/images/search.png');

const CarsScreen = ({onSelectBrand}) => {

  const {
    citiesBrands: {brands},
  } = useSelector(state => state);

  const defaultSearchedCars = brands.slice(0,4);

  return (
    <MainCard>
      <Header goToMain={DEVICE_OS == iOS ? true : false}>
        {I18n.t('insurance_screen.kasko.select_car_brand_header')}
      </Header>
      <AutocompleteScreen
        defaultList={defaultSearchedCars}
        data={brands}
        onSelect={onSelectBrand}
        textInputPlaceholder={I18n.t('insurance_screen.kasko.select_car_brand')}
      />
    </MainCard>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: width - 10,
    marginTop: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(0,0,0,0.3)',
    borderWidth: 1,
    flexDirection: 'row',
    borderRadius: 8,
    height: 40,
  },
  icon: {
    width: 15,
    height: 30,
    resizeMode: 'contain',
    marginRight: 5,
  },
  top: {
    marginTop: 10,
    // marginBottom: 10,
    height: 40,
    width,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  input: {
    width: '90%',
    fontSize: 15,
    height: 40,
  },
  itemContainer: {
    height: 50,
    width: width - 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginHorizontal: 10,
    borderColor: 'rgba(0,0,0,0.3)',
  },
  itemText: {
    width: '100%',
    fontFamily: 'SFUIText-Bold',
    fontSize: 14,
    color: 'rgba(0,0,0,0.5)',
  },
});

export default CarsScreen;
