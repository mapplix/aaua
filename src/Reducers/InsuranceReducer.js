import {
    INSURANCE_CHANGE_VOLUME,
    INSURANCE_CHANGE_REGISTRATION,
    INSURANCE_CAR_CHANGE,
    INSURANCE_CAR_BRAND_CHANGE,
    INSURANCE_YEAR_CHANGE,
    INSURANCE_CAR_BRAND_SELECT,
    INSURANCE_CHANGE_OSAGO_CITY,
    INSURANCE_SELECT_OSAGO_CITY,
    MODELS_LOADED_SUCCESS,
    SELECT_CAR_MODEL,
    KASKO_ORDER_SUCCESS,
    KASKO_LOAD_CAR_TYPES_SUCCESS,
    CALCULATE_OSAGO_START,
    CALCULATE_OSAGO_SUCCESS,
    OSAGO_ORDER_SUCCESS,
    OSAGO_ORDER_FAIL,
    RESET_INSURANCE_DATA
} from '../actions/types';

const INITIAL_STATE = {
    volume: null,
    registration: null,
    car: 1,
    carBrand: '',
    carBrandId: null,
    year: '',
    osagoCity: 'Київ',
    osagoCityId: 181,
    carModels: [],
    carModel: '',
    carTypes: [],
    osagoOrderSuccess: false,
    kaskoOrderSuccess: false,
    osagoPriceLoading: false,
    osagoPrice: 0
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case INSURANCE_CHANGE_VOLUME:
            return {...state, volume: action.payload};
        case INSURANCE_CHANGE_REGISTRATION:
            return {...state, registration: action.payload};
        case INSURANCE_CAR_CHANGE:
            return {...state, car: action.payload};
        case INSURANCE_CAR_BRAND_CHANGE:
            return {...state, carBrand: action.payload};
        case INSURANCE_CAR_BRAND_SELECT:
            return {...state, carBrandId: action.payload.id, carBrand: action.payload.title, carModel: null}
        case INSURANCE_YEAR_CHANGE:
            return {...state, year: action.payload};
        case INSURANCE_CHANGE_OSAGO_CITY:
            return {...state, osagoCity: action.payload}
        case INSURANCE_SELECT_OSAGO_CITY:
            return {...state, osagoCityId: action.payload.id, osagoCity: action.payload.title}
        case MODELS_LOADED_SUCCESS:
            return {...state, carModels: action.payload}
        case SELECT_CAR_MODEL:
            return {...state, carModel: action.payload}
        case KASKO_ORDER_SUCCESS:
            return {
                ...state,
                kaskoOrderSuccess: true,
                carBrand: '',
                carBrandId: null,
                year: '',
                carModels: [],
                carModel: '',
            }
        case CALCULATE_OSAGO_START:
            return {...state, osagoPriceLoading: true, osagoPrice: 0}
        case CALCULATE_OSAGO_SUCCESS:
            return {...state, osagoPriceLoading: false, osagoPrice: action.payload}
        case OSAGO_ORDER_SUCCESS:
            return {
                ...state,
                osagoOrderSuccess: true,
                volume: null,
                registration: null,
                osagoPrice: 0
            }
        case OSAGO_ORDER_FAIL:
            return {...state, osagoOrderSuccess: false}
        case RESET_INSURANCE_DATA:
            return {...state,
                osagoOrderSuccess: false,
                kaskoOrderSuccess: false,
                osagoPrice: 0,
                registration: null,
                // osagoCity: '',
                // osagoCityId: null,
                volume: null
            }
        default: return state;
    }
}