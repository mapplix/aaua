import React from 'react';
import {useSelector} from 'react-redux';

import I18n from '@aaua/i18n';

import {MainCard, Header} from '@aaua/components/common';
import AutocompleteScreen from '@aaua/components/common/AutocompleteScreen';
import {DEVICE_OS, iOS} from '@aaua/actions/constants';

const CarsScreen = ({onSelectBrand}) => {

  const defaultSearchedCars = [
    {id: '7', title: 'Audi'},
    {id: '10', title: 'BMW'},
    {id: '19', title: 'Chevrolet'},
    {id: '25', title: 'Daewoo'},
    {id: '37', title: 'Ford'},
  ];

  const {
    citiesBrands: {brands},
  } = useSelector(state => state);

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
};

export default CarsScreen;
