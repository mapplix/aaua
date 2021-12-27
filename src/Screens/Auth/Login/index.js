import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {useSelector, useDispatch} from 'react-redux';

import I18n from '@aaua/i18n';

import {onLoginSuccess} from '@aaua/actions/AuthAction';
import Authentication from '@aaua/services/Authentification/';

import {showAlert} from '@aaua/components/Modals';
import {MainCard, Spiner} from '@aaua/components/common';
import ButtonRoundet from '@aaua/components/common/Buttons/RoundButton';
import {PhoneInput, PasswordInput} from '@aaua/components/common/Inputs';

import styles from './styles';

let listener = null;

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const {user, error, loginError, loading, pushToken} = useSelector(
    state => state.auth,
  );

  const dispatch = useDispatch();

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (user !== null) {
      Actions.drawer();
      // navigation.navigate('Root')
    }
  }, [user]);

  const onLogin = async () => {
    if (phone && password) {
      setIsLoading(true);
      // dispatch(loginUser(phone, password, pushToken));
      const loginResponse = await Authentication.loginUser(
        phone,
        pushToken,
        password,
      );
      console.log('---loginResponse---', loginResponse);
      if (loginResponse.error) {
        showAlert(I18n.t('modals.error_title'), loginResponse.error, 'OK');
        setIsLoading(false);
      } else {
        dispatch(onLoginSuccess(loginResponse));
      }
    } else {
      setIsLoading(false);
      showAlert(
        I18n.t('modals.error_title'),
        I18n.t('errors.data_not_filled'),
        'OK',
      );
    }
  };

  const onPhoneChange = formatted => {
    console.log('onPhoneChange', formatted);
    setPhone(formatted);
  };

  const onPasswordChange = txt => {
    setPassword(txt);
  };

  const {
    footerLinksContainer,
    linkStyle,
    linkText,
    imageWrapper,
    imageStyle,
    loginButtonWrapper,
    inputsWrapper,
    buttonContainer,
    aauaTitle,
  } = styles;

  console.log('render NEW LOGIN', {
    isLoading,
  });

  return (
    <MainCard>
      <View style={imageWrapper}>
        <View>
          <Image style={imageStyle} source={require('@aaua/images/logo.png')} />
        </View>
        <View>
          <Text style={aauaTitle}>{I18n.t('login_screen.asociation')}</Text>
          <Text style={aauaTitle}>{I18n.t('login_screen.driwers')}</Text>
          <Text style={aauaTitle}>{I18n.t('login_screen.ukraine')}</Text>
        </View>
      </View>

      <View style={inputsWrapper}>
        <PhoneInput value={phone} onChangeText={onPhoneChange} />
        <PasswordInput
          label={I18n.t('labels.password')}
          placeholder={I18n.t('labels.password')}
          onChangeText={onPasswordChange}
          value={password}
        />
      </View>

      <View style={buttonContainer}>
        <View style={loginButtonWrapper}>
          {isLoading ? (
            <ActivityIndicator size={'small'} />
          ) : (
            <ButtonRoundet onPress={onLogin}>
              {I18n.t('buttons.enter')}
            </ButtonRoundet>
          )}
        </View>
      </View>

      <View style={footerLinksContainer}>
        <View style={linkStyle}>
          <TouchableOpacity onPress={Actions.forgot}>
            <Text style={linkText}>{I18n.t('login_screen.forgot_pass')}?</Text>
          </TouchableOpacity>
        </View>
        <View style={[linkStyle, {alignItems: 'flex-end'}]}>
          <TouchableOpacity onPress={Actions.register}>
            <Text style={linkText}>{I18n.t('login_screen.registration')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </MainCard>
  );
};

export default Login;
