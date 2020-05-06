import React from 'react';
import {View, Text, TextInput} from 'react-native';

const InputWithLabel = (props) => {
    const {inputStyle, labelStyle, containerStyle} = styles;
    const {label, placeholder, value, onChangeText, secureTextEntry} = props;
    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>
                {label}
            </Text>
            <TextInput
                placeholder={placeholder}
                secureTextEntry = {secureTextEntry}
                value={value}
                onChangeText={onChangeText}
                style={inputStyle}/>
        </View>
    )
}

const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 15,
        lineHeight: 23,
        flex: 2
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 2,
        flex: 1
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
}

export {InputWithLabel};
