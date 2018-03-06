import React from 'react';
import {View} from 'react-native';

const CardItem = (props) => {

    const {itemStyle} = styles;
    return (
        <View
            display={props.display || 'flex'}
            style={[itemStyle, props.style]}
        >
            { props.children }
        </View>
    )
}

const styles = {
    itemStyle: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        // borderColor: '#ddd',
        backgroundColor: '#FFFFFF',
        position: 'relative'
    }
}
export {CardItem};