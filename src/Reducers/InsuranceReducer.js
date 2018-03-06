import {
    INSURANCE_CHANGE_VOLUME,
    INSURANCE_CHANGE_REGISTRATION,
    INSURANCE_CAR_CHANGE,
    INSURANCE_CAR_BRAND_CHANGE,
    INSURANCE_YEAR_CHANGE,
} from '../Actions/types';

const INITIAL_STATE = {
    volume: null,
    registration: 1515546,
    car: 1,
    carBrand: 1,
    year: ''
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
        case INSURANCE_YEAR_CHANGE:
            return {...state, year: action.payload};
        default: return state;
    }
}