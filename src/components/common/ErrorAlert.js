import React, {Component} from 'react';
import {View, Text, Alert} from 'react-native';

class ErrorAlert extends Component{

    onClose() {
        console.log('alert closed');
    }

    render() {
        console.log('render alert');
        return (
            Alert.alert(
                this.props.title,
                this.props.msg,
                [
                    {text: 'OK', onPress: this.onClose},
                ],
            )
        )
    }
}
export {ErrorAlert}
