import React, {Component} from 'react';
import {View, Text, Image, ScrollView, Platform, BackHandler, AppState} from 'react-native';
import {
    MainCard,
    CardItem,
    ButtonRoundet,
    Header,
    Spiner
} from '../common';
import {RATIO, WIDTH_RATIO} from '../../styles/constants';
import {connect} from 'react-redux';
import {getData, buySubscription} from '../../Actions/SubscriptionAction';
import {showAlert} from '../Modals';
import DetailsItem from './DetailsItem';
import {DEVICE_OS, iOS, Android} from '../../Actions/constants';

class SubscriptionComponent extends Component {

    state = {
        appState: AppState.currentState
    }

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
        const {textStyle, textContainer, imageContainer, checkboxesContainer} = styles;
        return (
            <MainCard>
                <Header burger goToMain={DEVICE_OS == iOS ? true : false}>
                    {"ГОДОВАЯ ПОДПИСКА"}
                </Header>
                <ScrollView>
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
                <CardItem style={checkboxesContainer}>
                    <Text style={textStyle}>
                        В годовую подписку входит:
                    </Text>
                    <DetailsItem >
                        Действует 365 дней
                    </DetailsItem>
                    <DetailsItem >
                        Активна бонусная система AAUA
                    </DetailsItem>
                    <DetailsItem >
                        Бесплатный ассистанс на дороге:
                        эвакуатор, подзарядка аккумулятора, замена колеса, аварийное вскрытие дверей.
                    </DetailsItem>
                    <DetailsItem >
                        Консультации по вопросам взаимодействия с представителями дорожной полиции.
                    </DetailsItem>
                    <DetailsItem >
                        Первичные консультации в случае ДТП.
                    </DetailsItem>
                    <DetailsItem >
                        Доступ к базе образцов документов.
                    </DetailsItem>
                    <DetailsItem >
                        Консультации по вопросам взаимодействия с страховой компанией.
                    </DetailsItem>
                    <DetailsItem >
                        Консультации по вопросам обжалования штрафов.
                    </DetailsItem>
                    <DetailsItem >
                        Консультации по вопросам выплат от страховой компании.
                    </DetailsItem>
                    <DetailsItem >
                        Консьерж-сервис 24/7
                    </DetailsItem>

                </CardItem>
                </ScrollView>
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
    },
    checkboxesContainer: {
        flex: 47,
        paddingTop: 35,
        paddingRight: 70,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingLeft: 35 * WIDTH_RATIO
    },
}

const mapStateToProps = ({subscription, auth}) => {
    return {
        price: subscription.price,
        bought_at: subscription.bought_at,
        loading: subscription.loading,
        token: auth.user.token
    }
}

export default connect(mapStateToProps, {getData, buySubscription})(SubscriptionComponent);