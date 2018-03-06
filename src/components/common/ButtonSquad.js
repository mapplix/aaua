import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const ButtonSquad = (props) => {
    const {onPress, children, disabled} = props;
    const {buttonStyle, textStyle} = style;
    return (
        <TouchableOpacity
            style={[buttonStyle, props.style]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={textStyle}>
                {children}
            </Text>
        </TouchableOpacity>
    )
}

const style = {
    textStyle: {
        fontFamily:'SFUIText-Bold',
        alignSelf: 'center',
        color: '#1b1b1b',
        fontSize: 13
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#ffc200',
        justifyContent: 'center',
        alignItems: 'flex-end'
        }
    }

export {ButtonSquad};