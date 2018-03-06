import React from 'react';
import {View, Dimensions, StatusBar} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const MainCard = (props) => {
    const {height} = Dimensions.get('window');
    return (
        <KeyboardAwareScrollView>
            <View
                style={[style.containerStyle,props.style, {height: height-StatusBar.currentHeight}]}
            >
                {props.children}
            </View>
        </KeyboardAwareScrollView>
    )
}

const style = {
    containerStyle: {
        flex:1,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        }
    }

export {MainCard};