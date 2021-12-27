import {
  ADD_CARD,
  ORDER_CARD,
  ADD_CARD_SUCCESS,
  ADD_CARD_FAIL,
  ORDER_AAUA_CARD_SUCCESS,
  ORDER_AAUA_CARD_FAIL,
  NP_CITY_CHANGE,
  DELIVERY_CHANGE,
  ADDRESS_CHANGE,
  COMMENT_CHANGE,
  DELETE_AAUA_CARD,
  ADD_AAUA_CARD,
  MY_AAUA_CARD,
  AAUA_CARD_NUMBER_CHANGE,
  MY_AAUA_CARD_LOADED,
  MY_AAUA_CARD_FAIL,
  AAUA_ORDERING_CHANGE_PHONE,
  CHANGE_NP_SKLAD,
  ORDER_CARD_CITY_SELECTED,
  ORDER_CARD_CITY_CHANGE,
  ORDER_CARD_SELECT_ADDRESS,
  NP_CITIES_CLEAN,
  DISCOUNTS_LOADING_CARDS,
  AZS_LOADED,
  QR_ERROR,
} from './types';
import {
  SECRET_KEY,
  MY_AAUA_CARD_URL,
  ORDER_AAUA_CARD_URL,
  ADD_AAUA_CARD_URL,
  AZS_URL,
  GET_WOG_QR,
} from './constants';
import axios from 'axios';
import md5 from 'js-md5';
import {Actions} from 'react-native-router-flux';

export const changeDelivery = delivery => {
  return {
    type: DELIVERY_CHANGE,
    payload: delivery,
  };
};

export const changeCity = city => {
  return {
    type: ORDER_CARD_CITY_CHANGE,
    payload: city,
  };
};

export const selectCity = city => {
  return {
    type: ORDER_CARD_CITY_SELECTED,
    payload: city,
  };
};

export const changeNPCity = city => {
  return {
    type: NP_CITY_CHANGE,
    payload: city,
  };
};

export const cleanNPCities = () => {
  console.log(' cleanNPCities action');
  return {
    type: NP_CITIES_CLEAN,
  };
};

export const changeAddress = address => {
  return {
    type: ADDRESS_CHANGE,
    payload: address,
  };
};

export const selectAddress = address => {
  return {
    type: ORDER_CARD_SELECT_ADDRESS,
    payload: address,
  };
};

export const changeNPSkald = value => {
  return {
    type: CHANGE_NP_SKLAD,
    payload: value,
  };
};

export const changeCardNumber = text => {
  return {
    type: AAUA_CARD_NUMBER_CHANGE,
    payload: text,
  };
};

export const changePhone = phone => {
  return {
    type: AAUA_ORDERING_CHANGE_PHONE,
    payload: phone,
  };
};

// export const addCard = card => {
//   return dispatch => {
//     dispatch({
//       type: ORDER_CARD,
//     });

//     const obj = {
//       token: card.token,
//       number: card.number,
//     };

//     const data = JSON.stringify(obj);
//     const signature = md5(SECRET_KEY + data);

//     console.log('ACTION ADD CARD', data, signature);

//     axios
//       .post(ADD_AAUA_CARD_URL, data, {
//         headers: {
//           Signature: signature,
//           'Content-Type': 'application/json',
//         },
//       })
//       .then(response => addCardSuccess(dispatch, response.data));
//   };
// };

export const addCardSuccess = (dispatch, response) => {
  console.log('ADD CARD RESPONSE', response);
  if (response.error == 0) {
    dispatch({
      type: ADD_CARD_SUCCESS,
    });
    Actions.AAUA_main();
  } else {
    var errorMsg = 'Произошла ошибка, попробуйте позже';
    if (response.error == 2) {
      errorMsg = 'Данные устарели. Пройдите авторизацию';
    }
    if (response.error == 3) {
      errorMsg = 'Не передана карта';
    }
    if (response.error == 4) {
      errorMsg = 'Карта в базе не найдена';
    }
    dispatch({
      type: ADD_CARD_FAIL,
      payload: errorMsg,
    });
  }
};

export const orderCard = card => {
  return dispatch => {

    axios
      .post(ORDER_AAUA_CARD_URL, card)
      .then(response =>
        orderCardSuccess(dispatch, response.data, card.isvirtual == 1),
      );
  };
};

export const orderCardSuccess = (dispatch, data, virtual) => {
  console.log('orderCardSuccess', data, data.error == 0);
  if (data.error == 0) {
    dispatch({
      type: ORDER_AAUA_CARD_SUCCESS,
      payload: virtual ? 'virtual' : 'notVirtual',
    });
    // Actions.AAUA_main();
  } else {
    dispatch({
      type: ORDER_AAUA_CARD_FAIL,
      payload: 'Заявка не прошла валидацию',
    });
  }
};

export const deleteCard = cardId => {
  return {
    type: DELETE_AAUA_CARD,
    payload: cardId,
  };
};

export const getMyCard = token => {
  return async dispatch => {
    dispatch({
      type: MY_AAUA_CARD,
    });
    const data = {
      token: token,
    };
console.log('----getMyCard----')
    
    let card = await axios.post(MY_AAUA_CARD_URL, data);
    if (card.data && card.data.error == 0) {
      console.log('USER HAS CARD', card.data);
      let QR = await axios.post(GET_WOG_QR, data);
      let cardObj = {...card.data.data, qr: null};
      console.log('QR FOR CARD - ', QR.data, cardObj);
      if (QR.data && QR.data.error == 0) {
        console.log('QR - ', QR.data.data);
        cardObj.qr = QR.data.data;
      } else {
        console.log('GET QR WOG ERROR', QR.data.error_wog);
        dispatch({
          type: QR_ERROR,
          payload: QR.data.error_wog,
        });
      }
      getCardSuccess(dispatch, cardObj);
    } else {
      console.log('GET CARD ERROR - ', card.error);
      dispatch({
        type: MY_AAUA_CARD_FAIL,
        payload: 'Токен неверен либо устарел. Пройдите авторизацию',
      });
    }
    // .then(card => getCardSuccess(dispatch, card.data))
    // .catch((error) => {
    //     console.log(error)
    // })
  };
};

const getCardSuccess = (dispatch, card) => {
  console.log('getCardSuccess', card);
  dispatch({
    type: MY_AAUA_CARD_LOADED,
    payload: card,
    // payload: '12345678954'
  });
};

export const changeComment = text => {
  return {
    type: COMMENT_CHANGE,
    payload: text,
  };
};

export const getAZSList = token => {
  return dispatch => {
    const data = {
      token: token,
      limit: 20,
      offset: 0,
    };

    axios.post(AZS_URL, data).then(items => {
      console.log('AZS_LOADED', items);
      dispatch({
        type: AZS_LOADED,
        payload: items.data,
      });
    });
  };
};
