import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  Linking,
  Share,
} from 'react-native';
import {checkNotifications, RESULTS} from 'react-native-permissions';
import I18n from '@aaua/i18n';

import {
  MainCard,
  CardItem,
  Header,
  Icon,
  ButtonRoundet,
} from '@aaua/components/common';

import {feedbackPhone} from '@aaua/services/config';

import styles from './styles';

const Settings = () => {
  const [pushes, setPushes] = useState(false);
  const [politics, setPolitics] = useState(true);
  const [privacy, setPrivacy] = useState(true);

  useEffect(() => {
    checkNotifications().then(response => {
      const {status} = response;

      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      const pushes = status == RESULTS.GRANTED || status == RESULTS.LIMITED;

      setPushes(pushes);
    });
  }, []);

  const callNumber = url => {
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  const shareLink = () => {
    Share.share(
      {
        message: 'https://aaua.com.ua',
        url: 'https://aaua.com.ua',
        title: 'Наше приложение',
      },
      {
        // Android only:
        dialogTitle: 'Поделиться с друзьями',
        // iOS only:
        excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter'],
      },
    );
  };

  const {
    sliderContainer,
    cardStyle,
    titleContainer,
    phoneText,
    phoneContainer,
    phoneNumber,
  } = styles;

  return (
    <MainCard>
      <Header burger>{I18n.t('settings_screen.header')}</Header>
      <CardItem style={cardStyle}>
        <View style={sliderContainer}>
          <Switch
            onValueChange={value => setPolitics(value)}
            value={politics}
          />
        </View>
        <View>
          <Text>{I18n.t('settings_screen.privacy_title')}</Text>
        </View>
      </CardItem>
      <CardItem style={cardStyle}>
        <View style={sliderContainer}>
          <Switch onValueChange={value => setPrivacy(value)} value={privacy} />
        </View>
        <Text>{I18n.t('settings_screen.politics_title')}</Text>
      </CardItem>
      <CardItem style={cardStyle}>
        <View style={sliderContainer}>
          <Switch onValueChange={value => setPushes(value)} value={pushes} />
        </View>
        <Text>{I18n.t('settings_screen.pushes_title')}</Text>
      </CardItem>
      <CardItem style={cardStyle}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
          }}
          onPress={shareLink}>
          <View style={sliderContainer}>
            <Icon imageSrc={require('@aaua/images/icons/share.png')} />
          </View>
          <Text>{I18n.t('settings_screen.share')}</Text>
        </TouchableOpacity>
      </CardItem>
      <CardItem style={titleContainer}>
        <View
          style={{
            marginTop: 33,
            marginBottom: 19,
          }}>
          <Text style={phoneText}>{I18n.t('settings_screen.phone_title')}</Text>
        </View>
        <View style={phoneContainer}>
          <Icon
            style={{
              width: 30,
              height: 25,
            }}
            imageSrc={require('@aaua/images/icons/feedback_phone.png')}
          />
          <Text style={phoneNumber}>{feedbackPhone}</Text>
        </View>
        <View
          style={{
            alignSelf: 'stretch',
            height: 45,
            marginBottom: 32,
            marginTop: 32,
          }}>
          <ButtonRoundet
            style={{
              marginRight: 83,
              marginLeft: 83,
              backgroundColor: '#FFC200',
              borderColor: '#FFC200',
            }}
            textStyle={{color: '#1B1B1B'}}
            onPress={() => callNumber('tel:' + feedbackPhone)}>
            {I18n.t('settings_screen.call')}
          </ButtonRoundet>
        </View>
      </CardItem>
    </MainCard>
  );
};

export default Settings;
