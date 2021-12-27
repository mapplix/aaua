import React, {useState} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';

import I18n from '@aaua/i18n';

import {MainCard, Header} from '@aaua/components/common';
import {PhoneInput} from '@aaua/components/common/Inputs';
import ButtonRoundet from '@aaua/components/common/Buttons/RoundButton';

import {sendData} from '@aaua/actions/ForgotPassAction';

import styles from './styles';

const ForgotPassword = props => {

  const dispatch = useDispatch();

  const [phone, setPhone] = useState('');

  const onPhoneChange = phone => {
    setPhone(phone);
  };

  const onSubmit = () => {
    dispatch(sendData(phone));
  };

  const {inputWrapper, buttonWrapper} = styles;

  return (
    <MainCard>
      <Header back>{I18n.t('screen_headers.restore_pass')}</Header>
      <View style={inputWrapper}>
        <PhoneInput value={phone} onChangeText={onPhoneChange} />
      </View>
      <View style={buttonWrapper}>
        <ButtonRoundet onPress={() => onSubmit()}>
          {I18n.t('buttons.restore_pass')}
        </ButtonRoundet>
      </View>
    </MainCard>
  );
};

export default ForgotPassword;
