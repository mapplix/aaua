import React, {Component} from 'react';
import {View, Platform} from 'react-native';
import {MainCard, CardItem, Header} from './common';
import {WIDTH, HEIGHT} from '../styles/constants';
import Swiper from 'react-native-swiper';
import WebView from 'react-native-webview';


export default class ImageContent extends Component {
  renderContent() {

console.log(this.props.images);

    return this.props.images.map(image => {
      // const INJECTEDJAVASCRIPT =
      //   "const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); ";
      return (
        <View
          key={image.id}
          style={{
            flex: 1,
            alignSelf: 'stretch',
            width: WIDTH,
            height: HEIGHT,
          }}>
          <WebView
            style={{
              width: WIDTH,
              // height: HEIGHT,
            }}
            scalesPageToFit={Platform.OS == 'android' ? false : true}
            // injectedJavaScript={INJECTEDJAVASCRIPT}
            automaticallyAdjustContentInsets={false}
            source={{html: image.content}}
          />
        </View>
      );
    });
  }

  render() {
    return (
      <MainCard>
        <Header back />
        <CardItem>
          <Swiper
            index={this.props.index}
            showsPagination={false}
            showsButtons={false}
            horizontal
            loop={false}
            bounces={false}
            removeClippedSubviews>
            {this.renderContent()}
          </Swiper>
        </CardItem>
      </MainCard>
    );
  }
}
