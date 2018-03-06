import React, {Component} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {
    MainCard,
    CardComponent,
    CardComponentTouchable,
    Header
} from '../common';
import {Actions} from 'react-native-router-flux';

class CategoriesComponent extends Component {

    render() {
        const {imageStyle, imageContainer, textContainer, textStyle, componentStyle} = styles;
        return (
            <MainCard>
                <Header back basket>
                    спецпредожение AAUA
                </Header>
                <ScrollView style={{
                    flexDirection: 'column',
                    paddingLeft: 13,
                    paddingRight: 13,
                    marginTop: 21
                }}
                contentContainerStyle={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
                >
                        <CardComponent
                            onPress={Actions.onroadDetails}
                            style={componentStyle}
                        >
                            <View style={imageContainer}>
                                <Image
                                    resizeMode={'contain'}
                                    style={imageStyle}
                                    source={require('../../images/icons/fuel.png')}
                                />
                            </View>
                            <View style={textContainer}>
                                <Text style={textStyle}>
                                    Топливо
                                </Text>
                            </View>
                        </CardComponent>
                        <CardComponent
                            style={componentStyle}
                        >
                            <View style={imageContainer}>
                                <Image
                                    resizeMode={'contain'}
                                    style={imageStyle}
                                    source={require('../../images/icons/auto_goods.png')}
                                />
                            </View>
                            <View style={textContainer}>
                                <Text style={textStyle}>
                                    Товары для авто
                                </Text>
                            </View>
                        </CardComponent>
                        <CardComponent
                            style={componentStyle}
                        >
                            <View style={imageContainer}>
                                <Image
                                    resizeMode={'contain'}
                                    style={imageStyle}
                                    source={require('../../images/icons/tyres.png')}
                                />
                            </View>
                            <View style={textContainer}>
                                <Text style={textStyle}>
                                    Шины
                                </Text>
                            </View>
                        </CardComponent>
                        <CardComponent
                            style={componentStyle}
                        >
                            <View style={imageContainer}>
                                <Image
                                    resizeMode={'contain'}
                                    style={imageStyle}
                                    source={require('../../images/icons/disks.png')}
                                />
                            </View>
                            <View style={textContainer}>
                                <Text style={textStyle}>
                                    Диски
                                </Text>
                            </View>
                        </CardComponent>
                        <CardComponentTouchable
                            onPress={Actions.goods}
                            style={componentStyle}
                        >
                            <View style={imageContainer}>
                                <Image
                                    resizeMode={'contain'}
                                    style={imageStyle}
                                    source={require('../../images/icons/auto_oils.png')}
                                />
                            </View>
                            <View style={textContainer}>
                                <Text style={textStyle}>
                                    Автомасла
                                </Text>
                            </View>
                        </CardComponentTouchable>
                        <CardComponent
                            style={componentStyle}
                        >
                            <View style={imageContainer}>
                                <Image
                                    resizeMode={'contain'}
                                    style={imageStyle}
                                    source={require('../../images/icons/auto_cleaning.png')}
                                />
                            </View>
                            <View style={textContainer}>
                                <Text style={textStyle}>
                                    Автохимия
                                </Text>
                            </View>
                        </CardComponent>
                </ScrollView>
            </MainCard>
        )
    }
}

const styles = {
    componentStyle: {
        // backgroundColor:'#259',
        height: 67,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 8
    },
    imageContainer: {
        flex:2,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft:10
    },
    imageStyle: {
        width: 40,
        height: 40
    },
    textContainer: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    textStyle: {
        fontFamily: 'SFUIText-Regular',
        color:'#1b1b1b',
        fontSize: 15,
    },
}

export default CategoriesComponent;