import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {
    MainCard,
    CardItem,
    Header,
    Spiner,
    MapButton } from '../common';
import MapView,{Marker, Callout} from 'react-native-maps';
import Modal from 'react-native-modalbox';
import {RATIO} from '../../styles/constants';
import {connect} from 'react-redux';
import CustomMarker from './CustomMarker';
import MapFiltersComponent from './MapFiltersComponent';
import {selectCategory} from '../../Actions/DiscountsAction';

class MapComponent extends Component {

    state = {
        isOpen: false,
    };

    onChangeCategory(id) {
        console.log('onChangeCategory', id);
        this.props.selectCategory(this.props.token, id);
    }

    renderMarkers() {
        console.log(this.props);
        if (this.props.places.length) {
            return this.props.places.map(marker => {
                if (marker.lat) {
                    const latitude = parseFloat(marker.lat);
                    const longitude = parseFloat(marker.lon);
                    return (
                        <Marker
                            key={marker.id}
                            coordinate={{latitude: latitude, longitude: longitude}}
                            >
                            <Callout>
                                <CustomMarker {...marker}/>
                            </Callout>
                        </Marker>
                    )
                }
            })
        }
    }

    renderContent() {
        const {
            container,
            map,
            mapSettings} = styles;
        if (this.props.loading) {
            return (
                <MainCard>
                    <Spiner />
                </MainCard>
            )
        } else {
            return (
                <MainCard>
                    <Header back>
                        {this.props.selectedCategory.title || ''}
                    </Header>
                    <CardItem>
                        <View style={container}>
                            <MapView
                                style={
                                    map
                                }
                                initialRegion={{
                                    latitude: 50.447662,
                                    longitude: 30.474047,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}

                            >
                                {this.renderMarkers()}
                            </MapView>
                        </View>
                        <TouchableOpacity
                            onPress={() => this.setState({isOpen: true})}
                            style={mapSettings}
                        >
                            <Image
                                style={{
                                    height: 52 * RATIO,
                                    width: 52 * RATIO,
                                }}
                                source={require('../../images/icons/map_filters.png')}
                            />
                        </TouchableOpacity>
                    </CardItem>
                    <Modal style={styles.modal}
                           position={"bottom"}
                           ref={"modal"}
                           isOpen={this.state.isOpen}
                           onClosed={() => this.setState({isOpen: false})}
                    >
                        <MapFiltersComponent
                            selectCategory={this.onChangeCategory.bind(this)}
                            onCloseModal={() => this.setState({isOpen: false})}
                        />
                    </Modal>
                </MainCard>
            )
        }
    }

    render() {
console.log('render map', this.props);
        return (
             this.renderContent()
        )
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
        bottom: 24
    },
    modal: {
        height: 325,
        marginBottom: 25,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    modalCard: {
        height: 300,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginRight: 13,
        // backgroundColor: 'rgba(0,0,0,0)'
    },
    modalText: {
        fontFamily: 'SFUIText-Regular',
        fontSize: 19,
        color:'#423485'
    },
    modalTextContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    modalRow: {
        marginTop: 10,
        marginLeft: 10 * RATIO,
        marginRight: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
};

const mapStateToProps = ({auth, discounts}) => {
    return {
        token: auth.user.token,
        places: discounts.discountsPlaces,
        selectedCategory: discounts.selectedCategory,
        loading: discounts.loadingCategories
    }
}

export default connect(mapStateToProps, {selectCategory})(MapComponent);