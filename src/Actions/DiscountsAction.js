import {
    DISCOUNTS_LOADING_CATEGORIES,
    DISCOUNTS_LOADING_CATEGORIES_SUCCESS,
    DISCOUNTS_LOADING_CATEGORIES_FAIL,
    DISCOUNTS_LOADING_CARDS,
    DISCOUNTS_LOADING_CARDS_SUCCESS,
    DISCOUNTS_LOADING_CARDS_FAIL,
    SELECT_DISCOUNT_CARD,
    DISCOUNT_PLACES_LOADED
} from '../Actions/types';
import axios from 'axios';
import md5 from 'js-md5';
import {
    SECRET_KEY,
    DISCOUNTS_CATEGORIES_URL,
    DISCOUNTS_CARDS_URL,
    DISCOUNTS_PLACES_URL
} from './constants'
import {Actions} from 'react-native-router-flux';

export const loadCategories = (token) => {
    return (dispatch) => {
        dispatch({
            type:DISCOUNTS_LOADING_CATEGORIES
        })

        const obj = {
            "token" : token,
        };

        const data = JSON.stringify(obj);
        const signature = md5(SECRET_KEY + data)
        axios.post(DISCOUNTS_CATEGORIES_URL, data, {
                headers: {
                    'Signature' : signature,
                    'Content-Type': 'application/json',
                }
            }
        )
        .then(categories => {
            categoriesLoaded(dispatch, categories.data)
        })
    }
}

const categoriesLoaded = (dispatch, categories) => {
    if (categories.error == 0) {
        let categoriesAraay = [];
        for (var category in categories.data) {
            categoriesAraay.push({
                id : categories.data[category].id,
                title : categories.data[category].title
            })
        }

        dispatch ({
            type: DISCOUNTS_LOADING_CATEGORIES_SUCCESS,
            payload: categoriesAraay
        })
    } else {
        dispatch ({
            type: DISCOUNTS_LOADING_CATEGORIES_FAIL,
            payload: categories.error
        })
    }
}

export const loadCards = (token) => {
    return (dispatch) => {

        dispatch({
            type:DISCOUNTS_LOADING_CARDS
        })

        const obj = {
            "token" : token,
        };

        const data = JSON.stringify(obj);
        const signature = md5(SECRET_KEY + data)
        axios.post(DISCOUNTS_CARDS_URL, data, {
                headers: {
                    'Signature' : signature,
                    'Content-Type': 'application/json',
                }
            }
        )
            .then( cards => {
                cardsLoaded(dispatch, cards.data)
            })
    }
}

const cardsLoaded = (dispatch, cards) => {
    if (cards.error == 0) {
        dispatch ({
            type: DISCOUNTS_LOADING_CARDS_SUCCESS,
            payload: cards.data
        })
    } else {
        dispatch ({
            type: DISCOUNTS_LOADING_CARDS_FAIL,
            payload: cards.error
        })
    }
}

export const selectCard = (card) => {
    return {
        type: SELECT_DISCOUNT_CARD,
        payload: card
    }
}

export const selectCategory = (token, category) => {
    return (dispatch) => {

        dispatch({
            type:DISCOUNTS_LOADING_CATEGORIES
        })

        const obj = {
            "token" : token,
            "parent" : category.id
        };

        const data = JSON.stringify(obj);
        const signature = md5(SECRET_KEY + data)
        axios.post(DISCOUNTS_PLACES_URL, data, {
                headers: {
                    'Signature' : signature,
                    'Content-Type': 'application/json',
                }
            }
        )
            .then( places => {
                placesLoaded(dispatch, places.data, category)
            })
    }
}

const placesLoaded = (dispatch, places, category) => {
    dispatch({
        type: DISCOUNT_PLACES_LOADED,
        payload: places.data || [],
        selectedCategory: category
    })
}