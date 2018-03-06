import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {
    MainCard,
    CardItem,
    Header,
    ModalCard,
    MapButton } from '../common';
import MapView from 'react-native-maps';
import Modal from 'react-native-modalbox';
import {RATIO} from '../../styles/constants';

class MapComponent extends Component {

    state = {
        isOpen: false,
    };

    render() {
        const {
            container,
            map,
            mapSettings,
            modalCard,
            modalTextContainer,
            modalRow} = styles;
        return (
            <MainCard>
                <Header back>
                    ТОРГОВЫЕ ЦЕНТРЫ
                </Header>
                <CardItem>
                    <View style={container}>
                        <MapView
                            style={
                                map
                            }
                            initialRegion={{
                                latitude: 37.78825,
                                longitude: -122.4324,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        />
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
                    <ModalCard style={modalCard}>
                        <View style={modalRow}>
                            <MapButton
                                onPress={() => console.log('fdsfsdf')}
                            >
                                СТО
                            </MapButton>
                            <MapButton
                                onPress={() => console.log('fdsfsdf')}
                            >
                                Шиномонтаж
                            </MapButton>
                            <MapButton
                                onPress={() => console.log('fdsfsdf')}
                            >
                                Мойка
                            </MapButton>
                        </View>
                        <View style={modalRow}>
                            <MapButton
                                onPress={() => console.log('fdsfsdf')}
                            >
                                Торговые центры
                            </MapButton>
                            <MapButton
                                onPress={() => console.log('fdsfsdf')}
                            >
                                Супермаркет
                            </MapButton>
                        </View>
                        <View style={modalRow}>
                            <MapButton
                                onPress={() => console.log('fdsfsdf')}
                            >
                                Аптека
                            </MapButton>
                            <MapButton
                                onPress={() => console.log('fdsfsdf')}
                            >
                                Клиники
                            </MapButton>
                            <MapButton
                                onPress={() => console.log('fdsfsdf')}
                            >
                                Стоматология
                            </MapButton>
                        </View>
                        <View style={modalRow}>
                            <MapButton
                                onPress={() => console.log('fdsfsdf')}
                            >
                                Химчистка
                            </MapButton>
                            <MapButton
                                onPress={() => console.log('fdsfsdf')}
                            >
                                Отдых
                            </MapButton>
                        </View>
                        <View style={modalRow}>
                            <MapButton
                                onPress={() => console.log('fdsfsdf')}
                            >
                                Красота и здоровье
                            </MapButton>
                            <MapButton
                                onPress={() => console.log('fdsfsdf')}
                            >
                                Все для авто
                            </MapButton>
                        </View>
                        <View style={modalRow}>
                            <MapButton
                                onPress={() => console.log('fdsfsdf')}
                            >
                                Рестораны
                            </MapButton>
                            <MapButton
                                onPress={() => console.log('fdsfsdf')}
                            >
                                Кафе
                            </MapButton>
                            <MapButton
                                onPress={() => console.log('fdsfsdf')}
                            >
                                Одежда, обувь
                            </MapButton>
                        </View>
                        <View style={[modalRow, {marginBottom: 12}]}>
                            <View style={{
                                flex:1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontFamily: 'SFUIText-Regular',
                                    color:'#423486',
                                    fontSize: 16
                                }}>
                                    Закрыть
                                </Text>
                            </View>
                            <View style={{
                                flex:1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontFamily: 'SFUIText-Semibold',
                                    color:'#423486',
                                    fontSize: 16
                                }}>
                                    Применить
                                </Text>
                            </View>
                        </View>
                    </ModalCard>
                </Modal>
            </MainCard>
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

export default MapComponent;