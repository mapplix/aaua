import React from 'react';
import {View, Dimensions, StatusBar, Platform, SafeAreaView} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const MainCard = (props) => {
    const {height, width} = Dimensions.get('window');
    const statusBarHeight = Platform.OS == 'android' ? StatusBar.currentHeight : 0;
    return (
        <KeyboardAwareScrollView>
            <SafeAreaView
                style={[style.containerStyle,props.style, {height: height - statusBarHeight}]}
            >
                {props.children}
            </SafeAreaView>
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