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
import {changeYear, changeCar, changeCarBrand, orderKasko} from '../../Actions/InsuranceAction';
import {getBrands} from '../../Actions/CitiesBrands';

class KaskoComponent extends Component {

    onChangeCar(itemValue){
        this.props.changeCar(itemValue);
    }

    onChangeCarBrand(itemValue){
        this.props.changeCarBrand(itemValue);
    }

    onChangeYear(year) {
        this.props.changeYear(year);
    }

    onOrder() {
        const {car, carBrand, year} = this.props;
        orderData = {
            car, carBrand, year
        }
        this.props.orderKasko(orderData);
    }

    componentWillMount() {
        this.props.getBrands();
    }

    renderBrands() {
        if(this.props.brands.length) {
            return (
                <DropDown
                    label="Марка авто"
                    elements={this.props.brands}
                    selected={this.props.carBrand}
                    onValueChange={this.onChangeCarBrand.bind(this)}
                />
            )
        }
        return (
            <DropDown
                label="Марка авто"
                elements={[]}
                selected={this.props.carBrand}
                onValueChange={this.onChangeCarBrand.bind(this)}
            />
        )
    }

    render() {
        return (
            <MainCard>
                <Header back>
                    КАСКО
                </Header>
                <CardItem style={{
                    marginTop: 18,
                    flex:0,
                    height:60,
                    flexDirection:'column',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start'
                }}>
                    {
                        this.renderBrands()
                    }
                </CardItem>
                <CardItem style={{
                    marginTop: 18,
                    flex:0,
                    height:60,
                    flexDirection:'column',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start'
                }}>
                    <DropDown
                        label="Модель авто"
                        elements={[
                            {title: 'BMW', id: 1},
                            {title: 'Mercedez', id: 2},
                            {title: 'Audi', id: 3},
                        ]}
                        selected={this.props.car}
                        onValueChange={this.onChangeCar.bind(this)}
                    />
                </CardItem>
                <CardItem
                    style={{
                        marginTop: 18,
                        flex:0,
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

const mapStateToProps = ({insurance, citiesBrands}) => {
    return {
        car: insurance.car,
        carBrand: insurance.carBrand,
        brands: citiesBrands.brands,
        year: insurance.year
    }
}

export default connect(mapStateToProps, {changeYear, changeCar, changeCarBrand, orderKasko, getBrands})(KaskoComponent);