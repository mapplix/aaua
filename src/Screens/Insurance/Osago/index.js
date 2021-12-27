import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Modal from 'react-native-modalbox';

import Insurance from '@aaua/services/Insurance';

import I18n from '@aaua/i18n';

import {
  MainCard,
  CardItem,
  ButtonRoundet,
  Header,
  Spiner,
  DropDown,
  ClickableTextRow,
} from '@aaua/components/common';
import {calculateOsago, orderOsago} from '@aaua/actions/InsuranceAction';
import {showAlert} from '@aaua/components/Modals';

import styles from './styles';
import {STORE_PRODUCT_INCREASE_VIEWS_URL} from '../../../actions/constants';

const Osago = () => {
  const dispatch = useDispatch();

  const {
    auth: {
      user: {token},
    },
    insurance: {osagoPriceLoading: loadingPrice, osagoPrice},
    citiesBrands,
  } = useSelector(state => state);

  const dropdownElements = [
    {
      title: I18n.t('insurance_screen.osago.engine_volume.xsmall'),
      id: 1,
      value: 1,
    },
    {
      title: I18n.t('insurance_screen.osago.engine_volume.small'),
      id: 2,
      value: 2,
    },
    {
      title: I18n.t('insurance_screen.osago.engine_volume.medium'),
      id: 3,
      value: 3,
    },
    {
      title: I18n.t('insurance_screen.osago.engine_volume.large'),
      id: 4,
      value: 4,
    },
  ];

  const [engineVolume, setEngineVolume] = useState(dropdownElements[0]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (selectedCity != null) {
      // dispatch(calculateOsago(token, selectedCity.id, engineVolume));
      calculate();
    }
  }, [engineVolume, selectedCity]);

  const calculate = async () => {
    const response = await Insurance.calculateOsago(
      token,
      selectedCity.id,
      engineVolume,
    );

console.log('calculate ----', response);

    if (response.error) {
      showAlert(I18n.t('modals.error_title'), response.error, 'Ok');
    } else {
      setPrice(response);
    }
  };

  const onChangeVolume = itemValue => {
    setEngineVolume(itemValue);
  };

  const onOrder = async () => {
    const orderData = {
      token,
      carType: engineVolume,
      cityId: selectedCity.id,
    };
    const response = await Insurance.orderOsago(orderData);
    if (response.error === 0) {
      showAlert(
        I18n.t('insurance_screen.osago.thanks'),
        I18n.t('insurance_screen.osago.request_accepted'),
        'Ok',
        () => {
          Actions.insuranceCategories();
        },
      );
    } else {
      showAlert(I18n.t('modals.error_title'), response.error, 'Ok');
    }
    // dispatch(orderOsago(orderData));
  };

  const onChangeCity = city => {
    setSelectedCity(city);
  };

  const {
    contentContainer,
    priceWrapper,
    priceText,
    buttonStyle,
    textColor,
    buyOnlineContainer,
    textContainer,
    orStyle,
    textStyle,
    modalContainer,
    modalButtonStyle,
  } = styles;

  return (
    <MainCard>
      <Header back>{I18n.t('insurance_screen.categories.osago')}</Header>
      <CardItem style={contentContainer}>
        <DropDown
          fontSize={13}
          label={I18n.t('insurance_screen.osago.engine_volume.title')}
          elements={dropdownElements}
          onValueChange={onChangeVolume}
          selected={engineVolume}
        />
      </CardItem>
      <CardItem style={contentContainer}>
        <ClickableTextRow
          onPress={() =>
            Actions.InsuranceCitiesScreen({onSelectCity: onChangeCity})
          }
          label={I18n.t('insurance_screen.osago.car_city.title')}
          value={selectedCity ? selectedCity.title : null}
          placeholder={I18n.t('insurance_screen.osago.car_city.placeholder')}
        />
      </CardItem>
      <CardItem style={contentContainer}>
        <View style={priceWrapper}>
          <Text style={priceText}>{parseInt(price)}грн</Text>
        </View>
      </CardItem>
      <CardItem
        style={{
          marginTop: 20,
          flex: 1,
        }}>
        <ButtonRoundet
          isDisabled={selectedCity === null}
          style={buttonStyle}
          textStyle={{color: '#1B1B1B'}}
          onPress={onOrder}>
          {I18n.t('insurance_screen.osago.get_proposal')}
        </ButtonRoundet>
      </CardItem>
      <CardItem style={buyOnlineContainer}>
        <View style={textContainer}>
          <View style={orStyle}>
            <Text style={textColor}>{I18n.t('insurance_screen.osago.or')}</Text>
          </View>
          <View style={textStyle}>
            <Text style={textColor}>
              {I18n.t('insurance_screen.osago.buy')}
            </Text>
            <Text style={textColor}>
              {I18n.t('insurance_screen.osago.insurance')}
            </Text>
          </View>
        </View>
        <View
          style={{
            height: 50,
          }}>
          <ButtonRoundet
            style={buttonStyle}
            textStyle={{color: '#1B1B1B'}}
            onPress={Actions.WebInsurance}>
            {I18n.t('insurance_screen.osago.buy_online')}
          </ButtonRoundet>
        </View>
      </CardItem>
    </MainCard>
  );
};

export default Osago;
