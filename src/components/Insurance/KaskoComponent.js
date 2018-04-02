import React,{Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {
    MainCard,
    CardItem,
    ButtonRoundet,
    LabelOnInput,
    Header,
    Autocomplete,
    DropDown} from '../common'
import {changeYear, changeCar,
    changeCarBrand, orderKasko,
    selectBrand, getCarModel, selectModel} from '../../Actions/InsuranceAction';
import {DEVICE_OS, iOS} from '../../Actions/constants';
import {getBrands} from '../../Actions/CitiesBrands';
import {showAlert} from '../Modals';
import {Actions} from 'react-native-router-flux';

class KaskoComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            enableScrollViewScroll: true,
            searchedCities: [],
            searchedBrands: [],
            rowHeight: DEVICE_OS == iOS ? 1 : 2
        };
    };

    onChangeCar(itemValue){
        this.props.changeCar(itemValue);
    }

    onChangeCarBrand(itemValue){
        if (itemValue.length >= 2) {
            this.searchedBrands(itemValue);
        }
        this.props.changeCarBrand(itemValue);
    }

    onSelectBrand(brand) {
console.log(brand);
        this.setState({searchedBrands: [], rowHeight:2});
        this.props.selectBrand(brand)
        this.props.getCarModel(brand.id)
    }

    onChangeYear(year) {
        this.props.changeYear(year);
    }

    onChangeCarModel(model) {
console.log('onChangeCarModel', model);
        this.props.selectModel(model);
    }

    onOrder() {
        const {token, carModel, carBrandId, year} = this.props;

        const orderData = {
            "token" : token,
            "bid" : {
                "brand_id" : carBrandId,
                "modela_id" : carModel,
                "year" : year
            },

        }
console.log(orderData);
        this.props.orderKasko(orderData);
    }

    searchedBrands = (searchedText) => {
        var searchedItems = this.props.brands.filter(function(item) {
            return item.title.toLowerCase().indexOf(searchedText.toLowerCase()) == 0;
        });
        if (searchedText.length <= 0) {
            searchedItems = []
        }
        if (searchedItems.length == 1) {
            this.onSelectBrand(searchedItems[0])
            this.setState({searchedBrands: []});
        }
        this.props.brands.some(e => {
            if (e.title.toLowerCase() === searchedText.toLowerCase().trim()) {
                this.onSelectBrand(e)
                this.setState({searchedBrands: []});
            }
        })
        if (searchedItems.length == 0) {
            this.setState({rowHeight:2})
        } else if (searchedItems.length <= 10) {
            this.setState({rowHeight:3})
        } else if (searchedItems.length > 10) {
            this.setState({rowHeight:6})
        }
        this.setState({searchedBrands: searchedItems.slice(0, 30)});
    };

    renderCarModel() {
        if (this.props.carModels.length > 0) {
            return (
                <DropDown
                    label="Модель авто"
                    elements={this.props.carModels}
                    selected={this.props.carModel}
                    onValueChange={this.onChangeCarModel.bind(this)}
                />
            )
        } else {
            return (
                <LabelOnInput
                    label={'Модель авто'}
                    placeholder={'Выберете марку авто'}
                    editable={false}
                />
            )
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.kaskoOrderSuccess) {
            showAlert(
                'Спасибо',
                'Ваша заявка принята',
                'Закрыть',
                () => {
                    Actions.insuranceCategories()
            })
        }
    }

    render() {
console.log(this.state.rowHeight)
        return (
            <MainCard>
                <Header back>
                    КАСКО
                </Header>
                    <CardItem style={{
                        marginTop: 18,
                        flex: this.state.rowHeight,
                        height:60,
                        flexDirection:'column',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-start'
                    }}>
                        <Autocomplete
                            label={"Марка авто"}
                            placeholder={'Введите марку авто'}
                            onChangeText={this.onChangeCarBrand.bind(this)}
                            onSelect={this.onSelectBrand.bind(this)}
                            data={this.state.searchedBrands}
                            value={this.props.carBrand}
                        />
                    </CardItem>
                    <CardItem style={{
                      backgroundColor:'#289',
                        marginTop: 18,
                        flex:(DEVICE_OS == iOS && this.props.carModels.length > 1) ? 4 : 2,
                        height:60,
                        flexDirection:'column',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-start'
                    }}>
                        {this.renderCarModel()}
                    </CardItem>
                    <CardItem
                        style={{
                            marginTop: 18,
                            flex:2,
                            height:60,
                            flexDirection:'column',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-start'
                        }}
                    >
                        <LabelOnInput
                            label={'Год выпуска'}
                            placeholder={'0000'}
                            maxLength={4}
                            keyboardType = 'numeric'
                            onChangeText={this.onChangeYear.bind(this)}
                            value={this.props.year}
                        />
                    </CardItem>
                    <CardItem style={{
                        flex: DEVICE_OS == iOS ? 4 : 6,
                        marginTop:22,
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

const mapStateToProps = ({auth, insurance, citiesBrands}) => {
    return {
        token: auth.user.token,
        car: insurance.car,
        carBrand: insurance.carBrand,
        carBrandId: insurance.carBrandId,
        brands: citiesBrands.brands,
        year: insurance.year,
        carModels: insurance.carModels,
        carModel: insurance.carModel,
        kaskoOrderSuccess: insurance.kaskoOrderSuccess
    }
}

export default connect(mapStateToProps,
    {changeYear, changeCar, changeCarBrand,
        orderKasko, getBrands, selectBrand, getCarModel, selectModel})(KaskoComponent);
