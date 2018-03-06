import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const MapButton = (props) => {
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
        fontFamily: 'SFUIText-Regular',
        alignSelf: 'center',
        justifyContent: 'center',
        color: '#1b1b1b',
        fontSize: 12,
        marginLeft: 14,
        marginRight: 14,
    },
    buttonStyle: {
        height: 31,
        marginLeft: 3,
        marginLeft: 3,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#e9e9e9',
        justifyContent: 'center',
        alignItems: 'center',
        }
    }

export {MapButton};