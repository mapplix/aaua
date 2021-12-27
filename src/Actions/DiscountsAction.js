import {
  DISCOUNTS_LOADING_CATEGORIES,
  DISCOUNTS_LOADING_CATEGORIES_SUCCESS,
  DISCOUNTS_LOADING_CATEGORIES_FAIL,
  DISCOUNTS_LOADING_CARDS,
  DISCOUNTS_LOADING_CARDS_SUCCESS,
  DISCOUNTS_LOADING_CARDS_FAIL,
  SELECT_DISCOUNT_CARD,
  DISCOUNT_PLACES_LOADED,
} from './types';
import axios from 'axios';
import md5 from 'js-md5';
import {
  SECRET_KEY,
  DISCOUNTS_CATEGORIES_URL,
  DISCOUNTS_CARDS_URL,
  DISCOUNTS_PLACES_URL,
} from './constants';

export const loadCategories = token => {
  return dispatch => {
    const data = {
      token: token,
    };

    axios.post(DISCOUNTS_CATEGORIES_URL, data).then(categories => {
      categoriesLoaded(dispatch, categories.data);
    });
  };
};

const categoriesLoaded = (dispatch, categories) => {
  console.log('----categoriesLoaded = ', categories);
  if (categories.error == 0) {
    let categoriesAraay = [];
    for (var category in categories.data) {
      categoriesAraay.push({
        id: categories.data[category].id,
        title: categories.data[category].title,
      });
    }

    dispatch({
      type: DISCOUNTS_LOADING_CATEGORIES_SUCCESS,
      payload: categoriesAraay,
    });
  } else {
    dispatch({
      type: DISCOUNTS_LOADING_CATEGORIES_FAIL,
      payload: categories.error,
    });
  }
};

export const loadCards = token => {
  return dispatch => {
    // dispatch({
    //   type: DISCOUNTS_LOADING_CARDS,
    // });

    const data = {
      token: token,
    };

    axios.post(DISCOUNTS_CARDS_URL, data).then(cards => {
      cardsLoaded(dispatch, cards.data);
    });
  };
};

const cardsLoaded = (dispatch, cards) => {
  if (cards.error == 0) {
    dispatch({
      type: DISCOUNTS_LOADING_CARDS_SUCCESS,
      payload: cards.data,
    });
  } else {
    dispatch({
      type: DISCOUNTS_LOADING_CARDS_FAIL,
      payload: cards.error,
    });
  }
};

export const selectCard = card => {
  return {
    type: SELECT_DISCOUNT_CARD,
    payload: card,
  };
};

export const loadCategoryPlaces = (token, category) => {
  return dispatch => {
    // dispatch({
    //   type: DISCOUNTS_LOADING_CATEGORIES,
    // });

    const data = {
      token: token,
      parent: category.id,
    };

    axios.post(DISCOUNTS_PLACES_URL, data).then(places => {
      placesLoaded(dispatch, places.data, category);
    });
  };
};

const placesLoaded = (dispatch, places, category) => {
  console.log('-----placesLoaded-----', places)
  dispatch({
    type: DISCOUNT_PLACES_LOADED,
    payload: places.data || [],
  });
};
