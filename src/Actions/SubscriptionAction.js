import {
    SUBSCRIPTION_GET_DATA,
    SUBSCRIPTION_GET_DATA_SUCCESS,
    SUBSCRIPTION_GET_DATA_FAIL,
    BUY_SUBSCRIPTION_SUCCESS,
    UPDATE_USER_SUBSCRIPTION
} from '../Actions/types';
import {
    SECRET_KEY,
    SUBSCRIPTION_URL,
    BUY_SUBSCRIPTION_URL
} from './constants';
import axios from 'axios';
import md5 from 'js-md5'
import {Linking} from 'react-native';

export const getData = (token) => {
    return (dispatch) => {

        dispatch({
            type: SUBSCRIPTION_GET_DATA
        })

        const obj = {
            "token" : token,
        };

        const data = JSON.stringify(obj);
        const signature = md5(SECRET_KEY + data)
console.log('subscription action', data, obj, signature, SUBSCRIPTION_URL);
        axios.post(SUBSCRIPTION_URL, data, {
                headers: {
                    'Signature' : signature,
                    'Content-Type': 'application/json',
                }
            }
        )
            .then(subscription => onGetDataSuccess(dispatch, subscription.data))
            .catch((error) => {
                console.log(error)
            })
    }
}

export const buySubscription = (token, type = false, number = '') => {
    return (dispatch) => {
        const car_number = number.replace( /\s/g, "");
        const url = type ? BUY_SUBSCRIPTION_URL + '&token=' + token + "&product=9" + '&car_number=' + car_number : BUY_SUBSCRIPTION_URL + '&token=' + token + '&car_number=' + car_number;
        console.log(url)       
        Linking.openURL(url);
    }
}

const onGetDataSuccess = (dispatch, subscription) => {
console.log(subscription);
   if (subscription.error == 0) {
        dispatch({
            type: SUBSCRIPTION_GET_DATA_SUCCESS,
            payload: subscription.data
        })
       dispatch({
           type: UPDATE_USER_SUBSCRIPTION,
           payload: subscription.data
       })
    } else if (subscription.error >= 1) {
        dispatch({
            type:  SUBSCRIPTION_GET_DATA_FAIL,
            payload: 'Токен неверен либо устарел. Пройдите авторизацию'
        })
    }
}

