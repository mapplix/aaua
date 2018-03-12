import {
    DISCOUNTS_LOADING_CATEGORIES,
    DISCOUNTS_LOADING_CATEGORIES_SUCCESS,
    DISCOUNTS_LOADING_CATEGORIES_FAIL,
    DISCOUNTS_LOADING_CARDS,
    DISCOUNTS_LOADING_CARDS_SUCCESS,
    DISCOUNTS_LOADING_CARDS_FAIL,
} from '../Actions/types';

const INITIAL_STATE = {
    loadingCategories: false,
    loadingCards: false,
    categories: [],
    discountsCards: []
}
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case DISCOUNTS_LOADING_CATEGORIES:
            return {...state, loadingCategories: true};
        case DISCOUNTS_LOADING_CATEGORIES_SUCCESS:
            return {...state, loadingCategories: false, categories: action.payload};
        case DISCOUNTS_LOADING_CATEGORIES_FAIL:
            return {...state, loadingCategories: false};
        case DISCOUNTS_LOADING_CARDS:
            return {...state, loadingCards: true};
        case DISCOUNTS_LOADING_CARDS_SUCCESS:
            return {...state, loadingCards: false, discountsCards: action.payload};
        case DISCOUNTS_LOADING_CARDS_FAIL:
            return {...state, loadingCards: false};
        default: return state;
    }
}