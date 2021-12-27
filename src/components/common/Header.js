import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Icon} from './';
import BasketIcon from './BasketIcon';

import {SvgXml} from 'react-native-svg';

import burger from '@aaua/assets/burger_icon';

class Header extends Component {
  renderLeftButton() {
    if (this.props.back) {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 25,
            paddingBottom: 15,
            // backgroundColor: '#382'
          }}
          onPress={this.props.onPressBack || Actions.pop}>
          <Icon
            style={{
              width: 18,
              height: 12,
            }}
            imageSrc={require('../../images/icons/backButton.png')}
          />
        </TouchableOpacity>
      );
    }
    if (this.props.burger) {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            paddingTop: 25,
            // paddingRight:25,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 15,
            // backgroundColor: '#382'
          }}
          onPress={Actions.drawerOpen}>
          <SvgXml xml={burger} width={25} height={25} />
        </TouchableOpacity>
      );
    }
  }

  renderRightButton() {
    if (this.props.wallet) {
      return (
        <TouchableOpacity
          style={{
            paddingTop: 25,
            paddingRight: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={Actions.drawerOpen}>
          <Icon imageSrc={require('../../images/icons/wallet_header.png')} />
        </TouchableOpacity>
      );
    }
    if (this.props.basket) {
      return <BasketIcon />;
    }

    if (this.props.goToMain) {
      return (
        <TouchableOpacity
          style={{
            // heigth: 50,
            // backgroundColor: "#189",
            paddingTop: 5,
            paddingRight: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={Actions.mainScreen}>
          <Icon imageSrc={require('../../images/icons/iconBarHome.png')} />
        </TouchableOpacity>
      );
    }

    return <View />;
  }

  render() {
    const {textStyle, viewStyle, buttonContainer} = style;
    return (
      <View style={viewStyle}>
        <View style={buttonContainer}>{this.renderLeftButton()}</View>
        <View>
          <Text style={textStyle}>
            {this.props.children ? this.props.children.toUpperCase() : ''}
          </Text>
        </View>
        <View style={buttonContainer}>{this.renderRightButton()}</View>
      </View>
    );
  }
}

const style = {
  textStyle: {
    fontFamily: 'SFUIText-Bold',
    fontSize: 13,
    color: '#1b1b1b',
    paddingBottom: 15,
  },
  buttonContainer: {
    // backgroundColor: '#9f9f96',
    width: 70,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  viewStyle: {
    elevation: 5,
    backgroundColor: '#fafafa',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 56,
    // paddingBottom: 15,
    marginBottom: 1,
    borderBottomWidth: 1,
    borderColor: '#fafafa',
    shadowColor: '#fafafa',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
  },
};

export {Header};
