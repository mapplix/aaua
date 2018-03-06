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
        fontSize: 11,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 1,
        minWidth: 12
    },
    buttonStyle: {
        position: 'absolute',
        top: 0,
        left: -25,
        backgroundColor: '#ffc200',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#ffc200',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'flex-start',
        }
    }

export {BottomMenuCounter};