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
import {getSliderImages, getBonusesWog} from '../actions/CitiesBrands';
import {countMessages} from '../actions/MessagesActions';

import {connect} from 'react-redux';

class MainComponent extends Component {

    componentDidMount() {
        console.log(' MainComponent componentDidMount', this.props);
        if (this.props.user) {
            console.log('MainComponent componentWillReceiveProps', this.props);
            let {token} = this.props.user;
            this.props.getSliderImages(token)
            this.props.countMessages(token)
            this.props.getBonusesWog(token)
        }
    }

    shouldComponentUpdate(nextProps) {
        console.log('MainComponent shouldComponentUpdate', nextProps, this.props);
        return true;
    }

    componentWillReceiveProps() {
        if (this.props.user && this.props.images.length < 1) {
            console.log('MainComponent componentWillReceiveProps', this.props);
            let {token} = this.props.user;
            this.props.getSliderImages(token)
            this.props.countMessages(token)
            this.props.getBonusesWog(token)
        }
    }

    render() {
        const images = [];
        this.props.images.map( image => {
            images.push(image.url)
        })
      console.log('render MainComponent', images);
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
                            console.log("ON PRESS IMAGE", image)
                            Actions.imageContent({images: this.props.images, index: image.index});
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
        user: auth.user,
        bonus: auth.user ? citiesBrands.bonuses : 0,
        bonus_wog: auth.user ? citiesBrands.bonuses_wog : 0,
        images: citiesBrands.sliderImages,
        messagesCounter: messages.messagesCounter
    }
}

export default connect(mapStateToProps, { getSliderImages, getBonusesWog,
    countMessages})(MainComponent);
