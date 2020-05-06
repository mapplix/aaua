import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Icon} from '../common'
import {RATIO} from '../../styles/constants';


const Item = ({onPress, imageSrc, children}) => {
    const {iconStyle, container, titleText} = styles;
    return (
        <TouchableOpacity
            style={container}
            onPress={onPress}
        >
            <Icon
                style={iconStyle}
                imageSrc={imageSrc}
            />
            <Text style={titleText}>
                {children}
            </Text>
        </TouchableOpacity>
    )
}

const styles = {
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 22 * RATIO,
        marginBottom: 22 * RATIO,
    },
    iconStyle: {
        width: 75,
        height: 75,
    },
    titleText: {
        fontFamily: 'SFUIText-Regular',
        fontSize: 11,
        color: '#1b1b1b'
    }
}

export default Item;