import {
    PHONE_CHANGE,
    FORGOT_PASS_SUBMIT,
    FORGOT_PASS_SUBMIT_FAIL,
    FORGOT_PASS_SUBMIT_SUCCESS
} from '../Actions/types';
import {
    SECRET_KEY,
    FORGOT_PASS_URL
} from './constants';
import axios from 'axios';
import md5 from 'js-md5'
import {Actions} from 'react-native-router-flux';

export const changePhone = (phone) => {
    return {
        type: PHONE_CHANGE,
        payload: phone
    }
}

export const sendData = (phone) => {
    return (dispatch) => {

        dispatch({
            type: FORGOT_PASS_SUBMIT
        })

        const obj = {
            "phone" : phone,
        };

        const data = JSON.stringify(obj);
        const signature = md5(SECRET_KEY + data)
console.log(data, signature, FORGOT_PASS_URL);
        axios.post(FORGOT_PASS_URL, data, {
                headers: {
                    'Signature' : signature,
                    'Content-Type': 'application/json',
                }
            }
        )
            .then(user => onSubmitSuccess(dispatch, user.data))
            .catch((error) => {
                console.log(error)
            })
    }
}

const onSubmitSuccess = (dispatch, data) => {
console.log('forgot password submit success', data);
   if (data.error == 0) {
       Actions.reset('auth')
        dispatch({
            type: FORGOT_PASS_SUBMIT_SUCCESS,
            payload: data.new_password
        })
    } else if (data.error >= 1) {
        dispatch({
            type: FORGOT_PASS_SUBMIT_FAIL,
            payload: data.errorMessage
        })
    }
}
