import {
    INVITE_FRIEND_CHANGE_PHONE,
    INVITE_SENDED_SUCCESS,
    INVITE_SENDED_FAIL
} from '../actions/types';
import {Actions} from 'react-native-router-flux';

const INITIAL_STATE = {
    phone: '',
    loading: false,
    error: null,
}
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case INVITE_FRIEND_CHANGE_PHONE:
            return {...state, phone: action.payload};
        case INVITE_SENDED_SUCCESS:
            Actions.login();
            return {...state, phone: '', error: null};
        case INVITE_SENDED_FAIL:
            return {...state, error: action.payload};
        default: return state;
    }
}