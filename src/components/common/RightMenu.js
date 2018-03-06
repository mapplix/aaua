import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {RightBarMenuItem} from './'
import {Actions} from 'react-native-router-flux';

const RightMenu = () => {
    const {container, rightContainer, imageContainer} = styles;
    return (
        <View style={rightContainer}>
            <TouchableOpacity onPress={Actions.drawerClose}>
                <RightBarMenuItem
                    style={{marginTop: 25}}
                    image={require('../../images/icons/close.png')}
                />
            </TouchableOpacity>
            <View >
                <RightBarMenuItem
                    style={{marginBottom: 26}}
                    imageStyle={{
                        width: 29,
                        height: 29
                    }}
                    image={require('../../images/icons/option.png')}
                />
                <TouchableOpacity onPress={Actions.login}>
                    <RightBarMenuItem
                        imageStyle={{
                            width: 21,
                            height: 21
                        }}
                        style={{marginBottom: 21}}
                        image={require('../../images/icons/exit.png')}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = {
    container: {
        flex:1,
        flexDirection: 'column',
        backgroundColor: '#289',
    },
    rightContainer: {
        width: 59,
        position: 'absolute',
        right: 0,
        bottom: 0,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    imageContainer: {
        paddingTop: 21,
        alignSelf: 'stretch',
        // height: 150,
        alignItems: 'center',
        justifyContent: 'center'
    }
}
export {RightMenu};