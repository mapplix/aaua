import React,{Component} from 'react';
import {View, Text, Linking} from 'react-native';
import {connect} from 'react-redux';
import {
    MainCard,
    CardItem,
    ButtonRoundet,
    LabelOnInput,
    Header,
    Autocomplete,
    Spiner,
    DropDown} from '../common'
import {RATIO} from '../../styles/constants';
import {CITIES, DEVICE_OS, iOS} from '../../Actions/constants';
import {
    changeRegistration,
    changeVolume,
    orderOsago,
    changeOsagoCity,
    selectOsagoCity,
    getCarType,
    calculateOsago,
    resetData
} from '../../Actions/InsuranceAction';
import {getCities} from '../../Actions/CitiesBrands';
import {Actions} from 'react-native-router-flux';
import {showAlert} from '../Modals';

class OsagoComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchedCities: [],
            rowHeight: 2,
            cityId: null,
            carType: null
        };
    };

    onChangeVolume(itemValue){
console.log(itemValue)
        this.props.changeVolume(itemValue);
        this.setState({carType:itemValue});
        if (this.state.cityId != null) {
            this.props.calculateOsago(this.props.token, this.state.cityId, itemValue)
        }
    }

    onChangeCity(itemValue){
        if (itemValue.length >= 2) {
            this.searchedCities(itemValue);
        }
        this.props.changeOsagoCity(itemValue);
    }

    onSelectCity(city){
        this.props.selectOsagoCity(city);
        this.setState({searchedCities: [], cityId:city, rowHeight:2});
        if (this.state.carType != null) {
            this.props.calculateOsago(this.props.token, city, this.state.carType)
        }
    }

    onOrder() {
        const {token, carType, cityId} = this.props;
        const orderData = {
            token, carType, cityId
        }
console.log(orderData);
        this.props.orderOsago(orderData);
    }

    searchedCities = (searchedText) => {
        var searchedItems = this.props.cities.filter(function(item) {
            return item.title.toLowerCase().indexOf(searchedText.toLowerCase()) == 0;
        });
        if (searchedText.length <= 0) {
            searchedItems = []
        }
        if (searchedItems.length == 1) {
            this.onSelectCity(searchedItems[0])
            this.setState({searchedCities: []});
        }
        this.props.cities.some(e => {
            if (e.title.toLowerCase() === searchedText.toLowerCase().trim()) {
                this.onSelectCity(e)
                this.setState({searchedCities: []});
            }
        })
        if (searchedItems.length == 0) {
            this.setState({rowHeight:2})
        } else if (searchedItems.length <= 10) {
            this.setState({rowHeight:3})
        } else if (searchedItems.length > 10) {
            this.setState({rowHeight:6})
        }
        this.setState({searchedCities: searchedItems.slice(0, 30)});
    };

    componentWillReceiveProps(nextProps) {

        if(nextProps.osagoOrderSuccess) {
            showAlert(
                'Спасибо',
                'Ваша заявка принята',
                'Закрыть',
                () => {
                    this.props.resetData();
                    Actions.insuranceCategories()
                })
        }
    }

    componentWillUnmount() {
        this.props.resetData();
    }

    renderPrice() {
        if (this.props.loadingPrice) {
            return <Spiner />
        } else {
            return (
                <Text style={{
                    fontFamily: 'SFUIText-Bold',
                    fontSize: 19,
                    color: '#423486'
                }}>
                    {this.props.osagoPrice}
                </Text>
            )
        }
    }

    setDefaultVolumeToStore(itemValue) {
        this.setState({carType:itemValue.value});
        this.props.changeVolume(itemValue.value);
    }

    render() {
        console.log(this.props)
        return (
            <MainCard>
                <Header back>
                    ОСАГО
                </Header>
                <CardItem style={{
                    marginTop: 18,
                    flex: 2,
                    flexDirection:'column',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start'
                }}>
                    <DropDown
                        fontSize={13}
                        label="Обьем двигателя"
                        elements={[
                            {title: 'Легковые автомобили - до 1600 м3', id: 1, value: 1},
                            {title: 'Легковые автомобили - от 1601 до 2000 м3', id: 2, value: 2},
                            {title: 'Легковые автомобили - от 2001 до 3000 м3', id: 3, value: 3},
                            {title: 'Легковые автомобили - более 3000 м3', id: 4, value: 4},
                        ]}
                        onValueChange={this.onChangeVolume.bind(this)}
                        selected={this.props.carType}
                        setDefaultValueToStore={this.setDefaultVolumeToStore.bind(this)}
                    />
                </CardItem>
                <CardItem style={{
                    marginTop: 18,
                    flex:this.state.rowHeight,
                    height:60,
                    flexDirection:'column',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start'
                }}>
                    <Autocomplete
                        label={"Место регистрации авто"}
                        placeholder={'Введите город'}
                        onChangeText={this.onChangeCity.bind(this)}
                        onSelect={this.onSelectCity.bind(this)}
                        data={this.state.searchedCities}
                        value={this.props.city}
                    />
                </CardItem>
                <CardItem
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flex: 1,
                    }}
                >
                    <View style={{
                        flex: 1,
                        height: 33,
                        backgroundColor: '#fafafa',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        {
                            this.renderPrice()
                        }
                    </View>
                </CardItem>
                <CardItem style={{
                    marginTop:20,
                    flex: 1,

                }}>
                    <ButtonRoundet
                        style={{
                            marginRight: 83,
                            marginLeft: 83,
                            height: 45,
                            backgroundColor: '#FFC200',
                            borderColor:'#FFC200'
                        }}
                        textStyle={{color:'#1B1B1B'}}
                        onPress={this.onOrder.bind(this)}
                    >
                        Заказать
                    </ButtonRoundet>
                </CardItem>
                <CardItem style={{
                    marginTop:20,
                    flex: 3,
                    flexDirection: 'column'
                }}>
                    <View style={{
                        flexDirection:'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 10
                    }}>
                        <View style={{
                            alignSelf: 'stretch',
                            justifyContent: 'center',
                            alignItems:'center',
                        }}>
                            <Text>ИЛИ</Text>
                        </View>
                        <View style={{
                            alignSelf: 'stretch',
                            justifyContent: 'center',
                            alignItems:'center',
                        }}>
                            <Text>
                                купите электронный
                            </Text>
                            <Text>
                                страховой полис
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        height: 50,
                    }}>
                        <ButtonRoundet
                            style={{
                                marginRight: 83,
                                marginLeft: 83,
                                height: 50,
                                backgroundColor: '#FFC200',
                                borderColor:'#FFC200'
                            }}
                            textStyle={{color:'#1B1B1B'}}
                            onPress={() => Linking.openURL('https://aiwa-platform.firebaseapp.com/d/6VzKDxmKj5/t/Qnp0xWdPBq')}
                        >
                            Купить онлайн
                        </ButtonRoundet>
                    </View>
                </CardItem>
            </MainCard>
        )
    }
}

mapStateToProps = ({auth, insurance, citiesBrands}) => {
console.log(insurance);
    return {
        token: auth.user.token,
        carType: insurance.volume,
        registration: insurance.registration,
        brands: citiesBrands.brands,
        cities: citiesBrands.cities,
        city: insurance.osagoCity,
        cityId: insurance.osagoCityId,
        carTypes: insurance.carTypes,
        osagoPrice: insurance.osagoPrice,
        loadingPrice: insurance.osagoPriceLoading,
        osagoOrderSuccess: insurance.osagoOrderSuccess
    }
}

export default connect(mapStateToProps, {
    changeRegistration,
    changeVolume,
    orderOsago,
    getCities,
    changeOsagoCity,
    selectOsagoCity,
    getCarType,
    calculateOsago,
    resetData
})(OsagoComponent);
