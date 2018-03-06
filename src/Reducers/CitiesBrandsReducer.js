import {
    BRANDS_LOADED,
    CITIES_LOADED,
    NP_CITES_LOADED,
    NP_SKLADS_LOADED,
    IMAGES_LOADED
} from '../Actions/types';

const INITIAL_STATE = {
    cities: [],
    brands: [],
    NPcities: [],
    NPsklads: [],
    sliderImages: []
}
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case BRANDS_LOADED:
            return {...state, brands: action.payload};
        case CITIES_LOADED:
            return {...state, cities: action.payload};
        case NP_CITES_LOADED:
            return {...state, NPcities: action.payload};
        case NP_SKLADS_LOADED:
            return {...state, NPsklads: action.payload};
        case IMAGES_LOADED:
            return {...state, sliderImages: action.payload};
        default: return state;
    }
}