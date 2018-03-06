import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableHighlight,
    AsyncStorage,
    Platform,
    BackHandler
} from "react-native";
import {
    MainCard,
    CardItem,
    BottomMenu,
    Header,
    BottomMenuMessages
} from './common';
import ImageSlider from 'react-native-image-slider';
import {BottomMenuItem} from "./common/BottomMenuItem";
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {setUserFromSession} from '../Actions/AuthAction';
import {getSliderImages} from '../Actions/CitiesBrands';

let listener = null

class MainComponent extends Component {

    componentWillMount() {
        AsyncStorage.getItem('user').then((user) => {
console.log(user);
            const userObj = JSON.parse(user);
            this.props.setUserFromSession(userObj)
            this.props.getSliderImages(userObj.token)
        })

//         if (Platform.OS == "android" && listener == null) {
//             listener = BackHandler.addEventListener("hardwareBackPress", () => {
// console.log(this.props.title);
//                 if (this.props.title == 'main_screen') {
//                     return true;
//                 }
//                 return false;
//             })
//         }
    }

    render() {
        const images = ["http://aaua.taxi898.com.ua/images/slide/2016-03/26.jpg", "http://aaua.taxi898.com.ua/images/slide/2016-03/28.jpg"];
        // this.props.images.map( image => {
        //     images.push(image.url)
        // })
console.log( 'render main component ', this.props.images, images);
        return (
            <MainCard>
                <Header burger >
                    {"AAUA"}
                </Header>
                <CardItem style={{
                    flex:8,
                }}>
                    <ImageSlider
                        images={images}
                        autoPlayWithInterval={4000}
                    />
                </CardItem>
                <CardItem>
                    <BottomMenu>
                        <BottomMenuItem
                            style={{
                                justifyContent: 'center',
                                // backgroundColor: '#289',
                            }}
                            counter={this.props.bonus_wog}
                            imageSrc={require('../images/icons/wog.png')}
                        >
                            Бонусы WOG
                        </BottomMenuItem>
                        <BottomMenuItem
                            style={{
                                justifyContent: 'center',
                                // backgroundColor: '#289',
                            }}
                            counter={this.props.bonus}
                            imageSrc={require('../images/icons/aaua.png')}
                        >
                            Бонусы AAUA
                        </BottomMenuItem>
                        <BottomMenuMessages
                            counter={5}
                            onPress={Actions.messages}
                            imageSrc={require('../images/icons/mail.png')}
                        >
                            Уведомления
                        </BottomMenuMessages>
                    </BottomMenu>
                </CardItem>

            </MainCard>
        )
    }
}

const mapStateToProps = ({auth, citiesBrands}) => {
console.log(citiesBrands.sliderImages);
    return {
        // token: auth.user.token,
        bonus: auth.user ? auth.user.bonus : 0,
        bonus_wog: auth.user ? auth.user.bonus_wog : 0,
        images: citiesBrands.sliderImages
    }
}

export default connect(mapStateToProps, {setUserFromSession, getSliderImages})(MainComponent);