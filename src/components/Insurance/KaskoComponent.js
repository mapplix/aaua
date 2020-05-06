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
  DropDown, ClickableTextRow
} from '../common'
import {changeYear, changeCar,
    changeCarBrand, orderKasko,
    selectBrand, getCarModel, selectModel, resetData} from '../../Actions/InsuranceAction';
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
            rowHeight: DEVICE_OS == iOS ? 1 : 2,
            carPrice: 0
        };

        this.onChangeCarPrice = this.onChangeCarPrice.bind(this)
        this.onOrder = this.onOrder.bind(this)
    };

    onChangeCar(itemValue){
        this.props.changeCar(itemValue);
    }

    onSelectBrand(brand) {
        this.setState({searchedBrands: [], rowHeight:2});
        this.props.selectBrand(brand)
        this.props.getCarModel(brand.id)
    }

    onChangeYear(year) {
        this.props.changeYear(year);
    }

    onChangeCarModel(model) {
        this.props.selectModel(model);
    }

    onChangeCarPrice = (price) => {
        this.setState({
            carPrice: Number(price)
        })
    }

    onOrder() {
        const {carPrice} = this.state;
        const {token, carModel, carBrandId, year} = this.props;

        const orderData = {
            "token" : token,
            "bid" : {
                "brand_id" : carBrandId,
                "modela_id" : carModel.id,
                "year" : year,
                "price" : carPrice
            },

        }
        this.props.orderKasko(orderData);
    }

    renderCarModel() {
        if (this.props.carBrand) {
            return (
              <ClickableTextRow
                  onPress={() => Actions.InsuranceCarsModelsScreen({brandId: this.props.carBrandId})}
                  label={"Модель авто"}
                  value={this.props.carModel ? this.props.carModel.title : null}
                  placeholder={"Выберите авто"}
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
                    this.props.resetData();
                    Actions.insuranceCategories()
            })
        }
    }

    render() {
        return (
            <MainCard>
                <Header back>
                    КАСКО
                </Header>
                    <CardItem
                        style={{
                            flex: 0,
                            height: 70,
                            marginVertical: 15,
                            // marginBottom: 20,
                            paddingTop: 20,
                            flexDirection:'column',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-start',
                            // backgroundColor: '#178'
                        }}
                    >
                        <LabelOnInput
                            label={'Стоимость автомобиля в гривне'}
                            placeholder={'0'}
                            keyboardType = 'numeric'
                            onChangeText={this.onChangeCarPrice}
                            value={this.state.carPrice}
                        />
                    </CardItem>
                    <CardItem style={{
                        // marginTop: 15,
                        // backgroundColor: '#138',
                        // flex: 2,
                        flex: 0,
                        height: 70,
                        marginVertical: 10,
                        // marginBottom: 30,
                        flexDirection:'column',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-start'
                    }}>
                      <ClickableTextRow
                        onPress={ Actions.InsuranceCarsScreen}
                        label={"Марка авто"}
                        value={this.props.carBrand ? this.props.carBrand : null}
                        placeholder={"Выберите авто"}
                      />
                    </CardItem>
                    <CardItem style={{
                        flex: 0,
                        height: 70,
                        marginVertical: 10,
                        // marginBottom: 30,
                        flexDirection:'column',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-start'
                    }}>
                        {this.renderCarModel()}
                    </CardItem>
                    <CardItem
                        style={{
                            flex: 0,
                            height: 70,
                            marginVertical: 10,
                            // marginBottom: 30,
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
                            onPress={this.onOrder}
                        >
                            Получить предложение
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
        // carPrice: insurance.carPrice,
        kaskoOrderSuccess: insurance.kaskoOrderSuccess
    }
}

export default connect(mapStateToProps,
    {changeYear, changeCar, changeCarBrand,
        orderKasko, getBrands, selectBrand, getCarModel, selectModel, resetData})(KaskoComponent);
