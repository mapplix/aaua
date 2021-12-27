import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    ADD_TO_BASKET,
    DELETE_FROM_BASKET,
    STORE_SET_BASKET_DATA_FROM_STORAGE,
    STORE_PAYMENT_SUCCESS,
    STORE_ADD_BASKET_DATA_TO_STORAGE,
    STORE_UPDATE_BASKET_DATA
} from '../actions/types';

const INITIAL_STATE = {
    basket: [],
    countBasket: 0,
    basketSum: 0,
    basketBonusSum: 0,
    isPayedSuccess: false,
    loading: true
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ADD_TO_BASKET:
            let newBasket = state.basket;
            let {countBasket, basketSum, basketBonusSum} = state;
            if (newBasket.length) {
                let isNewRow = true;
                for (var i=0; i < newBasket.length; i++) {
                    let row = newBasket[i];
                    if (row.id == action.payload.id) {
                        row.counter = row.counter + 1;
                        isNewRow = false;
                        break;
                    }
                }
                if (isNewRow) {
                    newBasket.push({id: action.payload.id, counter: 1, product: action.payload})
                }
            } else {
                newBasket.push({id: action.payload.id, counter: 1, product: action.payload})
            }
console.log('ADD_TO_BASKET ', state, newBasket);
            return {
                // ...state,
                basket: newBasket,
                countBasket: countBasket+1,
                basketSum: basketSum + parseInt(action.payload.price),
                basketBonusSum: basketBonusSum + parseInt(action.payload.bonus_price),
                isPayedSuccess: false
            };
        case DELETE_FROM_BASKET:
            let copyBasket = state.basket.slice();
            let counter = state.countBasket;
            let sum = state.basketSum;
            let bonusSum = state.basketBonusSum;
console.log('DELETE_FROM_BASKET', copyBasket);
            if (action.payload == null && action.isAll) {
                console.log('DELETE_FROM_BASKET ALL', counter, sum, bonusSum, copyBasket)
                return {
                    ...state,
                    basket: [],
                    countBasket: 0,
                    basketSum: 0,
                    basketBonusSum: 0,
                    isPayedSuccess: false
                };
            }
            if (copyBasket.length) {
                for (var i=0; i < copyBasket.length; i++) {
                    let row = copyBasket[i];
                    if (row.id == action.payload.id) {
                        if (action.isAll) {
                            counter = 0;
                            sum = sum - (parseInt(action.payload.price) * row.counter)
                            bonusSum = bonusSum - (parseInt(action.payload.bonus_price) * row.counter)
                            copyBasket.splice(i, 1);
                        } else {
                            row.counter = row.counter - 1;
                            counter = counter - 1;
console.log('DELETE_FROM_BASKET', counter)
                            sum = sum - parseInt(action.payload.price);
                            bonusSum = bonusSum - parseInt(action.payload.bonus_price);
                            if (row.counter == 0) {
                                copyBasket.splice(i, 1);
                            }
                        }
                        break;
                    }
                }
                console.log('DELETE_FROM_BASKET sum', counter, sum, bonusSum, copyBasket)
                return {
                    ...state,
                    basket: copyBasket,
                    countBasket: counter,
                    basketSum: sum,
                    basketBonusSum: bonusSum,
                    isPayedSuccess: false
                };
            }

        case STORE_SET_BASKET_DATA_FROM_STORAGE:
            console.log(state)
            return {
                ...state,
                basket: action.payload.basket,
                countBasket: action.payload.countBasket,
                basketSum: action.payload.basketSum,
                basketBonusSum: action.payload.basketBonusSum,
            }
        case STORE_ADD_BASKET_DATA_TO_STORAGE:
            let basketInfo = {
                basket: state.basket,
                countBasket: state.countBasket,
                basketSum: state.basketSum,
                basketBonusSum: state.basketBonusSum,
            }
            console.log('REDUCER STORE_ADD_BASKET_DATA_TO_STORAGE', basketInfo);
            AsyncStorage.setItem('@basketInfo', JSON.stringify(basketInfo))
            return {
                ...state,
            }
        case STORE_PAYMENT_SUCCESS:
            return {
                ...state,
                basket: [],
                countBasket: 0,
                basketSum: 0,
                basketBonusSum: 0,
                isPayedSuccess: true
            }
        case STORE_UPDATE_BASKET_DATA:
console.log('STORE_UPDATE_BASKET_DATA', action.payload)
            return {
                ...state,
                basket: action.payload.basket,
                basketSum: action.payload.basketSum,
                basketBonusSum: action.payload.basketBonusSum,
                isPayedSuccess: false,
                loading: false
            }
        default: return state;
    }
}