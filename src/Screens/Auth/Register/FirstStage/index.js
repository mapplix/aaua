import React, {useState, useEffect} from 'react';
import {View, Alert, Text, Linking} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Geolocation from '@react-native-community/geolocation';

import I18n from '@aaua/i18n';

import {
  MainCard,
  ButtonSquad,
  ButtonRoundet,
  Header,
  Spiner,
  CheckBox,
} from '@aaua/components/common';
import {
  PhoneInput,
  TextInput,
  TextInputWithIcon,
} from '@aaua/components/common/Inputs';

import Authentication from '@aaua/services/Authentification/';

import {SEND_STEP_1, STEP_1_SUCCESS} from '@aaua/actions/types';

import {WIDTH_RATIO, RATIO} from '@aaua/styles/constants';

import {DEVICE_OS, iOS, Android} from '@aaua/actions/constants';
// import {checkPhoneNumber} from '@aaua/actions/AuthAction';

import checkboxUnchecked from '@aaua/assets/checkbox_unchecked';
import checkboxChecked from '@aaua/assets/checkbox_checked';

import styles from './styles';

let labelFontSize = WIDTH_RATIO <= 1 ? 10 : 12;

const FirstStage = props => {

  const [isAdault, setIsAdault] = useState(false);
  const [isAgrie, setIsAgrie] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [phoneChecked, setPhoneChecked] = useState(false);
  const [codeChecked, setCodeChecked] = useState(false);
  const [codeRight, setCodeRight] = useState(false);
  const [smsSended, setSmsSended] = useState(false);

  const dispatch = useDispatch();

  const {error, loading, isDisabled, smsError, sms} = useSelector(
    state => state.register,
  );

  const onPhoneChange = phone => {
    if (phone.length <= 1) {
      phone = '+380' + phone;
    }
    setPhone(phone);
  };

  const handleOnFocus = () => {
    if (phone == '') {
      onPhoneChange('+380');
    }
  };

  const onCodeChange = code => {
    setCode(code);
  };

  const onSendUserData = userData => {
    sendStep1(userData);
  };

  const sendStep1 = async userData => {
    const response = await Authentication.sendStep1Data(userData);

    if (response.error > 0) {
      showAlert(response.errorMessage);
    } else {
      dispatch({
        type: STEP_1_SUCCESS,
        payload: {
          phone: phone,
          token: response.token,
          username: response.username,
        },
      });
      Actions.secondStage();
    }
  };

  const showAlert = (title = I18n.t('modals.error_title'), errorMessage = I18n.t('errors.data_not_filled')) => {
    Alert.alert(title, errorMessage, [
      {
        text: 'OK',
        onPress: () => {
          console.log('close alert');
        },
      },
    ]);
  };

  const openSecondStage = () => {
    if (phone.length > 0 && code.length > 0) {
      if (isAdault && isAgrie && isRead) {
        const userData = {
          device: DEVICE_OS,
          phone: phone,
          sms_code: code,
          x: longitude,
          y: latitude,
        };
        onSendUserData(userData);
      } else {
        showAlert();
      }
    } else {
      showAlert();
    }
  };

  const getSms = async () => {
    const smsResponse = await Authentication.sendSms(phone);

    if (smsResponse.error == 0) {
      setSmsSended(true);
      showAlert(I18n.t('modals.thanks_title'), I18n.t('modals.sms_sended'), 'OK');
    } else if (smsResponse.error >= 1) {
      let errorMessage = smsResponse.errorMessage;
      if (smsResponse.error == 1) {
        errorMessage = I18n.t('errors.registration_error');
      }
      showAlert(I18n.t('modals.error_title'), errorMessage, 'OK');
    }
  };

  const isFullInfo = () => {
    return isAdault && isRead && isAgrie && phone.length > 0 && code.length > 0;
  };

  const openLicence = () => {
    Actions.licence();
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 20000},
    );
  }, []);

  const renderButton = () => {
    if (loading === false) {
      return (
        <ButtonRoundet isDisabled={smsSended} onPress={getSms}>
          {I18n.t('buttons.get_sms_code')}
        </ButtonRoundet>
      );
    }
    return <Spiner />;
  };

  const handleOnBlurPhone = async () => {
    const phoneResponse = await Authentication.checkPhoneNumber(phone);
    
    if (!phoneResponse.error) {
      if (phoneResponse.is == 1) {
        setPhoneChecked(-1);
        showAlert(
          I18n.t('registration_screen.modal.check_phone.title'),
          I18n.t('registration_screen.modal.check_phone.message'),
          'OK',
        );
      }
      if (phoneResponse.is == 0) {
        setPhoneChecked(1);
      }
    }
  };

  const handleOnBlurCode = async () => {
    const codeResponse = await Authentication.checkSmsCode(phone, code);

    if (!codeResponse.error) {
      if (codeResponse.is == 0) {
        setCodeChecked(-1);
        showAlert(
          I18n.t('registration_screen.modal.check_code.title'),
          I18n.t('registration_screen.modal.check_code.message'),
          'OK',
        );
      }
      if (codeResponse.is == 1) {
        setCodeChecked(1);
      }
    }
  };

  const {
    checkboxContainer,
    footerWrapper,
    buttonWrapper,
    labelStyle,
    inputsWrapper,
  } = styles;

  const labelTitle = I18n.t('registration_screen.agree_get_info');

  const licensLabel = '';

  return (
    <MainCard>
      <Header back={DEVICE_OS == iOS ? true : false}>
        {I18n.t('screen_headers.personal_data')}
      </Header>
      <View style={inputsWrapper}>
        <TextInputWithIcon
          value={phone}
          onChangeText={onPhoneChange}
          onBlur={handleOnBlurPhone}
          rightButton={phoneChecked}
          label={I18n.t('labels.phone_number')}
          placeholder={'+380'}
          onFocus={handleOnFocus}
          placeholderTextColor="#b6b9bf"
          multiline={false}
          maxLength={13}
          keyboardType="phone-pad"
        />
        <TextInputWithIcon
          secureTextEntry
          rightButton={codeChecked}
          label={I18n.t('labels.code_from_sms')}
          placeholder={I18n.t('labels.code_from_sms')}
          onChangeText={onCodeChange}
          value={code}
          onBlur={handleOnBlurCode}
        />
      </View>

      <View style={buttonWrapper}>{renderButton()}</View>
      <View style={checkboxContainer}>
        <CheckBox
          checkedImage={checkboxChecked}
          uncheckedImage={checkboxUnchecked}
          labelStyle={labelStyle}
          label={I18n.t('registration_screen.iam_adault')}
          checked={isAdault}
          onChange={() => setIsAdault(!isAdault)}
        />
        <CheckBox
          checkedImage={checkboxChecked}
          uncheckedImage={checkboxUnchecked}
          labelStyle={labelStyle}
          checked={isRead}
          onChange={() => setIsRead(!isRead)}
          customLabel={
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text style={labelStyle}>
                {I18n.t('registration_screen.agree_licence')}{' '}
              </Text>
              <Text style={[labelStyle, {color: 'blue'}]} onPress={openLicence}>
                {I18n.t('registration_screen.licence')}
              </Text>
            </View>
          }
        />
        <CheckBox
          checkedImage={checkboxChecked}
          uncheckedImage={checkboxUnchecked}
          labelStyle={labelStyle}
          label={labelTitle}
          checked={isAgrie}
          onChange={() => setIsAgrie(!isAgrie)}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
        }}>
        <View style={footerWrapper}>
          <ButtonSquad
            style={{
              backgroundColor: isFullInfo() ? '#ffc200' : '#c5c5c5',
            }}
            onPress={openSecondStage}>
            {I18n.t('buttons.next')}
          </ButtonSquad>
        </View>
      </View>
    </MainCard>
  );
};

export default FirstStage;
