import React from 'react';
import {View} from 'react-native';

const Card = (props) => {
    return (
        <View style={style.containerStyle}>
            {props.children}
        </View>
    )
}

const style = {
    containerStyle: {
        borderWidth: 2,
        borderRadius:2,
        borderColor: '#9f9f96',
        borderBottomWidth: 0,
        shadowColor: '#6a6a6a',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10
        }
    }

export {Card};