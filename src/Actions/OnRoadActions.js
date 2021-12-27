import {
  ONROAD_PHONE_CHANGE,
  ONROAD_SEND_DATA,
  ON_ROAD_LOAD_CATEGORIES,
  ON_ROAD_CATEGORIES_LOADED,
  ON_ROAD_LOAD_CATEGORY_DETAILS,
  ON_ROAD_CATEGORY_DETAILS_LOADED,
  ON_ROAD_ORDER_SUPPORT,
  ON_ROAD_SUPPORT_ORDERED_SUCCESS,
  ON_ROAD_SUPPORT_ORDERED_FAIL,
} from './types';
import {
  SECRET_KEY,
  DEVICE_OS,
  ON_ROAD_CATEGORIES,
  ON_ROAD_CATEGORY_DETAILS_URL,
  ON_ROAD_ORDER_SUPPORT_URL,
} from './constants';
import axios from 'axios';
import md5 from 'js-md5';

export const phoneChange = phone => {
  return {
    type: ONROAD_PHONE_CHANGE,
    payload: phone,
  };
};

export const sendData = data => {
  return {
    type: ONROAD_SEND_DATA,
    payload: data,
  };
};

export const getCategories = token => {
  return dispatch => {
    dispatch({
      type: ON_ROAD_LOAD_CATEGORIES,
    });
    const data = {
      token: token,
    };

    axios
      .post(ON_ROAD_CATEGORIES, data)
      .then(categories => {
        let categoriesAraay = [];
        for (var category in categories.data.data) {
          categoriesAraay.push({
            id: category,
            title: categories.data.data[category],
          });
        }
        onCategoriesLoaded(dispatch, categoriesAraay);
      })
      .catch(error => {});
  };
};

const onCategoriesLoaded = (dispatch, categories) => {
  dispatch({
    type: ON_ROAD_CATEGORIES_LOADED,
    payload: categories,
  });
};

export const loadCategoryDetails = (categoryId, token) => {
  return dispatch => {
    dispatch({
      type: ON_ROAD_LOAD_CATEGORY_DETAILS,
    });
    const data = {
      token: token,
      category_id: categoryId,
    };

    axios
      .post(ON_ROAD_CATEGORY_DETAILS_URL, data)
      .then(details => {
        let detailsAraay = [];
        for (var detail in details.data.data) {
          detailsAraay.push({
            id: detail,
            title: details.data.data[detail],
          });
        }
        onCategoryDetailsLoaded(dispatch, detailsAraay);
      })
      .catch(error => {
        console.log(error);
      });
  };
};

const onCategoryDetailsLoaded = (dispatch, details) => {
  console.log(details);
  dispatch({
    type: ON_ROAD_CATEGORY_DETAILS_LOADED,
    payload: details,
  });
};

export const orderOnRoadSupport = (token, categoryId, phone) => {
  return dispatch => {
    dispatch({
      type: ON_ROAD_ORDER_SUPPORT,
    });
    const obj = {
      token: token,
      phone: phone,
      service_category_id: categoryId,
    };

    const data = JSON.stringify(obj);
    const signature = md5(SECRET_KEY + data);

    console.log(ON_ROAD_ORDER_SUPPORT_URL, obj, data, signature);

    axios
      .post(ON_ROAD_ORDER_SUPPORT_URL, data, {
        headers: {
          Signature: signature,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        onSupportOrdered(dispatch, response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
};

const onSupportOrdered = (dispatch, response) => {
  console.log('onSupportOrdered', response);
  if (response.error == 0) {
    dispatch({
      type: ON_ROAD_SUPPORT_ORDERED_SUCCESS,
    });
  } else {
    var errorMessage = 'Пожалуйста пройдите авторизацию';
    if (response.error == 3) {
      errorMessage = 'Категория услуг не найдена!';
    }
    if (response.error == 4) {
      errorMessage = 'Не передан телефон!';
    }
    dispatch({
      type: ON_ROAD_SUPPORT_ORDERED_FAIL,
      payload: errorMessage,
    });
  }
};
