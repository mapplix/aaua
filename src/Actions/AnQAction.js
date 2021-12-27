import {
    OPEN_ANSWEAR
} from './types';
import {Actions} from 'react-native-router-flux';

export const openAnswear = (selected) => {
    return {
        type: OPEN_ANSWEAR,
        payload: selected
    }
}
