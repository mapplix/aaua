import React, {useRef, useState} from 'react';
import {View, ScrollView, Alert, TouchableOpacity, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import I18n from '@aaua/i18n';

import {
  sendStep2,
} from '@aaua/actions/RegisterAction';

import {
  MainCard,
  CardItem,
  ButtonSquad,
  Header,
  Spiner,
  CustomTextRow,
} from '@aaua/components/common';
import {TextInput, PasswordInput} from '@aaua/components/common/Inputs';

import {ClickableTextRow} from '@aaua/components/common/ClickableTextRow';

import {showAlert} from '@aaua/components/Modals';

import {CITIES} from '@aaua/actions/constants';

import styles from './styles';

const SecondStage = props => {
  const scrollElement = useRef(null);

  const dispatch = useDispatch();

  const [enableScrollViewScroll, setEnableScrollViewScroll] = useState(true);
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const {citiesBrands, register, auth} = useSelector(state => state);

  const {token, phone, sendingStep2} = register;

  console.log('---- render Secons stage---', register);

  const {brands, cities} = citiesBrands;

  const {pushToken} = auth;

  const onChangeCity = city => {
    setSelectedCity(city);
  };

  const onSelectBrand = brand => {
    setSelectedBrand(brand);
    // dispatch(getCarModel(brand.id));
  };

  const showAlert = () => {
    Alert.alert(
      I18n.t('modals.error_title'),
      I18n.t('errors.data_not_filled'),
      [
        {
          text: 'OK',
          onPress: () => {
            console.log('close alert');
          },
        },
      ],
    );
  };

  const onSubmit = () => {
    const userData = {
      token: token,
      name: name,
      city_id: selectedCity.id,
      email: email,
      year: year,
      brand_id: selectedBrand.id,
      password,
      phone: phone,
      pushToken: pushToken,
    };
    if (
      name.length > 0 &&
      selectedCity &&
      year.length > 0 &&
      email.length &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      selectedBrand
    ) {
      if (validate(email)) {
        if (password == confirmPassword) {
          dispatch(sendStep2(userData));
        } else {
          showAlert(
            I18n.t('modals.error_title'),
            I18n.t('errors.password_not_matches'),
            I18n.t('modals.close_title'),
          );
        }
      } else {
        showAlert(
          I18n.t('modals.error_title'),
          I18n.t('errors.wrong_email_format'),
          I18n.t('modals.close_title'),
        );
      }
    } else {
      showAlert();
    }
  };

  const validate = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };

  const isFullInfo = () => {
    // let {city, name, car, year, email, password, confirm_password} = props;
    return (
      selectedCity &&
      name.length > 0 &&
      selectedBrand &&
      year.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0
    );
  };

  const {inputsWrapper} = styles;

  return (
    <MainCard>
      <Header>{I18n.t('screen_headers.personal_data')}</Header>
      <ScrollView ref={scrollElement} scrollEnabled={enableScrollViewScroll}>
        <View style={inputsWrapper}>
          <TextInput
            label={I18n.t('labels.name')}
            placeholder={I18n.t('placeholders.name')}
            onChangeText={text => setName(text)}
            value={name}
          />
          <ClickableTextRow
            onPress={() =>
              Actions.AutocompleteScreen({
                onSelectCity: onChangeCity,
              })
            }
            // onPress={Actions.AutocompleteScreen}
            label={I18n.t('labels.city')}
            value={selectedCity ? selectedCity.title : null}
            placeholder={I18n.t('placeholders.auto_brand')}
          />
          <ClickableTextRow
            onPress={() =>
              Actions.CarsScreen({
                onSelectBrand: onSelectBrand,
              })
            }
            label={I18n.t('labels.auto_brand')}
            value={selectedBrand ? selectedBrand.title : null}
            placeholder={I18n.t('placeholders.auto_brand')}
          />
          <TextInput
            label={I18n.t('labels.car_year')}
            placeholder={'0000'}
            maxLength={4}
            keyboardType="numeric"
            onChangeText={text => setYear(text)}
            value={year}
          />
          <TextInput
            keyboardType={'email-address'}
            label={'Email'}
            placeholder={'sample@index.com'}
            onChangeText={text => setEmail(text)}
            value={email}
          />
          <PasswordInput
            secureTextEntry
            onChangeText={text => setPassword(text)}
            value={password}
          />

          <PasswordInput
            secureTextEntry
            label={I18n.t('labels.repeat_pass')}
            onChangeText={text => setConfirmPassword(text)}
            value={confirmPassword}
          />
        </View>
        <View style={styles.footerWrapper}>
          {sendingStep2 ? (
            <Spiner size="small" />
          ) : (
            <ButtonSquad
              style={{
                backgroundColor: isFullInfo() ? '#ffc200' : '#c5c5c5',
              }}
              disabled={sendingStep2}
              onPress={onSubmit}>
              {I18n.t('buttons.next')}
            </ButtonSquad>
          )}
        </View>
      </ScrollView>
    </MainCard>
  );
};

export default SecondStage;
