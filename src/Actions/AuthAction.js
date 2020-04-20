import {
    PHONE_CHANGE,
    PASSWORD_CHANGE,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGOUT,
    TOKEN_GET_SUCCESS,
    UPDATE_STATUS_SUCCESS
} from '../Actions/types';
import axios from 'axios';
import md5 from 'js-md5';
import {
    SECRET_KEY,
    DEVICE_OS,
    AUTH_URL,
    MY_AAUA_CARD_URL,
    SUBSCRIPTION_URL,
    saveItem,
    getToken,
    removeItem
} from './constants';
import {AsyncStorage, Platform, Alert} from 'react-native';
import Querystring from 'querystring';


export const changePass = (pass) => {
    return {
        type: PASSWORD_CHANGE,
        payload: pass
    }
}

export const changePhone = (phone) => {
    return {
        type: PHONE_CHANGE,
        payload: phone
    }
}

export const getPushToken = () => {
    return (dispatch) => {
        let token = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);;
//         FCM.requestPermissions()
//             .then(
//                 () => console.log('granted')
//             )
//             .catch(
//                 () => console.log('notification permission rejected')
//             );
//
//         FCM.getFCMToken().then(token => {
// console.log('getFCMToken', token);
//             dispatch({
//                 type: TOKEN_GET_SUCCESS,
//                 payload: token
//             })
//             // store fcm token in your server
//         })
//         FCM.on(FCMEvent.RefreshToken, (token) => {
// console.log('RefreshToken', token)
//             dispatch({
//                 type: TOKEN_GET_SUCCESS,
//                 payload: token
//             })
//             // fcm token may not be available on first load, catch it here
//         });
        dispatch({
            type: TOKEN_GET_SUCCESS,
            payload: "token"
        })
    }
}

/*LOGIN USER*/
export const loginUser = (phone, password, fireBaseToken) => {

    return (dispatch) => {

        dispatch({
            type: LOGIN_USER
        })

        const obj = {
            "device" : DEVICE_OS,
            "username" : phone,
            "push_token" : fireBaseToken,
            "password" : md5(password),
        };

        const data = JSON.stringify(obj);
        const signature = md5(SECRET_KEY + data)
console.log(AUTH_URL, data, signature);
        axios.post(AUTH_URL, data, {
                headers: {
                    'Signature' : signature,
                    'Content-Type': 'application/json',
                }
            }
        )
            .then( user => {
console.log(user.data);
                if (user.data.error == 0) {
                    const data = JSON.stringify(
                        {
                            "token" : user.data.token
                        });
                    const signature = md5(SECRET_KEY + data)
console.log(MY_AAUA_CARD_URL, data, signature);
                    axios.post(MY_AAUA_CARD_URL, data, {
                            headers: {
                                'Signature' : signature,
                                'Content-Type': 'application/json',
                            }
                        }
                    ).then( card => {
                        const userObject = {...user.data};
                        userObject.card = card.data.data.card;

                        const data = JSON.stringify(
                            {
                                "token" : userObject.token
                            });
                        const signature = md5(SECRET_KEY + data)
console.log(SUBSCRIPTION_URL, data, signature);
                        axios.post(SUBSCRIPTION_URL, data, {
                            headers: {
                                'Signature' : signature,
                                'Content-Type': 'application/json',
                            }
                        })
                            .then((subscription) => {
                                userObject.status = subscription.data.data.bought_at != null ? 'active' : 'inactive';
console.log('subscription', subscription, userObject);
                                onLoginSuccess(dispatch, userObject)
                            })

                    })
                } else {
                    dispatch({
                        type: LOGIN_USER_FAIL,
                        payload: 'Неверный логин или пароль'
                    })
                }

            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const setUserFromSession = (user) => {
    return (dispatch) => {
        const data = JSON.stringify(
            {
                "token": user.token
            });
        const signature = md5(SECRET_KEY + data)
        axios.post(SUBSCRIPTION_URL, data, {
            headers: {
                'Signature': signature,
                'Content-Type': 'application/json',
            }
        })
            .then((subscription) => {
                const status = subscription.data.data.bought_at != null ? 'active' : 'inactive';
                user.status = status;
                setUserFromSessionSucces(dispatch, user)
            })
    }
}

const setUserFromSessionSucces = (dispatch, user) => {
    console.log(user)
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    })
}

const onLoginSuccess = (dispatch, user) => {

console.log('id_token', user);

saveItem('id_token', user.token);
saveItem('user', JSON.stringify(user))
    .then(response => {
        if (user.error == 0) {
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: user
            })
        } else if (user.error >= 1) {
            dispatch({
                type: LOGIN_USER_FAIL,
                payload: 'Неверный логин или пароль'
            })
        }
    });
}

export const logOut = (token) => {
// removeItem('id_token');
// removeItem('user');
// removeItem('sliderImages')
// removeItem('NPcities');
// removeItem('cities');
    AsyncStorage.clear();
    return {
        type: LOGOUT,
    }
}

