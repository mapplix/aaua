import {
    ONROAD_SEND_DATA,
    ONROAD_PHONE_CHANGE,
    ON_ROAD_LOAD_CATEGORIES,
    ON_ROAD_CATEGORIES_LOADED,
    ON_ROAD_LOAD_CATEGORY_DETAILS,
    ON_ROAD_CATEGORY_DETAILS_LOADED,
    ON_ROAD_ORDER_SUPPORT,
    ON_ROAD_SUPPORT_ORDERED_SUCCESS,
    ON_ROAD_SUPPORT_ORDERED_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
    phone: null,
    error: false,
    loading: false,
    categories: [],
    details: [],
    orderError: null,
    orderSupportMessage: null,
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ONROAD_PHONE_CHANGE:
            return {...state, phone: action.payload, orderError: null, orderSupportMessage: null};
        case ON_ROAD_LOAD_CATEGORIES:
            return {...state, loading: true, orderError: null}
        case ON_ROAD_CATEGORIES_LOADED:
            return {...state, loading: false, categories: action.payload, orderError: null}
        case ON_ROAD_LOAD_CATEGORY_DETAILS:
            return {...state, loading: true, orderError: null, orderSupportMessage: null}
        case ON_ROAD_CATEGORY_DETAILS_LOADED:
            return {...state,
                loading: false,
                details: action.payload,
                orderError: null}
        case ON_ROAD_ORDER_SUPPORT:
            return {...state, loading: true, orderError: null, orderSupportMessage: null}
        case ON_ROAD_SUPPORT_ORDERED_SUCCESS:
            return { ...state, loading: false,
                orderError: null,
                phone: null,
                orderSupportMessage: 'Ваш запрос отправлен'}
        case ON_ROAD_SUPPORT_ORDERED_FAIL:
            return { ...state,
                loading: false,
                orderError: action.payload}
        default: return state;
    }
}