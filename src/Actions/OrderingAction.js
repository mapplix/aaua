import {
    ADD_CARD,
    ORDER_CARD,
    ADD_CARD_SUCCESS,
    ADD_CARD_FAIL,
    ORDER_CARD_SUCCESS,
    ORDER_CARD_FAIL,
    PHONE_CHANGE,
    ORDER_CITY_CHANGE,
    COUNTRY_CHANGE,
    ORDER_DELIVERY_CHANGE,
    ADDRESS_CHANGE,
    COMMENT_CHANGE,
    DELETE_AAUA_CARD,
    ADD_AAUA_CARD,
    CARD_NUMBER_CHANGE,
    MY_AAUA_CARD,
    MY_AAUA_CARD_LOADED,
    MY_AAUA_CARD_FAIL,
    ORDER_NP_CITY_CHANGE,
    ORDER_ADDRESS_CHANGE,
    ORDER_CHANGE_NP_SKLAD,
    ORDER_COMMENT_CHANGE
} from '../Actions/types';
import {
    SECRET_KEY,
    MY_AAUA_CARD_URL,
    ORDER_AAUA_CARD_URL,
    ADD_AAUA_CARD_URL,
    NP_CITIES_URL,
    NP_SKLADS_URL
} from './constants';
import axios from 'axios';
import md5 from 'js-md5'

export const changeDelivery = (delivery) => {
    return {
        type: ORDER_DELIVERY_CHANGE,
        payload: delivery
    }
}

export const changeCity = (city) => {
    return {
        type: ORDER_CITY_CHANGE,
        payload: city
    }
}

export const changeNPCity = (city) => {
    return {
        type: ORDER_NP_CITY_CHANGE,
        payload: city
    }
}

export const changeAddress = (address) => {
    return {
        type: ORDER_ADDRESS_CHANGE,
        payload: address
    }
}

export const changeNPSkald = (value) => {
    return {
        type: ORDER_CHANGE_NP_SKLAD,
        payload: value
    }
}

/*
export const addCard = (card) => {
console.log('add card action', card);
    return (dispatch) => {

        dispatch({
            type: ORDER_CARD
        })

        const obj = {
            "token" : card.token,
            "number" : card.number
        };

        const data = JSON.stringify(obj);
        const signature = md5(SECRET_KEY + data)
console.log(ADD_AAUA_CARD_URL, data, obj, signature);
        axios.post(ADD_AAUA_CARD_URL, data, {
                headers: {
                    'Signature' : signature,
                    'Content-Type': 'application/json',
                }
            }
        )
            .then(response => addCardSuccess(dispatch, response.data))

    }
}
*/

export const addCardSuccess = () => {
    
    return {
        type: ADD_CARD_SUCCESS,
    }
}

export const addCardFail = () => {
    return {
        type: ADD_CARD_FAIL,
    }
}

export const orderCard = (card) => {

    console.log('order card action', card);
    return (dispatch) => {

        dispatch({
            type: ORDER_CARD
        })

        const obj = {
            "token" : card.token,
            "bid" : {
                "city" : card.city,
                "delivery" : card.delivery,
                "address" : card.address,
                "address_comment" : card.address_comment,
                "phone" : card.phone
            }
        };

        const data = JSON.stringify(obj);
        const signature = md5(SECRET_KEY + data)
        console.log(ORDER_AAUA_CARD_URL, data, obj, signature);
        axios.post(ORDER_AAUA_CARD_URL, data, {
                headers: {
                    'Signature' : signature,
                    'Content-Type': 'application/json',
                }
            }
        )
            .then(response => orderCardSuccess(dispatch, response.data))

    }
}

export const orderCardSuccess = () => {
    return {
        type: ORDER_CARD_SUCCESS,
    }
}

export const orderCardFail = () => {
    return {
        type: ORDER_CARD_FAIL,
    }
}

export const submitUserData = () => {

    return {
        type: SUBMIT_USER_DATA
    }
}

export const changeComment = (text) => {

    return {
        type: ORDER_COMMENT_CHANGE,
        payload: text
    }
}

export const deleteCard = (cardId) => {
    return {
        type: DELETE_AAUA_CARD,
        payload: cardId
    }
}

export const getMyCard = (token) => {
    return (dispatch) => {

        dispatch({
            type: MY_AAUA_CARD
        })
        const obj = {
            "token" : token,
        };

        const data = JSON.stringify(obj);
        const signature = md5(SECRET_KEY + data)
console.log('my AAUA card action', obj, data, signature);
        axios.post(MY_AAUA_CARD_URL, data, {
                headers: {
                    'Signature' : signature,
                    'Content-Type': 'application/json',
                }
            }
        )
            .then(card => getCardSuccess(dispatch, card.data))
            .catch((error) => {
                console.log(error)
            })
    }
}

const getCardSuccess = (dispatch, card) => {
console.log(card);
    if (card.error == 0) {
        dispatch({
            type: MY_AAUA_CARD_LOADED,
            payload: card.data
        })
    } else if (card.error >= 1) {
        dispatch({
            type:  MY_AAUA_CARD_FAIL,
            payload: 'Токен неверен либо устарел. Пройдите авторизацию'
        })
    }
}
