import React from 'react';
import {View, Text} from 'react-native';

const  ErrorText = (props) => {
    return (
        <View>
            <Text style={styles.errorTextStyle}>
                {props.children}
            </Text>
        </View>
    )
}

const styles = {
    errorTextStyle: {
        fontSize: 18,
        color: 'red',
        alignSelf: 'center'
    }
}

export {ErrorText};