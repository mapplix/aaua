import React, {useState, useEffect} from 'react';

import {
  Dimensions,
  ActivityIndicator,
  Platform,
  BackHandler,
  AppState,
  Linking,
} from 'react-native';
import {
  Router,
  Scene,
  Stack,
  Drawer,
  Tabs,
  Actions,
} from 'react-native-router-flux';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {connect, useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import md5 from 'js-md5';

import {InviteFriendComponent} from './components/Auth/';

import Login from '@aaua/Screens/Auth/Login';
import ForgotPassword from '@aaua/Screens/Auth/ForgotPassword';

import FirstStage from '@aaua/Screens/Auth/Register/FirstStage';
import SecondStage from '@aaua/Screens/Auth/Register/SecondStage';
// import SecondStageComponent from './components/Auth/Register/SecondStageComponent';
// import InviteFriendComponent from './components/Auth/InviteFriendComponent';
// import ForgotPassComponent from './components/Auth/ForgotPassComponent';
import LicenceComponent from './components/Auth/Register/LicenceComponent';
import CitiesScreen from '@aaua/Screens/Auth/Register/Cities';
import CarsScreen from '@aaua/Screens/Auth/Register/Cars';
import LeftBarComponent from './components/LeftBarComponent';
// import MainComponent from './components/MainComponent';
import HomeScreen from '@aaua/Screens/Home';
import ImageContent from './components/ImageContent';
import WalletComponent from '@aaua/Screens/Valet/';
import SubscriptionComponent from '@aaua/Screens/Subscription/';
import CategoriesComponent from '@aaua/Screens/Store/Categories';
import DetailsComponent from './components/Store/DetailComponent';
import GoodsListComponent from './components/Store/GoodsListComponent';
import SpecialOfferComponent from './components/Store/SpecialOfferComponent';
import BasketListComponent from './components/Store/Basket/ListComponent';
import PaymentComponent from './components/Store/PaymentComponent';
import OnroadCategoriesComponent from '@aaua/Screens/OnRoadSupport/Categories';
import OnroadCategoriesDetailsComponent from '@aaua/Screens/OnRoadSupport/CategoryDetails';
import OrderSupport from './components/OnRoadSupport/OrderSupport';
import MarkerInfo from '@aaua/components/Discounts/MarkerInfo';
// import DiscontMapComponent from './components/Discounts/MapComponent';
import DiscontMapComponent from '@aaua/Screens/Discounts/Map';
// import TabsComponent from './components/Disconts/TabsComponent';
import TabsComponent from '@aaua/Screens/Discounts/Tabs';
import DiscontCardComponent from './components/Discounts/discontsCard/DiscontCardComponent';
import InsuranceComponent from '@aaua/Screens/Insurance/Categories';
import KaskoComponent from '@aaua/Screens/Insurance/Kasko';
import OsagoComponent from '@aaua/Screens/Insurance/Osago';
import InsuranceCitiesScreen from '@aaua/Screens/Insurance/Cities';
import InsuranceCarsScreen from '@aaua/Screens/Insurance/Cars';
import InsuranceCarsModelsScreen from '@aaua/Screens/Insurance/CarModels';
import WebInsurance from './components/Insurance/WebInsurance';
import HistoryComponent from './components/History/ListComponent';
import AnQComponent from '@aaua/Screens/Questions';
import FeedbackComponent from '@aaua/Screens/Feedbacks';
import AAUAMainComponent from '@aaua/Screens/Fuel';
import AAUAAddCardComponent from '@aaua/Screens/Fuel/AddCard';
import AAUAOrderCardComponent from '@aaua/components/AAUA_card/OrderCardComponent';
import MyAAUACardsComponent from '@aaua/components/AAUA_card/MyAAUACardsComponent';
import OrderVirtualCardComponent from '@aaua/components/AAUA_card/OrderVirtualCardComponent';
import QRcode from './components/AAUA_card/QrCode/';
import AZSListScreen from '@aaua/Screens/Fuel/AzsList';
import ButtonsScreen from '@aaua/Screens/Fuel/AauaCardVariants';
import OrderingComponent from './components/Store/OrderingComponent';
import MessagesListComponent from '@aaua/Screens/Messages';
import MessageComponent from './components/Messages/MessageComponent';
import SettingsComponent from '@aaua/Screens/Settings';
import PDFScreen from '@aaua/Screens/Subscription/PDFContent';
import SubscriptionDetailsComponent from '@aaua/Screens/Subscription/Details';
import StoreCitiesScreen from './components/Store/StoreCitiesScreen';
import StoreNPCitiesScreen from './components/Store/StoreNPCitiesScreen';
import aauaCitiesScreen from './components/AAUA_card/CitiesScreen';
import aauaNPCitiesScreen from './components/AAUA_card/StoreNPCitiesScreen';

import MenuIcon from './images/icons/bar.png';

import {
  getBrands,
  getCities,
  getNPCities,
  getNPsklads,
  getSliderImages,
  getBonusesWog,
} from './actions/CitiesBrands';
import {
  setBasketFromStorage,
  deleteFromBasket,
  addBasketToStorage,
} from './actions/StoreAction';

import {getPushToken} from './actions/AuthAction';
import {CHECK_TOKEN_URL, SECRET_KEY} from './actions/constants';
import {setUserFromSession} from './actions/AuthAction';
import {countMessages} from './actions/MessagesActions';

// const RouterComponent = () => {
//   const dispatch = useDispatch();

//   const [hasToken, setHasToken] = useState(false);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [error, setError] = useState(null);

//   const {basket, countBasket, basketSum, basketBonusSum} = useSelector(
//     state => state.basket,
//   );

//   const handleAppStateChange = nextAppState => {
//     if (nextAppState.match(/inactive|background/)) {
//       addBasketToStorage();
//     }
//   };

//   const onBackPress = () => {
//     if (Actions.state.index === 0) {
//       let routs = [
//         'QRcode',
//         'subscription',
//         'AAUA_main',
//         'my_aaua_cards',
//         'onroadCategories',
//         'tabs',
//         'discontCards',
//         'messagesList',
//         'history',
//         'categories',
//         'wallet',
//         'feedback',
//       ];
//       console.log('router ', Actions.currentScene);
//       if (Actions.currentScene == 'mainScreen') {
//         BackHandler.exitApp();
//       } else if (routs.includes(Actions.currentScene)) {
//         Actions.mainScreen();
//       } else if (Actions.currentScene == 'message') {
//         Actions.push('messagesList');
//       } else if (Actions.currentScene == 'firstStage') {
//         Actions.pop();
//       } else if (Actions.currentScene == 'secondStage') {
//         return true;
//       } else {
//         console.log('router else');
//         Actions.pop();
//       }
//       return true;
//     }
//   };

//   useEffect(() => {
//     getBrands();
//     getCities();
//     //Check if User logged in
//     getPushToken();

//     let str = AsyncStorage.multiGet(['user', '@basketInfo']);

//     str.then((stores, error) => {
//       return stores.map(data => {
//         console.log('-1- ROUTER startApp', data[0]);
//         if (data[0] == 'user') {
//           const user = JSON.parse(data[1]);
//           if (user !== null) {
//             console.log('-1- ROUTER user from store', user);
//             const data = {
//               token: user.token,
//               phone: user.profile.phone,
//             };

//             axios
//               .post(CHECK_TOKEN_URL, data)
//               .then(res => {
//                 console.log('CHECK_TOKEN_URL res ', res);
//                 if (res.data.error == 0) {
//                   console.log('user is checked', res.data, res.data.data == 1);
//                   if (res.data.data == 1) {
//                     console.log('user is valid', user);
//                     return user;
//                   } else {
//                     AsyncStorage.removeItem('user');
//                     setHasToken(false);
//                     setIsLoaded(true);
//                   }
//                 } else {
//                   setHasToken(false);
//                   setIsLoaded(true);

//                   return res.data.error;
//                 }
//               })
//               .then(user => {
//                 console.log({user});
//                 dispatch(setUserFromSession(user));
//                 // return user;
//                 setHasToken(user.token !== null);
//                 setIsLoaded(true);
//               })
//               // .then((user, err) => {
//               //     // console.log(user);
//               //     this.props.getSliderImages(user.token)
//               //     return user;
//               // }).then( (user, err)=> {
//               //     // console.log(user);
//               //     this.props.countMessages(user.token)
//               //     return user;
//               // }).then( (user, err) => {
//               //     // console.log(user);
//               //     this.props.getBonusesWog(user.token)
//               //     this.setState({
//               //         hasToken: user.token !== null,
//               //         // hasCard: user.card !== null,
//               //         isLoaded: true
//               //     })
//               // })
//               .catch(error => {
//                 console.log(error);
//               });
//           } else {
//             setHasToken(false);
//             setIsLoaded(true);
//           }
//         }
//         if (data[0] == '@basketInfo') {
//           let basketInfo = JSON.parse(data[1]);
//           if (basketInfo) {
//             setBasketFromStorage(basketInfo);
//           }
//         }
//       });
//     });

//     AppState.addEventListener('change', handleAppStateChange);

//     return () => {
//       AppState.removeEventListener('change', handleAppStateChange);
//     };
//   }, []);

//   const {width} = Dimensions.get('window');

//   if (!isLoaded) {
//     return <ActivityIndicator />;
//   }

//   const Stack = createNativeStackNavigator();
//   const Drawer = createDrawerNavigator();

//   const Root = () => {
//     return (
//       <Drawer.Navigator initialRouteName="Home">
//         <Drawer.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{headerShown: false}}
//         />
//         <Drawer.Screen name="ImageContent" component={ImageContent} />
//         <Stack.Screen
//           name="SubscriptionComponent"
//           component={SubscriptionComponent}
//         />
//       </Drawer.Navigator>
//     );
//   };

//   return (
//     <NavigationContainer>
//       <Stack.Navigator options={{headerShown: false}}>
//         {hasToken ? (
//           <Stack.Screen
//             name="Root"
//             component={Root}
//             options={{headerShown: false}}
//           />
//         ) : (
//           <Stack.Screen name="Login" component={Login} />
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };
// export default RouterComponent;

class RouterComponent extends React.Component {
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
    this._handleAppStateChange = this._handleAppStateChange.bind(this);
  }

  componentWillMount() {
    this.props.getBrands();
    this.props.getCities();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  componentDidMount() {
    console.log('-1- ROUTER componentDidMount');
    AppState.addEventListener('change', this._handleAppStateChange);
    //Check if User logged in
    this.props.getPushToken();
    let str = AsyncStorage.multiGet(['user', '@basketInfo']);
    str.then((stores, error) => {
      return stores.map(data => {
        console.log('-1- ROUTER startApp', data[0]);
        if (data[0] == 'user') {
          const user = JSON.parse(data[1]);
          if (user !== null) {
            console.log('-1- ROUTER user from store', user);
            const data = {
              token: user.token,
              phone: user.profile.phone,
            };

            axios
              .post(CHECK_TOKEN_URL, data)
              .then(res => {
                console.log('CHECK_TOKEN_URL res ', res);
                if (res.data.error == 0) {
                  console.log('user is checked', res.data, res.data.data == 1);
                  if (res.data.data == 1) {
                    console.log('user is valid', user);
                    return user;
                  } else {
                    AsyncStorage.removeItem('user');
                    this.setState({
                      hasToken: false,
                      // hasCard: false,
                      isLoaded: true,
                    });
                  }
                } else {
                  this.setState({
                    hasToken: false,
                    // hasCard: false,
                    isLoaded: true,
                  });
                  return res.data.error;
                }
              })
              .then(user => {
                console.log({user});
                this.props.setUserFromSession(user);
                // return user;
                this.setState({
                  hasToken: user.token !== null,
                  // hasCard: user.card !== null,
                  isLoaded: true,
                });
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
              .catch(error => {
                console.log(error);
              });
          } else {
            this.setState({
              hasToken: false,
              // hasCard: false,
              isLoaded: true,
            });
          }
        }
        if (data[0] == '@basketInfo') {
          let basketInfo = JSON.parse(data[1]);
          if (basketInfo) {
            this.props.setBasketFromStorage(basketInfo);
          }
        }
      });
    });
  }

  _handleAppStateChange(nextAppState) {
    if (nextAppState.match(/inactive|background/)) {
      this.props.addBasketToStorage();
    }
  }

  onBackPress() {
    if (Actions.state.index === 0) {
      let routs = [
        'QRcode',
        'subscription',
        'AAUA_main',
        'my_aaua_cards',
        'onroadCategories',
        'tabs',
        'discontCards',
        'messagesList',
        'history',
        'categories',
        'wallet',
        'feedback',
      ];
      console.log('router ', Actions.currentScene);
      if (Actions.currentScene == 'mainScreen') {
        BackHandler.exitApp();
      } else if (routs.includes(Actions.currentScene)) {
        console.log(' ---- ROUTER WILL GO TO MAIN SCREEN ----')
        Actions.mainScreen();
      } else if (Actions.currentScene == 'message') {
        Actions.push('messagesList');
      } else if (Actions.currentScene == 'firstStage') {
        Actions.pop();
      } else if (Actions.currentScene == 'secondStage') {
        return true;
      } else {
        console.log('router else');
        Actions.pop();
      }
      return true;
    }
  }

  render() {
    const {width} = Dimensions.get('window');
    if (!this.state.isLoaded) {
      return <ActivityIndicator />;
    }
    return (
      <Router backAndroidHandler={this.onBackPress}>
        <Stack hideNavBar key="root" titleStyle={{alignSelf: 'center'}}>
          <Stack initial={!this.state.hasToken} key="auth" hideNavBar>
            <Scene title="login" key="login" component={Login} />
            <Stack hideNavBar key="register">
              <Scene hideNavBar key="firstStage" component={FirstStage} />
              <Scene
                // initial
                hideNavBar
                key="secondStage"
                component={SecondStage}
              />
              <Scene hideNavBar key="licence" component={LicenceComponent} />
              <Scene
                hideNavBar
                key="AutocompleteScreen"
                component={CitiesScreen}
              />
              <Scene hideNavBar key="CarsScreen" component={CarsScreen} />
            </Stack>
            <Scene
              title="Пригласи друга"
              key="invite"
              component={InviteFriendComponent}
            />
            <Scene
              title="Востановление пароля"
              key="forgot"
              component={ForgotPassword}
            />
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
            negotiatePan={true}>
            <Stack key="drawerWrapper">
              <Scene
                hideNavBar
                key="mainScreen"
                component={HomeScreen}
                title="main_screen"
              />
              <Scene hideNavBar key="imageContent" component={ImageContent} />
              <Scene
                hideNavBar
                key="wallet"
                component={WalletComponent}
                title="Кошелек"
              />
              <Stack hideNavBar key={'subscriptionStack'}>
                <Scene
                  hideNavBar
                  key="subscription"
                  component={SubscriptionComponent}
                  title="Годовая подписка"
                />
                <Scene hideNavBar key={'PDFScreen'} component={PDFScreen} />
                <Scene
                  hideNavBar
                  key={'SubscriptionDetailsComponent'}
                  component={SubscriptionDetailsComponent}
                />
              </Stack>
              <Scene
                hideNavBar
                key="categories"
                component={CategoriesComponent}
                title="Store"
              />
              <Scene
                hideNavBar
                key="detail"
                component={DetailsComponent}
                title="Details"
              />
              <Scene
                hideNavBar
                key="goods"
                component={GoodsListComponent}
                title="Goods"
              />
              <Scene
                hideNavBar
                key="specialOffer"
                component={SpecialOfferComponent}
              />
              <Scene
                hideNavBar
                key="basketList"
                component={BasketListComponent}
              />
              <Scene
                hideNavBar
                key="basketOrdering"
                component={OrderingComponent}
                title="Goods"
              />
              <Scene hideNavBar key="payment" component={PaymentComponent} />
              <Scene
                hideNavBar
                key="StoreCitiesScreen"
                component={StoreCitiesScreen}
              />
              <Scene
                hideNavBar
                key="StoreNPCitiesScreen"
                component={StoreNPCitiesScreen}
              />
              <Stack hideNavBar key="AAUA_card">
                <Scene hideNavBar key="select_azs" component={AZSListScreen} />
                <Scene
                  hideNavBar
                  key="AAUA_main"
                  component={AAUAMainComponent}
                  title="Карта AAUA"
                />
                <Scene
                  hideNavBar
                  key="add_aaua_card"
                  component={AAUAAddCardComponent}
                  title="Заказать карту"
                />
                <Scene
                  hideNavBar
                  key="order_virtual_aaua_card"
                  component={OrderVirtualCardComponent}
                />
                <Scene
                  hideNavBar
                  key="buttons_aaua_card"
                  component={ButtonsScreen}
                />
                <Scene
                  hideNavBar
                  key="my_aaua_cards"
                  component={MyAAUACardsComponent}
                  title="Карта AAUA"
                />
                <Scene
                  hideNavBar
                  key="order_aaua_card"
                  component={AAUAOrderCardComponent}
                />

                <Scene hideNavBar key="QRcode" component={QRcode} />
                <Scene
                  hideNavBar
                  key="aauaCitiesScreen"
                  component={aauaCitiesScreen}
                />
                <Scene
                  hideNavBar
                  key="aauaNPCitiesScreen"
                  component={aauaNPCitiesScreen}
                />
              </Stack>
              <Stack hideNavBar key="onroadSupport">
                <Scene
                  hideNavBar
                  key="onroadCategories"
                  component={OnroadCategoriesComponent}
                />
                <Scene
                  hideNavBar
                  key="onroadDetails"
                  component={OnroadCategoriesDetailsComponent}
                />
                <Scene
                  hideNavBar
                  key="orderOnRoadSupport"
                  component={OrderSupport}
                />
              </Stack>
              <Stack hideNavBar key="discontCards">
                <Scene
                  initial
                  hideNavBar
                  key="tabs"
                  component={TabsComponent}
                />
                <Scene
                  hideNavBar
                  key="discontCard"
                  component={DiscontCardComponent}
                />
                <Scene
                  hideNavBar
                  key="discontsMap"
                  component={DiscontMapComponent}
                />
                <Scene hideNavBar key="MarkerInfo" component={MarkerInfo} />
              </Stack>
              <Stack hideNavBar key="insurance">
                <Scene
                  hideNavBar
                  key="insuranceCategories"
                  component={InsuranceComponent}
                />
                <Scene
                  hideNavBar
                  key="kaskoComponent"
                  component={KaskoComponent}
                />
                <Scene
                  hideNavBar
                  key="osagoComponent"
                  component={OsagoComponent}
                />
                <Scene
                  hideNavBar
                  key="InsuranceCitiesScreen"
                  component={InsuranceCitiesScreen}
                />
                <Scene
                  hideNavBar
                  key="InsuranceCarsScreen"
                  component={InsuranceCarsScreen}
                />
                <Scene
                  hideNavBar
                  key="InsuranceCarsModelsScreen"
                  component={InsuranceCarsModelsScreen}
                />
                <Scene hideNavBar key="WebInsurance" component={WebInsurance} />
              </Stack>
              <Stack hideNavBar key="historyStack">
                <Scene hideNavBar key="history" component={HistoryComponent} />
                <Scene
                  hideNavBar
                  key="ordering"
                  component={OrderingComponent}
                />
              </Stack>
              <Scene hideNavBar key="AnQ" component={AnQComponent} />
              <Scene hideNavBar key="feedback" component={FeedbackComponent} />
              <Scene hideNavBar key="settings" component={SettingsComponent} />
              <Stack hideNavBar key="messages">
                <Scene
                  hideNavBar
                  key="messagesList"
                  component={MessagesListComponent}
                />
                <Scene hideNavBar key="message" component={MessageComponent} />
              </Stack>
            </Stack>
          </Drawer>
        </Stack>
      </Router>
    );
  }
}

const mapStateToProps = ({basket}) => {
  return {
    // basket: basket.basket,
    // countBasket: basket.countBasket,
    // basketSum: basket.basketSum,
    // basketBonusSum: basket.basketBonusSum,
  };
};

export default connect(mapStateToProps, {
  getCities,
  getBrands,
  getNPCities,
  getNPsklads,
  getPushToken,
  setBasketFromStorage,
  setUserFromSession,
  getSliderImages,
  getBonusesWog,
  countMessages,
  deleteFromBasket,
  addBasketToStorage,
})(RouterComponent);
