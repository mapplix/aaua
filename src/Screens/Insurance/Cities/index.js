import React from 'react';
import I18n from '@aaua/i18n';
import {useSelector} from 'react-redux';

import {MainCard, Header} from '@aaua/components/common';

import AutocompleteScreen from '@aaua/components/common/AutocompleteScreen';

import styles from './styles';

const Cities = ({onSelectCity}) => {
  const {
    citiesBrands: {cities},
  } = useSelector(state => state);

  const defaultCities = cities.slice(0,4);

  return (
    <MainCard>
      <Header>{I18n.t('insurance_screen.osago.city')}</Header>
      <AutocompleteScreen
        defaultList={defaultCities}
        data={cities}
        onSelect={onSelectCity}
        textInputPlaceholder={I18n.t(
          'insurance_screen.osago.car_city.placeholder',
        )}
      />
    </MainCard>
  );
};

export default Cities;
