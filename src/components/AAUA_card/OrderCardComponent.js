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
    changeNPSkald
} from '../../Actions/AAUA_CardAction';
import {connect} from 'react-redux';
import {getCities, getNPCities, getNPsklads} from '../../Actions/CitiesBrands';
import {DELIVERY_CURIER,
    DELIVERY_NP
} from '../../Actions/types';

class OrderCardComponent extends Component {

    onChangeCity(value) {
        this.props.changeCity(value);
        console.log('onChangeCity', value)
    }

    onChangeNPCity(value) {
        this.props.changeNPCity(value);
        this.props.getNPsklads(value);
console.log('onChangeNPCity', value)
    }

    onChangeDelivery (value) {
console.log('onChangeMethod ', value);
        this.props.changeDelivery(value);
    }

    onChangeNPSklad(value) {
        this.props.changeNPSkald(value);
    }

    onChangeAddress(value) {
        this.props.changeAddress(value);
        console.log('address was changed', value)
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
                "city" : this.props.delivery == DELIVERY_NP ? this.props.npCity : this.props.city,
                "delivery" : this.props.delivery,
                "address" : this.props.address,
                "address_comment" : this.props.comment,
                "phone" : this.props.phone
            }
        }
console.log('on submit OrderCardComponent', orderData)
        this.props.orderCard(orderData);

    }

    onSelect() {
        console.log(' on select')
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

    renderCities() {
        if (this.props.cities.length) {
            console.log(this.props.cities[0])
            return (
                <DropDown
                    label="Город"
                    elements={this.props.cities}
                    onValueChange={this.onChangeCity.bind(this)}
                    selected={this.props.city}
                />
            )
        }
        return (
            <DropDown
                label="Город"
                elements={[]}
                onValueChange={this.onChangeCity.bind(this)}
                selected={this.props.city}
            />
        )
    }

    renderNPCities() {
        if (this.props.NPcities.length) {

            return (
                <DropDown
                    label="Город"
                    elements={this.props.NPcities}
                    onValueChange={this.onChangeNPCity.bind(this)}
                    selected={this.props.npCity || this.props.NPcities[0]}
                />
            )
        }
        return (
            <DropDown
                label="Город"
                elements={[]}
                onValueChange={this.onChangeNPCity.bind(this)}
                selected={this.props.city}
            />
        )
    }

    renderNPsklad () {
        if (this.props.NPsklads.length) {
            return (
                <DropDown
                    label="Отделение Новой почты"
                    elements={this.props.NPsklads}
                    selected={this.props.NPskalds}
                    setDefaultValueToStore = {this.setDefaultSkladToStore.bind(this)}
                    onValueChange={this.onChangeNPSklad.bind(this)}
                />
            )
        }
        return (
            <DropDown
                label="Отделение Новой почты"
                elements={[]}
                selected={this.props.NPskald}
                setDefaultValueToStore = {this.setDefaultSkladToStore.bind(this)}
                onValueChange={this.onChangeNPSklad.bind(this)}
            />
        )
    }

    componentWillMount() {
// console.log('ordering component will mount');
//         this.props.getCities();
//         this.props.getNPCities();
    }

    componentWillReceiveProps(nextProp) {
        if (nextProp.orderCardSuccess) {
            this.showAlert();
        }
    }

    render() {
console.log('render ordering component RIGHT');
        const {textStyle, radiobuttonContainer, amountText} = styles;
        return (
            <MainCard>
                <Header back>
                    ОФОРМЛЕНИЕ ЗАКАЗА
                </Header>
                <ScrollView>
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
                    flex:0,
                    height:60,
                    flexDirection:'column',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start'
                }}>
                    {this.renderCities()}
                </CardItem>

                <CardItem
                    display={this.props.showNPCities}
                    style={{
                        marginTop: 22,
                        flex:0,
                        height:60,
                        flexDirection:'column',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-start'
                    }}>
                    {this.renderNPCities()}
                </CardItem>

                <CardItem
                    display={this.props.showNPSklads}
                    style={{
                        marginTop: 21,
                        flex:0,
                        height:60,
                        flexDirection:'column',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-start'
                    }}
                >
                    {this.renderNPsklad()}
                </CardItem>

                <CardItem
                    display={this.props.showAdress}
                    style={{
                    flex: 0,
                    height: 65,
                    marginTop:22,
                }}>
                    <LabelOnInput
                        label={'Адрес'}
                        placeholder={'введите адрес'}
                        onChangeText={this.onChangeAddress.bind(this)}
                        value={this.props.address}
                    />
                </CardItem>
                <CardItem
                    style={{
                        flex: 0,
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
console.log(citiesBrands);
var city = citiesBrands.cities[0].title;
if (AAUA_Card.delivery == DELIVERY_NP) {
    city = citiesBrands.NPcities[0].id
}
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
        city: AAUA_Card.city || city,
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
        changeNPSkald
    })(OrderCardComponent);
