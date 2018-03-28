import React, {Component} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {
    MainCard,
    CardItem,
    CardComponent,
    ButtonRoundet,
    LabelOnInput,
    ModalCard,
    Spiner,
    Header
} from '../common';
import {Actions} from 'react-native-router-flux';
import TextComponent from './TextComponent';
import ButtonComponent from './ButtonComponent';
import {RATIO} from '../../styles/constants';
import {DEVICE_OS, iOS, Android} from '../../Actions/constants';

class ListComponent extends Component {

    render() {
        const {imageStyle, imageContainer, textContainer, iconImageStyle, componentStyle, buttonContainer} = styles;
        return (
            <MainCard>
                <Header burger goToMain={DEVICE_OS == iOS ? true : false}>
                    {"ИСТОРИЯ ЗАКАЗОВ"}
                </Header>
                <ScrollView style={{
                    paddingLeft: 13,
                    paddingRight: 14,
                    marginTop: 21
                }}
                contentContainerStyle={{
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
                >
                        <CardComponent
                            style={componentStyle}
                        >
                            <View style={imageContainer}>
                                <Image
                                    resizeMode={'contain'}
                                    style={imageStyle}
                                    source={require('../../images/shell.png')}
                                />
                            </View>
                            <View style={textContainer}>
                                <TextComponent
                                    title={'Моторное масло Shell Helix HX7 10W-40'}
                                    isPresent
                                />
                                <ButtonComponent
                                    onPress={Actions.ordering}
                                    price={1750}
                                    bonuses={1999}
                                />
                            </View>
                        </CardComponent>
                        <CardComponent
                            style={componentStyle}
                        >
                            <View style={imageContainer}>
                                <Image
                                    resizeMode={'contain'}
                                    style={iconImageStyle}
                                    source={require('../../images/icons/onroad1.png')}
                                />
                            </View>
                            <View style={textContainer}>
                                <TextComponent
                                    title={'Техническая помощь'}

                                />
                                <ButtonComponent
                                    price={1750}
                                    bonuses={1999}
                                />
                            </View>
                        </CardComponent>
                        <CardComponent
                            style={componentStyle}
                        >
                            <View style={imageContainer}>
                                <Image
                                    resizeMode={'contain'}
                                    style={iconImageStyle}
                                    source={require('../../images/icons/subscription_box.png')}
                                />
                            </View>
                            <View style={textContainer}>
                                <TextComponent
                                    title={'Годовая подписка'}

                                />
                                <ButtonComponent
                                    price={1750}
                                    bonuses={1999}
                                />
                            </View>
                        </CardComponent>
                </ScrollView>
            </MainCard>
        )
    }
}

const styles = {
    componentStyle: {
        // backgroundColor: '#9f9f96',
        height: 115,
        minHeight: 115,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 11
    },
    imageContainer: {
        flex:2,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft:12,
        paddingTop:15
    },
    iconImageStyle: {
        width: 40,
        height: 40
    },
    imageStyle: {
        width: 60,
        height: 60
    },
    textContainer: {
        flex: 8,
        paddingTop: 6 * RATIO,
        paddingLeft: 22,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textStyle: {
        fontFamily: 'SFUIText-Regular',
        color:'#1d1d1d',
        fontSize: 15,
        fontWeight: '500'
    },
    buttonContainer: {
        flex: 3,
        margin:2,
        backgroundColor:'#982',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    }
}

export default ListComponent;