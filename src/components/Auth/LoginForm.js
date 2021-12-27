import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  BackHandler,
  AsyncStorage,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {showAlert} from '../Modals';
import {
  loginUser,
  changePass,
  changePhone,
  getPushToken,
} from '../../actions/AuthAction';
import {getBrands, getCities} from '../../actions/CitiesBrands';
import {
  MainCard,
  CardItem,
  ButtonRoundet,
  ModalCard,
  Spiner,
  PasswordInput,
  PhoneInput,
} from '../common';
import Modal from 'react-native-modalbox';
import {MIN_HEIGHT, RATIO} from '../../styles/constants';
import {getToken} from '../../actions/constants';

let listener = null;

class LoginForm extends Component {
  state = {
    isOpen: false,
    token: false,
  };

  closeModal() {
    this.setState({isOpen: false});
  }

  showAlert() {
    showAlert(
      'Ошибка',
      'Не все поля заполнены или заполнены не верно',
      'OK',
      console.log('onSubmit'),
    );
  }

  onLogin() {
    console.log(this.props);
    const {phone, password, pushToken} = this.props;
    if (phone && password) {
      this.props.loginUser(phone, password, pushToken);
    } else {
      this.showAlert();
    }
  }

  onPhoneChange = formatted => {
    this.props.changePhone(formatted);
  };

  onPasswordChange(txt) {
    this.props.changePass(txt);
  }

  componentDidMount() {
    if (Platform.OS == 'android' && listener == null) {
      listener = BackHandler.addEventListener('hardwareBackPress', () => {
        if (this.state.isOpen) {
          console.log(this.state);
          this.closeModal();
          return true;
        }
        return false;
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loginError != false) {
      showAlert('Ошибка', nextProps.loginError, 'OK');
    }
  }

  renderButton() {
    if (this.props.loading === false) {
      return (
        <ButtonRoundet
          style={{
            marginRight: 45,
            marginLeft: 45,
            height: 44,
          }}
          onPress={() => this.onLogin()}>
          Вход
        </ButtonRoundet>
      );
    }
    return <Spiner />;
  }

  render() {
    console.log('render login form');
    const {
      footerLinksContainer,
      linkStyle,
      linkText,
      modalText,
      modalTextContainer,
    } = styles;
    return (
      <MainCard>
        <CardItem
          style={{
            flex: 0,
            height: 270 * RATIO,
            paddingTop: 47,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Image
            style={{
              width: 175 * RATIO,
              height: 175 * RATIO,
            }}
            source={require('../../images/logo.png')}
          />
        </CardItem>

        <CardItem
          style={{
            flex: 0,
            height: 83 * RATIO,
          }}>
          <PhoneInput
            label={'Номер телефона'}
            placeholder={'+380'}
            value={this.props.phone}
            onChangeText={this.onPhoneChange.bind(this)}
          />
        </CardItem>

        <CardItem
          style={{
            // backgroundColor: '#282',
            flex: 0,
            height: 92 * RATIO,
          }}>
          <PasswordInput
            label={'Пароль'}
            placeholder={'Пароль'}
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardItem>
        <CardItem
          style={{
            flex: 0,
            height: 125 * RATIO,
          }}>
          {this.renderButton()}
        </CardItem>
        <CardItem>
          <View style={footerLinksContainer}>
            <View style={linkStyle}>
              <TouchableOpacity onPress={Actions.forgot}>
                <Text style={linkText}>Забыли пароль?</Text>
              </TouchableOpacity>
            </View>
            <View style={[linkStyle, {alignItems: 'flex-end'}]}>
              <TouchableOpacity onPress={() => Actions.register()}>
                <Text style={linkText}>Регистрация</Text>
              </TouchableOpacity>
            </View>
          </View>
        </CardItem>
      </MainCard>
    );
  }
}

const styles = {
  footerLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
    height: 50,
    marginLeft: 45,
    marginRight: 45,
  },
  linkStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  linkText: {
    fontFamily: 'SFUIText-Medium',
    fontSize: 14,
    color: '#423486',
  },
  modal: {
    height: 270,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  modalText: {
    fontFamily: 'SFUIText-Regular',
    fontSize: 19,
    color: '#423485',
  },
  modalTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
};

const mapStateToProps = ({auth}) => {
  const {phone, password, user, error, loginError, loading, pushToken} = auth;
  return {
    phone: phone,
    password: password,
    user: user,
    loginError: loginError,
    error: error,
    loading: loading,
    pushToken: pushToken,
  };
};

export default connect(mapStateToProps, {
  loginUser,
  changePass,
  changePhone,
  getBrands,
  getCities,
  getToken,
  getPushToken,
})(LoginForm);
