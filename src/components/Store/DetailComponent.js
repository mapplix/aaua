import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    Image
} from 'react-native';
import {
    MainCard,
    CardItem,
    Header,
    CardComponent,
    ButtonRoundet} from '../common';
import {WIDTH_RATIO, RATIO} from '../../styles/constants';
import ImageSlider from 'react-native-image-slider';
import {Actions} from 'react-native-router-flux';

class DetailsComponent extends Component {

    render() {
        const images = [
            require('../../images/avtoOil.png'),
            require('../../images/avtoOil.png'),
            require('../../images/avtoOil.png'),
        ];

        const {
            sliderContainer,
            imageContainer,
            titleStyle,
            isPresentText,
            titleContainer,
            descriptionContainer,
            textContainer,
            descriptionTitle,
            fixedFooterStyle,
            buttonText,
            priceText,
            bonusText} = styles;
        const imageHeight = 215 * RATIO;
        const sliderHeight = imageHeight + 30;
        return (
            <MainCard>
                <Header back basket>
                    автомасла
                </Header>
                <ScrollView>
                    <CardItem style={imageContainer}>
                        <View style={sliderContainer}>
                            <ImageSlider
                                images={images}
                                autoPlayWithInterval={4000}
                                customSlide={({ index, item, style, width }) =>{
                                    return (
                                    <View key={index} style={[style, {
                                        height: sliderHeight,
                                        justifyContent:'center',
                                        alignItems:'center',
                                        backgroundColor:'#ffffff'
                                    }]}>
                                        <Image source={item }
                                               style={{
                                                    height: imageHeight,
                                                    width: 215 * WIDTH_RATIO,
                                                    flex: 1 }}
                                        />
                                    </View>
                                    )
                                }}
                            />
                        </View>
                        <View style={titleContainer}>
                            <Text style={titleStyle}>
                                Моторное масло Shell Helix HX7 10W-40
                            </Text>
                            <Text style={isPresentText}>
                                В наличии
                            </Text>
                        </View>

                    </CardItem>
                    <CardItem style={descriptionContainer}>
                        <CardComponent style={{
                            paddingTop: 22,
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start'
                        }}>
                            <Text style={
                                descriptionTitle
                            }>
                                Описание товара
                            </Text>
                            <View style={textContainer}>
                                <Text style={{
                                    marginBottom: 65,
                                    fontFamily: 'SFUIText-Regular',
                                    fontSize: 13,
                                    color: '#1b1b1b'
                                }}>
                                    Давно выяснено, что при оценке дизайна и композиции читаемый текст
                                    мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более
                                    или менее стандартное заполнение шаблона, а также реальное распределение букв и
                                    пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст..
                                    Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и
                                    редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что
                                    поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц
                                    всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum
                                    получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно
                                    (например, юмористические варианты).
                                </Text>
                            </View>
                        </CardComponent>
                    </CardItem>
                </ScrollView>
                <View style={fixedFooterStyle}>
                    <View>
                        <Text style={priceText}>
                            1750 грн
                        </Text>
                        <Text style={bonusText}>
                            1750 бонусов
                        </Text>
                    </View>
                    <View style={{
                        height: 36
                    }}>
                        <ButtonRoundet
                            onPress={Actions.basketList}
                            style= {{
                                backgroundColor: '#ffc200',
                                borderColor: '#ffc200',
                            }}
                            textStyle={buttonText}
                        >
                            Купить
                        </ButtonRoundet>
                    </View>
                </View>
            </MainCard>
        )
    }
}

const styles = {
    sliderContainer: {
        flex:8,
        paddingTop: 35 * RATIO,
        marginBottom: 17 * RATIO,
    },
    imageContainer: {
        flex: 60,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    titleContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleStyle: {
        fontFamily: 'SFUIText-Medium',
        fontSize: 17,
        color: '#1b1b1b',
        marginBottom: 14
    },
    isPresentText: {
        fontFamily: 'SFUIText-Regular',
        fontSize: 14,
        color: '#2fc047',
        marginBottom: 14
    },
    descriptionContainer: {
        flex: 40,
        paddingLeft: 14 * WIDTH_RATIO,
        paddingRight: 14 * WIDTH_RATIO,
    },
    textContainer: {
        marginRight: 17,
        marginLeft: 17,
    },
    descriptionTitle: {
        fontFamily: 'SFUIText-Medium',
        fontSize: 17,
        color: '#423486',
        marginBottom: 17,
        marginLeft: 14,
    },
    fixedFooterStyle: {
        height: 63,
        width: '100%',
        alignSelf: 'stretch',
        position: 'absolute',
        bottom: 0,
        zIndex: 999,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fafafa',
        elevation:5,
        borderTopWidth:2,
        borderTopColor: '#a8a8a8',
        shadowColor: '#a8a8a8',
        shadowOffset: {width:2, height: 2},
        shadowOpacity: 0.2
    },
    buttonText: {
        fontFamily: 'SFUIText-Medium',
        color: '#1b1b1b',
        fontSize: 16,
        marginLeft: 50,
        marginRight: 50,
    },
    priceText: {
        fontFamily: 'SFUIText-Bold',
        color: '#423486',
        fontSize: 20
    },
    bonusText: {
        fontFamily: 'SFUIText-Medium',
        color: '#423486',
        fontSize: 14
    },
}

export default DetailsComponent;