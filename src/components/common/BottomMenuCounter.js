import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const BottomMenuCounter = (props) => {
    const {onPress, children} = props;
    const {buttonStyle, textStyle} = style;
    return (
        <TouchableOpacity style={[buttonStyle, props.style]}
                          onPress={onPress}>
            <Text style={[textStyle, props.textStyle]}>
                {children}
            </Text>
        </TouchableOpacity>
    )
}

const style = {
    textStyle: {
        fontFamily: 'SFUIText-Medium',
        color: '#1b1b1b',
        fontSize: 8,
        margin: 2
    },
    buttonStyle: {
        position: 'absolute',
        top: 0,
        left: -25,
        minWidth: 15,
        backgroundColor: '#ffc200',
        borderRadius: 12,
        flexDirection: 'row',
        paddingHorizontal: 2,
        alignSelf: 'center',
        justifyContent: 'center',
        }
    }

export {BottomMenuCounter};
