import React, {Component} from 'react';
import {View, Text} from 'react-native';

class BottomMenu extends Component {

    render() {
        const {containerStyle} = styles;
        return (
            <View style={{flex:1}}>
                <View style={containerStyle}>
                    {this.props.children}
                </View>
            </View>
        )
    }
}

const styles = {
    containerStyle: {
        flex:1,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        height: 50,
        borderRadius: 1,
        shadowColor: '#1d1d1d',
        shadowOffset: {width:2, height: 2},
        shadowOpacity: 0.2
    }
}

export {BottomMenu}
