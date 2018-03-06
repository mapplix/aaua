import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spiner = ({size}) => {
    return (
        <View style={styles.spinerStyle}>
            <ActivityIndicator size={ size || "large"} />
        </View>
    )
}

const styles = {
    spinerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
}
export {Spiner};