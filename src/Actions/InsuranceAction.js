import {
    INSURANCE_CHANGE_VOLUME,
    INSURANCE_CHANGE_REGISTRATION,
    INSURANCE_CAR_CHANGE,
    INSURANCE_CAR_BRAND_CHANGE,
    INSURANCE_YEAR_CHANGE,
    ORDER_OSAGO_START,
    ORDER_KASKO_START,
} from '../Actions/types';
import {
    SECRET_KEY,
    DEVICE_OS,
} from './constants';
import axios from 'axios';
import md5 from 'js-md5'

export const changeCar = (carId) => {
    return {
        type: INSURANCE_CAR_CHANGE,
        payload: carId
    }
}

export const changeCarBrand = (brandId) => {
    return {
        type: INSURANCE_CAR_BRAND_CHANGE,
        payload: brandId
    }
}

export const changeYear = (year) => {
    return {
        type: INSURANCE_YEAR_CHANGE,
        payload: year
    }
}

export const changeVolume = (volume) => {
    return {
        type: INSURANCE_CHANGE_VOLUME,
        payload: volume
    }
}

export const changeRegistration = (registration) => {
    return {
        type: INSURANCE_CHANGE_REGISTRATION,
        payload: registration
    }
}

/*ORDER KASKO*/
export const orderKasko = (phone) => {
    return (dispatch) => {

        dispatch({
            type: ORDER_KASKO_START
        })

        // const obj = {
        //     "phone" : phone,
        // };
        //
        // const data = JSON.stringify(obj);
        // const signature = md5(SECRET_KEY + data)
        //
        // axios.post(SMS_CODE_URL, data, {
        //         headers: {
        //             'Signature' : signature,
        //             'Content-Type': 'application/json',
        //         }
        //     }
        // )
        //     .then(user => KaskoSuccess(dispatch, user.data))
        //     .catch((error) => {
        //         onSMSFail(dispatch, error)
        //     })
    }
}

const KaskoSuccess = (dispatch, response) => {
    if (response.error == 0) {
        dispatch({
            type: SEND_SMS_SUCCESS,
            payload: response
        })
    } else if (response.error >= 1) {
        dispatch({
            type: SEND_SMS_FAIL
        })
    }
}

/* ORDER OSAGO*/
export const orderOsago = (phone) => {
    return (dispatch) => {

        dispatch({
            type: ORDER_OSAGO_START
        })

        // const obj = {
        //     "phone" : phone,
        // };
        //
        // const data = JSON.stringify(obj);
        // const signature = md5(SECRET_KEY + data)
        //
        // axios.post(SMS_CODE_URL, data, {
        //         headers: {
        //             'Signature' : signature,
        //             'Content-Type': 'application/json',
        //         }
        //     }
        // )
        //     .then(user => OsagoSuccess(dispatch, user.data))
        //     .catch((error) => {
        //         onSMSFail(dispatch, error)
        //     })
    }
}

const OsagoSuccess = (dispatch, response) => {
    if (response.error == 0) {
        dispatch({
            type: SEND_SMS_SUCCESS,
            payload: response
        })
    } else if (response.error >= 1) {
        dispatch({
            type: SEND_SMS_FAIL
        })
    }
}