import React,{Component} from 'react';
import {View} from 'react-native';

const ModalCard = (props) => {
    return (
        <View style={[styles.container, props.style]}>
            {props.children}
        </View>
    )
}

const styles = {
    container: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ffffff',
        margin: 15,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
    }
}

export {ModalCard};