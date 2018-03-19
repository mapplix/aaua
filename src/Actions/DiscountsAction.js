import {
    DISCOUNTS_LOADING_CATEGORIES,
    DISCOUNTS_LOADING_CATEGORIES_SUCCESS,
    DISCOUNTS_LOADING_CATEGORIES_FAIL,
    DISCOUNTS_LOADING_CARDS,
    DISCOUNTS_LOADING_CARDS_SUCCESS,
    DISCOUNTS_LOADING_CARDS_FAIL,
} from '../Actions/types';
import axios from 'axios';
import md5 from 'js-md5';
import {
    SECRET_KEY,
    DISCOUNTS_CATEGORIES_URL,
    DISCOUNTS_CARDS_URL
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
console.log(DISCOUNTS_CATEGORIES_URL, data, signature);
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
console.log('categoriesLoaded', categories);
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
console.log(DISCOUNTS_CARDS_URL, data, signature);
        axios.post(DISCOUNTS_CARDS_URL, data, {
                headers: {
                    'Signature' : signature,
                    'Content-Type': 'application/json',
                }
            }
        )
            .then( cards => {
console.log(cards)
                categoriesLoaded(dispatch, cards.data)
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