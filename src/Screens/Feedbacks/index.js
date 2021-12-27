import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import I18n from '@aaua/i18n';

import {
  MainCard,
  CardItem,
  ButtonRoundet,
  LabelOnInput,
  Icon,
  Header,
} from '@aaua/components/common';
import PhoneInput from '@aaua/components/common/Inputs/PhoneInput';
import TextInput from '@aaua/components/common/Inputs/TextInput';
import {showAlert} from '@aaua/components/Modals';
import {
  changeMessage,
  changeSubject,
  changePhone,
  submitUserData,
} from '@aaua/actions/FeedbackAction';
import {RATIO} from '@aaua/styles/constants';
import {DEVICE_OS, iOS, Android} from '@aaua/actions/constants';
import {feedbackPhone} from '@aaua/services/config';

import styles from './styles';

const FeedBack = () => {

  const dispatch = useDispatch();
  const {
    feedback: {feedbackSubmited},
  } = useSelector(state => state);

  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (feedbackSubmited) {
      showAlert('', I18n.t('feedback_screen.modal.message'), 'OK');
    }
  }, [feedbackSubmited]);

  const onSubmitFeedback = () => {
    if (phone.length && message) {
      const feedback = {phone, subject, message};
      dispatch(submitUserData(feedback));
    }
  };

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

  const {
    titleContainer,
    phoneText,
    phoneNumber,
    phoneContainer,
    textInputWrapper,
  } = styles;
  return (
    <MainCard>
      <Header burger goToMain={DEVICE_OS == iOS ? true : false}>
        {I18n.t('feedback_screen.header')}
      </Header>
      <CardItem style={titleContainer}>
        <View
          style={{
            marginTop: 33 * RATIO,
            marginBottom: 19 * RATIO,
          }}>
          <Text style={phoneText}>{I18n.t('feedback_screen.service_phone')}</Text>
        </View>
        <View style={phoneContainer}>
          <Icon
            style={{
              width: 30,
              height: 25,
            }}
            imageSrc={require('@aaua/images/icons/feedback_phone.png')}
          />
          <TouchableOpacity onPress={() => callNumber('tel:' + feedbackPhone)}>
            <Text style={phoneNumber}>{feedbackPhone}</Text>
          </TouchableOpacity>
        </View>
      </CardItem>
      <CardItem style={textInputWrapper}>
        <PhoneInput value={phone} onChangeText={setPhone} />
      </CardItem>
      <CardItem style={textInputWrapper}>
        <TextInput
          label={I18n.t('feedback_screen.subject.title')}
          placeholder={I18n.t('feedback_screen.subject.placeholder')}
          onChangeText={setSubject}
          value={subject}
        />
      </CardItem>
      <CardItem style={textInputWrapper}>
        <TextInput
          label={I18n.t('feedback_screen.message.title')}
          placeholder={I18n.t('feedback_screen.message.placeholder')}
          onChangeText={setMessage}
          value={message}
        />
      </CardItem>
      <CardItem
        style={{
          marginTop: 22,
        }}>
        <ButtonRoundet
          style={{
            marginRight: 83,
            marginLeft: 83,
            height: 45,
            backgroundColor: '#FFC200',
            borderColor: '#FFC200',
          }}
          textStyle={{color: '#1B1B1B'}}
          onPress={onSubmitFeedback}>
          {I18n.t('feedback_screen.send')}
        </ButtonRoundet>
      </CardItem>
    </MainCard>
  );
};

export default FeedBack;
