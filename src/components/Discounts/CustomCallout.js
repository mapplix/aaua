import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import WebView from 'react-native-webview';

import {StyleSheet, View, Image, Text} from 'react-native';
import {Spiner} from '@aaua/components/common';

const propTypes = {
  // children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

const CustomCallout = ({uri, style}) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (uri) {
      setImage(uri);
    }
  }, [uri]);

  const htmlWrapper = `<html>
  <head>
    <style>
      body {
        margin: 0px;
        padding: 0px;
        width: 200px;
      }
      img {
        width: 60vw;
        height: 60vh;
        display: block;
        // margin-left: auto;
        // margin-right: auto;
        // width: 50%;
}
      
    </style>
  </head>
  <body>
    <img
      src=${image}
    />
  </body>
</html>`;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.bubble}>
        <Image
          source={{uri: uri}}
          resizeMode={'stretch'}
          style={{
            flex: 1,
            resizeMode: 'cover', // or 'stretch'
            backgroundColor: '#e8e8e8',
          }}
        />
      </View>
      <View style={styles.arrow} />
      <View style={styles.arrowPoint} />
    </View>
  );
};

CustomCallout.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    width: 50,
    height: 50,
    borderRadius: 40,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 5,
    overflow: 'hidden',
  },
  amount: {
    flex: 1,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 12,
    borderColor: 'transparent',
    borderTopColor: '#fff',
    alignSelf: 'center',
    marginTop: -2,
    zIndex: 100,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 12,
    borderColor: 'transparent',
    borderTopColor: '#fff',
    alignSelf: 'center',
    marginTop: -3.5,
  },
  arrowPoint: {
    backgroundColor: '#f72a2a',
    // borderWidth: 4,
    borderRadius: 6,
    width: 12,
    height: 12,
    marginLeft: 19,
    marginTop: -17,
  },
});

export default CustomCallout;
