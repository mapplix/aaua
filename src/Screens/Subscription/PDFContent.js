import React, {Component} from 'react';
import {View, FlatList, Platform} from 'react-native';
import {MainCard, CardItem, Header} from '@aaua/components/common';
import {WIDTH, HEIGHT} from '@aaua/styles/constants';
import WebView from 'react-native-webview';

export default class PDFContent extends Component {
  render() {
    
    return (
      <MainCard>
        <Header back />
        <CardItem>
          <View
            style={{
              flex: 1,
              alignSelf: 'stretch',
              width: WIDTH,
              height: HEIGHT,
            }}>
            <WebView
              style={{
                width: WIDTH,
                height: HEIGHT,
              }}
              source={{
                uri: 'https://drive.google.com/viewerng/viewer?embedded=true&url=http://aaua.com.ua/files/dogovir.doc',
              }}
            />
          </View>
        </CardItem>
      </MainCard>
    );
  }
}
