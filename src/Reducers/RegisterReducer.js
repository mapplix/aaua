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
  SUBMIT_USER_DATA,
  CHECK_ADAULT,
  CHECK_AGRIE,
  CHECK_READ,
  SEND_SMS,
  SEND_SMS_FAIL,
  SEND_SMS_SUCCESS,
  SEND_STEP_1,
  STEP_1_SUCCESS,
  STEP_1_FAIL,
  SEND_STEP_2,
  STEP_2_SUCCESS,
  STEP_2_FAIL,
  CITY_SELECTED,
  CAR_SELECTED,
} from '../actions/types';
import {Actions} from 'react-native-router-flux';

const INITIAL_STATE = {
  name: '',
  cityId: null,
  city: '',
  car: '',
  carId: null,
  email: '',
  year: '',
  password: '',
  confirm_password: '',
  phone: '',
  code: '',
  isAdault: true,
  isAgrie: false,
  isRead: false,
  loading: false,
  error: false,
  token: null,
  username: null,
  isDisabled: true,
  smsError: null,
  sms: null,
  smsSended: false,
  sendingStep2: false,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NAME_CHANGE:
      return {...state, name: action.payload, smsError: false};
    case CITY_CHANGE:
      return {...state, city: action.payload, smsError: false};
    case CITY_SELECTED:
      return {
        ...state,
        cityId: action.payload.id,
        city: action.payload.title,
        smsError: false,
      };
    case CAR_CHANGE:
      return {...state, car: action.payload, smsError: false};
    case CAR_SELECTED:
      return {
        ...state,
        car: action.payload.title,
        carId: action.payload.id,
        smsError: false,
      };
    case EMAIL_CHANGE:
      return {...state, email: action.payload, smsError: false};
    case YEAR_CHANGE:
      return {...state, year: action.payload, smsError: false};
    case PASSWORD_CHANGE:
      return {...state, password: action.payload, smsError: false};
    case CONFIRM_PASSWORD_CHANGE:
      return {...state, confirm_password: action.payload, smsError: false};
    case PHONE_CHANGE:
      return {...state, phone: action.payload, smsError: false};
    case CODE_CHANGE:
      return {
        ...state,
        code: action.payload,
        sms: null,
        smsError: false,
      };
    case SUBMIT_USER_DATA:
      Actions.mainScreen();
      return {...state, loading: true, smsError: false};
    case CHECK_ADAULT:
      return {
        ...state,
        isAdault: state.isAdault ? false : true,
        smsError: false,
      };
    case CHECK_AGRIE:
      return {...state, isAgrie: state.isAgrie ? false : true, smsError: false};
    case CHECK_READ:
      return {...state, isRead: state.isRead ? false : true, smsError: false};
    case SEND_SMS:
      return {
        ...state,
        loading: true,
        error: '',
        sms: null,
        smsSended: true,
        smsError: false,
      };
    case SEND_SMS_SUCCESS:
      return {
        ...state,
        sms: action.payload,
        error: '',
        loading: false,
        isDisabled: false,
        // smsSended: false,
        smsError: false,
      };
    case SEND_SMS_FAIL:
      return {
        ...state,
        sms: null,
        smsSended: false,
        smsError: action.payload,
        loading: false,
      };
    case SEND_STEP_1:
      return {
        ...state,
        loading: true,
        error: '',
        smsSended: false,
        smsError: false,
      };
    case STEP_1_SUCCESS:
      // Actions.secondStage();
      const {phone, token, username} = action.payload;
      return {
        ...state,
        phone,
        token,
        username,
        loading: true,
        error: '',
        smsSended: false,
        smsError: false,
      };
    case STEP_1_FAIL:
      return {
        ...state,
        user: '',
        error: 'Ошибка авторизации',
        loading: false,
        smsSended: false,
        smsError: false,
      };
    case SEND_STEP_2:
      return {...state, loading: true, sendingStep2: true, error: ''};
    case STEP_2_SUCCESS:
      Actions.mainScreen();
      return {...state, error: '', loading: false, sendingStep2: false};
    case STEP_2_FAIL:
      return {
        ...state,
        token: null,
        username: null,
        error: 'Ошибка регистрации',
        loading: false,
      };
    default:
      return state;
  }
};
