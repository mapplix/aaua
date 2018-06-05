import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableHighlight,
    AsyncStorage,
    Platform,
    BackHandler,
    TouchableOpacity,
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
import {setUserFromSession, updateStatus} from '../Actions/AuthAction';
import {getSliderImages} from '../Actions/CitiesBrands';
import {countMessages} from '../Actions/MessagesActions';

class MainComponent extends Component {

    componentWillMount() {
        AsyncStorage.getItem('user').then((user) => {
            const userObj = JSON.parse(user);
            this.props.setUserFromSession(userObj)
            this.props.getSliderImages(userObj.token)
            this.props.countMessages(userObj.token)
        })
    }

    renderImageSlide( item) {
console.log(item);
        return (
            <TouchableOpacity key={item.index} style={{flex: 1}}>
                <Image source={{ uri: item.item }} style={{flex: 1, width: "100%", height: "100%"}} />
            </TouchableOpacity>
        )
    }

    render() {
        const images = [];
        this.props.images.map( image => {
            images.push(image.url)
        })
console.log(images, this.props.images);
        return (
            <MainCard>
                <Header burger >
                    {"AAUA"}
                </Header>
                <CardItem style={{
                    flex:8,
                }}>
                    <ImageSlider
                        onPress={(image) =>{
                            Actions.imageContent({images: this.props.images, index: image.id});
                            // this.props.images.map( imgObj => {
                            //     if (imgObj.url == image.image && imgObj.is_content) {
                            //         Actions.imageContent({images: imgObj});
                            //         console.log(imgObj);
                            //     }
                            // })
                        }}
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
                            counter={this.props.messagesCounter}
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

const mapStateToProps = ({auth, citiesBrands, messages}) => {
    return {
        // token: auth.user.token,
        bonus: auth.user ? auth.user.bonus : 0,
        bonus_wog: auth.user ? auth.user.bonus_wog : 0,
        images: citiesBrands.sliderImages,
        messagesCounter: messages.messagesCounter
    }
}

export default connect(mapStateToProps, {setUserFromSession, getSliderImages, countMessages})(MainComponent);