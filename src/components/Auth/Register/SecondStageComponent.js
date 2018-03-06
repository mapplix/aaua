import React, {Component} from 'react';
import {View, ScrollView, Alert} from 'react-native';
import {connect} from 'react-redux';
import {
    changePass,
    changeCar,
    changeCity,
    changeEmail,
    changeName,
    changeYear,
    changeConfirmPass,
    sendStep2} from '../../../Actions/RegisterAction'
import {getBrands, getCities} from '../../../Actions/CitiesBrands'
import {
    MainCard,
    CardItem,
    ButtonSquad,
    LabelOnInput,
    DropDown,
    PasswordInput,
    Header
} from '../../common';
import {CITIES} from '../../../Actions/constants';

class SecondStageComponent extends Component {

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

    onChangeCar(itemValue){
        console.log(itemValue)
        this.props.changeCar(itemValue);
    }
    onChangeCity(itemValue){
        console.log(itemValue)
        this.props.changeCity(itemValue);
    }

    showAlert() {
        Alert.alert(
            'Ошибка',
            'Не все поля заполнены или заполнены не верно',
            [
                {text: 'OK', onPress: () => {console.log('close alert')}},
            ],
        )
    }

    onSubmit() {
        const {name, city, year, email, password, token, car, confirm_password, phone} = this.props;
        const userData = {
            token : token,
            name : name,
            city_id : city,
            email : email,
            year : year,
            brand_id : car,
            password : password,
            phone: phone
        }
        if (name.length > 0 && city > 0
            && year.length> 0 && email.length
            && password.length > 0 && confirm_password > 0) {
            if(this.validate(email)) {
                this.props.sendStep2(userData)
            } else {
                console.log(' email not valid');
            }

        } else {
            this.showAlert();
        }
    }

    validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(text) === false)
        {
            return false;
        } else {
            return true
        }
    }

    // componentWillMount() {
    //     this.props.getBrands();
    //     this.props.getCities();
    // }

    renderBrands() {
        if(this.props.brands.length) {
            return (
                <DropDown
                    label="Марка авто"
                    elements={this.props.brands}
                    selected={this.props.car}
                    onValueChange={this.onChangeCar.bind(this)}
                />
            )
        }
        return (
            <DropDown
                label="Марка авто"
                elements={[]}
                selected={this.props.car}
                onValueChange={this.onChangeCar.bind(this)}
            />
        )
    }

    renderCities() {
        if(this.props.cities.length) {
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
                selected={this.props.city}
                onValueChange={this.onChangeCity.bind(this)}
            />
        )
    }

    render() {
        return(
            <MainCard>
                <Header >
                    ПЕРСОНАЛЬНЫЕ ДАННЫЕ
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
                            label={'Имя'}
                            placeholder={'введите имя'}
                            onChangeText={this.onChangeName.bind(this)}
                            value={this.props.name}
                        />
                    </CardItem>
                    <CardItem style={{
                        marginTop: 18,
                        flex:0,
                        height:60,
                        flexDirection:'column',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-start'
                    }}>
                        {this.renderCities()}
                    </CardItem>
                    <CardItem style={{
                        marginTop: 18,
                        flex:0,
                        height:60,
                        flexDirection:'column',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-start'
                    }}>
                        {this.renderBrands()}
                    </CardItem>
                    <CardItem
                        style={{
                            marginTop: 18,
                            flex:0,
                            height:60,
                            flexDirection:'column',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-start'
                        }}
                    >
                        <LabelOnInput
                            label={'Год выпуска'}
                            placeholder={'0000'}
                            maxLength={4}
                            keyboardType = 'numeric'
                            onChangeText={this.onChangeYear.bind(this)}
                            value={this.props.year}
                        />
                    </CardItem>
                    <CardItem
                        style={{
                            marginTop: 18,
                            flex:0,
                            height:60,
                            flexDirection:'column',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-start'
                        }}
                    >
                        <LabelOnInput
                            label={'Email'}
                            placeholder={'sample@index.com'}
                            onChangeText={this.onChangeEmail.bind(this)}
                            value={this.props.email}
                        />
                    </CardItem>
                    <CardItem
                        style={{
                            marginTop: 18,
                            flex:0,
                            height:60,
                            flexDirection:'column',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-start'
                        }}
                    >
                        <PasswordInput
                            label={'Пароль'}
                            placeholder={'введите пароль'}
                            onChangeText={this.onChangePassword.bind(this)}
                            value={this.props.password}
                        />
                    </CardItem>
                    <CardItem
                        style={{
                            marginTop: 17,
                            flex:0,
                            height:55,
                            flexDirection:'column',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-start'
                        }}
                    >
                        <PasswordInput
                            labelStyle={{width: 180}}
                            label={'Подтвердите пароль'}
                            placeholder={'введите пароль'}
                            onChangeText={this.onChangeConfirmPass.bind(this)}
                            value={this.props.confirm_password}
                        />
                    </CardItem>
                    <CardItem style={{
                        marginTop: 15,
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end'
                    }}>
                        <View style={styles.footerWrapper}>
                            <ButtonSquad onPress={this.onSubmit.bind(this)}>
                                ДАЛЕЕ
                            </ButtonSquad>
                        </View>
                    </CardItem>
                </ScrollView>
            </MainCard>
        )
    }
}

const styles = {
    footerWrapper: {
        height: 50,
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
}

const mapStateToProps = ({register, citiesBrands}) => {
console.log('second stage registration', register)
    return {
        name: register.name,
        city: register.city,
        car: register.car,
        email: register.email,
        year: register.year,
        password: register.password,
        confirm_password: register.confirm_password,
        token: register.token,
        username: register.username,
        phone: register.phone,
        brands: citiesBrands.brands,
        cities: citiesBrands.cities
    }
}

export default connect(
    mapStateToProps,
    {
        changePass,
        changeCar,
        changeCity,
        changeEmail,
        changeName,
        changeYear,
        changeConfirmPass,
        sendStep2,
        // getBrands,
        // getCities
    })(SecondStageComponent);