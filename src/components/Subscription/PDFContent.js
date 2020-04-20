import React, {Component} from 'react';
import {View, FlatList, Platform} from 'react-native';
import {
    MainCard,
    CardItem,
    Header
} from "../common";
import {WIDTH, HEIGHT} from '../../styles/constants';
import WebView from 'react-native-webview';

export default class PDFContent extends Component {

    render() {
console.log(this.props);
        return (
            <MainCard>
                <Header back/>
                <CardItem>
                  <View
                    style={{
                      flex:1,
                      alignSelf: 'stretch',
                      width: WIDTH,
                      height: HEIGHT,
                    }}
                  >
                    <WebView
                      style={{
                        width: WIDTH,
                        height: HEIGHT,
                      }}
                      source={{uri: 'https://drive.google.com/viewerng/viewer?embedded=true&url=http://aaua.com.ua/files/dogovir.doc'}}
                    />
                  </View>
                </CardItem>
            </MainCard>
        )
    }
}
