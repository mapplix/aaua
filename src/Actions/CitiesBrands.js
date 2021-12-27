import {
  BRANDS_LOADED,
  CITIES_LOADED,
  NP_CITES_LOADED,
  NP_SKLADS_LOADED,
  IMAGES_LOADED,
  WOG_BONUSES_LOADED,
} from './types';
import axios from 'axios';
import md5 from 'js-md5';
import {
  SECRET_KEY,
  CAR_BRANDS_URL,
  CITIES_URL,
  NP_CITIES_URL,
  NP_SKLADS_URL,
  IMAGES_LOAD_URL,
  saveItem,
  BASE_URL,
  WOG_BONUSES_URL,
  removeItem,
} from './constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

/*GET BRANDS*/
export const getBrands = () => {
  return dispatch => {
    AsyncStorage.getItem('brands').then(cachedBrands => {
      if (cachedBrands == null) {
        const signature = md5(SECRET_KEY);
        axios
          .get(CAR_BRANDS_URL, {
            headers: {
              Signature: signature,
            },
          })
          .then(brands => {
            saveItem('brands', JSON.stringify(brands.data.data));
            onBradsLoaded(dispatch, brands.data.data);
          });
      } else {
        onBradsLoaded(dispatch, JSON.parse(cachedBrands));
      }
    });
  };
};

// export const getBrands = async () => {
//   const cachedBrands = await AsyncStorage.getItem('brands');
//   if (cachedBrands == null) {
//     const signature = md5(SECRET_KEY);
//     axios
//       .get(CAR_BRANDS_URL, {
//         headers: {
//           Signature: signature,
//         },
//       })
//       .then(brands => {
//         saveItem('brands', JSON.stringify(brands.data.data));
//         onBradsLoaded(dispatch, brands.data.data);
//       });
//   } else {
//     onBradsLoaded(dispatch, JSON.parse(cachedBrands));
//   }
// };

const onBradsLoaded = (dispatch, brands) => {
  console.log(' brands loaded', brands);
  dispatch({
    type: BRANDS_LOADED,
    payload: brands,
  });
};

/*GET CITIES*/
export const getCities = () => {
  return dispatch => {
    AsyncStorage.getItem('cities').then(cachedCities => {
      if (cachedCities == null) {
        const signature = md5(SECRET_KEY);
        axios
          .get(CITIES_URL, {
            headers: {
              Signature: signature,
            },
          })
          .then(cities => {
            saveItem('cities', JSON.stringify(cities.data.data));
            onCitiesLoaded(dispatch, cities.data.data);
          });
      } else {
        onCitiesLoaded(dispatch, JSON.parse(cachedCities));
      }
    });
  };
};

const onCitiesLoaded = (dispatch, cities) => {
  console.log('city loaded', cities);
  dispatch({
    type: CITIES_LOADED,
    payload: cities,
  });
};

/*GET NP CITIES*/
export const getNPCities = city => {
  return dispatch => {
    const data = {
      city: city,
    };

    console.log('getNPCities', NP_CITIES_URL, data);
    axios.post(NP_CITIES_URL, data).then(cities => {
      let citiesAraay = [];
      for (var city in cities.data.data) {
        citiesAraay.push({
          id: city,
          title: cities.data.data[city],
        });
      }
      // saveItem('NPcities', JSON.stringify(citiesAraay));

      onNPCitiesLoaded(dispatch, citiesAraay);
    });
  };
};

const onNPCitiesLoaded = (dispatch, cities) => {
  console.log('onNPCitiesLoaded', cities);
  dispatch({
    type: NP_CITES_LOADED,
    payload: cities,
  });
};

/*GET NP SKLADS*/
export const getNPsklads = city => {
  console.log('getNPsklads', city);
  return dispatch => {
    const data = {
      city: city,
    };

    console.log(NP_SKLADS_URL, data);
    axios.post(NP_SKLADS_URL, data).then(sklads => {
      let skladsArray = [];
      for (var sklad in sklads.data.data) {
        skladsArray.push({
          id: sklad,
          title: sklads.data.data[sklad],
        });
      }
      console.log('sklads loaded', skladsArray);
      onNPSkladsLoaded(dispatch, skladsArray);
    });
  };
};

const onNPSkladsLoaded = (dispatch, sklads) => {
  dispatch({
    type: NP_SKLADS_LOADED,
    payload: sklads,
  });
};

/*GET SLIDER IMAGES*/
export const getSliderImages = token => {
  return dispatch => {
    const data = {
      token: token,
    };

    axios.post(IMAGES_LOAD_URL, data).then(images => {
      let imagesArray = [];
      var index = 0;
      for (var image in images.data.data) {
        imagesArray.push({
          id: index,
          url: BASE_URL + images.data.data[image].pic,
          title: images.data.data[image].title,
          is_content: images.data.data[image].is_content,
          content: images.data.data[image].content,
        });
        index++;
      }

      onImagesLoaded(dispatch, imagesArray);
    });
  };
};

const onImagesLoaded = (dispatch, images) => {
  dispatch({
    type: IMAGES_LOADED,
    payload: images,
  });
};

export const getBonusesWog = token => {
  return dispatch => {
    const data = {
      token: token,
    };

    axios.post(WOG_BONUSES_URL, data).then(bonuses => {
      onBonusesLoaded(dispatch, bonuses.data);
    });
  };
};

const onBonusesLoaded = (dispatch, data) => {
  dispatch({
    type: WOG_BONUSES_LOADED,
    payload: data,
  });
};
