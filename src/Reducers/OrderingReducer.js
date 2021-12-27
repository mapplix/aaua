import {
    NP_CITES_LOADED,
    NP_SKLADS_LOADED,
    ORDER_DELIVERY_CHANGE,
    ORDER_NP_CITY_CHANGE,
    ORDER_CITY_CHANGE,
    ORDER_CHANGE_NP_SKLAD,
    ORDER_ADDRESS_CHANGE,
    ORDER_COMMENT_CHANGE,
    ORDER_PHONE_CHANGE
} from '../actions/types';

const INITIAL_STATE = {
    showCities: 'flex',
    showNPCities: 'none',
    showNPSklads: 'none',
    showAdress: 'flex',
    npCity: null,
    NPskald: null,
    NPskalds: [],
    city: null,
    delivery: 1,
    country: 'Украина',
    sklad: null,
    address: null,
    comment: null,
    phone: null
}
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ORDER_DELIVERY_CHANGE:
            if (action.payload == 2) { // Нова пошта
                return {...state,
                    showCities: 'none',
                    showNPCities: 'flex',
                    showNPSklads: 'none',
                    showAdress: 'none',
                    delivery: action.payload}
            }
            if (action.payload == 1) { // Курьер
                return {...state,
                    showCities: 'flex',
                    showNPCities: 'none',
                    showNPSklads: 'none',
                    showAdress: 'flex',
                    delivery: action.payload}
            }
        case ORDER_NP_CITY_CHANGE:
            return {
                ...state,
                showCities: 'none',
                showNPCities: 'flex',
                showNPSklads: 'flex',
                showAdress: 'none',
                npCity: action.payload
            }
        case ORDER_CITY_CHANGE:
            return {
                ...state,
                showCities: 'flex',
                showNPCities: 'none',
                showNPSklads: 'none',
                showAdress: 'flex'
            }
        case ORDER_ADDRESS_CHANGE:
            return {...state, address: action.payload}
        case ORDER_CHANGE_NP_SKLAD:
            return {...state, NPskald: action.payload}
        case ORDER_PHONE_CHANGE:
            return {...state, phone: action.payload}
        case ORDER_COMMENT_CHANGE:
            return {...state, comment: action.payload}
        default: return state;
    }
}