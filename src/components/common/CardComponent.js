import React from 'react';
import {View, Text, Image} from 'react-native';
import {
    ButtonRoundet
} from './';

const CardComponent = ({children, style}) => {
    const {container, } = styles;
    return (
        <View style={[
            container,
            style
        ]}>
            {children}
        </View>
    )
}

const styles = {
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:1,
        borderRadius:4,
        borderColor: '#bcbcb3',
    },

    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        paddingRight: 10,
        paddingLeft: 10,
        backgroundColor: '#FFC200',
        borderColor:'#FFC200',
        marginRight: 1,
        marginLeft: 1,
    }
}
export {CardComponent};