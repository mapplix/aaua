import axios from '@aaua/axios';

import {
  GET_CAR_MODEL_URL,
  BID_KASKO_URL,
  BID_OSAGO_URL,
  CALCULATE_OSAGO_URL,
} from '@aaua/actions/constants';

import I18n from '@aaua/i18n';

class Insurance {
  orderKasko = async data => {
    const response = await axios.post(BID_KASKO_URL, data);

    console.log(' ---- orderKasko ---- ', response);
    if (response.data.error === 0) {
      return response.data;
    } else {
      return {
        error: I18n.t('messages_screen.error'),
      };
    }
  };

  orderOsago = async osagoData => {
    const data = {
      token: osagoData.token,
      city_id: osagoData.cityId,
      type_car: osagoData.carType,
    };

    const response = await axios.post(BID_OSAGO_URL, data);
    console.log(' ---- orderOsago ---- ', response);
    if (response.data.error > 0) {
      return {error: response.data.error};
    } else {
      return response.data;
    }
  };

  calculateOsago = async (token, cityId, carType) => {
    const data = {
      token: token,
      city_id: cityId,
      type_car: carType,
    };

    const response = await axios.post(CALCULATE_OSAGO_URL, data);
    if (response.data.error > 0) {
      return {error: response.data.error};
    } else {
      return response.data.data;
    }
  };

  getCarModel = async carBrandId => {
    const data = {
      brand_id: carBrandId,
    };

    const response = await axios.post(GET_CAR_MODEL_URL, data);

    return response.data;
  };
}

export default new Insurance();
