import React, {Component} from 'react';
import {View, Text, Image, ScrollView, Platform, BackHandler} from 'react-native';
import {
    MainCard,
    CardItem,
    ButtonRoundet,
    Header,
    Spiner
} from '../common';
import {RATIO} from '../../styles/constants';
import {connect} from 'react-redux';
import {getData, buySubscription} from '../../Actions/SubscriptionAction';
import {showAlert} from '../Modals';
import {Actions} from 'react-native-router-flux';
import {DEVICE_OS, iOS, Android} from '../../Actions/constants';

let listener = null

class SubscriptionComponent extends Component {

    addToBalance() {
        if (this.props.bought_at != null) {
            showAlert(
                'Ошибка',
                'У Вас уже есть активная подписка',
                'Закрыть'
            )
        } else {
            this.props.buySubscription(this.props.token);
        }
    }

    componentWillMount() {
        this.props.getData(this.props.token);
    }

    componentDidMount() {
        if (Platform.OS == "android" && listener == null) {
            listener = BackHandler.addEventListener("hardwareBackPress", () => {
console.log('hardwareBackPress', Actions.currentScene)
                let routs = ['subscription', 'AAUA_main', 'my_aaua_cards', 'onroadCategories', 'tabs', 'discontCards', 'messagesList']
                if (Actions.currentScene == '_mainScreen') {
                    BackHandler.exitApp();
                }
                if (routs.includes(Actions.currentScene)) {
                    Actions.mainScreen()
                }
                if (Actions.currentScene == 'message') {
console.log('back from message')
                    Actions.push('messagesList');
                }
                else {
                    Actions.pop();
                }
                return true;
            })
        }
    }

    componentWillUnmount(){
        console.log('component will unmount', this.props);
    }

    renderPrice() {
        const {amountContainer, amountStyle} = styles;
        if (this.props.loading == false) {
            return (
                <View style={amountContainer}>
                    <Text style={amountStyle}>
                        {this.props.price} грн
                    </Text>
                </View>
            )
        }
        return (
            <View style={amountContainer}>
                <Spiner />
            </View>
        )
    }

    render() {
        const {textStyle, textContainer, imageContainer} = styles;
        return (
            <MainCard>
                <Header burger goToMain={DEVICE_OS == iOS ? true : false}>
                    {"ГОДОВАЯ ПОДПИСКА"}
                </Header>
                <CardItem style={imageContainer}>
                    <Image
                        resizeMode={'contain'}
                        style={{
                            width: 235,
                            height: 133
                        }}
                        source={require('../../images/subscriprion_img.png')}
                    />
                </CardItem>
                <CardItem style={{
                    flex: 0,
                    height: 83 * RATIO,
                    // backgroundColor: '#9f9f96',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                }}>
                    {this.renderPrice()}
                </CardItem>
                <CardItem style={{
                    flex: 0,
                    height: 66 * RATIO,
                }}>
                    <ButtonRoundet
                        style={{
                            marginRight: 45,
                            marginLeft: 45,
                            height: 45
                        }}
                        onPress={this.addToBalance.bind(this)}
                    >
                        Купить
                    </ButtonRoundet>
                </CardItem>
                <CardItem style={textContainer}>
                    <ScrollView style={{flex: 1}}>
                        <Text style={textStyle}>
                            В годовую подписку входит:
                            {"\n"}{"\n"}- Действует 365 дней
                            {"\n"}{"\n"}- Активна бонусная система AAUA
                            {"\n"}{"\n"}- Пакет юридический стандарт
                            {"\n"}{"\n"}- Бесплатная доставка карты лояльсти
                            {"\n"}{"\n"}- Пакет технический ассистанс “Стандарт”
                        </Text>
                    </ScrollView>
                </CardItem>
            </MainCard>
        )
    }
}

const styles = {
    amountContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    amountStyle: {
        fontFamily: 'SFUIText-Regular',
        fontSize: 35,
        color:'#1B1B1B'
    },
    textStyle: {
        fontFamily: 'SFUIText-Regular',
        alignSelf: 'stretch',
        fontSize: 13,
        color:'#1B1B1B'
    },
    textContainer: {
        top: 0,
        paddingRight: 27,
        paddingLeft: 32,
        paddingBottom: 33
    },
    imageContainer: {
        flex:0,
        height: 191 * RATIO,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
}

const mapStateToProps = ({subscription, auth}) => {
console.log(subscription);
    return {
        price: subscription.price,
        bought_at: subscription.bought_at,
        loading: subscription.loading,
        token: auth.user.token
    }
}

export default connect(mapStateToProps, {getData, buySubscription})(SubscriptionComponent);