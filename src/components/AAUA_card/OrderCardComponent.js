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
    Header} from '../common'
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
    selectAddress
} from '../../Actions/AAUA_CardAction';
import {connect} from 'react-redux';
import {getCities, getNPCities, getNPsklads} from '../../Actions/CitiesBrands';
import {DELIVERY_CURIER,
    DELIVERY_NP
} from '../../Actions/types';

class OrderCardComponent extends Component {

//     onChangeCity(value) {
//         this.props.changeCity(value);
//         console.log('onChangeCity', value)
//     }
//
//     onChangeNPCity(value) {
//         this.props.changeNPCity(value);
//         this.props.getNPsklads(value);
// console.log('onChangeNPCity', value)
//     }

    onChangeDelivery (value) {
console.log('onChangeMethod ', value);
        this.props.changeDelivery(value);
    }

    onPhoneChange(phone) {
        this.props.changePhone(phone)
        console.log('onPhoneChange')
    }

    onChangeComment(text) {
        this.props.changeComment(text);
        console.log('comment was changed', text);
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
console.log('on submit OrderCardComponent', orderData)
        this.props.orderCard(orderData);

    }

    setDefaultSkladToStore(address) {
        console.log(address);
        this.props.changeNPSkald(address.title);
    }

    showAlert() {
        Alert.alert(
            'Товар оплачен',
            'Спасибо за покупку',
            [
                {text: 'Закрыть', onPress: () => {Actions.AAUA_main();}},
            ],
        )
    }

    onChangeCity(title){
        console.log(title)
        this.props.changeCity(title);
        this.refs._scrollView.scrollToEnd({animated: true})
    }

    onSelectCity(cityObj){
        console.log(cityObj);
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
        console.log(this.props.NPsklads.length, this.props.NPsklads);
        if (this.props.delivery == DELIVERY_NP && this.props.city && this.props.NPsklads.length) {
            console.log('tyt');
            return (
                <DropDown
                    label="Город"
                    elements={this.props.NPsklads}
                    onValueChange={this.onChangeAddress.bind(this)}
                    selected={this.props.address}
                    setDefaultSkladToStore={this.setDefaultSkladToStore.bind(this)}
                />
            )
        }
        console.log('ne tyt');
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
        if (nextProp.orderCardSuccess) {
            this.showAlert();
        }
    }

    onFocus() {
        console.log('on focus')
        // this.refs._scrollView.scrollTo({x:0, y:0});
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
                        onChangeText={() => console.log('change country')}
                        value={this.props.county}
                    />
                </CardItem>
                <CardItem style={{
                    marginTop: 21,
                    flex:0,
                    height:55,
                    flexDirection:'column',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start'
                }}>
                    <DropDown
                        label="Способ доставки"
                        elements={[
                            {title: 'Курьер', value: DELIVERY_CURIER, id: 2},
                            {title: 'Новая почта', value: DELIVERY_NP, id: 1}
                        ]}
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
                    <Autocomplete
                        label={'Город'}
                        placeholder={'Введите город'}
                        onChangeText={this.onChangeCity.bind(this)}
                        onSelect={this.onSelectCity.bind(this)}
                        data={
                            this.props.delivery == DELIVERY_CURIER ?
                            this.props.cities : this.props.NPcities}
                        value={this.props.city}
                        onFocus={this.onFocus.bind(this)}
                    />
                </CardItem>

                <CardItem
                    display={this.props.showAdress}
                    style={{
                        flex:11,
                    height: 65,
                    marginTop:22,
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
        height: 40,
        // marginLeft: 45,
        // marginRight: 45,
    }
}

const mapStateToProps = ({AAUA_Card, citiesBrands, auth}) => {
console.log(AAUA_Card);
// var city = citiesBrands.cities[0].title;
// if (AAUA_Card.delivery == DELIVERY_NP) {
//     city = citiesBrands.NPcities[0].id
// }
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
        selectAddress
    })(OrderCardComponent);
