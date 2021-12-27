import {
    FEEDBACK_MESSAGE_CHANGE,
    FEEDBACK_SUBJECT_CHANGE,
    FEEDBACK_PHONE_CHANGE,
    FEEDBACK_SUBMIT_USER_DATA
} from '../actions/types';

const INITIAL_STATE = {
    phone: '',
    subject: '',
    text: '',
    feedbackSubmited: false
}
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FEEDBACK_MESSAGE_CHANGE:
            return {...state, text: action.payload};
        case FEEDBACK_SUBJECT_CHANGE:
            return {...state, subject: action.payload};
        case FEEDBACK_PHONE_CHANGE:
            return {...state, phone: action.payload};
        case FEEDBACK_SUBMIT_USER_DATA:
            // Actions.
            return {...state, feedbackSubmited: true};
        default: return state;
    }
}