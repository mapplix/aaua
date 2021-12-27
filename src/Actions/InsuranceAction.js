import {
  INSURANCE_CHANGE_VOLUME,
  INSURANCE_CHANGE_REGISTRATION,
  INSURANCE_CAR_CHANGE,
  INSURANCE_CAR_BRAND_CHANGE,
  INSURANCE_YEAR_CHANGE,
  ORDER_OSAGO_START,
  ORDER_KASKO_START,
  INSURANCE_CAR_BRAND_SELECT,
  INSURANCE_CHANGE_OSAGO_CITY,
  INSURANCE_SELECT_OSAGO_CITY,
  KASKO_LOAD_CAR_MODEL,
  MODELS_LOADED_SUCCESS,
  SELECT_CAR_MODEL,
  KASKO_ORDER_SUCCESS,
  KASKO_ORDER_FAIL,
  KASKO_LOAD_CAR_TYPES,
  KASKO_LOAD_CAR_TYPES_SUCCESS,
  CALCULATE_OSAGO_START,
  CALCULATE_OSAGO_SUCCESS,
  OSAGO_ORDER_SUCCESS,
  OSAGO_ORDER_FAIL,
  RESET_INSURANCE_DATA,
} from './types';
import {
  SECRET_KEY,
  DEVICE_OS,
  GET_CAR_MODEL_URL,
  BID_KASKO_URL,
  GET_CAR_TYPES_URL,
  CALCULATE_OSAGO_URL,
  BID_OSAGO_URL,
} from './constants';
import axios from 'axios';
import md5 from 'js-md5';

export const changeCar = carId => {
  return {
    type: INSURANCE_CAR_CHANGE,
    payload: carId,
  };
};

export const changeCarBrand = brand => {
  return {
    type: INSURANCE_CAR_BRAND_CHANGE,
    payload: brand,
  };
};

export const selectBrand = brand => {
  return {
    type: INSURANCE_CAR_BRAND_SELECT,
    payload: brand,
  };
};

export const changeYear = year => {
  return {
    type: INSURANCE_YEAR_CHANGE,
    payload: year,
  };
};

export const changeVolume = volume => {
  return {
    type: INSURANCE_CHANGE_VOLUME,
    payload: volume,
  };
};

export const changeRegistration = registration => {
  return {
    type: INSURANCE_CHANGE_REGISTRATION,
    payload: registration,
  };
};

export const changeOsagoCity = city => {
  return {
    type: INSURANCE_CHANGE_OSAGO_CITY,
    payload: city.title,
  };
};

export const selectOsagoCity = city => {
  return {
    type: INSURANCE_SELECT_OSAGO_CITY,
    payload: city,
  };
};

/*ORDER KASKO*/
export const orderKasko = kaskoObj => {
  return dispatch => {
    dispatch({
      type: ORDER_KASKO_START,
    });

    const data = kaskoObj;

    axios
      .post(BID_KASKO_URL, data)
      .then(result => KaskoSuccess(dispatch, result.data))
      .catch(error => {
        console.log(error);
      });
  };
};

const KaskoSuccess = (dispatch, response) => {
  console.log('KaskoSuccess', response);
  if (response.error == 0) {
    dispatch({
      type: KASKO_ORDER_SUCCESS,
      payload: response,
    });
  } else if (response.error >= 1) {
    dispatch({
      type: KASKO_ORDER_FAIL,
    });
  }
};

export const getCarModel = carBrandId => {
  return dispatch => {
    // dispatch({
    //   type: KASKO_LOAD_CAR_MODEL,
    // });

    const data = {
      brand_id: carBrandId,
    };

    axios
      .post(GET_CAR_MODEL_URL, data)
      .then(models => getModelSucces(dispatch, models.data))
      .catch(error => {
        console.log(error);
      });
  };
};

const getModelSucces = (dispatch, models) => {
  console.log(models);
  if (models.error == 0) {
    dispatch({
      type: MODELS_LOADED_SUCCESS,
      payload: models.data,
    });
  }
};

export const selectModel = model => {
  return {
    type: SELECT_CAR_MODEL,
    payload: model,
  };
};

/* ORDER OSAGO*/
export const orderOsago = osagoData => {
  return dispatch => {
    dispatch({
      type: ORDER_OSAGO_START,
    });

    const data = {
      token: osagoData.token,
      city_id: osagoData.cityId,
      type_car: osagoData.carType,
    };

    axios
      .post(BID_OSAGO_URL, data)
      .then(response => osagoSuccess(dispatch, response.data))
      .catch(error => {
        console.log(error);
      });
  };
};

const osagoSuccess = (dispatch, response) => {
  console.log('order osago Success', response);
  if (response.error == 0) {
    dispatch({
      type: OSAGO_ORDER_SUCCESS,
      payload: response,
    });
  } else if (response.error >= 1) {
    dispatch({
      type: OSAGO_ORDER_FAIL,
    });
  }
};

/* CALCULATE OSAGO*/
export const calculateOsago = (token, cityId, carType) => {
  return dispatch => {
    // dispatch({
    //   type: CALCULATE_OSAGO_START,
    // });

    const data = {
      token: token,
      city_id: cityId,
      type_car: carType,
    };

    axios
      .post(CALCULATE_OSAGO_URL, data)
      .then(response => calculationSuccess(dispatch, response.data))
      .catch(error => {
        console.log(error);
      });
  };
};

const calculationSuccess = (dispatch, response) => {
  console.log('calculationSuccess', response);
  if (response.error == 0) {
    dispatch({
      type: CALCULATE_OSAGO_SUCCESS,
      payload: response.data,
    });
  } else if (response.error >= 1) {
    console.log(response);
    // dispatch({
    //     type: SEND_SMS_FAIL
    // })
  }
};

export const getCarType = () => {
  return dispatch => {
    dispatch({
      type: KASKO_LOAD_CAR_TYPES,
    });
    const data = JSON.stringify({});
    const signature = md5(SECRET_KEY);
    console.log(GET_CAR_TYPES_URL, signature);
    axios
      .post(GET_CAR_TYPES_URL, data, {
        headers: {
          Signature: signature,
        },
      })
      .then(types => getCarTypesSucces(dispatch, types))
      .catch(error => {
        console.log(error);
      });
  };
};

const getCarTypesSucces = (dispatch, types) => {
  console.log('getCarTypesSucces', types);
  dispatch({
    type: KASKO_LOAD_CAR_TYPES_SUCCESS,
    payload: types.data,
  });
};

export const resetData = () => {
  return {
    type: RESET_INSURANCE_DATA,
  };
};
