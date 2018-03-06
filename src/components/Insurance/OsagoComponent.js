import React,{Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {
    MainCard,
    CardItem,
    ButtonRoundet,
    LabelOnInput,
    Header,
    DropDown} from '../common'
import {RATIO} from '../../styles/constants';
import {CITIES} from '../../Actions/constants';
import {changeRegistration, changeVolume, orderOsago} from '../../Actions/InsuranceAction';
import {getCities} from '../../Actions/CitiesBrands';

class OsagoComponent extends Component {

    onChangeVolume(itemValue){
        this.props.changeVolume(itemValue);
    }

    onChangeRegistration(itemValue){
        this.props.changeRegistration(itemValue);
    }

    onOrder() {
        const {volume, registration} = this.props;
        orderData = {
            volume, registration
        }
        this.props.orderOsago(orderData);
    }

    componentWillMount() {
        this.props.getCities();
    }

    renderCities() {
        if(this.props.cities.length) {

            return (
                <DropDown
                    label="Город"
                    elements={this.props.cities}
                    onValueChange={this.onChangeRegistration.bind(this)}
                    selected={this.props.registration}
                />
            )
        }
        return (
            <DropDown
                label="Город"
                elements={[]}
                selected={this.props.registration}
                onValueChange={this.onChangeRegistration.bind(this)}
            />
        )
    }

    render() {
        return (
            <MainCard>
                <Header back>
                    ОСАГО
                </Header>
                <CardItem style={{
                    marginTop: 18,
                    flex:0,
                    height:60,
                    flexDirection:'column',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start'
                }}>
                    <DropDown
                        label="Обьем двигателя"
                        elements={[
                            {title: 'Легковые автомобили - до 1600 м3', id: 1, value: 'Киев'},
                            {title: 'Легковые автомобили - от 1601 до 2000 м3', id: 2, value: 'Харьков'},
                            {title: 'Легковые автомобили - от 2001 до 3000 м3', id: 3, value: 'Днепр'},
                            {title: 'Легковые автомобили - более 3000 м3', id: 4, value: 'Днепр'},
                        ]}
                        onValueChange={this.onChangeVolume.bind(this)}
                        selected={this.props.volume}
                    />
                </CardItem>
                <CardItem style={{
                    marginTop: 18,
                    flex:0,
                    height:60,
                    flexDirection:'column',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start'
                }}>
                    {this.renderCities()}
                </CardItem>
                <CardItem
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-end',
                        flex: 0,
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
                        <Text style={{
                            fontFamily: 'SFUIText-Bold',
                            fontSize: 19,
                            color: '#423486'
                        }}>
                            1750 грн
                        </Text>
                    </View>
                </CardItem>
                <CardItem style={{
                    marginTop:38,
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

mapStateToProps = ({insurance, citiesBrands}) => {
    return {
        volume: insurance.volume,
        registration: insurance.registration,
        brands: citiesBrands.brands,
        cities: citiesBrands.cities
    }
}

export default connect(mapStateToProps, {changeRegistration, changeVolume, orderOsago, getCities})(OsagoComponent);