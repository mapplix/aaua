import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {CardItem, CardComponentTouchable, Spiner, Icon} from '@aaua/components/common';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {getMessage} from '@aaua/actions/MessagesActions';

class ListComponent extends Component {
  render() {
    const {
      componentContainer,
      titleContainer,
      textContainer,
      footerContainer,
      phoneText,
      notReaded,
      textStyle,
      dateStyle,
      readMore,
    } = styles;

    const {phone, status, date} = this.props;
    return (
      <CardItem style={componentContainer}>
        <CardComponentTouchable
          style={{
            alignItems: 'flex-start',
            paddingLeft: 17,
            paddingRight: 7,
            flex: 1,
            backgroundColor: '#fafafa',
          }}
          onPress={() =>
            Actions.message({
              messageId: this.props.id,
            })
          }>
          <View style={titleContainer}>
            <View>
              <Text style={phoneText}>{phone}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View>
                <Text style={notReaded}>
                  {this.props.viewed == 1 ? '' : 'Непрочитанное'}
                </Text>
              </View>
              <View>
                <Icon
                  style={{
                    width: 18,
                    height: 18,
                  }}
                  imageSrc={require('../../images/icons/icon_message.png')}
                />
              </View>
            </View>
          </View>
          <View style={textContainer}>
            <Text style={textStyle}>{this.props.children}</Text>
          </View>
          <View style={footerContainer}>
            <View>
              <Text style={dateStyle}>{date}</Text>
            </View>
            <View>
              <Text style={readMore}>Читать далее ></Text>
            </View>
          </View>
        </CardComponentTouchable>
      </CardItem>
    );
  }
}

const styles = {
  componentContainer: {
    marginLeft: 13,
    marginRight: 13,
    flex: 1,
    marginBottom: 11,
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  phoneText: {
    fontSize: 13,
    fontFamily: 'SFUIText-Bold',
    color: '#423486',
  },
  notReaded: {
    fontSize: 11,
    fontFamily: 'SFUIText-Bold',
    color: '#1b1b1b',
  },
  textContainer: {
    marginTop: 16,
    marginBottom: 13,
    height: 33,
  },
  textStyle: {
    fontSize: 12,
    fontFamily: 'SFUIText-Regular',
    color: '#1b1b1b',
    flex: 1,
    flexWrap: 'wrap',
  },
  dateStyle: {
    fontSize: 11,
    fontFamily: 'SFUIText-Bold',
    color: '#1b1b1b',
  },
  readMore: {
    fontSize: 11,
    fontFamily: 'SFUIText-Medium',
    color: '#423486',
  },
  footerContainer: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

export default ListComponent;
