import {
    INVITE_FRIEND_CHANGE_PHONE,
    INVITE_SENDED_SUCCESS,
    INVITE_SENDED_FAIL
} from './types';
import {
    SECRET_KEY,
    INVITE_FRIEND_URL,
} from './constants';
import axios from 'axios';
import md5 from 'js-md5'


export const changePhone = (phone) => {
    return {
        type: INVITE_FRIEND_CHANGE_PHONE,
        payload: phone
    }
}

export const sendInvitation = (emailPhone) => {
    return (dispatch) => {
        var email = '';
        var phone = '';
        if (emailPhone.includes('@')) {
            email = emailPhone
        } else {
            phone = emailPhone;
            if (!['+'].includes(phone.slice(0))) {
                if (!['38'].includes(phone.slice(0, 1))) {
                    phone = '+38'+emailPhone;
                }
            }
        }

        const obj = {
            "phone" : phone,
            "email" : email
        }

        const data = JSON.stringify(obj);
        const signature = md5(SECRET_KEY + data)

console.log(INVITE_FRIEND_URL, data, obj, signature);

        axios.post(INVITE_FRIEND_URL, data, {
                headers: {
                    'Signature': signature,
                    'Content-Type': 'application/json',
                }
            }
        )
            .then(response => {
                onInviteSended(dispatch, response.data)
            })
            .catch( error => {
                console.log(error)
            })
    }
}

const onInviteSended = (dispatch, response) => {
    if (response.error == 0) {
        dispatch({
            type: INVITE_SENDED_SUCCESS,
        })
    } else {
        let errorMsg = '';
        if (response.error <= 2) {
            errorMsg = 'Произошла ошибка, пожалуйста пройдите авторизацию'
        }
        if (response.error == 3) {
            errorMsg = 'Не передан phone или email'
        }
        if (response.error == 4) {
            errorMsg = 'Такой пользователь уже зарегистрирован'
        }
        dispatch({
            type: INVITE_SENDED_FAIL,
            payload: errorMsg
        })
    }
}