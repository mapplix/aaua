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
    Header} from '../common'
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import {RATIO, WIDTH_RATIO} from '../../styles/constants';
import {showAlert} from '../Modals';
import {CITIES} from '../../Actions/constants';
import {
    changeDelivery,
    changeNPCity,
    changeCity,
    changeAddress,
    changeComment
} from '../../Actions/OrderingAction';
import {connect} from 'react-redux';
import {getCities, getNPCities, getNPsklads} from '../../Actions/CitiesBrands';

class OrderingComponent extends Component {

    onChangeCity(value) {
        this.props.changeCity(value);
        console.log('onChangeCity', value)
    }

    onChangeNPCity(value) {
        this.props.changeNPCity(value);
        this.props.getNPsklads(value);
        console.log('onChangeCity', value)
    }

    onChangeDelivery (value) {
        console.log('onChangeMethod', value);
        this.props.changeDelivery(value);
    }

    onChangeNPSklad(value) {

        console.log('onChangePoffice', value);

    }

    onChangeAddress(value) {
        this.props.changeAddress(value);
        console.log('address was changed', value)
    }

    onPhoneChange() {
        console.log('onPhoneChange')
    }

    onChangeComment(text) {
        this.props.changeComment(text);
        console.log('comment was changed', text);
    }

    onSubmit() {
        console.log(this.props);
        showAlert(
            'Товар оплачен',
            'Спасибо за покупку!',
            'Закрыть',
            console.log('onSubmit')
        );
    }

    onSelect() {
        console.log(' on select')
    }

    showAlert() {
        Alert.alert(
            'Товар оплачен',
            'Спасибо за покупку',
            [
                {text: 'Закрыть', onPress: () => {console.log('close alert')}},
            ],
        )
    }

    renderCities() {
        if (this.props.cities.length) {
            console.log(this.props.cities.length)
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
console.log(this.props.NPcities.length)
            return (
                <DropDown
                    label="Город"
                    elements={this.props.NPcities}
                    onValueChange={this.onChangeNPCity.bind(this)}
                    selected={this.props.npCity}
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
                    selected={this.props.NPskald}
                    onValueChange={this.onChangeNPSklad.bind(this)}
                />
            )
        }
        return (
            <DropDown
                label="Отделение Новой почты"
                elements={[]}
                selected={this.props.NPskald}
                onValueChange={this.onChangeNPSklad.bind(this)}
            />
        )
    }

    componentWillMount() {
console.log('ordering component will mount');
        this.props.getCities();
        this.props.getNPCities();
    }

    render() {
console.log('render ordering component');
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
                            {title: 'Курьер', value: 1, id: 1},
                            {title: 'Новая почта', value: 2, id: 2}
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
                    display={this.props.showAdress}
                    style={{
                        flex: 0,
                        height: 65,
                        marginTop:22,
                    }}>
                    <LabelOnInput
                        label={'Коментарий'}
                        placeholder={'введите Коментарий'}
                        onChangeText={this.onChangeComment.bind(this)}
                        value={this.props.address}
                    />
                </CardItem>
                <CardItem style={{
                    flex: 0,
                    height: 65,
                    marginTop:22,
                }}>
                    <PhoneInput
                        label={'Номер телефона'}
                        placeholder={'+38'}
                        value={this.props.phone}
                        onChangeText={this.onPhoneChange.bind(this)}
                    />
                </CardItem>
                <CardItem style={{
                    flex:0,
                    height: 125 * RATIO,
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
                            selectedIndex={0}
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
                                        width: 69,
                                        height: 14
                                    }}
                                    imageSrc={require('../../images/liqpay.png')}
                                />
                            </RadioButton>

                            <RadioButton value={'2'}>
                                <Text >Бонусы</Text>
                            </RadioButton>
                        </RadioGroup>
                        <View style={{flex:1}}>
                            <Text style={amountText}>
                                1785 грн.
                            </Text>
                            <View style={{
                                marginTop: 17,
                                flexDirection: 'row',
                                alignItems:'flex-end'
                            }}>
                                <Text style={amountText}> 1785 </Text>
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
        color: '#423486'
    },
    footerWrapper: {
        height: 40,
        // marginLeft: 45,
        // marginRight: 45,
    }
}

const mapStateToProps = ({ordering, citiesBrands}) => {
console.log(citiesBrands);
    return {
        showCities: ordering.showCities,
        showNPCities: ordering.showNPCities,
        showNPSklads: ordering.showNPSklads,
        showAdress: ordering.showAdress,
        npCity: ordering.npCity,
        delivery: ordering.delivery,
        NPskald: ordering.NPskald,
        phone: ordering.phone,
        comment: ordering.comment,
        address: ordering.address,
        city: ordering.city,

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
        changeComment
    })(OrderingComponent);
