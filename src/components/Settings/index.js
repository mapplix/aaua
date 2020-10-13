import React, {Component} from 'react';
import {View, Text, Switch, TouchableOpacity, Linking, Share} from 'react-native';
import {MainCard, CardItem, Header, Icon, ButtonRoundet} from '../common';
import {RATIO} from '../../styles/constants'
import Permissions from 'react-native-permissions'
import {feedbackPhone} from '../../services/config';

class SettingsComponent extends Component {

    state = {
        pushes: false,
        politics: true,
        privacy: true,
    }

    componentDidMount() {
        Permissions.check('notification').then(response => {
            // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
            this.setState({ pushes: response ==  'authorized' ? true : false})
        })
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

    shareLink() {
        Share.share({
            message: 'https://aaua.com.ua',
            url: 'https://aaua.com.ua',
            title: 'Наше приложение'
        }, {
            // Android only:
            dialogTitle: 'Поделиться с друзьями',
            // iOS only:
            excludedActivityTypes: [
                'com.apple.UIKit.activity.PostToTwitter'
            ]
        })
    }

    render(){
        const {
            sliderContainer,
            cardStyle,
            titleContainer,
            phoneText,
            phoneContainer,
            phoneNumber
        } = styles;

        return (
            <MainCard>
                <Header burger>
                    Настройки
                </Header>
                <CardItem style={cardStyle}>
                    <View style={sliderContainer}>
                        <Switch
                            onValueChange={ (value) => this.setState({ politics: value })}
                            value={ this.state.politics }
                        />
                    </View>
                    <View>
                        <Text>
                            Я принимаю пользовательское{"\n"}
                            соглашение
                        </Text>
                    </View>
                </CardItem>
                <CardItem style={cardStyle}>
                    <View style={sliderContainer}>
                        <Switch
                            onValueChange={ (value) => this.setState({ privacy: value })}
                            value={ this.state.privacy }
                        />
                    </View>
                    <Text>
                        Я принимаю политику{"\n"}
                        использования
                    </Text>
                </CardItem>
                <CardItem style={cardStyle}>
                    <View style={sliderContainer}>
                        <Switch
                            onValueChange={ (value) => this.setState({ pushes: value })}
                            value={ this.state.pushes }
                        />
                    </View>
                    <Text>
                        Разрешить присылать{"\n"}
                        Push-уведомления
                    </Text>
                </CardItem>
                <CardItem style={cardStyle}>
                    <TouchableOpacity style={{
                        flexDirection: 'row'
                    }}
                        onPress={this.shareLink.bind(this)} >
                        <View style={sliderContainer}>
                            <Icon
                                imageSrc={require('../../images/icons/share.png')}
                            />
                        </View>
                        <Text>
                            Поделиться в социальных сетях
                        </Text>
                    </TouchableOpacity>
                </CardItem>
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
                        <Text style={phoneNumber}>
                            {feedbackPhone}
                        </Text>
                    </View>
                    <View style={{
                        alignSelf: 'stretch',
                        height: 45,
                        marginBottom: 32,
                        marginTop: 32,
                    }}>
                        <ButtonRoundet
                            style={{
                                marginRight: 83,
                                marginLeft: 83,
                                backgroundColor: '#FFC200',
                                borderColor:'#FFC200'
                            }}
                            textStyle={{color:'#1B1B1B'}}
                            onPress={()=> this.callNumber('tel:'+feedbackPhone)}
                        >
                            Позвонить
                        </ButtonRoundet>
                    </View>
                </CardItem>
            </MainCard>
        )
    }
}

const styles = {
    cardStyle: {
        flex:12,
        borderBottomWidth: 1,
        borderBottomColor: '#e9e9e9',
        alignItems: 'center'
    },
    sliderContainer: {
        width: 90,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleContainer: {
        marginTop: 57,
        paddingBottom: 10,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        flex:50,
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

export default SettingsComponent;