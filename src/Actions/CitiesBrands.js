import {
    BRANDS_LOADED,
    CITIES_LOADED,
    NP_CITES_LOADED,
    NP_SKLADS_LOADED,
    IMAGES_LOADED
} from '../Actions/types';
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
    removeItem
} from './constants';
import {AsyncStorage} from 'react-native';

/*GET BRANDS*/
export const getBrands = () => {

    return (dispatch) => {
    AsyncStorage.getItem('brands').then(
        (cachedBrands) => {
            if (cachedBrands == null) {
                const signature = md5(SECRET_KEY)
                axios.get(CAR_BRANDS_URL, {
                        headers: {
                            'Signature': signature
                        }
                    }
                )
                    .then(brands => {
                        saveItem('brands', JSON.stringify(brands.data.data));
                        onBradsLoaded(dispatch, brands.data)
                    })
            } else {
                onBradsLoaded(dispatch, JSON.parse(cachedBrands))
            }
        })
    }
}

const onBradsLoaded = (dispatch, brands) => {
console.log(' brands loaded', brands)
    dispatch({
        type: BRANDS_LOADED,
        payload: brands
    })
}

/*GET CITIES*/
export const getCities = () => {
    return (dispatch) => {

        AsyncStorage.getItem('cities').then(
            (cachedCities) => {
                if (cachedCities == null) {
                    const signature = md5(SECRET_KEY)
                    axios.get(CITIES_URL, {
                            headers: {
                                'Signature': signature
                            }
                        }
                    )
                        .then(cities => {
                            saveItem('cities', JSON.stringify(cities.data.data));
                            onCitiesLoaded(dispatch, cities.data)
                        })
                } else {
                    onCitiesLoaded(dispatch, JSON.parse(cachedCities))
                }
            })
    }
}

const onCitiesLoaded = (dispatch, cities) => {
console.log('city loaded', cities)
    dispatch({
        type: CITIES_LOADED,
        payload: cities
    })
}

/*GET NP CITIES*/
export const getNPCities = () => {
    return (dispatch) => {

        AsyncStorage.getItem('NPcities').then(
            (NPcachedCities) => {
                if (NPcachedCities == null) {
                    const signature = md5(SECRET_KEY)
console.log('get np cities', NP_CITIES_URL, signature);
                    axios.get(NP_CITIES_URL, {
                            headers: {
                                'Signature': signature
                            }
                        }
                    )
                        .then(cities => {
                            let citiesAraay = [];
                            for (var city in cities.data.data) {
                                 citiesAraay.push({
                                     id : city,
                                     title : cities.data.data[city]
                                 })
                            }
                            saveItem('NPcities', JSON.stringify(citiesAraay));
                console.log(citiesAraay);
                            onNPCitiesLoaded(dispatch, citiesAraay)
                        })
                } else {
                    onNPCitiesLoaded(dispatch, JSON.parse(NPcachedCities))
                }
            })
    }
}

const onNPCitiesLoaded = (dispatch, cities) => {
    dispatch({
        type: NP_CITES_LOADED,
        payload: cities
    })
}

/*GET NP SKLADS*/
export const getNPsklads = (city) => {
    return (dispatch) => {

        const obj = {
                "city" : city
            }

        const data = JSON.stringify(obj);
        const signature = md5(SECRET_KEY + data)

console.log(NP_SKLADS_URL, data, signature);
        axios.post(NP_SKLADS_URL, data, {
                headers: {
                    'Signature' : signature,
                    'Content-Type': 'application/json',
                }
            }
        )
            .then( sklads => {

                let skladsArray = [];
                for (var sklad in sklads.data.data) {
                    skladsArray.push({
                        id : sklad,
                        title : sklads.data.data[sklad]
                    })
                }

                onNPSkladsLoaded(dispatch, skladsArray)
            })
    }
}

const onNPSkladsLoaded = (dispatch, sklads) => {
    dispatch({
        type: NP_SKLADS_LOADED,
        payload: sklads
    })
}

/*GET SLIDER IMAGES*/
export const getSliderImages = (token) => {
    return (dispatch) => {

        /*AsyncStorage.getItem('sliderImages').then(
            (cachedImages) => {
                if (cachedImages == null) {*/

                    const obj = {
                        "token" : token,
                    };

                    const data = JSON.stringify(obj);
                    const signature = md5(SECRET_KEY + data)
console.log(IMAGES_LOAD_URL, data, signature);
                    axios.post(IMAGES_LOAD_URL, data, {
                            headers: {
                                'Signature' : signature,
                                'Content-Type': 'application/json',
                            }
                        }
                    )
                        .then(images => {

                            let imagesArray = [];
                            var index = 0;
                            for (var image in images.data.data) {
                                imagesArray.push({
                                    id : index,
                                    url : BASE_URL + images.data.data[image].pic
                                })
                                index++
                            }

                    // saveItem('sliderImages', JSON.stringify(imagesArray));
                            console.log(imagesArray);
                            onImagesLoaded(dispatch, imagesArray)
                        })
                /*} else {
                    onImagesLoaded(dispatch, JSON.parse(cachedImages))
                }
            })*/
    }
}

const onImagesLoaded = (dispatch, images) => {
    dispatch({
        type:IMAGES_LOADED,
        payload: images
    })
}