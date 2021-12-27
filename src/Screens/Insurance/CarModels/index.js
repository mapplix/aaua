import React from 'react';
import {useSelector} from 'react-redux';

import I18n from '@aaua/i18n';

import {MainCard, Header} from '@aaua/components/common';
import {DEVICE_OS, iOS} from '@aaua/actions/constants';

import AutocompleteScreen from '@aaua/components/common/AutocompleteScreen';

const CarModels = (props) => {

  const {insurance: {carModels}} = useSelector( state => state);

  const onChangeCarModel = model => {
    props.onChangeCarModel(model);
  };

  return (
    <MainCard>
      <Header goToMain={DEVICE_OS == iOS ? true : false}>Модель авто</Header>
      <AutocompleteScreen
        defaultList={[]}
        data={carModels}
        onSelect={onChangeCarModel}
        textInputPlaceholder={I18n.t('insurance_screen.kasko.car_model.placeholder')}
      />
    </MainCard>
  );
};

export default CarModels;
