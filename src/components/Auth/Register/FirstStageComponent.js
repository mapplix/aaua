import React, {Component} from 'react';
import {View, Alert, Text, Linking} from 'react-native';
import {
    MainCard,
    CardItem,
    ButtonSquad,
    LabelOnInput,
    ButtonRoundet,
    PhoneInput,
    Header,
    Spiner,
    CheckBox,
} from '../../common';
import {WIDTH_RATIO, RATIO} from '../../../styles/constants';
import {showAlert} from '../../Modals';
import {connect} from 'react-redux';
import {
    changePhone,
    changeCode,
    checkAdault,
    checkAgrie,
    checkRead,
    sendSms,
    sendStep1
} from '../../../Actions/RegisterAction';
import {DEVICE_OS, iOS, Android} from '../../../Actions/constants';
import {Actions} from 'react-native-router-flux';

let labelFontSize = WIDTH_RATIO <= 1 ? 10 : 12;

class FirstStageComponent extends Component {

    state = {
        latitude: 0,
        longitude: 0,
    }

    onPhoneChange(phone) {
        this.props.changePhone(phone);
    }

    onCodeChange(code) {
        this.props.changeCode(code);
    }

    onCheckAdault() {
        this.props.checkAdault();
    }
    onCheckAgrie() {
        this.props.checkAgrie();
    }
    onCheckRead() {
        this.props.checkRead();
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

    openSecondStage() {
        if (this.props.phone.length > 0 && this.props.code.length > 0) {
            if (this.props.isAdault && this.props.isAgrie && this.props.isRead) {
                const userData = {
                    "device" : DEVICE_OS,
                    "phone" : this.props.phone,
                    "sms_code" : this.props.code,
                    "x" : "4.716974",
                    "y" : "4.716974",
                };
                this.props.sendStep1(userData);
            } else {
                this.showAlert();
            }
        } else {
            this.showAlert();
        }
    }

    checkPhone() {
        const {phone} = this.props;
        this.props.sendSms(phone);
    }

    openLicence() {
        Actions.licence();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.smsError != false) {
            showAlert(
                'Ошибка',
                nextProps.smsError,
                'OK'
            );
        }
        if (nextProps.sms != null) {
            showAlert(
                'Код',
                nextProps.sms.toString(),
                'OK'
            );
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 20000},
        );
    }

    renderButton() {
        if (this.props.loading === false) {
            return (
                <ButtonRoundet
                    onPress={this.checkPhone.bind(this)}
                >
                    Подтвердить номер
                </ButtonRoundet>
            )
        }
        return (
            <Spiner />
        )
    }

    render() {
        const {checkboxContainer, footerWrapper, buttonWrapper, labelStyle} = styles;
        const labelTitle = "Я согласен получать информацию от AAUA";
        const licensLabel = '';
        return(
            <MainCard>
                <Header back={DEVICE_OS == iOS ? true : false}>
                    ПЕРСОНАЛЬНЫЕ ДАННЫЕ
                </Header>
                <CardItem style={{
                    flex: 0,
                    height: 151 * RATIO,
                    // backgroundColor: '#296',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                }}>
                    <PhoneInput
                        label={'Номер телефона'}
                        placeholder={'+380'}
                        value={this.props.phone}
                        onChangeText={this.onPhoneChange.bind(this)}
                    />
                </CardItem>
                <CardItem style={{
                    flex: 0,
                    height: 82 * RATIO,
                    // backgroundColor: '#293',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                    // paddingLeft: 45
                }}>
                    <LabelOnInput
                        secureTextEntry
                        label={'Код из СМС'}
                        placeholder={'Код из СМС'}
                        onChangeText={this.onCodeChange.bind(this)}
                        value={this.props.code}
                    />
                </CardItem>
                <CardItem
                     style={{
                         flex: 0,
                         height: 94 * RATIO,
                         flexDirection: 'column',
                         justifyContent: 'flex-end',
                         // alignItems: 'flex-start',
                         paddingLeft:45,
                         paddingRight:45,
                         // backgroundColor: '#783',
                     }}>
                    <View style={buttonWrapper}>
                        {this.renderButton()}
                    </View>
                </CardItem>
                <CardItem
                    style={{
                        flex: 0,
                        height: 135 * RATIO,
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        paddingLeft:45,
                    }}
                >
                    <View style={checkboxContainer}>
                        <CheckBox
                            checkedImage={require('../../../images/icons/checked.png')}
                            uncheckedImage={require('../../../images/icons/unchecked.png')}
                            labelStyle={labelStyle}
                            label='Мне уже есть 18'
                            checked={this.props.isAdault}
                            onChange={this.onCheckAdault.bind(this)}
                        />
                        <CheckBox
                            checkedImage={require('../../../images/icons/checked.png')}
                            uncheckedImage={require('../../../images/icons/unchecked.png')}
                            labelStyle={labelStyle}
                            label='Я ознакомился с лицензией'
                            checked={this.props.isRead}
                            onChange={this.onCheckRead.bind(this)}
                            customLabel={
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                <Text style={labelStyle}>Я ознакомился с </Text>
                                <Text style={[labelStyle, {color: 'blue'}]}
                                    onPress={this.openLicence}>
                                    лицензией
                                </Text>
                                </View>}
                        />
                        <CheckBox
                            checkedImage={require('../../../images/icons/checked.png')}
                            uncheckedImage={require('../../../images/icons/unchecked.png')}
                            labelStyle={labelStyle}
                            label={labelTitle}
                            checked={this.props.isAgrie}
                            onChange={this.onCheckAgrie.bind(this)}
                        />
                    </View>
                </CardItem>
                <CardItem style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start'
                }}>
                    <View style={footerWrapper}>
                        <ButtonSquad
                            onPress={this.openSecondStage.bind(this)}
                        >
                            ДАЛЕЕ
                        </ButtonSquad>
                    </View>
                </CardItem>
            </MainCard>
        )
    }
}
const styles = {
    checkboxContainer: {
        padding: 1,
        flex:1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        // backgroundColor: '#726',
    },
    footerWrapper: {
        height: 53,
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonWrapper: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelStyle: {
        fontFamily: 'SFUIText-Medium',
        fontSize: labelFontSize
    }
}

const mapStateToProps = ({register}) => {
    return {
        phone: register.phone,
        code: register.code,
        error: register.error,
        isAdault: register.isAdault,
        isAgrie: register.isAgrie,
        isRead: register.isRead,
        loading: register.loading,
        isDisabled: register.isDisabled,
        smsError: register.smsError,
        sms: register.sms
    }
}

export default connect(
    mapStateToProps,
    {
        changePhone,
        changeCode,
        sendSms,
        checkAdault,
        checkAgrie,
        checkRead,
        sendStep1,
    })(FirstStageComponent);