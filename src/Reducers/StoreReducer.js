import {
    COUNTER_CHANGE,
    BUY_GOODS
} from '../Actions/types';
import {Actions} from 'react-native-router-flux';

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case NAME_CHANGE:
            return {...state, name: action.payload};
        case CITY_CHANGE:
            return {...state, city: action.payload};
        case CAR_CHANGE:
            return {...state, car: action.payload};
        case EMAIL_CHANGE:
            return {...state, email: action.payload};
        case YEAR_CHANGE:
            return {...state, year: action.payload};
        case PASSWORD_CHANGE:
            return {...state, password: action.payload};
        case CONFIRM_PASSWORD_CHANGE:
            return {...state, confirm_password: action.payload};
        case PHONE_CHANGE:
            return {...state, phone: action.payload};
        case CODE_CHANGE:
            return {...state, code: action.payload};
        case SUBMIT_USER_DATA:
            Actions.mainScreen();
            return {...state, loading: true};
        case CHECK_ADAULT:
            return {...state, isAdault: state.isAdault ? false : true};
        case CHECK_AGRIE:
            return {...state, isAgrie: state.isAgrie ? false : true};
        case CHECK_READ:
            return {...state, isRead: state.isRead ? false : true};
        default: return state;
    }
}