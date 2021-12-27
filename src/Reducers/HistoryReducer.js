import {
    STORE_GET_HISTORY_START,
    STORE_GET_HISTORY_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    error: null,
    loading: true,
    orders: []
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case STORE_GET_HISTORY_START:
            console.log('STORE_GET_HISTORY_START');
            return {...state,
                loading: true,
                error: null,
            };
        case STORE_GET_HISTORY_SUCCESS:
            console.log('STORE_GET_HISTORY_SUCCESS', action.payload)
            return {...state,
                loading: false,
                error: null,
                orders: action.payload
            };
        default: return state;
    }
}