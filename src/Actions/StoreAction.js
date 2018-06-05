import {
    STORE_GET_CATEGORIES,
    STORE_GET_CATEGORIES_SUCCESS,
    STORE_GET_CATEGORIES_FAIL,
    STORE_GET_PRODUCTS_BY_CATEGORY_ID,
    STORE_GET_PRODUCTS_BY_CATEGORY_ID_SUCCESS,
    STORE_GET_PRODUCTS_BY_CATEGORY_ID_FAIL,
    STORE_GET_PRODUCT_BY_ID
} from '../Actions/types';
import {
    STORE_CATEGORIES_URL,
    STORE_PRODUCTS_URL,
    STORE_PRODUCT_BY_ID_URL
} from './constants';
import axios from 'axios';
import md5 from 'js-md5'

/*
Products, Categories
 */
export const getCategories = (token, phone) => {
    return (dispatch) => {

        dispatch({
            type: STORE_GET_CATEGORIES
        })

        let signatureString = token+":"+phone;
        const signature = btoa(signatureString);
console.log('STORE get categories - ', signature, STORE_CATEGORIES_URL);
        axios.get(STORE_CATEGORIES_URL, {
                headers: {
                    'Signature' : signature,
                }
            }
        )
            .then(categories => onGetCategoriesSuccess(dispatch, categories.data))
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

export const getProductsByCategoriesId = (token, phone) => {
    return (dispatch) => {

        dispatch({
            type: STORE_GET_PRODUCTS_BY_CATEGORY_ID
        })

        // const obj = {
        //     "token" : token,
        // };
        //
        // const data = JSON.stringify(obj);

        let signatureString = token+":"+phone;
        const signature = btoa(signatureString);
console.log('STORE get products - ', signature, STORE_PRODUCTS_URL);
        axios.get(STORE_PRODUCTS_URL, {
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
        payload: products
    })
}

export const getProductById = (token, phone) => {
    return (dispatch) => {

        dispatch({
            type: STORE_GET_PRODUCT_BY_ID
        })

        // const obj = {
        //     "token" : token,
        // };
        //
        // const data = JSON.stringify(obj);

        let signatureString = token+":"+phone;
        const signature = btoa(signatureString);
        console.log('STORE get products - ', signature, STORE_PRODUCT_BY_ID_URL);
        axios.get(STORE_PRODUCT_BY_ID_URL, {
                headers: {
                    'Signature' : signature,
                }
            }
        )
            .then(product => onGetProductsSuccess(dispatch, product.data))
            .catch((error) => {
                console.log(error)
            })
    }
}

export const setDefaultViewCounter = () => {

}

export const increaseViewCounter = () => {

}

/*
Orders
 */
//MAKE ORDER
export const makeOrder = () => {

}

//UPDATE ORDER
export const updateOrder = () => {

}

//GET ORDER BY USER ID
export const getOrderByUserId = () => {

}

//GET ORDER DETAILS
export const getOrderDetails = () => {

}