import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Linking,
  Platform,
  Alert,
} from 'react-native';
import axios from 'axios';
import {connect, useSelector, useDispatch} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import QRcode from 'react-native-qrcode-svg';
import styles from './styles';
// import DeviceBrightness from "react-native-device-brightness";

import I18n from '@aaua/i18n';

import {MainCard, CardItem, ButtonRoundet} from '@aaua/components/common';
import {WIDTH, RATIO, WIDTH_RATIO} from '@aaua/styles/constants';
import {SECRET_KEY, ACTIVATION_URL} from '@aaua/actions/constants';

const QRcodeComponent = () => {
  const {
    AAUA_Card: {myCards: card, QrError},

    auth: {
      user: {token},
    },
  } = useSelector(state => state);

  const [sendRequest, setSendRequest] = useState(false);
  const [luminous, setLuminous] = useState(0.5);

  const openUrl = url => {
    // let url = 'https://wog.ua/ua/registration/';
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  const dialCall = () => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = 'tel:0800300525';
    } else {
      phoneNumber = 'telprompt:0800300525';
    }

    openUrl(phoneNumber);
  };

  const activationRequest = () => {
    const data = {
      token: token,
    };
    // const signature = md5(SECRET_KEY + data);
    axios.post(ACTIVATION_URL, data).then(response => {
      Alert.alert('', I18n.t('fuel_screen.qr_code.modal.requested'));
      setSendRequest(true);
    });
  };

  const {container, text, closeButtonContainer, closeButton} = styles;

  const renderQr = () => {
    console.log('RENDER QR WIDTH', WIDTH);

    const qrWidth = WIDTH < 350 ? WIDTH - 20 : 500;

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'orange',
        }}>
        <View
          style={{
            borderColor: '#ffc200',
            borderWidth: 5,
          }}>
          <QRcode
            value={card.qr.QRCode}
            size={WIDTH * 0.6}
            color="#000"
            backgroundColor="white"
          />
        </View>
      </View>
    );
  };

  const renderError = () => {
    const {container, text} = styles;
    // const {card, QrError} = this.props;
    // const {sendRequest} = this.state;

    let errorMessage = I18n.t('fuel_screen.qr_code.errors.wrong_token');
    if (QrError == 2) {
      errorMessage = I18n.t('fuel_screen.qr_code.errors.wrong_code');
    } else if (QrError == 3) {
      errorMessage = I18n.t('fuel_screen.qr_code.errors.unknown_card');
    } else if (QrError == 12) {
      errorMessage = I18n.t('fuel_screen.qr_code.errors.wrong_phone');
    } else if (QrError == 59) {
      errorMessage = I18n.t('fuel_screen.qr_code.errors.card_is_blocked');
    }
    return (
      <View
        style={{
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CardItem
          style={{
            backgroundColor: '#FFF',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 0,
            paddingBottom: 50,
          }}>
          <Text
            style={[
              text,
              {
                fontSize: 20,
                color: '#db1924',
                marginHorizontal: 15,
              },
            ]}>
            {errorMessage}
          </Text>
          <Text style={[text, {marginTop: 15, marginHorizontal: 15}]}>
            {I18n.t('fuel_screen.qr_code.message')}
          </Text>
        </CardItem>
        <View>
          <Text style={[text, {fontSize: 22}]}>{card.card}</Text>
        </View>
        <View
          style={{
            paddingTop: 30,
            // backgroundColor: '#158',
            width: WIDTH * 0.8,
          }}>
          <Text
            style={[
              text,
              {
                fontSize: 16,
              },
            ]}>
            {I18n.t('fuel_screen.qr_code.this_is_your_card_text')}{' '}
            <Text
              style={{color: 'blue'}}
              onPress={() => openUrl('https://wog.ua/ua/registration/')}>
              https://wog.ua/ua/registration/{' '}
            </Text>
            {I18n.t('fuel_screen.qr_code.or_call')}{' '}
            <Text style={{color: 'blue'}} onPress={dialCall}>
              0800 300 525
            </Text>
          </Text>

          <View style={styles.buttonContainer}>
            {sendRequest === false ? (
              <ButtonRoundet
                style={styles.buttonStyle}
                textStyle={{color: '#fff'}}
                onPress={activationRequest}>
                {I18n.t('fuel_screen.qr_code.activation_request')}
              </ButtonRoundet>
            ) : (
              <Text style={styles.text}>
                {I18n.t('fuel_screen.qr_code.activation_requested')}
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <MainCard style={container}>
      <View style={closeButtonContainer}>
        <TouchableOpacity onPress={Actions.select_azs}>
          <Text style={closeButton}>X</Text>
        </TouchableOpacity>
      </View>
      <>{card.qr == null || QrError !== null ? renderError() : renderQr()}</>
    </MainCard>
  );
  // return card.qr == null || QrError !== null ? renderError() : renderQr();
};

export default QRcodeComponent;
