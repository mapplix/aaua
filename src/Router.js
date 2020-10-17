import React, {Component} from 'react';
import {
    Dimensions,
    ActivityIndicator,
    AsyncStorage,
    Platform,
    BackHandler,
    AppState,
    Linking
} from 'react-native';
import {Router, Scene, Stack, Drawer, Tabs, Actions} from 'react-native-router-flux';

{/* AUTH */}
import LoginForm from './components/Auth/LoginForm';
import FirstStageComponent from './components/Auth/Register/FirstStageComponent';
import SecondStageComponent from './components/Auth/Register/SecondStageComponent';
import InviteFriendComponent from './components/Auth/InviteFriendComponent';
import ForgotPassComponent from './components/Auth/ForgotPassComponent';
import LicenceComponent from './components/Auth/Register/LicenceComponent';
import CitiesScreen from './components/Auth/Register/CitiesScreen';
import CarsScreen from './components/Auth/Register/CarsScreen';

import LeftBarComponent from './components/LeftBarComponent';
import MainComponent from './components/MainComponent';
import ImageContent from './components/ImageContent';
import WalletComponent from './components/Wallet/';

import SubscriptionComponent from './components/Subscription/';

import CategoriesComponent from './components/Store/CategoriesComponent';
import DetailsComponent from './components/Store/DetailComponent';
import GoodsListComponent from './components/Store/GoodsListComponent';
import SpecialOfferComponent from './components/Store/SpecialOfferComponent';
import BasketListComponent from './components/Store/Basket/ListComponent';
import PaymentComponent from './components/Store/PaymentComponent';

import OnroadCategoriesComponent from './components/Onroad_support/CategoriesComponent';
import OnroadCategoriesDetailsComponent from './components/Onroad_support/CategoryDetailsComponent';
import OrderSupport from './components/Onroad_support/OrderSupport';

import MarkerInfo from './components/Disconts/MarkerInfo';
import DiscontMapComponent from './components/Disconts/MapComponent';
import TabsComponent from './components/Disconts/TabsComponent';
import DiscontCardComponent from './components/Disconts/discontsCard/DiscontCardComponent';

import InsuranceComponent from './components/Insurance/CategoriesComponent';
import KaskoComponent from './components/Insurance/KaskoComponent';
import OsagoComponent from './components/Insurance/OsagoComponent';
import InsuranceCitiesScreen from './components/Insurance/CitiesScreen';
import InsuranceCarsScreen from './components/Insurance/CarsScreen';
import InsuranceCarsModelsScreen from './components/Insurance/CarsModelsScreen';
import WebInsurance from './components/Insurance/WebInsurance';

import HistoryComponent from './components/History/ListComponent';
import AnQComponent from './components/Question_answear/ListComponent';
import FeedbackComponent from './components/Feedbacks/index';

import AAUAMainComponent from './components/AAUA_card/MainComponent';
import AAUAAddCardComponent from './components/AAUA_card/AddCardComponent';
import AAUAOrderCardComponent from './components/AAUA_card/OrderCardComponent';
import MyAAUACardsComponent from './components/AAUA_card/MyAAUACardsComponent';
import OrderVirtualCardComponent from './components/AAUA_card/OrderVirtualCardComponent';
import QRcode from './components/AAUA_card/QRcode';
import AZSListScreen from './components/AAUA_card/AZSListScreen';
import ButtonsScreen from './components/AAUA_card/ButtonsScreen';

import OrderingComponent from './components/Store/OrderingComponent';

import MessagesListComponent from './components/Messages/ListComponent';
import MessageComponent from './components/Messages/MessageComponent';

import SettingsComponent from './components/Settings';
import MenuIcon from './images/icons/bar.png';

import {connect} from 'react-redux';
import {getBrands, getCities, getNPCities, getNPsklads, getSliderImages, getBonusesWog} from './Actions/CitiesBrands';
import {getPushToken} from './Actions/AuthAction';

import PDFScreen from "./components/Subscription/PDFContent";
import SubscriptionDetailsComponent from "./components/Subscription/DetailsComponent";
import StoreCitiesScreen from "./components/Store/StoreCitiesScreen";
import StoreNPCitiesScreen from "./components/Store/StoreNPCitiesScreen";


import aauaCitiesScreen from "./components/AAUA_card/CitiesScreen";
import aauaNPCitiesScreen from "./components/AAUA_card/StoreNPCitiesScreen";

import {CHECK_TOKEN_URL, SECRET_KEY} from './Actions/constants'
import axios from 'axios';
import md5 from 'js-md5';
import {setBasketFromStorage, deleteFromBasket, addBasketToStorage} from './Actions/StoreAction';
import {setUserFromSession} from './Actions/AuthAction';
import {countMessages} from './Actions/MessagesActions';

class RouterComponent extends Component {

    constructor() {
        super();
        this.state = {
            hasToken: false,
            isLoaded: false,
            // hasCard: false,
            latitude: null,
            longitude: null,
            error: null,
        };
        this._handleAppStateChange = this._handleAppStateChange.bind(this)
    }

    componentWillMount() {
        this.props.getBrands();
        this.props.getCities();
    }

    componentWillUnmount(){
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    componentDidMount() {
        console.log('componentDidMount');
        AppState.addEventListener('change', this._handleAppStateChange);
        /*Check if User logged in*/
        this.props.getPushToken();
        let str = AsyncStorage.multiGet(['user', '@basketInfo']);
        str.then((stores, error) => {
            return stores.map( data => {
                console.log('*** ROUTE *** startApp', data[0]);
                if(data[0] == "user") {
                    const user = JSON.parse(data[1]);
                    if (user !== null) {
                        console.log('user from store', user);
                        const obj = {
                            "token": user.token,
                            "phone" : user.profile.phone,
                        }

                        const data = JSON.stringify(obj);
                        const signature = md5(SECRET_KEY + data)
                        axios.post(CHECK_TOKEN_URL, data, {
                                headers: {
                                    'Signature' : signature,
                                    'Content-Type': 'application/json',
                                }
                            }
                        )
                        .then( res => {
                            console.log(res);
                            if (res.data.error == 0) {
                                console.log('user is checked', res.data, res.data.data == 1)
                                if (res.data.data == 1) {
                                    console.log('user is valid', user);
                                    return user;
                                } else {
                                    AsyncStorage.removeItem('user');
                                    this.setState({
                                        hasToken: false,
                                        // hasCard: false,
                                        isLoaded: true
                                    })
                                }
                            } else {
                                this.setState({
                                    hasToken: false,
                                    // hasCard: false,
                                    isLoaded: true
                                })
                                return res.data.error
                            }
                        })
                        .then( user => {
                            console.log(user);
                            this.props.setUserFromSession(user);
                            // return user;
                            this.setState({
                                hasToken: user.token !== null,
                                // hasCard: user.card !== null,
                                isLoaded: true
                            })
                        })
                        // .then((user, err) => {
                        //     // console.log(user);
                        //     this.props.getSliderImages(user.token)
                        //     return user;
                        // }).then( (user, err)=> {
                        //     // console.log(user);
                        //     this.props.countMessages(user.token)
                        //     return user;
                        // }).then( (user, err) => {
                        //     // console.log(user);
                        //     this.props.getBonusesWog(user.token)
                        //     this.setState({
                        //         hasToken: user.token !== null,
                        //         // hasCard: user.card !== null,
                        //         isLoaded: true
                        //     })
                        // })
                            .catch( error => {
                                console.log(error);
                            })
                    } else {
                        this.setState({
                            hasToken: false,
                            // hasCard: false,
                            isLoaded: true
                        })
                    }
                }
                if (data[0] == "@basketInfo") {
                    let basketInfo = JSON.parse(data[1]);
                    if (basketInfo) {
                        this.props.setBasketFromStorage(basketInfo);
                    }
                }
            })
        })
    }

    _handleAppStateChange(nextAppState) {

        if (nextAppState.match(/inactive|background/)) {
            this.props.addBasketToStorage();
        }
    }

    onBackPress() {
        if (Actions.state.index === 0) {
            let routs = ['QRcode', 'subscription', 'AAUA_main',
                'my_aaua_cards', 'onroadCategories', 'tabs',
                'discontCards', 'messagesList', 'history',
                'categories', 'wallet', 'feedback'
            ]
            console.log('router ', Actions.currentScene);
            if (Actions.currentScene == 'mainScreen') {
                BackHandler.exitApp();
            } else if (routs.includes(Actions.currentScene)) {
                Actions.mainScreen()
            } else if (Actions.currentScene == 'message') {
                Actions.push('messagesList');
            } else if (Actions.currentScene == 'firstStage') {
              Actions.pop();
            } else if (Actions.currentScene == 'secondStage') {
              return true;
            } else {
console.log('router else')
                Actions.pop();
            }
            return true;
        }
    }

    render() {
        const {width} = Dimensions.get('window');
        if (!this.state.isLoaded) {
            return (
                <ActivityIndicator />
            )
        }
        return (
            <Router
                backAndroidHandler={
                    this.onBackPress
                }
            >
                <Stack
                    hideNavBar
                    key="root"
                    titleStyle={{alignSelf: 'center'}}
                >
                    <Stack
                        initial={!this.state.hasToken}
                        key="auth"
                        hideNavBar
                    >
                        <Scene title="login" key="login" component={LoginForm}/>
                        <Stack
                            hideNavBar
                            key="register"
                        >
                            <Scene
                                hideNavBar
                                title="Персональные данные"
                                key="firstStage"
                                component={FirstStageComponent}/>
                            <Scene
                              // initial
                                hideNavBar
                                title="Персональные данные"
                                key="secondStage"
                                component={SecondStageComponent}/>
                            <Scene hideNavBar key="licence" component={LicenceComponent}/>
                            <Scene hideNavBar key="AutocompleteScreen" component={CitiesScreen}/>
                            <Scene hideNavBar key="CarsScreen" component={CarsScreen}/>
                        </Stack>
                        <Scene title="Пригласи друга" key="invite" component={InviteFriendComponent}/>
                        <Scene title="Востановление пароля" key="forgot" component={ForgotPassComponent}/>
                    </Stack>

                    <Drawer
                        drawerBackgroundColor={'transparent'}
                        initial={this.state.hasToken}
                        hideNavBar
                        key="drawer"
                        contentComponent={LeftBarComponent}
                        drawerImage={MenuIcon}
                        drawerWidth={width}
                        tapToClose={true}
                        openDrawerOffset={0.2}
                        panCloseMask={0.2}
                        negotiatePan={true}
                    >
                        <Stack key="drawerWrapper">
                            {/*
                             Wrapper Scene needed to fix a bug where the tabs would
                             reload as a modal ontop of itself
                             */}
                            <Scene hideNavBar key="mainScreen" component={MainComponent} title="main_screen"/>
                            <Scene hideNavBar key="imageContent" component={ImageContent}/>
                            <Scene hideNavBar key="wallet" component={WalletComponent} title="Кошелек"/>
                          <Stack hideNavBar key={"subscriptionStack"}>
                            <Scene hideNavBar key="subscription" component={SubscriptionComponent}
                                   title="Годовая подписка"/>
                              <Scene hideNavBar key={"PDFScreen"} component={PDFScreen}/>
                              <Scene hideNavBar key={"SubscriptionDetailsComponent"} component={SubscriptionDetailsComponent}/>
                          </Stack>
                            {/*<Stack hideNavBar key="store">*/}
                                <Scene hideNavBar key="categories" component={CategoriesComponent} title="Store"/>
                                <Scene hideNavBar key="detail" component={DetailsComponent} title="Details"/>
                                <Scene hideNavBar key="goods" component={GoodsListComponent} title="Goods"/>
                                <Scene hideNavBar key="specialOffer" component={SpecialOfferComponent}/>
                                <Scene hideNavBar key="basketList" component={BasketListComponent}/>
                                <Scene hideNavBar key="basketOrdering" component={OrderingComponent} title="Goods"/>
                                <Scene hideNavBar key="payment" component={PaymentComponent} />
                                <Scene hideNavBar key="StoreCitiesScreen" component={StoreCitiesScreen} />
                                <Scene hideNavBar key="StoreNPCitiesScreen" component={StoreNPCitiesScreen} />
                            {/*</Stack>*/}
                            <Stack hideNavBar key="AAUA_card">
                                <Scene hideNavBar key="select_azs" component={AZSListScreen}/>
                                <Scene
                                    hideNavBar
                                    key="AAUA_main"
                                    component={AAUAMainComponent} title="Карта AAUA"/>
                                <Scene hideNavBar key="add_aaua_card" component={AAUAAddCardComponent}
                                       title="Заказать карту"/>
                                <Scene hideNavBar key="order_virtual_aaua_card" component={OrderVirtualCardComponent}/>
                                <Scene hideNavBar key="buttons_aaua_card" component={ButtonsScreen}/>
                                <Scene
                                    hideNavBar
                                    key="my_aaua_cards"
                                    component={MyAAUACardsComponent}
                                    title="Карта AAUA"/>
                                <Scene hideNavBar key="order_aaua_card" component={AAUAOrderCardComponent}/>

                                <Scene hideNavBar key="QRcode" component={QRcode}/>
                                <Scene hideNavBar key="aauaCitiesScreen" component={aauaCitiesScreen}/>
                                <Scene hideNavBar key="aauaNPCitiesScreen" component={aauaNPCitiesScreen}/>

                            </Stack>
                            <Stack hideNavBar key="onroadSupport">
                                <Scene hideNavBar key="onroadCategories" component={OnroadCategoriesComponent}/>
                                <Scene hideNavBar key="onroadDetails" component={OnroadCategoriesDetailsComponent}/>
                                <Scene hideNavBar key="orderOnRoadSupport" component={OrderSupport}/>
                            </Stack>
                            <Stack hideNavBar key="discontCards">
                                <Scene initial hideNavBar key="tabs" component={TabsComponent}/>
                                <Scene hideNavBar key="discontCard" component={DiscontCardComponent}/>
                                <Scene hideNavBar key="discontsMap" component={DiscontMapComponent}/>
                                <Scene hideNavBar key="MarkerInfo" component={MarkerInfo}/>
                            </Stack>
                            <Stack hideNavBar key="insurance">
                                <Scene hideNavBar key="insuranceCategories" component={InsuranceComponent}/>
                                <Scene hideNavBar key="kaskoComponent" component={KaskoComponent}/>
                                <Scene hideNavBar key="osagoComponent" component={OsagoComponent}/>
                                <Scene hideNavBar key="InsuranceCitiesScreen" component={InsuranceCitiesScreen}/>
                                <Scene hideNavBar key="InsuranceCarsScreen" component={InsuranceCarsScreen}/>
                                <Scene hideNavBar key="InsuranceCarsModelsScreen" component={InsuranceCarsModelsScreen}/>
                                <Scene hideNavBar key="WebInsurance" component={WebInsurance}/>
                            </Stack>
                            <Stack hideNavBar key="historyStack">
                                <Scene hideNavBar key="history" component={HistoryComponent}/>
                                <Scene hideNavBar key="ordering" component={OrderingComponent}/>
                            </Stack>
                            <Scene hideNavBar key="AnQ" component={AnQComponent}/>
                            <Scene hideNavBar key="feedback" component={FeedbackComponent}/>
                            <Scene hideNavBar key="settings" component={SettingsComponent}/>
                            <Stack hideNavBar key="messages">
                                <Scene hideNavBar key="messagesList" component={MessagesListComponent}/>
                                <Scene hideNavBar key="message" component={MessageComponent}/>
                            </Stack>
                        </Stack>
                    </Drawer>
                </Stack>
            </Router>
        )
    }
}

const mapStateToProps = ({basket}) => {
    return {
        // basket: basket.basket,
        // countBasket: basket.countBasket,
        // basketSum: basket.basketSum,
        // basketBonusSum: basket.basketBonusSum,
    }
}

export default connect(
    mapStateToProps,
    {getCities, getBrands, getNPCities,
        getNPsklads, getPushToken, setBasketFromStorage,
        setUserFromSession, getSliderImages, getBonusesWog,
        countMessages, deleteFromBasket, addBasketToStorage
    })(RouterComponent);
