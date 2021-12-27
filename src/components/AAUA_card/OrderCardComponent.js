import React, {Component} from 'react';
import {View, Text, CheckBox, ScrollView, Alert} from 'react-native';
import {
  MainCard,
  CardItem,
  LabelOnInput,
  DropDown,
  ButtonRoundet,
  PhoneInput,
  Icon,
  Autocomplete,
  Header, ClickableTextRow
} from '../common'
import {Actions} from 'react-native-router-flux';
import {RATIO, WIDTH_RATIO} from '../../styles/constants';
import {
    changeDelivery,
    changeNPCity,
    changeCity,
    changeAddress,
    changeComment,
    changePhone,
    orderCard,
    changeNPSkald,
    selectCity,
    selectAddress,
    cleanNPCities
} from '../../actions/AAUA_CardAction';
import {connect} from 'react-redux';
import {getCities, getNPCities, getNPsklads} from '../../actions/CitiesBrands';
import {DELIVERY_CURIER,
    DELIVERY_NP
} from '../../actions/types';
import {DEVICE_OS, iOS} from '../../actions/constants';

let listHeight = 0;

class OrderCardComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            query: '',
            searchedItems: []
        };
    };

    onChangeDelivery (value) {
        this.props.changeDelivery(value);
    }

    onPhoneChange(phone) {
        this.props.changePhone(phone)
    }

    onChangeComment(text) {
        this.props.changeComment(text);
    }

    onSubmit() {
        const orderData = {
            "token" : this.props.token,
            "bid" : {
                "city" : this.props.city,
                "delivery" : this.props.delivery,
                "address" : this.props.address,
                "address_comment" : this.props.comment,
                "phone" : this.props.phone
            }
        }
        this.props.orderCard(orderData);
    }

    setDefaultSkladToStore(address) {
        this.props.changeNPSkald(address.title);
    }

    showAlert() {
        Alert.alert(
            'Товар оплачен',
            'Спасибо за покупку',
            [
                {text: 'Закрыть', onPress: () => {Actions.AAUA_main();}},
            ],
            { cancelable: false }
        )
    }

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

    onChangeCity(title){
        if (title.length >= 2) {
            if (this.props.delivery == DELIVERY_NP) {
                this.props.getNPCities(title);
            } else {
                this.searchedItems(title);
            }
        }
        this.props.changeCity(title);
        this.refs._scrollView.scrollToEnd({animated: true})
    }

    onSelectCity(cityObj){
        this.setState({searchedItems: []});
        this.props.getNPCities('.');
        if (this.props.delivery == DELIVERY_NP) {
            this.props.selectCity(cityObj.id);
            this.props.getNPsklads(cityObj.id);
        } else {
            this.props.selectCity(cityObj.title);
        }
    }

    onChangeAddress(address) {
        this.props.changeAddress(address);
    }

    onSelectAddress(address) {
        this.props.selectAddress(address);
    }

    renderAddresses () {
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
                placeholder={'введите адрес'}
                onChangeText={this.onChangeAddress.bind(this)}
                value={this.props.address}
            />
        )
    }

    componentWillReceiveProps(nextProp) {
        console.log('--- order component---- receiver props', nextProp);
        if (nextProp.orderCardSuccess) {
            this.showAlert();
        }
    }

    render() {
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
                  <ClickableTextRow
                    onPress={this.props.delivery == DELIVERY_CURIER ? Actions.aauaCitiesScreen : Actions.aauaCitiesScreen}
                    label={"Город"}
                    value={this.props.city ? this.props.city : null}
                    placeholder={"Введите город"}
                  />
                </CardItem>

                <CardItem
                    display={this.props.showAdress}
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
                        placeholder={'введите Коментарий'}
                        onChangeText={this.onChangeComment.bind(this)}
                        value={this.props.comment}
                    />
                </CardItem>
                <CardItem style={{
                    flex: 0,
                    height: 65,
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
                        flex:11,
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
                        Отправить
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
        color: '#423486'
    },
    footerWrapper: {
        height: 40
    }
}

const mapStateToProps = ({AAUA_Card, citiesBrands, auth}) => {
    return {
        token: auth.user.token,
        showCities: AAUA_Card.showCities,
        showNPCities: AAUA_Card.showNPCities,
        showNPSklads: AAUA_Card.showNPSklads,
        showAdress: AAUA_Card.showAdress,
        npCity: AAUA_Card.npCity,
        delivery: AAUA_Card.delivery,
        NPskald: AAUA_Card.NPskald,
        phone: AAUA_Card.phone,
        comment: AAUA_Card.comment,
        address: AAUA_Card.address,
        city: AAUA_Card.city,
        orderCardSuccess: AAUA_Card.orderCardSuccess,

        NPsklads: citiesBrands.NPsklads,
        NPcities: citiesBrands.NPcities,
        cities: citiesBrands.cities,
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
        changePhone,
        orderCard,
        changeNPSkald,
        selectCity,
        selectAddress,
        cleanNPCities
    })(OrderCardComponent);
