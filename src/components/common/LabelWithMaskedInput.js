import React from 'react';
import {View, Text, TextInput} from 'react-native';
import TextInputMask from 'react-native-text-input-mask';


const LabelWithMaskedInput = (props) => {
    const {inputStyle, labelStyle, containerStyle, inputContainer} = styles;
    const {label, placeholder, value, onChangeText, secureTextEntry, mask} = props;
    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>
                {label}
            </Text>
            <View
                 style={inputContainer}
            >
                <TextInputMask
                    placeholderTextColor= '#b6b9bf'
                    multiline={false}
                    onSubmitEditing={() => {console.log('enter pressed')}}
                    refInput={ref => { this.input = ref }}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    mask={mask}
                    style={inputStyle}
                    value={value}
                />
            </View>
        </View>
    )
}

const styles = {
    containerStyle: {
        height: 65,
        marginLeft: 45,
        marginRight: 45,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    labelStyle: {
        // backgroundColor: '#283',
        marginBottom: 2,
        marginLeft: 4,
        paddingTop:0,
        height: 22,
        fontFamily: 'SFUIText-Regular',
        fontSize: 14,
        width: 160,
        color: '#3d3e40'
    },
    inputContainer: {
        // backgroundColor: '#289',
        height: 38,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    inputStyle: {
        // placeholderTextColor: '#b6b9bf',
        paddingTop:0,
        marginTop:0,
        fontFamily: 'SFUIText-Regular',
        color: '#b6b9bf',
        fontSize: 15,
        flex:1
    }
}

export {LabelWithMaskedInput};