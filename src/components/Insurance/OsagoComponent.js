import React, {Component} from 'react';
import {View, Text, Linking, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import {
  MainCard,
  CardItem,
  ButtonRoundet,
  LabelOnInput,
  Header,
  Autocomplete,
  Spiner,
  DropDown,
  ClickableTextRow,
} from '../common';
import {RATIO} from '../../styles/constants';
import {CITIES, DEVICE_OS, iOS} from '../../Actions/constants';
import {
  changeRegistration,
  changeVolume,
  orderOsago,
  changeOsagoCity,
  selectOsagoCity,
  getCarType,
  calculateOsago,
  resetData,
} from '../../Actions/InsuranceAction';
import {getCities} from '../../Actions/CitiesBrands';
import {Actions} from 'react-native-router-flux';
import {showAlert} from '../Modals';
import Modal from 'react-native-modalbox';

class OsagoComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchedCities: [],
      rowHeight: 2,
      cityId: null,
      carType: 1,
      isOpen: false,
    };
  }

  onChangeVolume(itemValue) {
    this.props.changeVolume(itemValue);
    this.setState({carType: itemValue});
    if (this.state.cityId != null) {
      this.props.calculateOsago(this.props.token, this.state.cityId, itemValue);
    }
  }

  //     onChangeCity(itemValue){
  //         if (itemValue.length >= 2) {
  //             this.searchedCities(itemValue);
  //         }
  //         this.props.changeOsagoCity(itemValue);
  //     }
  //
  //     onSelectCity(city){
  //         this.props.selectOsagoCity(city);
  //         this.setState({searchedCities: [], cityId:city, rowHeight:2});
  // console.log("----onSelectCity", city, this.state.carType);
  //         if (this.state.carType != null) {
  //             this.props.calculateOsago(this.props.token, city, this.state.carType)
  //         }
  //     }

  onOrder() {
    const {token, carType, cityId} = this.props;
    const orderData = {
      token,
      carType,
      cityId,
    };
    this.props.orderOsago(orderData);
  }

  // searchedCities = (searchedText) => {
  //     var searchedItems = this.props.cities.filter(function(item) {
  //         return item.title.toLowerCase().indexOf(searchedText.toLowerCase()) == 0;
  //     });
  //     if (searchedText.length <= 0) {
  //         searchedItems = []
  //     }
  //     if (searchedItems.length == 1) {
  //         this.onSelectCity(searchedItems[0])
  //         this.setState({searchedCities: []});
  //     }
  //     this.props.cities.some(e => {
  //         if (e.title.toLowerCase() === searchedText.toLowerCase().trim()) {
  //             this.onSelectCity(e)
  //             this.setState({searchedCities: []});
  //         }
  //     })
  //     if (searchedItems.length == 0) {
  //         this.setState({rowHeight:2})
  //     } else if (searchedItems.length <= 10) {
  //         this.setState({rowHeight:3})
  //     } else if (searchedItems.length > 10) {
  //         this.setState({rowHeight:6})
  //     }
  //     this.setState({searchedCities: searchedItems.slice(0, 30)});
  // };

  componentWillReceiveProps(nextProps) {
    if (nextProps.osagoOrderSuccess) {
      showAlert('Спасибо', 'Ваша заявка принята', 'Закрыть', () => {
        this.props.resetData();
        Actions.insuranceCategories();
      });
    }
  }

  componentWillMount() {
    this.setState({cityId: this.props.cityId});
    this.props.calculateOsago(
      this.props.token,
      this.props.cityId,
      this.state.carType,
    );
  }

  componentWillUnmount() {
    this.props.resetData();
  }

  renderPrice() {
    if (this.props.loadingPrice) {
      return <Spiner />;
    } else {
      return (
        <Text
          style={{
            fontFamily: 'SFUIText-Bold',
            fontSize: 19,
            color: '#423486',
          }}>
          {parseInt(this.props.osagoPrice)}грн
        </Text>
      );
    }
  }

  setDefaultVolumeToStore(itemValue) {
    this.setState({carType: itemValue.value});
    this.props.changeVolume(itemValue.value);
  }

  render() {
    console.log('--OSAGE RENDER--', this.props);
    return (
      <MainCard>
        <Header back>ОСАГО</Header>
        <CardItem
          style={{
            marginTop: 18,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
          }}>
          <DropDown
            fontSize={13}
            label="Обьем двигателя"
            elements={[
              {title: 'Легковые автомобили - до 1600 м3', id: 1, value: 1},
              {
                title: 'Легковые автомобили - от 1601 до 2000 м3',
                id: 2,
                value: 2,
              },
              {
                title: 'Легковые автомобили - от 2001 до 3000 м3',
                id: 3,
                value: 3,
              },
              {title: 'Легковые автомобили - более 3000 м3', id: 4, value: 4},
            ]}
            onValueChange={this.onChangeVolume.bind(this)}
            selected={this.props.carType}
            setDefaultValueToStore={this.setDefaultVolumeToStore.bind(this)}
          />
        </CardItem>
        <CardItem
          style={{
            marginTop: 18,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
          }}>
          <ClickableTextRow
            onPress={Actions.InsuranceCitiesScreen}
            label={'Город регистрации авто'}
            value={this.props.city ? this.props.city : null}
            placeholder={'Введите город'}
          />
        </CardItem>
        <CardItem
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flex: 1,
          }}>
          <View
            style={{
              flex: 1,
              height: 33,
              backgroundColor: '#fafafa',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            {this.renderPrice()}
          </View>
        </CardItem>
        <CardItem
          style={{
            marginTop: 20,
            flex: 1,
          }}>
          <ButtonRoundet
            style={{
              marginRight: 83,
              marginLeft: 83,
              height: 45,
              backgroundColor: '#FFC200',
              borderColor: '#FFC200',
            }}
            textStyle={{color: '#1B1B1B'}}
            onPress={this.onOrder.bind(this)}>
            Получить предложение
          </ButtonRoundet>
        </CardItem>
        <CardItem
          style={{
            marginTop: 10,
            flex: 3,
            flexDirection: 'column',
          }}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <View
              style={{
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.textColor}>ИЛИ</Text>
            </View>
            <View
              style={{
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.textColor}>купите электронный</Text>
              <Text style={styles.textColor}>страховой полис</Text>
            </View>
          </View>
          <View
            style={{
              height: 50,
            }}>
            <ButtonRoundet
              style={{
                marginRight: 83,
                marginLeft: 83,
                height: 50,
                backgroundColor: '#FFC200',
                borderColor: '#FFC200',
              }}
              textStyle={{color: '#1B1B1B'}}
              // onPress={() => Linking.openURL('https://aiwa-platform.firebaseapp.com/d/6VzKDxmKj5/t/Qnp0xWdPBq')}
              onPress={Actions.WebInsurance}>
              Купить онлайн
            </ButtonRoundet>
          </View>
        </CardItem>
        <Modal
          style={{
            height: 270,
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#fff',
          }}
          position={'center'}
          ref={'modal'}
          isOpen={this.state.isOpen}
          onClosed={() => this.setState({isOpen: false})}>
          <View
            style={{
              flex: 1,
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() =>
                Linking.openURL(
                  'https://aiwa-platform.firebaseapp.com/d/6VzKDxmKj5/t/Qnp0xWdPBq',
                )
              }>
              <Image
                style={{
                  width: 200,
                  height: 100,
                }}
                resizeMode="contain"
                source={require('../../images/arsenal.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() =>
                Linking.openURL(
                  'https://shop.upsk.com.ua/site-upsk/commonOsago.html',
                )
              }>
              <Image
                style={{
                  width: 200,
                  height: 100,
                }}
                resizeMode="contain"
                source={require('../../images/upsk.png')}
              />
            </TouchableOpacity>
          </View>
        </Modal>
      </MainCard>
    );
  }
}

const styles = {
  textColor: {
    color: '#423486',
  },
};

mapStateToProps = ({auth, insurance, citiesBrands}) => {
  return {
    token: auth.user.token,
    carType: insurance.volume,
    registration: insurance.registration,
    brands: citiesBrands.brands,
    cities: citiesBrands.cities,
    city: insurance.osagoCity,
    cityId: insurance.osagoCityId,
    carTypes: insurance.carTypes,
    osagoPrice: insurance.osagoPrice,
    loadingPrice: insurance.osagoPriceLoading,
    osagoOrderSuccess: insurance.osagoOrderSuccess,
  };
};

export default connect(
  mapStateToProps,
  {
    changeRegistration,
    changeVolume,
    orderOsago,
    getCities,
    changeOsagoCity,
    selectOsagoCity,
    getCarType,
    calculateOsago,
    resetData,
  },
)(OsagoComponent);
