import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {RATIO, WIDTH_RATIO} from '../../styles/constants';

const TextComponent = (props) => {
    const {container, titleContainer,
        headerContainer,isPresentText, dateText,
        dateContainer, isPresentContainer, textStyle} = styles;
    return (
        <View style={container}>
            <View style={headerContainer}>
                <View style={titleContainer}>
                    <Text style={textStyle}>
                        {props.title}
                    </Text>
                </View>
                <View style={dateContainer}>
                    <Text style={dateText}> Дата заказа: </Text>
                    <Text style={dateText}> {props.date} </Text>
                </View>
            </View>
            <View style={isPresentContainer}>
                <Text style={isPresentText}>
                    { props.isPresent ? 'В наличии' : ''}
                </Text>
            </View>
        </View>
    )
}

const styles = {
    container: {
        flex:3,
        // height: 87 * RATIO,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

    },
    titleContainer: {
        flex:6,
    },
    headerContainer: {
        // backgroundColor: '#258',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    dateContainer: {
        flex:4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    isPresentContainer: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    isPresentText: {
        fontFamily: 'SFUIText-Medium',
        color:'#2fc047',
        fontSize: 10,
    },
    dateText: {
        fontFamily: 'SFUIText-Medium',
        color: '#423486',
        fontSize: 10,
    },
    textStyle: {
        fontFamily: 'SFUIText-Regular',
        fontSize: 13,
        color:'#1b1b1b'
    }
}

export default TextComponent;