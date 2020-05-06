import React, {Component} from 'react';
import {Alert} from 'react-native';

const showAlert = (title, text, buttonText, onPress) => {
    Alert.alert(
        title,
        text,
        [
            {text: buttonText, onPress: onPress},
        ],
    )
}

export {showAlert};