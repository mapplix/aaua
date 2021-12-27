import {
  DISCOUNTS_LOADING_CATEGORIES,
  DISCOUNTS_LOADING_CATEGORIES_SUCCESS,
  DISCOUNTS_LOADING_CATEGORIES_FAIL,
  DISCOUNTS_LOADING_CARDS,
  DISCOUNTS_LOADING_CARDS_SUCCESS,
  DISCOUNTS_LOADING_CARDS_FAIL,
  SELECT_DISCOUNT_CARD,
  DISCOUNT_PLACES_LOADED,
} from '../actions/types';
import {Actions} from 'react-native-router-flux';

const INITIAL_STATE = {
  loadingCategories: true,
  loadingCards: true,
  categories: [],
  discountsCards: [],
  selectedCard: null,
  discountsPlaces: [],
  selectedCategory: null,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DISCOUNTS_LOADING_CATEGORIES:
      return {...state, loadingCategories: true, discountsPlaces: []};
    case DISCOUNTS_LOADING_CATEGORIES_SUCCESS:
      return {...state, loadingCategories: false, categories: action.payload};
    case DISCOUNTS_LOADING_CATEGORIES_FAIL:
      return {...state, loadingCategories: false};
    case DISCOUNTS_LOADING_CARDS:
      return {...state, loadingCards: true, selectedCard: null};
    case DISCOUNTS_LOADING_CARDS_SUCCESS:
      return {...state, loadingCards: false, discountsCards: action.payload};
    case DISCOUNTS_LOADING_CARDS_FAIL:
      return {...state, loadingCards: false};
    case SELECT_DISCOUNT_CARD:
      Actions.discontCard();
      return {...state, selectedCard: action.payload};
    case DISCOUNT_PLACES_LOADED:
      return {
        ...state,
        discountsPlaces: action.payload,
        selectedCategory: action.selectedCategory,
        loadingCategories: false,
      };
    default:
      return state;
  }
};
