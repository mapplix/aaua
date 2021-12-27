import {
  NAME_CHANGE,
  CITY_CHANGE,
  CAR_CHANGE,
  EMAIL_CHANGE,
  YEAR_CHANGE,
  PASSWORD_CHANGE,
  CONFIRM_PASSWORD_CHANGE,
  PHONE_CHANGE,
  CODE_CHANGE,
  CHECK_ADAULT,
  CHECK_AGRIE,
  CHECK_READ,
  SEND_SMS,
  SEND_SMS_SUCCESS,
  SEND_SMS_FAIL,
  SEND_STEP_1,
  STEP_1_SUCCESS,
  STEP_1_FAIL,
  SEND_STEP_2,
  STEP_2_SUCCESS,
  STEP_2_FAIL,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  CITY_SELECTED,
  CAR_SELECTED,
} from './types';
import {
  SECRET_KEY,
  DEVICE_OS,
  SMS_CODE_URL,
  REGISTER_1_URL,
  REGISTER_2_URL,
  AUTH_URL,
  MY_AAUA_CARD_URL,
  SUBSCRIPTION_URL,
  saveItem,
} from './constants';
import axios from 'axios';
import md5 from 'js-md5';

export const changeName = name => {
  return {
    type: NAME_CHANGE,
    payload: name,
  };
};

export const changeCity = title => {
  return {
    type: CITY_CHANGE,
    payload: title,
  };
};

export const selectCity = cityObj => {
  return {
    type: CITY_SELECTED,
    payload: cityObj,
  };
};

export const onChangeBrand = title => {
  return {
    type: CAR_CHANGE,
    payload: title,
  };
};

export const onSelectBrand = brandObj => {
  return {
    type: CAR_SELECTED,
    payload: brandObj,
  };
};

export const changeEmail = email => {
  return {
    type: EMAIL_CHANGE,
    payload: email,
  };
};

export const changeYear = year => {
  return {
    type: YEAR_CHANGE,
    payload: year,
  };
};

export const changePass = pass => {
  return {
    type: PASSWORD_CHANGE,
    payload: pass,
  };
};

export const changeConfirmPass = pass => {
  return {
    type: CONFIRM_PASSWORD_CHANGE,
    payload: pass,
  };
};

export const changePhone = phone => {
  return {
    type: PHONE_CHANGE,
    payload: phone,
  };
};

export const changeCode = code => {
  return {
    type: CODE_CHANGE,
    payload: code,
  };
};

export const checkAdault = () => {
  return {
    type: CHECK_ADAULT,
  };
};
export const checkAgrie = () => {
  return {
    type: CHECK_AGRIE,
  };
};
export const checkRead = () => {
  return {
    type: CHECK_READ,
  };
};

/*SEND SMS*/
export const sendSms = phone => {
  return dispatch => {
    dispatch({
      type: SEND_SMS,
    });

    const data = {
      phone: phone,
    };

    axios
      .post(SMS_CODE_URL, data)
      .then(user => onSMSSuccess(dispatch, user.data))
      .catch(error => {
        onSMSFail(dispatch, error);
      });
  };
};

const onSMSSuccess = (dispatch, response) => {
  console.log(response);
  if (response.error == 0) {
    dispatch({
      type: SEND_SMS_SUCCESS,
      payload: response.sms_code,
    });
  } else if (response.error >= 1) {
    let errorMessage = response.errorMessage;
    if (response.error == 1) {
      errorMessage = 'Ошибка регистрации';
    }
    dispatch({
      type: SEND_SMS_FAIL,
      payload: errorMessage,
    });
  }
};

/* REGISTER STEP 1*/
export const sendStep1 = userData => {
  return dispatch => {
    dispatch({
      type: SEND_STEP_1,
    });

    const data = {
      device: userData.device,
      phone: userData.phone,
      sms_code: userData.sms_code,
      x: userData.x,
      y: userData.y,
    };

    axios
      .post(REGISTER_1_URL, data)
      .then(user => onStep1Success(dispatch, user.data))
      .catch(error => {
        console.log(error);
      });
  };
};

const onStep1Success = (dispatch, data) => {
  console.log(data);
  const user = {
    token: data.token,
    username: data.username,
  };
  if (data.error == 0) {
    dispatch({
      type: STEP_1_SUCCESS,
      payload: user,
    });
  } else if (data.error >= 1) {
    dispatch({
      type: STEP_1_FAIL,
      payload: data.errorMessage,
    });
  }
};

/* REGISTER STEP 2*/
export const sendStep2 = userData => {
  return dispatch => {
    dispatch({
      type: SEND_STEP_2,
    });

    const {token, name, city_id, email, year, brand_id, password} = userData;
    const data = {
      token: token,
      name: name,
      city_id: city_id,
      email: email,
      year: year,
      brand_id: brand_id,
      password: md5(password),
    };

    axios
      .post(REGISTER_2_URL, data)
      .then(user =>
        loginUser(
          userData.phone,
          userData.password,
          userData.pushToken,
          user,
          dispatch,
        ),
      )
      .catch(error => {
        onStep2Fail(dispatch, error);
      });
  };
};

const onStep2Fail = dispatch => {
  dispatch({
    type: STEP_2_FAIL,
  });
};

/*LOGIN USER*/
const loginUser = (phone, password, pushToken, response, dispatch) => {
  console.log('login user after registration', phone, password, response);

  const data = {
    device: DEVICE_OS,
    username: phone,
    push_token: pushToken,
    password: md5(password),
  };

  axios
    .post(AUTH_URL, data)
    .then(user => {
      console.log('login success, getting aaua card', user);
      if (user.data.error == 0) {
        const data = {
          token: user.data.token,
        };

        axios.post(MY_AAUA_CARD_URL, data).then(card => {
          console.log('get card success, getting subscription', card);
          const userObject = user.data;
          userObject.card = card.data.data.card;

          const data = {
            token: userObject.token,
          };

          axios.post(SUBSCRIPTION_URL, data).then(subscription => {
            userObject.subscription = subscription.data.data;
            console.log('subscription', subscription, userObject);
            onLoginSuccess(dispatch, userObject);
          });
        });
      } else {
        console.log(user.data.error);
      }
    })
    .catch(error => {
      console.log(error);
    });
};

const onLoginSuccess = (dispatch, user) => {
  console.log('onLoginSuccess', user);

  saveItem('id_token', user.token);
  saveItem('user', JSON.stringify(user));
  if (user.error == 0) {
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: user,
    });
  }
};
