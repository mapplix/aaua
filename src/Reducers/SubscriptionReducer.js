import {
    SUBSCRIPTION_GET_DATA,
    SUBSCRIPTION_GET_DATA_SUCCESS,
    BUY_SUBSCRIPTION_SUCCESS
} from '../actions/types';
import {Actions} from 'react-native-router-flux';

const INITIAL_STATE = {
    price: 0,
  price_month: 0,
    bought_at: null,
    loading: false,
    page: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SUBSCRIPTION_GET_DATA:
            return {...state, loading: true};
        case SUBSCRIPTION_GET_DATA_SUCCESS:
            return {...state, price: action.payload.price, price_month: action.payload.price_month, bought_at: action.payload.bought_at, loading: false};
        case BUY_SUBSCRIPTION_SUCCESS:
            return {...state, page: action.payload}
        default: return state;
    }
}