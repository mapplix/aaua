import React,{Component} from 'react';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import {connect} from 'react-redux';
import {
    MainCard,
    CardItem,
    ButtonRoundet,
    PhoneInput,
    LabelOnInput,
    Icon,
    Header
} from '../common';
import {showAlert} from '../Modals';
import {changeMessage, changeSubject, changePhone, submitUserData} from '../../Actions/FeedbackAction';
import {RATIO} from '../../styles/constants'
import {DEVICE_OS, iOS, Android} from '../../Actions/constants';

class FeedBackComponent extends Component {

    onChangePhone(phone) {
console.log(phone);
        this.props.changePhone(phone)
    }

    onChangeSubject(subject) {
        this.props.changeSubject(subject)
    }

    onChangeMessage(msg) {
        this.props.changeMessage(msg)
    }

    onSubmitFeedback() {
        if (this.props.phone.length && this.props.text) {
            const feedback = {
                phone : this.props.phone,
                subject : this.props.subject,
                text : this.props.text
            }
            this.props.submitUserData(feedback)
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.feedbackSubmited != false) {
            showAlert(
                '',
                'Ваше сообщение отправлено',
                'OK'
            );
        }
    }

    callNumber = (url) =>{
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    render() {

        const {titleContainer, phoneText, phoneNumber, phoneContainer} = styles;
        return (
            <MainCard>
                <Header burger goToMain={DEVICE_OS == iOS ? true : false}>
                    {"ОБРАТНАЯ СВЯЗЬ"}
                </Header>
                <CardItem style={titleContainer}>
                    <View style={{
                        marginTop: 33 * RATIO,
                        marginBottom: 19 * RATIO
                    }}>
                        <Text style={phoneText}>
                            Телефон службы поддержки
                        </Text>
                    </View>
                    <View style={phoneContainer}>
                        <Icon style={{
                            width: 30,
                            height: 25
                        }}
                            imageSrc={require('../../images/icons/feedback_phone.png')}
                        />
                        <TouchableOpacity
                            onPress={()=> this.callNumber('tel:0800505024')}
                        >
                            <Text style={phoneNumber}>
                                0 800 505024
                            </Text>
                        </TouchableOpacity>
                    </View>
                </CardItem>
                <CardItem style={{
                        // marginTop:22,
                        flex:0,
                        height: 108 * RATIO,
                        flexDirection:'column',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-start'
                    }}>
                    <PhoneInput
                        label={'Номер телефона'}
                        placeholder={'+380'}
                        value={this.props.phone}
                        onChangeText={this.onChangePhone.bind(this)}
                    />
                </CardItem>
                <CardItem style={{
                    marginTop:22,
                    flex:0,
                    height:60,
                    flexDirection:'column',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start'
                }}>
                    <LabelOnInput
                        label={'Тема'}
                        placeholder={'Выбрать'}
                        onChangeText={this.onChangeSubject.bind(this)}
                        value={this.props.subject}
                    />
                </CardItem>
                <CardItem style={{
                    marginTop:22,
                }}>
                    <LabelOnInput
                        label={'Сообщение'}
                        placeholder={'Текст сообщения'}
                        onChangeText={this.onChangeMessage.bind(this)}
                        value={this.props.message}
                    />
                </CardItem>
                <CardItem style={{
                    marginTop:22,
                }}>
                    <ButtonRoundet
                        style={{
                            marginRight: 83,
                            marginLeft: 83,
                            height: 45,
                            backgroundColor: '#FFC200',
                            borderColor:'#FFC200'
                        }}
                        textStyle={{color:'#1B1B1B'}}
                        onPress={this.onSubmitFeedback.bind(this)}
                    >
                        Отправить
                    </ButtonRoundet>
                </CardItem>
            </MainCard>
                )
    }
}

const styles = {
    titleContainer: {
        paddingBottom: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        flex:0,
        height: 116 * RATIO,
    },
    phoneText: {
        fontFamily: 'SFUIText-Medium',
        color:'#1B1B1B',
        fontSize: 14
    },
    phoneNumber: {
        fontSize: 23,
        fontFamily: 'SFUIText-Medium',
        color: '#423486'
    },
    phoneContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start'
    }
}

const mapStateToProps = ({feedback}) => {
    return {
        phone: feedback.phone,
        subject: feedback.subject,
        text: feedback.text,
        feedbackSubmited: feedback.feedbackSubmited
    }
}

export default connect(mapStateToProps, {submitUserData, changeMessage, changeSubject, changePhone})(FeedBackComponent);