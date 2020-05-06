import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {ButtonRoundet} from '../common';
import {RATIO} from '../../styles/constants';

const ButtonComponent = (props) => {
    const {
        container,
        textContainer,
        buttonContainer,
        priceText,
        bonusText,
        buttonStyle} = styles;

    const {price, bonuses, onPress} = props;
    return (
        <View style={container}>
            <View style={textContainer}>
                <View>
                    <Text style={priceText}>{price} грн </Text>
                </View>
                <View>
                    <Text style={bonusText}> {bonuses} бонусов</Text>
                </View>
            </View>
            <View style={buttonContainer}>
                <ButtonRoundet
                    onPress={onPress}
                    style={buttonStyle}
                    textStyle={{
                        fontFamily: 'SFUIText-Medium',
                        fontSize: 13,
                        color:'#1b1b1b'
                    }}
                >
                    Повторить
                </ButtonRoundet>
            </View>
        </View>
    )
}

const styles = {
    container: {
        // backgroundColor: '#258',
        flex:2,
        // height: 37 * RATIO,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    textContainer: {
        flex:6,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    buttonContainer: {
        flex:4,
        height: 27,
        marginRight: 8,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'

    },
    buttonStyle: {
        marginLeft: 1,
        marginRight: 1,
        backgroundColor: '#FFC200',
        borderColor:'#FFC200'
    },
    priceText: {
        fontFamily: 'SFUIText-Bold',
        color: '#423486',
        fontSize: 15
    },
    dateContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    bonusText: {
        color: '#423486',
        fontSize: 10,
        fontWeight: '400'
    }
}

export default ButtonComponent;