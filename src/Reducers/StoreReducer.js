import {
    STORE_GET_CATEGORIES,
    STORE_GET_CATEGORIES_SUCCESS,
    STORE_GET_CATEGORIES_FAIL,
    STORE_GET_PRODUCTS_BY_CATEGORY_ID,
    STORE_GET_PRODUCTS_BY_CATEGORY_ID_SUCCESS,
    STORE_GET_PRODUCTS_BY_CATEGORY_ID_FAIL,
    STORE_GET_PRODUCTS_BY_ID,
    STORE_GET_PRODUCT_BY_ID,
    STORE_GET_PRODUCT_BY_ID_SUCCESS,
    STORE_GET_PRODUCT_BY_ID_FAIL,
    DELIVERY_CURIER,
    STORE_COUNTRY_CHANGE,
    STORE_CITY_CHANGE,
    STORE_DELIVERY_CHANGE,
    STORE_NP_CITY_CHANGE,
    STORE_CITY_SELECTED,
    STORE_SELECT_ADDRESS,
    STORE_ADDRESS_CHANGE,
    STORE_NP_SKLAD,
    STORE_COMMENT_CHANGE,
    STORE_GET_DETAILS_SUCCESS,
    STORE_GET_DETAILS_FAIL,
    STORE_CHECK_FILTER,
    STORE_CHECK_ORDER,
    STORE_GET_BRANDS_SUCCESS,
    STORE_SET_SELECTED_SORTING,
    STORE_PHONE_CHANGE,
    STORE_SET_PAYMENT_TYPE
} from '../actions/types';
import {AsyncStorage} from 'react-native';

const INITIAL_STATE = {
    categories: [],
    products: [],
    product: null,
    error: null,
    loading: true,

    basket: [],
    countBasket: 0,
    basketSum: 0,
    basketBonusSum: 0,

    showCities: 'flex',
    showNPCities: 'none',
    showNPSklads: 'none',
    npCity: null,
    NPskald: null,
    NPskalds: [],
    city: "",
    cityId: null,
    delivery: DELIVERY_CURIER,
    country: 'Украина',
    sklad: null,
    address: null,
    comment: null,
    phone: null,
    filters: [
        {name:'cheap', label: 'От дешевых к дорогим', status: true},
        {name:'expensive', label: 'От дорогих к дешевым', status: false},
        {name:'new', label: 'Новинки', status: false},
        {name:'promo', label: 'Акционные', status: false},
        {name:'popular', label: 'Популярные', status: false},
    ],
    checkedBrands: [],
    brands: [],
    selectedSorting: 0,
    paymentType: 0
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case STORE_GET_CATEGORIES:
            return {...state, loading: true};
        case STORE_GET_CATEGORIES_SUCCESS:
            let categoires = action.payload.slice();
            action.payload.map( (category, index) => {
                if (category.id == 15) {// if this is Uncategorized
                    categoires = action.payload.splice(index, 1)
                }
            })
            return {...state, loading: false, categories: action.payload};
        case STORE_GET_CATEGORIES_FAIL:
            return {...state, loading: false, categories: [], error: action.payload};
        case STORE_GET_PRODUCTS_BY_CATEGORY_ID:
            return {...state, loading: true, product: null, products: []};
        case STORE_GET_PRODUCTS_BY_CATEGORY_ID_SUCCESS:
            return {...state, loading: false, products: action.payload, product: null};
        case STORE_GET_PRODUCTS_BY_CATEGORY_ID_FAIL:
            return {...state, loading: false, products: [], error: action.payload};
        case STORE_GET_PRODUCT_BY_ID:
            return {...state, loading: false, product: null};
        case STORE_GET_PRODUCT_BY_ID_SUCCESS:
            return {...state, loading: false, product: action.payload};
        case STORE_GET_PRODUCT_BY_ID_FAIL:
            return {...state, loading: false, products: [], error: action.payload};
        case STORE_COUNTRY_CHANGE:
            return {...state, country: action.payload, addCardError: null};
        case STORE_DELIVERY_CHANGE:
            return {...state,
                city: null,
                delivery: action.payload,
                address: null
            }
        case STORE_NP_CITY_CHANGE:
            return {
                ...state,
                orderCardSuccess: false,
                orderVirtualCardSuccess: false,
                showCities: 'none',
                showNPCities: 'flex',
                showNPSklads: 'flex',
                showAdress: 'none',
                address: null,
                npCity: action.payload, addCardError: null
            }
        case STORE_CITY_SELECTED:
            return {
                ...state,
                npCities: [],
                city: action.payload,
                orderCardSuccess: false,
                orderVirtualCardSuccess: false,
                address: null,
                addCardError: null
            }
        case STORE_CITY_CHANGE:
            return {
                ...state,
                city: action.payload,
                orderCardSuccess: false,
                orderVirtualCardSuccess: false,
                address: null,
                addCardError: null
            }
        case STORE_SELECT_ADDRESS:
        case STORE_ADDRESS_CHANGE:
            return {...state,
                address: action.payload,
                orderCardSuccess: false,
                orderVirtualCardSuccess: false,
                addCardError: null};
        case STORE_NP_SKLAD:
            return {...state,
                address: action.payload,
                orderCardSuccess: false,
                orderVirtualCardSuccess: false,
                addCardError: null};
        case STORE_COMMENT_CHANGE:
            return {...state,
                comment: action.payload,
                orderCardSuccess: false,
                addCardError: null};

        case STORE_GET_DETAILS_SUCCESS:
console.log('STORE_GET_DETAILS_SUCCESS', action.payload)
            return {...state,
                loading: false,
                error: null,
                basket: action.payload
            };
        case STORE_CHECK_FILTER:
            let newBrands = [...state.checkedBrands];
            if (!newBrands.includes(action.payload)) {
                newBrands.push(action.payload)
            } else {
                newBrands.splice(newBrands.indexOf(action.payload), 1)
            }
            return {
                ...state,
                checkedBrands: newBrands
            }
        case STORE_CHECK_ORDER:
            let newOrders = [...state.orders];
            newFilters.map( filter => {
                if (filter.name == action.payload) {
                    filter.status = !filter.status
                }
            })
            return {
                ...state,
                filters: newOrders
            }
        case STORE_GET_BRANDS_SUCCESS:
            return {
                ...state,
                brands: action.payload
            }
        case STORE_SET_SELECTED_SORTING:
            return {
                ...state,
                selectedSorting: action.payload
            }
        case STORE_PHONE_CHANGE:
            return {...state, phone: action.payload};
        case STORE_SET_PAYMENT_TYPE:
console.log("REDUCER STORE_SET_PAYMENT_TYPE")
            return {
                ...state,
                paymentType: action.payload
            }
        default: return state;
    }
}