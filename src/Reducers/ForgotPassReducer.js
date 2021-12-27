import {
    PHONE_CHANGE,
    FORGOT_PASS_SUBMIT,
    FORGOT_PASS_SUBMIT_FAIL,
    FORGOT_PASS_SUBMIT_SUCCESS
} from '../actions/types';
import {Actions} from 'react-native-router-flux';

const INITIAL_STATE = {
    phone: '',
    error: '',
    newPass: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case PHONE_CHANGE:
            return {...state, phone: action.payload, newPass: null};
        case FORGOT_PASS_SUBMIT:
            return state;
        case FORGOT_PASS_SUBMIT_SUCCESS:
            // Actions.login()
            return {...state, newPass: action.payload};
        case FORGOT_PASS_SUBMIT:
            return {...state, error: action.payload, newPass: null};
        default: return state;
    }
}