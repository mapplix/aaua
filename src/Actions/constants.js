import {Platform, AsyncStorage} from 'react-native';
import md5 from 'js-md5';
import axios from 'axios';

export const BASE_URL = 'http://aaua.taxi898.com.ua';
export const API_URL = 'http://aaua.taxi898.com.ua/admin.php?r=api/';
export const AUTH_URL = API_URL + 'auth';
export const SMS_CODE_URL = API_URL + 'register_step1';
export const REGISTER_2_URL = API_URL + 'register_step2';
export const REGISTER_1_URL = API_URL + 'register_sms_code';
export const FORGOT_PASS_URL = API_URL + 'forgorPassword';
export const CITIES_URL = API_URL + 'get_cities';
export const CAR_BRANDS_URL = API_URL + 'get_brands';
export const SUBSCRIPTION_URL = API_URL + 'subscription';
export const BUY_SUBSCRIPTION_URL = API_URL + 'buySubscription';
export const MY_AAUA_CARD_URL = API_URL + 'cardaaua';
export const ORDER_AAUA_CARD_URL = API_URL + 'bidCardaaua';
export const ADD_AAUA_CARD_URL = API_URL + 'addCardaaua';
export const FEEDBACK_URL = API_URL + 'feedback';
export const NP_CITIES_URL = API_URL + 'getCitiesNp';
export const NP_SKLADS_URL = API_URL + 'getSkladsNp';
export const ON_ROAD_CATEGORIES = API_URL + 'serviceCategories';
export const ON_ROAD_CATEGORY_DETAILS_URL = API_URL + 'services';
export const ON_ROAD_ORDER_SUPPORT_URL = API_URL + 'bidService';
export const MESSAGES_LOADING_URL = API_URL + 'messages';
export const MESSAGE_LOADING_URL = API_URL + 'message';
export const IMAGES_LOAD_URL = API_URL + 'slides';
export const CHECK_TOKEN_URL = API_URL + 'checkToken';
export const DISCOUNTS_CATEGORIES_URL = API_URL + 'categoriesDiscontPlaces';
export const DISCOUNTS_CARDS_URL = API_URL + 'discontCards';
export const DISCOUNTS_PLACES_URL = API_URL + 'discontPlaces';
export const INVITE_FRIEND_URL = API_URL + 'sendPartnerLink';
export const GET_CAR_MODEL_URL = API_URL + 'get_models';
export const BID_KASKO_URL = API_URL + 'bidKasko';
export const BID_OSAGO_URL = API_URL + 'bidOsago';

export const SECRET_KEY = 'hmnc7TGjffdhgjs';
export const DEVICE_OS = Platform.OS === 'ios' ? 2 : 1;

export const saveItem = async (item, selectedValue) => {
    try {
        await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
        console.error('AsyncStorage error: ' + error.message);
    }
}

export const removeItem = async (item) => {
    try {
        await AsyncStorage.removeItem(item);
    } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
    }
}

export const getItem = async (item) => {

    try {
        const value = await AsyncStorage.getItem(item);
        return value;
    } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
    }
}
