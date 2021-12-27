import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Platform, BackHandler} from 'react-native';
import {MainCard, CardItem, Spiner, Header} from '@aaua/components/common';
import {useSelector, useDispatch} from 'react-redux';
import {getMessage} from '@aaua/actions/MessagesActions';
import {Actions} from 'react-native-router-flux';

let listener = null;

const MessageComponent = props => {
  const {messageId} = props;

  const dispatch = useDispatch();

  const {
    auth: {
      user: {token},
      messages: {message, loadingMessageInfo: loading, messageError},
    },
  } = useSelector(state => state);

  const timeConverter = UNIX_timestamp => {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + '.' + month + '.' + year + ' ' + hour + ':' + min;
    return time;
  };

  useEffect(() => {
    dispatch(getMessage(token, messageId));

    if (Platform.OS == 'android' && listener == null) {
      listener = BackHandler.addEventListener('hardwareBackPress', () => {
        if (Actions.currentScene == 'message') {
          Actions.messagesList();
          return true;
        }
      });
    }
  }, [token, messageId]);

  useEffect(() => {
    if (Platform.OS == 'android' && listener == null) {
      listener = BackHandler.addEventListener('hardwareBackPress', () => {
        if (Actions.currentScene == 'message') {
          Actions.messagesList();
          return true;
        }
      });
    }
    return () => (listener = null);
  }, []);

  // componentWillMount() {
  //   const {getMessage, token, messageId} = this.props;
  //   getMessage(token, messageId);
  // }

  // componentDidMount() {
  //   if (Platform.OS == 'android' && listener == null) {
  //     listener = BackHandler.addEventListener('hardwareBackPress', () => {
  //       if (Actions.currentScene == 'message') {
  //         Actions.messagesList();
  //         return true;
  //       }
  //     });
  //   }
  // }

  // componentWillUnmount() {
  //   listener = null;
  // }

  const renderContent = () => {
    const {titleContainer, textContainer, phoneText, textStyle, dateStyle} =
      styles;
    if (!loading) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            paddingLeft: 17,
            paddingRight: 7,
          }}>
          <View style={titleContainer}>
            <View>
              <Text style={phoneText}>Уведомление</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View>
                <Text style={dateStyle}>
                  {timeConverter(message.created_at)}
                </Text>
              </View>
            </View>
          </View>
          <View style={textContainer}>
            <Text style={textStyle}>{message.text}</Text>
          </View>
        </View>
      );
    }
    return <Spiner />;
  };

  console.log('render message');
  const {componentContainer} = styles;
  return (
    <MainCard>
      <Header back onPressBack={Actions.messagesList}>
        уведомление
      </Header>
      <CardItem style={componentContainer}>{renderContent()}</CardItem>
    </MainCard>
  );
};

const styles = {
  componentContainer: {
    marginLeft: 13,
    marginRight: 13,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  titleContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    height: 50,
  },
  phoneText: {
    fontSize: 13,
    fontFamily: 'SFUIText-Bold',
    color: '#423486',
  },
  notReaded: {
    fontSize: 10,
    fontFamily: 'SFUIText-Bold',
    color: '#1b1b1b',
  },
  textContainer: {
    // marginTop: 16,
    marginBottom: 13,
  },
  textStyle: {
    fontSize: 12,
    fontFamily: 'SFUIText-Regular',
    color: '#1b1b1b',
  },
  dateStyle: {
    fontSize: 11,
    fontFamily: 'SFUIText-Bold',
    color: '#423486',
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

// const mapStateToProps = ({auth, messages}) => {
//   console.log(messages);
//   return {
//     token: auth.user.token,
//     message: messages.message,
//     loading: messages.loadingMessageInfo,
//     messageError: messages.messageError,
//   };
// };

// export default connect(mapStateToProps, {getMessage})(MessageComponent);

export default MessageComponent;
