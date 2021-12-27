import React, {Component} from 'react';
import {Alert} from 'react-native';

import I18n from '@aaua/i18n';

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