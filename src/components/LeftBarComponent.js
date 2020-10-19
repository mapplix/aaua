import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
    FlatList,
    ImageBackground} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {LeftBarMenuItem, RightBarMenuItem, ButtonRoundet} from './common';
import {RATIO}from '../styles/constants';
import {connect} from 'react-redux';
import {logOut} from '../Actions/AuthAction';
import {getData} from '../Actions/SubscriptionAction'

// let images = {
import wallet from '../images/icons/wallet.png';
import subscription from '../images/icons/subscription.png';
import store from '../images/icons/store.png';
import card from '../images/icons/card.png';
import onroad from '../images/icons/onroad.png';
import discounts from '../images/icons/discounts.png';
import insurance from '../images/icons/insurance.png';
import history from '../images/icons/history.png';
import AnQ from '../images/icons/AnQ.png';
import feedback from '../images/icons/feedback.png';
// }

class LeftBarComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            menuItems: [
                {id: 1, title: 'Кошелек', img: wallet, onPress: Actions.wallet},
                {id: 2, title: 'Подписка AAUA', img: subscription, onPress: Actions.subscriptionStack},
                {id: 3, title: 'Магазин', img: store, onPress: Actions.categories},
                {id: 4, title: 'Топливо', img: card, onPress: Actions.AAUA_card},
                {id: 5, title: 'Поддержка на дороге', img: onroad, onPress: Actions.onroadSupport},
                {id: 6, title: 'Дисконты', img: discounts, onPress: Actions.discontCards},
                {id: 7, title: 'Страхование', img: insurance, onPress: Actions.insurance},
                {id: 8, title: 'История заказов', img: history, onPress: Actions.historyStack},
                {id: 9, title: 'Вопрос/Ответ', img: AnQ, onPress: Actions.AnQ},
                {id: 10, title: 'Обратная связь', img: feedback, onPress: Actions.feedback}
            ]
        }
        this.goToAuth = this.goToAuth.bind(this);
    }

     onExit() {
         // Actions.reset('auth');
        Alert.alert(
            'Подтверждение',
            'Вы точно хотите выйти?',
            [
                // {text: 'Да', onPress: () => {
                //     console.log(this.props);
                //     this.props.logOut(this.props.token);
                // }},
                {text: 'Да', onPress: this.goToAuth},
                {text: 'Закрыть', onPress: () => {console.log('close alert')}},
            ],
        )
    }

    goToAuth() {
        Actions.reset('auth');
        this.props.logOut(this.props.token);
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps0', nextProps.token );
        if (nextProps.token != this.props.token && !this.props.bought_at) {
            this.props.getData(nextProps.token);
        }
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
                            }}
                            source={require('../images/logo.png')}
                        />
                        <Text style={titleText}>
                            {this.props.userName} {this.props.userSurName}
                        </Text>
                        <View style={{
                            width: 66,
                            height: 20,
                        }}>
                            {
                                this.renderStatus()
                            }
                        </View>
                    </View>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        style={linksContainer}
                        data={this.state.menuItems}
                        renderItem={({item}) => {
                            return (<LeftBarMenuItem
                                title={item.title}
                                image={item.img}
                                onPress={item.onPress}
                            />)
                        }}
                        keyExtractor={item => item.id}
                    />

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
        // marginBottom: 8,
        fontSize: 16,
        color: '#423485',
        fontFamily: 'Roboto-Bold'
    }
}

const mapStateToProps = ({auth, subscription}) => {
console.log(subscription);
    var userName = '';
    var userSurName = '';
    var status = false;
    var token = null;
    var bought_at = false;
    if (auth.user) {
        userName = auth.user.profile.name;
        userSurName = auth.user.profile.surname ? auth.user.profile.surname : '';
        status = subscription.bought_at == null ? false : true;
        bought_at = subscription.bought_at;
        token = auth.user.token;
    }
    return {
        userName: userName + userSurName,
        isActiveStatus: status,
        token: token,
        bought_at: bought_at
    }
}

export default connect(mapStateToProps,{logOut, getData})(LeftBarComponent);
