import React from 'react';
import {Text, View} from 'react-native';

const CardHeader = ({headerText}) => {
    const {headerStyle, textStyle, buttonStyle} = styles;
    return (
        <View style={headerStyle}>
            <View style={{flex:3}}>
                <Text style={textStyle}>
                    {headerText}
                </Text>
            </View>
            <View style={{flex:1}}>
                <Text style={buttonStyle}>
                    Add
                </Text>
            </View>
        </View>
    )
}

const styles = {
    headerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textStyle: {
        color:'#5970ff',
        fontSize: 16,
        fontWeight: '700',
        textDecorationLine: 'underline',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1
    },
    buttonStyle: {
        color:'#5970ff',
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center'
    }
}

export {CardHeader};