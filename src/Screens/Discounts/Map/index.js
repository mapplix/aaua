import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker, CalloutSubview, Callout} from 'react-native-maps';
import Modal from 'react-native-modalbox';
import {useSelector, useDispatch} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import I18n from '@aaua/i18n';

import CustomMarker from '@aaua/components/Discounts/CustomMarker';
import {BASE_URL} from '@aaua/actions/constants';
import CustomCallout from '@aaua/components/Discounts/CustomCallout';
import MapFiltersComponent from '@aaua/components/Discounts/MapFiltersComponent';
import {
  MainCard,
  CardItem,
  Header,
  Spiner,
  MapButton,
} from '@aaua/components/common';

import {RATIO, HEIGHT, WIDTH} from '@aaua/styles/constants';

import {loadCategoryPlaces} from '@aaua/actions/DiscountsAction';

import styles from './styles';

const Map = ({selectedCategory}) => {
  const dispatch = useDispatch();

  // latitudeDelta: 30.516674942314864,
  // longitudeDelta: 50.4037542202435,

  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState(selectedCategory);
  const [latitude, setLatitude] = useState(50.447662);
  const [longitude, setLongitude] = useState(30.474047);
  const [error, setError] = useState(null);

  const {auth, discounts} = useSelector(state => state);
  const {token} = auth.user;
  const {discountsPlaces: places, loadingCategories: loading} = discounts;
  let watchId = null;

  useEffect(() => {
    if (Platform.OS == 'android') {
      requestPermission();
    }
    return () => {
      if (watchId) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, []);

  useEffect(() => {
    
    if (category) {
      dispatch(loadCategoryPlaces(token, category));
    }
  }, [category]);

  const onChangeCategory = cat => {
    setCategory(cat);
  };

  const renderMarkers = () => {
    if (places) {
      return places.map(marker => {
        if (marker.lat) {
          const latitude = parseFloat(marker.lat);
          const longitude = parseFloat(marker.lon);
          const imageArray = marker.img.split('/');
          const uri = BASE_URL + marker.img;
          const thumbImg = BASE_URL + marker.thumb;
          
          return (
            <Marker
              onPress={e => {
                Actions.MarkerInfo(marker);
              }}
              key={marker.id}
              coordinate={{latitude: latitude, longitude: longitude}}>
              <CustomCallout uri={thumbImg} />
            </Marker>
          );
        }
      });
    }
  };

  const requestPermission = async () => {
    try {
      // geolocation.requestAuthorization();

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: I18n.t('location_request.title'),
          message: I18n.t('location_request.message'),
        },
      );
      console.log(granted);
      if (granted) {
        console.log('You can use the geolocation');
        watchId = Geolocation.watchPosition(
          position => {
            // setLatitude(position.coords.latitude);
            // setLongitude(position.coords.longitude);
            setError(null);
          },
          error => console.log(error.message),
          {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000,
            distanceFilter: 10,
          },
        );
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }

    // console.log("PERMISSIONS", PERMISSIONS);
    // check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(
    //     result => {
    //       this.watchId = Geolocation.watchPosition(
    //           position => {
    //             console.log(position);
    //             this.setState({
    //               latitude: position.coords.latitude,
    //               longitude: position.coords.longitude,
    //               error: null,
    //             });
    //           },
    //           error => console.log(error.message),
    //           {
    //             enableHighAccuracy: true,
    //             timeout: 20000,
    //             maximumAge: 1000,
    //             distanceFilter: 10,
    //           },
    //       );
    //     },
    //     result => {
    //       console.log('Not Granted!');
    //       console.log(result);
    //     },
    // );
  };

  const renderContent = () => {
    const {container, map, mapSettings} = styles;
    if (loading) {
      return (
        <MainCard>
          <Spiner />
        </MainCard>
      );
    } else {
      return (
        <MainCard>
          <Header back>{category.title || ''}</Header>
          <CardItem>
            <View style={container}>
              <MapView
                showsUserLocation={true}
                showsMyLocationButton={true}
                style={map}
                initialRegion={{
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                region={{
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}>
                {renderMarkers()}
              </MapView>
            </View>
            <TouchableOpacity
              onPress={() => setIsOpen(true)}
              style={mapSettings}>
              <Image
                style={{
                  height: 52 * RATIO,
                  width: 52 * RATIO,
                }}
                source={require('@aaua/images/icons/map_filters.png')}
              />
            </TouchableOpacity>
            <Modal
              style={styles.modal}
              position={'bottom'}
              // ref={modalRef}
              isOpen={isOpen}
              onClosed={() => setIsOpen(false)}>
              <MapFiltersComponent
                selectedCategory={category}
                selectCategory={onChangeCategory}
                onCloseModal={() => setIsOpen(false)}
              />
            </Modal>
          </CardItem>
        </MainCard>
      );
    }
  };

  return renderContent();
};

export default Map;
