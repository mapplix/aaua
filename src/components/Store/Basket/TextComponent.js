import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {RATIO, WIDTH_RATIO} from '../../../styles/constants';

const TextComponent = (props) => {
    const {container, titleContainer,
        headerContainer,isPresentText, deleteText,
        dateContainer, isPresentContainer, textStyle} = styles;
    return (
        <View style={container}>
            <View style={headerContainer}>
                <View style={titleContainer}>
                    <Text style={textStyle}>
                        {props.title}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={props.onDelete}
                    style={dateContainer}>
                    <Text style={deleteText}> Удалить Х</Text>
                </TouchableOpacity>
            </View>
            <View style={isPresentContainer}>
                <Text style={[
                    isPresentText,
                    {color: props.isPresent ? '#2fc047' : '#e33c57'}
                ]}>
                    { props.isPresent ? 'В наличии' : 'Нет в наличии'}
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
    deleteText: {
        fontFamily: 'SFUIText-Medium',
        color: '#423486',
        fontSize: 11,
    },
    textStyle: {
        fontFamily: 'SFUIText-Regular',
        fontSize: 13,
        color:'#1b1b1b'
    }
}

export default TextComponent;