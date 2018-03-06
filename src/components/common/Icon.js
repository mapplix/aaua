import React from 'react';
import {View, Text, Image} from 'react-native';

const Icon = ({imageSrc, style}) => {
    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 3,
            marginRight: 3
        }}>
            <Image
                resizeMode={'contain'}
                style={[styles.image, style]}
                source={imageSrc}
            />
        </View>
    )
}

const styles = {
    image:{
        width: 25,
        height: 25
    }
}

export {Icon}