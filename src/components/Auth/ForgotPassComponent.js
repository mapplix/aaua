import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {
    MainCard,
    CardItem,
    PhoneInput,
    ButtonRoundet,
    Header,
} from '../common';
import {showAlert} from '../Modals';
import {changePhone, sendData} from '../../actions/ForgotPassAction';
import {Actions} from 'react-native-router-flux';

class ForgotPassComponent extends Component {

    onPhoneChange = (phone) => {
        this.props.changePhone(phone);
    }

    onSubmit = () => {
        this.props.sendData(this.props.phone)
    }

    render() {
        return (
            <MainCard>
                <Header back >
                    {"ВОССТАНОВЛЕНИЕ ПАРОЛЯ"}
                </Header>
                <CardItem style={{
                    marginTop: 172,
                    flex:0,
                    height: 63,
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
                    // backgroundColor: '#282',
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
                        Восстановить пароль
                    </ButtonRoundet>
                </CardItem>
            </MainCard>
        )
    }
}

const mapStateToProps = ({forgotPass}) => {
    return {
        phone: forgotPass.phone,
        newPass: forgotPass.newPass
    }
}

export default connect(mapStateToProps, {changePhone, sendData})(ForgotPassComponent);