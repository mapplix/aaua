import axios from '@aaua/axios';

import {
  REGISTER_1_URL,
  SMS_CODE_URL,
  CHECK_CODE_URL,
  CHECK_PHONE_NUMBER,
  AUTH_URL,
  MY_AAUA_CARD_URL,
  SUBSCRIPTION_URL,
  DEVICE_OS,
} from '@aaua/actions/constants';

import md5 from 'js-md5';

class Authentication {
  loginUser = async (phone, push_token, password) => {

    const obj = {
      device: DEVICE_OS,
      username: phone,
      push_token,
      password: md5(password),
    };

    /*Get User Profile*/
    const userProfile = await axios.post(AUTH_URL, obj);
    const profile = userProfile.data;

    if (profile.error === 0) {
      const userToken = {
        token: profile.token,
      };
      /*Get user's cards*/
      const userCardResponse = await axios.post(MY_AAUA_CARD_URL, userToken);

      const card = userCardResponse.data;
      const userObject = {...profile};

      /*Get user's subscriptions*/
      const subscription = await axios.post(SUBSCRIPTION_URL, userToken);

      userObject.card = card.data.card;
      userObject.status =
        subscription.data.data.bought_at != null ? 'active' : 'inactive';

      return userObject;
    } else {
      return {error: 'Невірний логін або пароль'};
    }
  }

  sendStep1Data = async userData => {
    const response = await axios.post(REGISTER_1_URL, userData);

    return response.data;
  };

  sendSms = async phone => {
    const response = await axios.post(SMS_CODE_URL, {phone: phone});

    return response.data;
  };

  checkPhoneNumber = async phone => {
    const data = {
      phone: phone,
    };
    const response = await axios.post(CHECK_PHONE_NUMBER, data);

    return response.data;
  };

  checkSmsCode = async (phone, code) => {
    const data = {
      phone,
      sms_code: code,
    };
    const response = await axios.post(CHECK_CODE_URL, data);

    return response.data;
  };
}

const authentication = new Authentication();
export default authentication;
