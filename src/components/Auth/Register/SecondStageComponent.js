import React, {Component} from 'react';
import {View, ScrollView, Alert, TouchableOpacity, Text} from 'react-native';
import {connect} from 'react-redux';
import {
  changePass,
  changeCar,
  changeCity,
  changeEmail,
  changeName,
  changeYear,
  changeConfirmPass,
  sendStep2,
  selectCity,
  onChangeBrand,
  onSelectBrand,
} from '../../../Actions/RegisterAction';
import {
  MainCard,
  CardItem,
  ButtonSquad,
  PasswordInput,
  Header,
  Spiner,
  CustomInput,
  CustomTextRow,
} from '../../common';
import {showAlert} from '../../Modals';
import {CITIES} from '../../../Actions/constants';
import {Actions} from 'react-native-router-flux';

class SecondStageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enableScrollViewScroll: true,
      searchedCities: [],
      searchedBrands: [],
    };
  }

  onChangeName(val) {
    this.props.changeName(val);
  }
  onChangeYear(year) {
    this.props.changeYear(year);
  }
  onChangeEmail(email) {
    this.props.changeEmail(email);
  }
  onChangePassword(pass) {
    this.props.changePass(pass);
  }
  onChangeConfirmPass(pass) {
    this.props.changeConfirmPass(pass);
  }

  onChangeBrand(title) {
    if (title.length >= 2) {
      this.searchedBrands(title);
    }
    this.props.onChangeBrand(title);
    this.refs._scrollView.scrollTo({x: 800, y: 500, animated: true});
  }
  onSelectBrand(brandObj) {
    this.setState({searchedBrands: []});
    this.props.onSelectBrand(brandObj);
  }
  onChangeCity(title) {
    if (title.length >= 2) {
      this.searchedCities(title);
    }
    this.props.changeCity(title);
    if (title.length == 1) {
      this.refs._scrollView.scrollTo({x: 800, y: 500, animated: true});
    }
  }

  onSelectCity(cityObj) {
    this.setState({searchedCities: []});
    this.props.selectCity(cityObj);
  }

  searchedCities = searchedText => {
    var searchedItems = this.props.cities.filter(function(item) {
      return item.title.toLowerCase().indexOf(searchedText.toLowerCase()) == 0;
    });
    if (searchedText.length <= 0) {
      searchedItems = [];
    }
    if (searchedItems.length == 1) {
      this.onSelectCity(searchedItems[0]);
      this.setState({searchedCities: []});
    }
    this.props.cities.some(e => {
      if (e.title.toLowerCase() === searchedText.toLowerCase().trim()) {
        this.onSelectCity(e);
        this.setState({searchedCities: []});
      }
    });
    this.setState({searchedCities: searchedItems.slice(0, 30)});
  };

  searchedBrands = searchedText => {
    var searchedItems = this.props.brands.filter(function(item) {
      return item.title.toLowerCase().indexOf(searchedText.toLowerCase()) == 0;
    });
    if (searchedText.length <= 0) {
      searchedItems = [];
    }
    if (searchedItems.length == 1) {
      this.onSelectBrand(searchedItems[0]);
      this.setState({searchedBrands: []});
    }
    this.props.brands.some(e => {
      if (e.title.toLowerCase() === searchedText.toLowerCase().trim()) {
        this.onSelectBrand(e);
        this.setState({searchedBrands: []});
      }
    });
    this.setState({searchedBrands: searchedItems.slice(0, 30)});
  };

  showAlert() {
    Alert.alert('Ошибка', 'Не все поля заполнены или заполнены не верно', [
      {
        text: 'OK',
        onPress: () => {
          console.log('close alert');
        },
      },
    ]);
  }

  onSubmit() {
    const {
      name,
      city,
      year,
      email,
      password,
      token,
      car,
      confirm_password,
      phone,
      brandId,
      cityId,
      pushToken,
    } = this.props;
    const userData = {
      token: token,
      name: name,
      city_id: cityId,
      email: email,
      year: year,
      brand_id: brandId,
      password: password,
      phone: phone,
      pushToken: pushToken,
    };
    if (
      name.length > 0 &&
      cityId > 0 &&
      year.length > 0 &&
      email.length &&
      password.length > 0 &&
      confirm_password.length > 0 &&
      brandId > 0
    ) {
      if (this.validate(email)) {
        if (password == confirm_password) {
          this.props.sendStep2(userData);
        } else {
          showAlert(
            'Ошибка',
            'Пароль и повторный пароль должны быть одинаковы',
            'Закрыть',
          );
        }
      } else {
        showAlert('Ошибка', 'не верный формат email', 'Закрыть');
      }
    } else {
      this.showAlert();
    }
  }

  validate = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };

  isFullInfo = () => {
    let {city, name, car, year, email, password, confirm_password} = this.props;
    return (
      city.length > 0 &&
      name.length > 0 &&
      car.length > 0 &&
      year.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      confirm_password.length > 0
    );
  };

  render() {
    console.log('render second stage props - ', this.props);
    return (
      <MainCard>
        <Header>ПЕРСОНАЛЬНЫЕ ДАННЫЕ</Header>
        <ScrollView
          ref="_scrollView"
          scrollEnabled={this.state.enableScrollViewScroll}>
          <CardItem
            style={{
              marginTop: 33,
              flex: 11,
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
            }}>
            <CustomInput
              label={'Имя'}
              placeholder={'Введите имя'}
              onChangeText={this.onChangeName.bind(this)}
              value={this.props.name}
            />
          </CardItem>
          <CardItem
            style={{
              marginTop: 18,
              flex: 11,
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
            }}>
            <CustomTextRow
              onPress={Actions.AutocompleteScreen}
              label={'Город'}
              value={this.props.city ? this.props.city : null}
              placeholder={'Введите город'}
            />
          </CardItem>
          <CardItem
            style={{
              marginTop: 18,
              flex: 11,
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
            }}>
            <CustomTextRow
              onPress={Actions.CarsScreen}
              label={'Марка авто'}
              value={this.props.car ? this.props.car : null}
              placeholder={'Введите марку авто'}
            />
          </CardItem>
          <CardItem
            style={{
              marginTop: 35,
              flex: 11,
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
            }}>
            <CustomInput
              label={'Год выпуска'}
              placeholder={'0000'}
              maxLength={4}
              keyboardType="numeric"
              onChangeText={this.onChangeYear.bind(this)}
              value={this.props.year}
            />
          </CardItem>
          <CardItem
            style={{
              marginTop: 35,
              flex: 11,
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
            }}>
            <CustomInput
              keyboardType={'email-address'}
              label={'Email'}
              placeholder={'sample@index.com'}
              onChangeText={this.onChangeEmail.bind(this)}
              value={this.props.email}
            />
          </CardItem>
          <CardItem
            style={{
              marginTop: 18,
              flex: 11,
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
            }}>
            <PasswordInput
              label={'Пароль'}
              placeholder={'Введите пароль'}
              onChangeText={this.onChangePassword.bind(this)}
              value={this.props.password}
            />
          </CardItem>
          <CardItem
            style={{
              marginTop: 25,
              flex: 11,
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
            }}>
            <PasswordInput
              labelStyle={{width: 180}}
              label={'Подтвердите пароль'}
              placeholder={'Введите пароль'}
              onChangeText={this.onChangeConfirmPass.bind(this)}
              value={this.props.confirm_password}
            />
          </CardItem>
          <CardItem
            style={{
              marginTop: 25,
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
            }}>
            <View style={styles.footerWrapper}>
              {this.props.sendingStep2 ? (
                <Spiner size="small" />
              ) : (
                <ButtonSquad
                  style={{
                    backgroundColor: this.isFullInfo() ? '#ffc200' : '#c5c5c5',
                  }}
                  disabled={this.props.sendingStep2}
                  onPress={this.onSubmit.bind(this)}>
                  ДАЛЕЕ
                </ButtonSquad>
              )}
            </View>
          </CardItem>
        </ScrollView>
      </MainCard>
    );
  }
}

const styles = {
  footerWrapper: {
    height: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const mapStateToProps = ({register, citiesBrands, auth}) => {
  return {
    name: register.name,
    city: register.city,
    cityId: register.cityId,
    car: register.car,
    brandId: register.carId,
    email: register.email,
    year: register.year,
    password: register.password,
    confirm_password: register.confirm_password,
    token: register.token,
    username: register.username,
    phone: register.phone,
    sendingStep2: register.sendingStep2,
    brands: citiesBrands.brands,
    cities: citiesBrands.cities,
    pushToken: auth.pushToken,
  };
};

export default connect(
  mapStateToProps,
  {
    changePass,
    changeCar,
    // changeCity,
    changeEmail,
    changeName,
    changeYear,
    changeConfirmPass,
    sendStep2,
    // selectCity,
    onChangeBrand,
    onSelectBrand,
  },
)(SecondStageComponent);
