import React,{Component} from 'react';
import {Platform, View} from 'react-native';
import WebView from 'react-native-webview';
import {
    CardItem,
    Header,
    MainCard
} from '../common'
import {WIDTH, HEIGHT} from '../../styles/constants';

class WebInsurance extends Component {

    constructor(props) {
        super(props);
    };

    render() {
        const INJECTEDJAVASCRIPT = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `
        return (
            <MainCard>
                <Header back/>
                <CardItem>
                    <View
                        style={{
                            flex:1,
                            alignSelf: 'stretch',
                            // width: WIDTH,
                            // height: HEIGHT,
                        }}
                    >
                        <WebView
                            style={{
                                width: WIDTH,
                                height: HEIGHT - 50,
                            }}
                            scalesPageToFit={Platform.OS == 'android' ? false : true}
                            // injectedJavaScript={INJECTEDJAVASCRIPT}
                            // automaticallyAdjustContentInsets = {false}
                            source={{uri: 'https://aaua.polis.ua/'}}
                        />
                    </View>
                </CardItem>
            </MainCard>
        )
    }
}

const styles = {
    textColor: {
        color: '#423486'
    }
}

export default WebInsurance;
