import {
    STORE_GET_CATEGORIES,
    STORE_GET_CATEGORIES_SUCCESS,
    STORE_GET_CATEGORIES_FAIL,
    STORE_GET_PRODUCTS_BY_CATEGORY_ID,
    STORE_GET_PRODUCTS_BY_CATEGORY_ID_SUCCESS,
    STORE_GET_PRODUCTS_BY_CATEGORY_ID_FAIL,
    STORE_GET_PRODUCT_BY_ID,
    STORE_GET_PRODUCT_BY_ID_SUCCESS,
    ADD_TO_BASKET,
    DELETE_FROM_BASKET,
    STORE_DELIVERY_CHANGE,
    STORE_COUNTRY_CHANGE,
    STORE_CITY_CHANGE,
    STORE_NP_CITY_CHANGE,
    STORE_CITY_SELECTED,
    STORE_SELECT_ADDRESS,
    STORE_ADDRESS_CHANGE,
    STORE_NP_SKLAD,
    STORE_COMMENT_CHANGE,
    STORE_GET_HISTORY_START,
    STORE_GET_HISTORY_SUCCESS,
    STORE_GET_DETAILS_SUCCESS,
    STORE_CHECK_FILTER,
    STORE_GET_BRANDS_SUCCESS,
    STORE_SET_SELECTED_SORTING,
    STORE_PHONE_CHANGE,
    STORE_SET_BASKET_DATA_FROM_STORAGE,
    STORE_PAYMENT_SUCCESS,
    STORE_ADD_BASKET_DATA_TO_STORAGE,
    STORE_SET_PAYMENT_TYPE,
    STORE_UPDATE_BASKET_DATA
} from '../Actions/types';
import {
    STORE_CATEGORIES_URL,
    STORE_PRODUCTS_URL,
    STORE_PRODUCT_BY_ID_URL,
    STORE_PRODUCT_INCREASE_VIEWS_URL,
    STORE_MAKE_ORDER_URL,
    STORE_HISTORY_URL,
    STORE_ORDER_DETAILS_URL,
    STORE_BRANDS_FOR_FILTERS_URL,
    STORE_FILTER_URL,
    STORE_PRODUCT_UPDATE
} from './constants';
import axios from 'axios';
import {Actions} from 'react-native-router-flux';
import {encode} from 'base-64';

/*
Products, Categories
 */
export const getCategories = (token, phone) => {
    return (dispatch) => {

        dispatch({
            type: STORE_GET_CATEGORIES
        })
console.log(token, phone)
        let signatureString = token+":"+phone;
        const signature = encode(signatureString);
console.log('STORE get categories - ', signatureString, signature, STORE_CATEGORIES_URL);
        axios.get(STORE_CATEGORIES_URL, {
                headers: {
                    'Signature' : signature,
                }
            }
        )
            .then(categories => {
                    console.log(categories.data);
                    onGetCategoriesSuccess(dispatch, categories.data.categories)
                }
            )
            .catch((error) => {
                console.log(error)
            })
    }
}

const onGetCategoriesSuccess = (dispatch, categories) => {
    dispatch ({
        type: STORE_GET_CATEGORIES_SUCCESS,
        payload: categories
    })
}

export const getProductsByCategoriesId = (token, phone, categoryId, sortingName) => {
    return (dispatch) => {

        dispatch({
            type: STORE_GET_PRODUCTS_BY_CATEGORY_ID
        })

        let signatureString = token+":"+phone;
        const signature = encode(signatureString);
        let url = STORE_PRODUCTS_URL+categoryId;
        if (sortingName) {
            url = STORE_PRODUCTS_URL+categoryId+'/'+sortingName;
        }
console.log('STORE get products - ', signature, url);
        axios.get(url, {
                headers: {
                    'Signature' : signature,
                }
            }
        )
            .then(products => onGetProductsSuccess(dispatch, products.data))
            .catch((error) => {
                console.log(error)
            })
    }
}

const onGetProductsSuccess = (dispatch, products) => {
    dispatch ({
        type: STORE_GET_PRODUCTS_BY_CATEGORY_ID_SUCCESS,
        payload: products.products
    })
}

export const getProductById = (token, phone, productId) => {
    return (dispatch) => {

        dispatch({
            type: STORE_GET_PRODUCT_BY_ID
        })

        let signatureString = token+":"+phone;
        const signature = encode(signatureString);
        console.log('STORE get product by ID- ', signature, STORE_PRODUCT_BY_ID_URL+productId);
        axios.get(STORE_PRODUCT_BY_ID_URL+productId, {
                headers: {
                    'Signature' : signature,
                }
            }
        )
            .then(product => onGetProductSuccess(dispatch, product.data))
            .catch((error) => {
                console.log(error)
            })
    }
}

const onGetProductSuccess = (dispatch, product) => {
console.log(product);
    dispatch ({
        type: STORE_GET_PRODUCT_BY_ID_SUCCESS,
        payload: product.product
    })
}

export const addToBasket = (product) => {
    return {
        type: ADD_TO_BASKET ,
        payload: product
    }
}

export const deleteFromBasket = (product, isAll = false) => {
    return {
        type: DELETE_FROM_BASKET,
        payload: product,
        isAll: isAll
    }
}

export const increseCounter = (token, phone, productId) => {
    return (dispatch) => {

        let signatureString = token+":"+phone;
        const signature = encode(signatureString);
        console.log('STORE increase product views counter - ', signature, STORE_PRODUCT_INCREASE_VIEWS_URL);
        axios.post(STORE_PRODUCT_INCREASE_VIEWS_URL+productId,{}, {
                headers: {
                    'Signature' : signature,
                }
            }
        )
            .then( response => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export const makeOrder = (user, basket, orderData, orderType) => {
    return () => {
        let signatureString = user.token+":"+user.profile.phone;
        const signature = encode(signatureString);
        let products = []
        basket.map(product => {
            products.push({product: product.id, qty: product.counter})
        });
        const obj = {
            "products":products, // Array of product's ID
            "userID": user.profile.id, // User ID (string or integer)
            "shipping": {
                "city": orderData.city,
                "address": orderData.address,
                "type": orderData.delivery == 2 ? 'Courier' : 'Nova Poshta', // Courier || Nova Poshta
                "nova_poshta": orderData.delivery < 2 ? orderData.NPskald : null, // department of Nova Poshta. Empty or absent if delivery by Courier
                "notes": orderData.comment
            },
            "orderType": orderType// booking - will make create order without payment step, if empty will set status "Pending payment"
        };
        const data = JSON.stringify(obj);
console.log(STORE_MAKE_ORDER_URL,signature, data);
        axios.post(STORE_MAKE_ORDER_URL, data, {
                headers: {
                    'Signature' : signature,
                    'Content-Type': 'application/json',
                }
            }
        )
            .then(response => onMakeOrderSuccess(response.data, orderType))
            .catch((error) => {
                console.log(error)
            })
    }
}

const onMakeOrderSuccess = (response, orderType) => {
console.log(response);
    if (response.code == 200) {
        if (orderType == 'booking') {
            Actions.basketList({isPaymentSuccess: true});
        } else {
            Actions.payment({url: response.payment_url})
        }
    }
}

export const checkFilters = (filterId) => {
    return {
        type: STORE_CHECK_FILTER,
        payload: filterId
    }
}

export const changeDelivery = (delivery) => {
    return {
        type: STORE_DELIVERY_CHANGE,
        payload: delivery
    }
}

export const changeCity = (city) => {
    return {
        type: STORE_CITY_CHANGE,
        payload: city
    }
}

export const selectCity = (city) => {
    return {
        type: STORE_CITY_SELECTED,
        payload: city
    }
}

export const changeNPCity = (city) => {
    return {
        type: STORE_NP_CITY_CHANGE,
        payload: city
    }
}

export const changeAddress = (address) => {
    return {
        type: STORE_ADDRESS_CHANGE,
        payload: address
    }
}

export const selectAddress = (address) => {
    return {
        type: STORE_SELECT_ADDRESS,
        payload: address
    }
}

export const changeNPSkald = (value) => {
    return {
        type: STORE_NP_SKLAD,
        payload: value
    }
}

export const changeComment = (text) => {

    return {
        type: STORE_COMMENT_CHANGE,
        payload: text
    }
}

export const getHistory = (user) => {
    return (dispatch) => {

        dispatch({
            type: STORE_GET_HISTORY_START
        })

        let signatureString = user.token+":"+user.phone;
        const signature = encode(signatureString);
        console.log('STORE get history - ', signature, STORE_HISTORY_URL+user.profile.id);
        axios.get(STORE_HISTORY_URL+user.profile.id, {
                headers: {
                    'Signature' : signature,
                }
            }
        )
            .then(products => onGetHistorySuccess(dispatch, products.data))
            .catch((error) => {
                console.log(error)
            })
    }
}

const onGetHistorySuccess = (dispatch, products) => {
console.log('onGetHistorySuccess', products);
    dispatch({
        type: STORE_GET_HISTORY_SUCCESS,
        payload: products.orders
    })
}

export const getOrderDetails = (user, orderId) => {
    return (dispatch) => {
        // dispatch({
        //     type: STORE_GET_HISTORY_START
        // })
        let signatureString = user.token+":"+user.phone;
        const signature = encode(signatureString);
        console.log('STORE get products - ', signature, STORE_ORDER_DETAILS_URL+orderId);
        axios.get(STORE_ORDER_DETAILS_URL+orderId, {
                headers: {
                    'Signature' : signature,
                }
            }
        )
            .then(products => onGetDetailsSuccess(dispatch, products.data))
            .catch((error) => {
                console.log(error)
            })
    }
}

const onGetDetailsSuccess = (dispatch, products) => {
console.log('onGetDetailsSuccess', products);
    dispatch({
        type: STORE_GET_DETAILS_SUCCESS,
        payload: products.products
    })
}

export const getBrandsForFilters = (token, phone) => {
    return (dispatch) => {

        let signatureString = token+":"+phone;
        const signature = encode(signatureString);
        console.log('STORE get brands for filters', signature, STORE_BRANDS_FOR_FILTERS_URL);
        axios.get(STORE_BRANDS_FOR_FILTERS_URL, {
                headers: {
                    'Signature' : signature,
                }
            }
        )
            .then(brands => onGetBrandsSuccess(dispatch, brands.data))
            .catch((error) => {
                console.log(error)
            })
    }
}

const onGetBrandsSuccess = (dispatch, brands) => {
console.log('onGetBrandsSuccess', brands);
    dispatch({
        type: STORE_GET_BRANDS_SUCCESS,
        payload: brands.brands
    })
}

export const getFilteredProduct = (token, phone, brandIds, categoryId) => {
    return (dispatch) => {
        const obj = {
            "brands": brandIds,
            "category": [categoryId]
        }

        const data = JSON.stringify(obj);
        let signatureString = token+":"+phone;
        const signature = encode(signatureString);
        // let url = brandIds.length > 0 ? STORE_FILTER_URL : STORE_GET_PRODUCTS_BY_CATEGORY_ID+categoryId
console.log('STORE_FILTER_URL', signature, data, STORE_FILTER_URL)
        axios.post(STORE_FILTER_URL, data, {
                headers: {
                    'Signature' : signature,
                    'Content-Type': 'application/json',
                }
            }
        )
        .then(result => onFilteredProductsSuccess(dispatch, result.data))
        .catch((error) => {
            console.log(error)
        })
    }
}

const onFilteredProductsSuccess = (dispatch, products) => {
    dispatch({
        type: STORE_GET_PRODUCTS_BY_CATEGORY_ID_SUCCESS,
        payload: products.products
    })
}

export const setSelectedSorting = (sortingId) => {
console.log('setSelectedSorting', sortingId);
    return {
        type: STORE_SET_SELECTED_SORTING,
        payload: sortingId
    }
}

export const changePhone = (phone) => {
    return {
        type: STORE_PHONE_CHANGE,
        payload: phone
    }
}

export const setBasketFromStorage = (data) => {
    console.log('setBasketFromStorage')
    return {
        type: STORE_SET_BASKET_DATA_FROM_STORAGE,
        payload: data
    }
}

export const addBasketToStorage = () => {
console.log('ACTION addBasketToStorage')
    return {
        type: STORE_ADD_BASKET_DATA_TO_STORAGE,
    }
}

export const onPaymentSuccess = () => {
    return {
        type: STORE_PAYMENT_SUCCESS,
    }
}

export const selectPaymentType = (type) => {
console.log('ACTION selectPaymentType')
    return {
        type: STORE_SET_PAYMENT_TYPE,
        payload: type
    }
}

export const repeatOrder = (token, phone, product) => {
    return (dispatch) => {

        console.log(product)
        dispatch({
            type: ADD_TO_BASKET ,
            payload: product.details
        })
        Actions.basketList({isPaymentSuccess: false});
    }
}

export const updateBasketInfo = (token, phone, basket) => {
    return (dispatch) => {
        let productIds = [];
        basket.map( product => {
            productIds.push(product.id);
        })
        console.log(productIds);
        const obj = {
            "products": productIds
        }
        const data = JSON.stringify(obj);
        let signatureString = token+":"+phone;
        const signature = encode(signatureString);
        // let url = brandIds.length > 0 ? STORE_FILTER_URL : STORE_GET_PRODUCTS_BY_CATEGORY_ID+categoryId
console.log('STORE_PRODUCT_UPDATE', signature, data, STORE_PRODUCT_UPDATE)
        axios.post(STORE_PRODUCT_UPDATE, data, {
                headers: {
                    'Signature' : signature,
                    'Content-Type': 'application/json',
                }
            }
        )
            .then(result => onUpdateInfoSuccess(dispatch, result.data, basket))
            .catch((error) => {
                console.log(error, basket)
                let basketObj = {
                    basket: basket,
                    basketSum: 0,
                    basketBonusSum: 0,
                }
                dispatch({
                    type: STORE_UPDATE_BASKET_DATA,
                    payload: basketObj
                })
            })
    }
}

const onUpdateInfoSuccess = (dispatch, data, basket) => {
    console.log(data, basket);
    let basketSum = 0;
    let basketBonusSum = 0;
    basket.map(product => {
        data.products.find( obj => {
            if (obj.id == product.id) {
                basketSum += obj.price * product.counter;
                basketBonusSum += obj.bonus_price * product.counter;
                product.product.price = obj.price;
                product.product.bonus_price = obj.bonus_price;
            }
        })
    })
    console.log(basket, basketSum, basketBonusSum);
    let basketObj = {
        basket: basket,
        basketSum: basketSum,
        basketBonusSum: basketBonusSum,
    }
    dispatch({
        type: STORE_UPDATE_BASKET_DATA,
        payload: basketObj
    })
}
