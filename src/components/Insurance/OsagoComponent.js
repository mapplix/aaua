import React,{Component} from 'react';
import {View, Text} from 'react-native';
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
import {changeRegistration, changeVolume, orderOsago, changeOsagoCity, selectOsagoCity, getCarType, calculateOsago} from '../../Actions/InsuranceAction';
import {getCities} from '../../Actions/CitiesBrands';
import {Actions} from 'react-native-router-flux';
import {showAlert} from '../Modals';
import { Dropdown } from 'react-native-material-dropdown';

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
        this.setState({searchedCities: [], cityId:city});
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
console.log(nextProps);
        if(nextProps.osagoOrderSuccess) {
            showAlert(
                'Спасибо',
                'Ваша заявка принята',
                'Закрыть',
                () => {
                    Actions.insuranceCategories()
                })
        }
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

    render() {
        console.log(this.props.loadingPrice)
        return (
            <MainCard>
                <Header back>
                    ОСАГО
                </Header>
                <CardItem style={{
                    marginTop: 18,
                    flex: 2,
                    height:60,
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
                        alignItems: 'flex-end',
                        flex: 1,
                        height: 70 * RATIO,
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
                    marginTop:38,
                    flex: DEVICE_OS == iOS ? 4 : 5
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

export default connect(mapStateToProps, {changeRegistration, changeVolume, orderOsago, getCities, changeOsagoCity, selectOsagoCity, getCarType, calculateOsago})(OsagoComponent);
