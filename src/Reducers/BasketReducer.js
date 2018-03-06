import {
    COUNTER_CHANGE,
    BUY_GOODS
} from '../Actions/types';
import {Actions} from 'react-native-router-flux';

const INITIAL_STATE = {
    goods: [],
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case BUY_GOODS:
            return {...state, goods: []};
        default: return state;
    }
}