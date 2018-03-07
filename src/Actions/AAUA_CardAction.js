import {
    ADD_CARD,
    ORDER_CARD,
    ADD_CARD_SUCCESS,
    ADD_CARD_FAIL,
    ORDER_AAUA_CARD_SUCCESS,
    ORDER_AAUA_CARD_FAIL,
    PHONE_CHANGE,
    CITY_CHANGE,
    NP_CITY_CHANGE,
    COUNTRY_CHANGE,
    DELIVERY_CHANGE,
    ADDRESS_CHANGE,
    COMMENT_CHANGE,
    DELETE_AAUA_CARD,
    ADD_AAUA_CARD,
    CARD_NUMBER_CHANGE,
    MY_AAUA_CARD,
    AAUA_CARD_NUMBER_CHANGE,
    MY_AAUA_CARD_LOADED,
    MY_AAUA_CARD_FAIL,
    AAUA_ORDERING_CHANGE_PHONE,
    CHANGE_NP_SKLAD
} from '../Actions/types';
import {
    SECRET_KEY,
    MY_AAUA_CARD_URL,
    ORDER_AAUA_CARD_URL,
    ADD_AAUA_CARD_URL
} from './constants';
import axios from 'axios';
import md5 from 'js-md5'

export const changeDelivery = (delivery) => {
    return {
        type: DELIVERY_CHANGE,
        payload: delivery
    }
}

export const changeCity = (city) => {
    return {
        type: CITY_CHANGE,
        payload: city
    }
}

export const changeNPCity = (city) => {
    return {
        type: NP_CITY_CHANGE,
        payload: city
    }
}

export const changeAddress = (address) => {
    return {
        type: ADDRESS_CHANGE,
        payload: address
    }
}

export const changeNPSkald = (value) => {
    return {
        type: CHANGE_NP_SKLAD,
        payload: value
    }
}

export const changeCardNumber = (text) => {
    return {
        type: AAUA_CARD_NUMBER_CHANGE,
        payload: text
    }
}

export const changePhone = (phone) => {
    return {
        type: AAUA_ORDERING_CHANGE_PHONE,
        payload: phone
    }
}

export const addCard = (card) => {

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
console.log(ADD_AAUA_CARD_URL, data, signature);
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

export const addCardSuccess = (dispatch, response) => {
console.log(response)
    if (response.error == 0) {
        dispatch({
            type: ADD_CARD_SUCCESS,
        })
    } else {
        var errorMsg = 'Произошла ошибка, попробуйте позже'
        if (response.error == 2) {
            errorMsg = 'Данные устарели. Пройдите авторизацию'
        }
        if (response.error == 3) {
            errorMsg = 'Не передана карта'
        }
        if (response.error == 4) {
            errorMsg = 'Карта в базе не найдена'
        }
        dispatch({
            type: ADD_CARD_FAIL,
            payload: errorMsg
        })
    }

}

export const orderCard = (card) => {

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
                "address_comment" : card.comment,
                "phone" : card.phone
            }
        };

        const data = JSON.stringify(card);
        const signature = md5(SECRET_KEY + data)
console.log(ORDER_AAUA_CARD_URL,card, data, signature)
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

export const orderCardSuccess = (dispatch, data) => {
console.log('orderCardSuccess', data, data.error == 0);
    if (data.error == 0) {
        dispatch ({
            type: ORDER_AAUA_CARD_SUCCESS,
        })
    } else {
        dispatch ({
            type: ORDER_AAUA_CARD_FAIL,
            payload: 'Заявка не прошла валидацию'
        })
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
            payload: card.data.card
        })
    } else if (card.error >= 1) {
        dispatch({
            type:  MY_AAUA_CARD_FAIL,
            payload: 'Токен неверен либо устарел. Пройдите авторизацию'
        })
    }
}

export const changeComment = (text) => {

    return {
        type: COMMENT_CHANGE,
        payload: text
    }
}
