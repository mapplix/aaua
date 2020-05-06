import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {MainCard, CardItem, Header, Spiner, MapButton} from '../common';
import MapView, {Marker, Callout} from 'react-native-maps';
import Modal from 'react-native-modalbox';
import {RATIO, HEIGHT, WIDTH} from '../../styles/constants';
import {connect} from 'react-redux';
import CustomMarker from './CustomMarker';
import MapFiltersComponent from './MapFiltersComponent';
import {selectCategory} from '../../Actions/DiscountsAction';
import {Actions} from 'react-native-router-flux';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';

class MapComponent extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      latitude: 50.447662,
      longitude: 30.474047,
      error: null,
    };
  }

  onChangeCategory(id) {
    this.props.selectCategory(this.props.token, id);
  }

  renderMarkers() {
    if (this.props.places.length) {
      return this.props.places.map(marker => {
        if (marker.lat) {
          const latitude = parseFloat(marker.lat);
          const longitude = parseFloat(marker.lon);
          return (
            <Marker
              key={marker.id}
              coordinate={{latitude: latitude, longitude: longitude}}>
              <Callout onPress={() => Actions.MarkerInfo(marker)}>
                <CustomMarker {...marker} />
              </Callout>
            </Marker>
          );
        }
      });
    }
  }

  requestPermission = async () => {
    try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'AAUA запрашивает доступ к геоданным',
                    'message': 'При помощи геолокации мы сможем определить Ваш адрес автоматически'
                }
            )
            console.log(granted);
            if (granted) {
                console.log("You can use the geolocation")
                this.watchId = Geolocation.watchPosition(
                  position => {
                    console.log("position-----", position);
                    this.setState({
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude,
                      error: null,
                    });
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
                console.log("Camera permission denied")
            }
        } catch (err) {
            console.warn(err)
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

  componentDidMount() {
    this.requestPermission();
  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchId);
  }

  renderContent() {
    console.log(this.state);
    const {container, map, mapSettings} = styles;
    if (this.props.loading) {
      return (
        <MainCard>
          <Spiner />
        </MainCard>
      );
    } else {
      return (
        <MainCard>
          <Header back>{this.props.selectedCategory.title || ''}</Header>
          <CardItem>
            <View style={container}>
              <MapView
                showsUserLocation={true}
                showsMyLocationButton={true}
                style={map}
                initialRegion={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                region={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}>
                {this.renderMarkers()}
              </MapView>
            </View>
            <TouchableOpacity
              onPress={() => this.setState({isOpen: true})}
              style={mapSettings}>
              <Image
                style={{
                  height: 52 * RATIO,
                  width: 52 * RATIO,
                }}
                source={require('../../images/icons/map_filters.png')}
              />
            </TouchableOpacity>
            <Modal
              style={styles.modal}
              position={'bottom'}
              ref={'modal'}
              isOpen={this.state.isOpen}
              onClosed={() => this.setState({isOpen: false})}>
              <MapFiltersComponent
                selectCategory={this.onChangeCategory.bind(this)}
                onCloseModal={() => this.setState({isOpen: false})}
              />
            </Modal>
          </CardItem>
        </MainCard>
      );
    }
  }

  render() {
    return this.renderContent();
  }
}

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  mapSettings: {
    position: 'absolute',
    right: 19,
    bottom: 24,
  },
  modal: {
    maxHeight: HEIGHT <= 640 ? '85%' : '65%',
    marginBottom: 25,
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  modalText: {
    fontFamily: 'SFUIText-Regular',
    fontSize: 19,
    color: '#423485',
  },
  modalTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  modalRow: {
    marginTop: 10,
    marginLeft: 10 * RATIO,
    marginRight: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
};

const mapStateToProps = ({auth, discounts}) => {
  return {
    token: auth.user.token,
    places: discounts.discountsPlaces,
    selectedCategory: discounts.selectedCategory,
    loading: discounts.loadingCategories,
  };
};

export default connect(
  mapStateToProps,
  {selectCategory},
)(MapComponent);
