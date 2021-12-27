import {
    OPEN_ANSWEAR
} from '../actions/types';

const INITIAL_STATE = {
    selectedAnswear: 1,
}
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case OPEN_ANSWEAR:
            return {...state, selectedAnswear: action.payload};
        default: return state;
    }
}