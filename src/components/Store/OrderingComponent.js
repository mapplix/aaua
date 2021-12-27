import React, {Component} from 'react';
import {View, Text, CheckBox, ScrollView} from 'react-native';
import {
  MainCard,
  CardItem,
  LabelOnInput,
  DropDown,
  ButtonRoundet,
  PhoneInput,
  Icon,
  Header,
  Autocomplete, ClickableTextRow
} from '../common'
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import {RATIO, WIDTH_RATIO} from '../../styles/constants';
import {CITIES, DEFAULT_CITY} from '../../actions/constants';
import {DELIVERY_CURIER,
    DELIVERY_NP
} from '../../actions/types';
import {connect} from 'react-redux';
import {
    makeOrder,
    changeDelivery,
    changeAddress,
    changeCity,
    changeNPCity,
    changeNPSkald,
    selectCity,
    changeComment,
    changePhone,
    selectPaymentType
} from '../../actions/StoreAction';
import {getCities, getNPCities, getNPsklads} from '../../actions/CitiesBrands';
import {showAlert} from '../Modals'
import {Actions} from "react-native-router-flux";

let listHeight = 0;

class OrderingComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            query: '',
            searchedItems: []
        };
    };

    onChangeDelivery (value) {

console.log('onChangeDelivery', value);

        this.props.changeDelivery(value);
        if (value == DELIVERY_NP) {
            this.props.getNPsklads(DEFAULT_CITY);
        }
        this.props.selectCity(DEFAULT_CITY);
    }

    onPhoneChange(phone) {
        this.props.changePhone(phone)
    }

    onChangeComment(text) {
        this.props.changeComment(text);
    }
  /*
      searchedItems = (searchedText) => {
          var searchedItems = this.props.cities.filter(function(item) {
              return item.title.toLowerCase().indexOf(searchedText.toLowerCase()) == 0;
          });
          if (searchedText.length <= 0) {
              searchedItems = []
          }
          if (searchedItems.length > 0 ) {
              listHeight = searchedItems.length * 20;
          }
          if (searchedItems.length == 1) {
              this.onSelectCity(searchedItems[0])
              this.setState({searchedItems: []});
          }
          this.props.cities.some(e => {
              if (e.title.toLowerCase() === searchedText.toLowerCase().trim()) {
                  this.onSelectCity(e)
                  this.setState({searchedItems: []});
              }
          })
          this.setState({searchedItems: searchedItems.slice(0, 30)});
      };

      /*onChangeCity(title){
          if (title.length >= 2) {
              if (this.props.delivery == DELIVERY_NP) {
                  this.props.getNPCities(title);
              } else {
                  this.searchedItems(title);
              }
          }
          this.props.changeCity(title);
          // this.refs._scrollView.scrollToEnd({animated: true})
      }

      onSelectCity(cityObj){
          console.log('onSelectCity', cityObj, this.props.delivery);
          this.setState({searchedItems: []});
          this.props.getNPCities('.');
          if (this.props.delivery == DELIVERY_NP) {
              this.props.selectCity(cityObj.id);
              this.props.getNPsklads(cityObj.id);
          } else {
              this.props.selectCity(cityObj.title);
          }
      }
  */
    onSelect(index, value) {
        this.props.selectPaymentType(index);
        console.log(' on select', index, value)
    }

    onChangeAddress(address) {
        this.props.changeAddress(address);
    }

    onSubmit() {
        console.log(this.props);
        let productIds = []
        this.props.basket.map(product => {
            productIds.push(product.id)
        });
        let {user, makeOrder,
            address, city, comment,
            delivery, phone, NPskald,
            paymentType, basketBonusSum,
            basket} = this.props;
        let orderData = {
            address: address,
            comment: comment,
            city: city,
            delivery: delivery,
            phone: phone,
            NPskald: NPskald
        }
        let orderType = paymentType == 1 ? 'booking' : ''
        if (paymentType == 1) {
            console.log(user.bonus < basketBonusSum, user.bonus, basketBonusSum)
            if (user.bonus < basketBonusSum) {
                showAlert(
                    '',
                    'На Вашем счету недостаточно бонусов для оплаты',
                    'Закрыть'
                )
            } else {
                showAlert(
                    '',
                    'С Вашего счета будет списано '+basketBonusSum+' (сумма товара) бонусов.',
                    'Оплатить',
                    () => makeOrder(user, basket, orderData, orderType)
                )
            }
        } else {
            makeOrder(user, basket, orderData, orderType);
        }
    }

    setDefaultSkladToStore(address) {
        this.props.changeNPSkald(address.title);
    }

    renderAddresses () {
console.log("*** renderAddresses", this.props.delivery, this.props.city, this.props.NPsklads.length);
        if (this.props.delivery == DELIVERY_NP && this.props.city && this.props.NPsklads.length) {
            return (
                <DropDown
                    label="Адрес"
                    elements={this.props.NPsklads}
                    onValueChange={this.onChangeAddress.bind(this)}
                    selected={this.props.address}
                    valueExtractor={ (value) => value.title}
                    setDefaultValueToStore={this.setDefaultSkladToStore.bind(this)}
                />
            )
        }
        return (
            <LabelOnInput
                label={'Адрес'}
                placeholder={'Введите адрес'}
                onChangeText={this.onChangeAddress.bind(this)}
                value={this.props.address}
            />
        )
    }

    render() {
        let bonusSum = this.props.basketBonusSum;
        let sum = this.props.basketSum;

        if (this.props.repeatOrder) {
            bonusSum = this.props.repeatOrder.bonus_price;
            sum = this.props.repeatOrder.price;

        }

console.log('render ordering component', this.props.city);
        const {textStyle, radiobuttonContainer, amountText} = styles;
        return (
            <MainCard>
                <Header back>
                    ОФОРМЛЕНИЕ ЗАКАЗА
                </Header>
                <ScrollView
                    ref='_scrollView'
                >
                <CardItem
                    style={{
                        marginTop: 33,
                        flex:0,
                        height:60,
                        flexDirection:'column',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-start'
                    }}
                >
                    <LabelOnInput
                        editable={false}
                        selectTextOnFocus={false}
                        label={'Страна'}
                        placeholder={'Украина'}
                        onChangeText={() => []}
                        value={this.props.county}
                    />
                </CardItem>
                <CardItem style={{
                    marginTop: 21,
                    flex:0,
                    height: 85,
                    flexDirection:'column',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start'
                }}>
                    <DropDown
                        label="Способ доставки"
                        elements={[
                            {title: 'Курьер', id: DELIVERY_CURIER},
                            {title: 'Новая почта', id: DELIVERY_NP}
                        ]}
                        valueExtractor={ (value) => value.id}
                        selected={this.props.delivery}
                        onValueChange={this.onChangeDelivery.bind(this)}
                    />

                </CardItem>

                <CardItem
                    display={this.props.showCities}
                    style={{
                        marginTop: 22,
                        flex:11,
                        flexDirection:'column',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-start'
                    }}>
                  {/*}
                    <Autocomplete
                        label={'Город'}
                        placeholder={'Введите город'}
                        onChangeText={this.onChangeCity.bind(this)}
                        onSelect={this.onSelectCity.bind(this)}
                        data={
                            this.props.delivery == DELIVERY_CURIER ?
                                this.state.searchedItems : this.props.NPcities}
                        value={this.props.city}
                        listHeight={{height: listHeight}}
                    />
                  */}
                  <ClickableTextRow
                        onPress={this.props.delivery == DELIVERY_CURIER ? Actions.StoreCitiesScreen : Actions.StoreNPCitiesScreen}
                        label={"Город"}
                        value={this.props.city ? this.props.city : null}
                        placeholder={"Введите город"}
                      />
                </CardItem>
                <CardItem
                    style={{
                        flex:15,
                        // height: 65,
                        // marginTop:22,
                    }}>

                    {this.renderAddresses()}
                </CardItem>
                <CardItem
                    style={{
                        flex:11,
                        height: 65,
                        marginTop:22,
                    }}>
                    <LabelOnInput
                        label={'Коментарий'}
                        placeholder={'Введите коментарий'}
                        onChangeText={this.onChangeComment.bind(this)}
                        value={this.props.comment}
                    />
                </CardItem>
                <CardItem style={{
                    flex: 12,
                    // height: 65,
                    marginTop:22,
                }}>
                    <PhoneInput
                        label={'Номер телефона'}
                        placeholder={'+380'}
                        value={this.props.phone}
                        onChangeText={this.onPhoneChange.bind(this)}
                    />
                </CardItem>
                <CardItem style={{
                    flex:15,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                    paddingBottom: 20
                }}>
                    <View style={{
                        paddingLeft: 45,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        marginBottom: 10
                    }}>
                        <Text style={[
                            textStyle,
                            {marginRight: 100 * WIDTH_RATIO}
                            ]}>
                            Тип оплаты:
                        </Text>
                        <Text style={textStyle}>
                            Тип оплаты:
                        </Text>
                    </View>
                    <View style={{
                        backgroundColor: '#fafafa',
                        height:80,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        paddingLeft: 38 * WIDTH_RATIO,
                        // backgroundColor: '#289',
                    }}>
                        <RadioGroup
                            selectedIndex={this.props.paymentType}
                            color='#423486'
                            style={{
                                marginRight: 47 * WIDTH_RATIO,
                                marginBottom: 8
                            }}
                            onSelect = {(index, value) => this.onSelect(index, value)}
                        >
                            <RadioButton value={'1'} >
                                <Icon
                                    style={{
                                        width: 70,
                                        height: 25
                                    }}
                                    imageSrc={require('../../images/master_card.jpg')}
                                />
                            </RadioButton>

                            <RadioButton value={'2'}>
                                <Text >Бонусы</Text>
                            </RadioButton>
                        </RadioGroup>
                        <View style={{flex:1}}>
                            <Text style={amountText}>
                                {sum} грн.
                            </Text>
                            <View style={{
                                marginTop: 17,
                                flexDirection: 'row',
                                alignItems:'flex-end'
                            }}>
                                <Text style={amountText}>
                                    {bonusSum}
                                </Text>
                                <Text style={[amountText, {fontSize: 14}]}>
                                    бонусов
                                </Text>
                            </View>
                        </View>
                    </View>
                </CardItem>
                    <CardItem style={{
                    flex:0,
                    height: 75 * RATIO,
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    paddingLeft: 83,
                    paddingRight: 83,
                    paddingBottom: 16 *RATIO,
                    paddingTop: 18 *RATIO,
                }}>
                    <ButtonRoundet
                        style={{
                            backgroundColor: '#ffc200',
                            borderColor: '#ffc200'
                        }}
                        textStyle={{
                            fontFamily: 'SFUIText-Medium',
                            color: '#1b1b1b'
                        }}
                        onPress={this.onSubmit.bind(this)}
                    >
                        Оплатить
                    </ButtonRoundet>
                </CardItem>
                </ScrollView>
            </MainCard>
        )
    }
}

const styles = {
    textStyle: {
        fontFamily: 'SFUIText-Regular',
        fontSize: 12,
        color: '#3d3e40'
    },
    radiobuttonContainer: {
        backgroundColor: '#289',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    amountText: {
        fontFamily: 'SFUIText-Bold',
        fontSize: 19,
        color: '#423486',
        marginLeft: 5
    },
    footerWrapper: {
        height: 40,
        // marginLeft: 45,
        // marginRight: 45,
    }
}

const mapStateToProps = ({ordering, citiesBrands, store, auth, basket}) => {
    return {
        user: auth.user,
        showCities: ordering.showCities,
        showNPCities: ordering.showNPCities,
        showNPSklads: ordering.showNPSklads,
        showAdress: ordering.showAdress,
        npCity: store.npCity,
        delivery: store.delivery,
        NPskald: store.NPskald,
        phone: store.phone,
        comment: store.comment,
        address: store.address,
        city: store.city,
        paymentType: store.paymentType,

        NPsklads: citiesBrands.NPsklads,
        NPcities: citiesBrands.NPcities,
        cities: citiesBrands.cities,

        basket: basket.basket,
        basketBonusSum: basket.basketBonusSum,
        basketSum: basket.basketSum,
    }
}

export default connect(
    mapStateToProps,
    {
        changeDelivery,
        getNPCities,
        getCities,
        changeNPCity,
        changeCity,
        changeAddress,
        getNPsklads,
        changeComment,
        makeOrder,
        selectCity,
        changeNPSkald,
        changePhone,
        selectPaymentType
    })(OrderingComponent);
