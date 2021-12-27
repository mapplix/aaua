import {
  PHONE_CHANGE,
  PASSWORD_CHANGE,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT,
  UPDATE_USER_SUBSCRIPTION,
  UPDATE_USER_STATUS,
  TOKEN_GET_SUCCESS,
  UPDATE_STATUS_SUCCESS,
} from '../actions/types';
import {Actions} from 'react-native-router-flux';

const INITIAL_STATE = {
  // phone: '+380968266485',
  // password: 'xjHPV',
  phone: '',
  password: '',
  sms: '',
  error: false,
  loading: false,
  user: null,
  loginError: false,
  pushToken: null,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PHONE_CHANGE:
      return {...state, loginError: false, phone: action.payload};
    case PASSWORD_CHANGE:
      return {...state, loginError: false, password: action.payload};
    // case LOGIN_USER:
    //   return {...state, loading: true};
    case TOKEN_GET_SUCCESS:
      console.log(TOKEN_GET_SUCCESS, action.payload);
      return {...state, pushToken: action.payload};
    case LOGIN_USER_SUCCESS:
      // Actions.reset('drawer');
      console.log('LOGIN_USER_SUCCESS', action.payload);
      return {...state, user: action.payload, error: '', loading: false};
    case LOGIN_USER_FAIL:
      return {
        ...state,
        password: '',
        loginError: action.payload,
        loading: false,
      };
    case LOGOUT:
      // Actions.reset('auth');
      return {...state, user: null, loginError: false, loading: false};
    case UPDATE_USER_SUBSCRIPTION:
      const user = {...state.user, subscription: action.payload};
      return {...state, user: user};
    case UPDATE_STATUS_SUCCESS: {
      const user = {...state.user, status: action.payload};
      return {...state, user: user};
    }
    default:
      return state;
  }
};
