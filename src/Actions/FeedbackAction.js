import {
    FEEDBACK_MESSAGE_CHANGE,
    FEEDBACK_SUBJECT_CHANGE,
    FEEDBACK_PHONE_CHANGE,
    FEEDBACK_SUBMIT_USER_DATA
} from './types';
import axios from 'axios';
import md5 from 'js-md5';
import {
    SECRET_KEY,
    DEVICE_OS,
    FEEDBACK_URL
} from './constants';

export const changeMessage = (msg) => {
    return {
        type: FEEDBACK_MESSAGE_CHANGE,
        payload: msg
    }
}

export const changeSubject = (subject) => {
    return {
        type: FEEDBACK_SUBJECT_CHANGE,
        payload: subject
    }
}

export const changePhone = (phone) => {
    return {
        type: FEEDBACK_PHONE_CHANGE,
        payload: phone
    }
}

export const submitUserData = (feedback) => {
    return (dispatch) => {

        dispatch({
            type: FEEDBACK_SUBMIT_USER_DATA
        })

        const obj = {
            "phone" : feedback.phone,
            "subject" : feedback.subject,
            "text" : feedback.text
        };

        // const obj = {
        //     "device" : DEVICE_OS,
        //     "username" : "+380968266485",
        //     "password" : md5('123456'),
        // };

        const data = JSON.stringify(obj);
        const signature = md5(SECRET_KEY + data)
        axios.post(FEEDBACK_URL, data, {
                headers: {
                    'Signature' : signature,
                    'Content-Type': 'application/json',
                }
            }
        )
            .then(response => onFeedbackSubmited(dispatch, response.data))

    }
}

const onFeedbackSubmited = (dispatch, response) => {
    if (response.error == 0) {
        dispatch({
            type: FEEDBACK_SUBMIT_USER_DATA
        })
    } else {

    }
}