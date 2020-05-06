import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image} from 'react-native';
import {Icon} from '../common'
import {RATIO} from '../../styles/constants';

const Item = ({onPress, imageSrc, children}) => {

    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <View style={{
                marginTop: 6 * RATIO,
                marginBottom: 6 * RATIO,
                height: 102 * RATIO,
                width: 160  * RATIO,
                borderWidth: 1,
                borderColor: '#909087',
                borderRadius: 2,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image
                    style={{
                        height: 102 * RATIO,
                        width: 160  * RATIO,
                    }}
                    source={imageSrc}
                />
            </View>
        </TouchableOpacity>
    )
}

export default Item;