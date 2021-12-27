import React, {Component} from 'react';
import {View, Text, Animated} from 'react-native';
import WebView from 'react-native-webview';
import {BASE_URL} from '../../actions/constants';

const CustomMarker = ({title, img}) => {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     opacity: new Animated.Value(0),
  //   };
  // }

  // const onNavigationChange = (event) => {
  //   console.log(event);
  // }

  // const {title, img} = this.props;
  const uri = BASE_URL + img;
  // const uri = "https://aaua.com.ua/images/discont/2018-05/74.jpg";
  console.log('---render Custom Marker ---');
  return (
    <View
      style={{
        //   flex: 1,
        //   flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 210,
        width: 210,
        //   maxWidth: 600,
      }}>
      <WebView
        style={{
          flex: 1,
          alignSelf: 'stretch',
          width: 200,
          height: 200,
          maxWidth: 600,
        }}
        javaScriptEnabled={false}
        domStorageEnabled={false}
        startInLoadingState={false}
        scalesPageToFit={false}
        scrollEnabled={true}
        source={{
          html: `<html>
                    <div style="height:300pt; width:300pt">
                        <img src="${uri}" style="
                            margin-left: auto;
                            margin-right: auto;
                            width: 48%;"/>
                    </div>
                </html>`,
        }}
      />
      <Text>{title}</Text>
    </View>
  );
};
export default CustomMarker;
