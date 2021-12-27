import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {
    MainCard,
    CardItem,
    Header,
    Icon,
    PhoneInput,
    ButtonRoundet
} from '../common';
import {connect} from 'react-redux';
import {RATIO, WIDTH_RATIO} from '../../styles/constants';
import {showAlert} from '../Modals';
import {Actions} from 'react-native-router-flux';
import {phoneChange, sendData, orderOnRoadSupport} from '../../actions/OnRoadActions';

class OrderSupport extends Component {

    onPhoneChange = (phone) => {
        this.props.phoneChange(phone);
    }

    onSubmit = () => {
        const {token, category, phone} = this.props;
        this.props.orderOnRoadSupport(token, category.id, phone)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.orderSupportMessage != null) {
            showAlert(
                'Спасибо',
                nextProps.orderSupportMessage,
                'Закрыть',
                () => {Actions.reset('drawer');}
            )
        }
        if (nextProps.orderError != null) {
            showAlert(
                'Ошибка',
                nextProps.orderError,
                'OK'
            );
        }
    }

    render() {
        const {iconStyle} = styles;
        return (
            <MainCard>
                <Header back>
                    {this.props.category.title}
                </Header>
                <View style={{flex: 1}}>
                <CardItem style={iconStyle}>
                    <Icon
                        style={{
                            width: 79,
                            height: 79
                        }}
                        imageSrc={require('../../images/icons/onroad1.png')}
                    />
                </CardItem>
                <CardItem style={{
                    flex: 15,
                    // marginTop: 172,
                    // flex:0,
                    // height: 63,
                    // backgroundColor: '#909087',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
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
                    flex: 60,
                }}>
                    <ButtonRoundet
                        style={{
                            marginTop: 57,
                            marginRight: 45,
                            marginLeft: 45,
                            height: 45
                        }}
                        onPress={() => this.onSubmit()}
                    >
                        Подтвердить
                    </ButtonRoundet>
                </CardItem>
                </View>
            </MainCard>
        )
    }
}

const styles = {
    iconStyle: {
        // flex: 0,
        // height: 152 * RATIO,
        // paddingTop: 36,
        // backgroundColor: '#282',
        flex: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
}

const mapStateToProps = ({auth, onRoad}) => {
    return {
        token: auth.user.token,
        phone: onRoad.phone,
        orderError: onRoad.orderError,
        orderSupportMessage: onRoad.orderSupportMessage,
    }
}

export default connect(mapStateToProps, {sendData, phoneChange, orderOnRoadSupport})(OrderSupport);