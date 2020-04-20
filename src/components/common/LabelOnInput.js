import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {DEVICE_OS, iOS} from '../../Actions/constants';

const LabelOnInput = (props) => {
    const {inputStyle, labelStyle, containerStyle} = styles;
    const {label, placeholder, value, onChangeText, secureTextEntry} = props;
    return (
        <View style={containerStyle}>
            <Text style={[labelStyle, props.labelStyle]}>
                {label}
            </Text>
            <View style={{
                    minHeight: 43,
                    height: 40,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <TextInput
                    {...props}
                    placeholderTextColor='#b6b9bf'
                    multiline={false}
                    onSubmitEditing={() => {}}
                    placeholder={placeholder}
                    secureTextEntry = {secureTextEntry}
                    value={value}
                    onChangeText={onChangeText}
                    style={inputStyle}/>
            </View>
        </View>
    )
}

const styles = {
    containerStyle: {
        // backgroundColor: '#909087',
        height: 65,
        marginLeft: 45,
        marginRight: 45,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    inputStyle: {
        // placeholderTextColor: '#b6b9bf',
        fontFamily:'SFUIText-Regular',
      color: '#111',
        fontSize: 15,
        lineHeight: 18,
        flex:1,
        borderBottomWidth: 1,
        borderBottomColor: '#000'
    },
    labelStyle: {
        marginLeft: 4,
        marginBottom: 2,
        paddingTop:0,
        height: 20,
      fontFamily: 'SFUIText-Medium',
      fontSize: 14,
      color: '#423486',
        alignSelf:'stretch',
    },

}

export {LabelOnInput};
