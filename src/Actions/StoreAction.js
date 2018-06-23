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
    CLEAN_BASKET
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
console.log(token, phone)
        let signatureString = token+":"+phone;
        const signature = btoa(signatureString);
console.log('STORE get categories - ', signatureString, signature, STORE_CATEGORIES_URL);
        // axios.get(STORE_CATEGORIES_URL, {
        //         headers: {
        //             'Signature' : signature,
        //         }
        //     }
        // )
        //     .then(categories => onGetCategoriesSuccess(dispatch, categories.data))
        //     .catch((error) => {
        //         console.log(error)
        //     })
        let categories = [
            {
                "id":163,
                "name":"Cars",
                "slug":"cars",
                "image":false
            },
            {
                "id":170,
                "name":"Clothing",
                "slug":"clothing",
                "image":false,
                "sub_categories":[
                    {
                        "id":171,
                        "name":"Hoodies",
                        "slug":"hoodies",
                        "image":false
                    },
                    {
                        "id":175,
                        "name":"T-shirts",
                        "slug":"t-shirts",
                        "image":false
                    }
                ]
            }
        ]
        onGetCategoriesSuccess(dispatch, categories)
    }
}

const onGetCategoriesSuccess = (dispatch, categories) => {
    dispatch ({
        type: STORE_GET_CATEGORIES_SUCCESS,
        payload: categories
    })
}

export const getProductsByCategoriesId = (token, phone, categoryId) => {
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
        /*axios.get(STORE_PRODUCTS_URL, {
                headers: {
                    'Signature' : signature,
                }
            }
        )
            .then(products => onGetProductsSuccess(dispatch, products.data))
            .catch((error) => {
                console.log(error)
            })*/
        let products =  [
            {
                "id":60,
                "name":"Woo Logo",
                "photo":"http://wp.dev/wp-content/uploads/2013/06/hoodie_6_front.jpg",
                "price":"35",
                "bonus_price":"",
                "views": "1",
                "gallery":[
                    "http://wp.dev/wp-content/uploads/2013/06/hoodie_6_back.jpg"
                ],
                "status":"instock",
                "categories":{
                    "id":171,
                    "name":"Hoodies"
                },
                "brands":{
                    "id":172,
                    "name":"Coca Cola"
                }
            },
            {
                "id":61,
                "name":"Woo Logo",
                "photo":"http://wp.dev/wp-content/uploads/2013/06/hoodie_6_front.jpg",
                "price":"35",
                "bonus_price":"",
                "views": "1",
                "gallery":[
                    "http://wp.dev/wp-content/uploads/2013/06/hoodie_6_back.jpg"
                ],
                "status":"instock",
                "categories":{
                    "id":171,
                    "name":"Hoodies"
                },
                "brands":{
                    "id":172,
                    "name":"Coca Cola"
                }
            }
        ]
        onGetProductsSuccess(dispatch, products);
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

        let signatureString = token+":"+phone;
        const signature = btoa(signatureString);
        console.log('STORE get products - ', signature, STORE_PRODUCT_BY_ID_URL);
        /*axios.get(STORE_PRODUCT_BY_ID_URL, {
                headers: {
                    'Signature' : signature,
                }
            }
        )
            .then(product => onGetProductsSuccess(dispatch, product.data))
            .catch((error) => {
                console.log(error)
            })*/
        let product = {
            "id":"60",
            "name":"Woo Logo",
            "photo":"http://wp.dev/wp-content/uploads/2013/06/hoodie_6_front.jpg",
            "price":"35",
            "bonus_price":"",
            "views": "1",
            "gallery":[
                "http://wp.dev/wp-content/uploads/2013/06/hoodie_6_back.jpg"
            ],
            "status":"instock",
            "categories":{
                "id":171,
                "name":"Hoodies"
            }
        }
        onGetProductSuccess(dispatch, product)
    }
}

const onGetProductSuccess = (dispatch, product) => {
    dispatch ({
        type: STORE_GET_PRODUCT_BY_ID_SUCCESS,
        payload: product
    })
}

export const addToBasket = (productId) => {
    return {
        type: ADD_TO_BASKET ,
        payload: productId
    }
}

export const cleanBasket = () => {
    return {
        type: CLEAN_BASKET
    }
}