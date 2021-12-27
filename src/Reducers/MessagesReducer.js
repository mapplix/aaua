import {
    MESSAGES_LOADED_SUCCESS,
    MESSAGES_LOAD,
    MESSAGES_LOAD_FAIL,
    MESSAGE_LOAD,
    MESSAGE_INFO_LOADED_SUCCESS,
    MESSAGE_INFO_LOADING_FAIL,
    MESSAGE_COUNTER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    messages: [],
    error: null,
    loading: false,
    loadingMessageInfo: true,
    message: null,
    messageError: null,
    messagesCounter: 0
}
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case MESSAGES_LOADED_SUCCESS:
            var messages = state.messages;

            if (action.offset > 0) {
                messages = [...state.messages, ...action.payload]
            } else {
                messages = action.payload;
            }
    console.log('MESSAGES_LOADED_SUCCESS', messages, action.payload);
            return {...state, messages: messages, loading: false};
        case MESSAGES_LOAD_FAIL:
            return {...state, error: action.payload};
        case MESSAGES_LOAD:
            return {...state, loading: true};
        case MESSAGE_LOAD:
            return {...state, loadingMessageInfo: true};
        case MESSAGE_INFO_LOADED_SUCCESS:
console.log(MESSAGE_INFO_LOADED_SUCCESS, action.payload)
            return {...state, loadingMessageInfo: false, message: action.payload};
        case MESSAGE_INFO_LOADING_FAIL:
            return {...state, loadingMessageInfo: false, messageError: action.payload};
        case MESSAGE_COUNTER_SUCCESS:
            return {...state, messagesCounter: action.payload}
        default: return state;
    }
}