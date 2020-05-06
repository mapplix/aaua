import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {
    ButtonRoundet
} from './';

const CardComponentTouchable = ({onPress, children, imageSrc, style}) => {
    const {container, } = styles;
    return (
        <TouchableOpacity style={[
            container,
            style
        ]}
        onPress= {onPress}
        >
            {children}
        </TouchableOpacity>
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
export {CardComponentTouchable};