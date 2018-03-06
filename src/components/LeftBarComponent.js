import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
    ImageBackground} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {LeftBarMenuItem, RightBarMenuItem, ButtonRoundet} from './common';
import {RATIO}from '../styles/constants';
import {connect} from 'react-redux';
import {logOut} from '../Actions/AuthAction';

class LeftBarComponent extends Component {

    openWallet() {
        Actions.wallet();
    }

    onExit() {
        Alert.alert(
            'Подтверждение',
            'Вы точно хотите выйти?',
            [
                {text: 'Да', onPress: () => {
                    console.log(this.props);
                    this.props.logOut(this.props.token);
                }},
                {text: 'Закрыть', onPress: () => {console.log('close alert')}},
            ],
        )
    }

    renderStatus() {
        if (this.props.isActiveStatus) {
            return (
                <ButtonRoundet
                    style={{
                        backgroundColor: '#61a83a',
                        borderColor: '#61a83a'
                    }}
                    textStyle={{
                        fontSize: 11,
                        color: '#ffffff',
                        fontFamily: 'Roboto-Regular'
                    }}
                >
                    Активен
                </ButtonRoundet>
            )
        }
    }

    render() {
        const {container, leftContainer, linksContainer, rightContainer, imageContainer, titleText} = styles;
        return (
        <ImageBackground
            source={
                require('../images/transparent.png')
            }
            style={container}
        >
                <View style={leftContainer}>
                    <View style={imageContainer}>
                        <Image
                            style={{
                                width: 119,
                                height: 119,
                                marginBottom: 5 * RATIO
                            }}
                            source={require('../images/logo.png')}
                        />
                        <Text style={titleText}>
                            {this.props.userName} {this.props.userSurName}
                        </Text>
                        <View style={{
                            width: 66,
                            height: 20,
                            marginBottom: 22
                        }}>
                            {
                                this.renderStatus()
                            }
                        </View>
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start'
                        }}
                        style={linksContainer}>
                        <LeftBarMenuItem
                            title={'Кошелек'}
                            image={require('../images/icons/wallet.png')}
                            onPress={Actions.wallet}
                        />
                        <LeftBarMenuItem
                            title={'Годовая подписка'}
                            image={require('../images/icons/subscription.png')}
                            onPress={Actions.subscription}
                        />
                        <LeftBarMenuItem
                            title={'Магазин'}
                            image={require('../images/icons/store.png')}
                            onPress={Actions.store}
                        />
                        <LeftBarMenuItem
                            title={'Карта AAUA'}
                            image={require('../images/icons/card.png')}
                            onPress={Actions.AAUA_card}
                        />
                        <LeftBarMenuItem
                            title={'Поддержка на дороге'}
                            image={require('../images/icons/onroad.png')}
                            onPress={Actions.onroadCategories}
                        />
                        <LeftBarMenuItem
                            title={'Дисконты'}
                            image={require('../images/icons/discounts.png')}
                            onPress={Actions.tabs}
                        />
                        <LeftBarMenuItem
                            title={'Страхование'}
                            image={require('../images/icons/insurance.png')}
                            onPress={Actions.insurance}
                        />
                        <LeftBarMenuItem
                            title={'История заказов'}
                            image={require('../images/icons/history.png')}
                            onPress={Actions.history}
                        />
                        <LeftBarMenuItem
                            title={'Вопрос/Ответ'}
                            image={require('../images/icons/AnQ.png')}
                            onPress={Actions.AnQ}
                        />
                        <LeftBarMenuItem
                            title={'Обратная связь'}
                            image={require('../images/icons/feedback.png')}
                            onPress={Actions.feedback}
                        />
                    </ScrollView>
                </View>
            <View style={rightContainer}>
                    <TouchableOpacity onPress={Actions.drawerClose}>
                        <RightBarMenuItem
                            style={{marginTop: 25}}
                            image={require('../images/icons/close.png')}
                        />
                    </TouchableOpacity>
                    <View >
                        <TouchableOpacity onPress={Actions.settings}>
                            <RightBarMenuItem
                                style={{marginBottom: 26}}
                                imageStyle={{
                                    width: 29,
                                    height: 29
                                }}
                                image={require('../images/icons/option.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onExit.bind(this)}>
                            <RightBarMenuItem
                                imageStyle={{
                                    width: 21,
                                    height: 21
                                }}
                                style={{marginBottom: 21}}
                                image={require('../images/icons/exit.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
        </ImageBackground>
        )
    }
}

const styles = {
    container: {
        flex:1,
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff'
    },
    linksContainer: {
        flex: 1,
        marginLeft: 29,
    },
    rightContainer: {
        width: 59,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    imageContainer: {
        paddingTop: 21,
        alignSelf: 'stretch',
        // height: 150,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        marginBottom: 8,
        fontSize: 16,
        color: '#423485',
        fontFamily: 'Roboto-Bold'
    }
}

const mapStateToProps = ({auth}) => {
console.log(auth);
    var userName = '';
    var userSurName = '';
    var status = false;
    if (auth.user) {
        userName = auth.user.profile.name;
        userSurName = auth.user.profile.surname ? auth.user.profile.surname : '';
        status = auth.user.status == 'active' ? true : false
    }
    return {
        userName: userName + userSurName,
        isActiveStatus: status
    }
}

export default connect(mapStateToProps,{logOut})(LeftBarComponent);
