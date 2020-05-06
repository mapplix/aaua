import React from 'react';
import {View, Text, TextInput, TouchableWithoutFeedback} from 'react-native';
import {MainCard, CardItem, Header, Autocomplete} from '../common';
import connect from "react-redux/es/connect/connect";
import {changeYear, changeCar,
  changeCarBrand, orderKasko,
  selectBrand, getCarModel, selectModel,changeOsagoCity, selectOsagoCity} from '../../Actions/InsuranceAction';
import {Actions} from "react-native-router-flux";
import {DEVICE_OS, iOS} from "../../Actions/constants";

class CarsScreen extends React.Component{

    constructor(props) {
        super(props)
      this.state = {
        searchedCars: [
          {id: "7", title: "Audi"},
          {id: "10", title: "BMW"},
          {id: "19", title: "Chevrolet"},
          {id: "25", title: "Daewoo"},
          {id: "37", title: "Ford"}
        ]
      }
    }

  searchedCars = (searchedText) => {
    var searchedItems = this.props.brands.filter(function(item) {
      return item.title.toLowerCase().indexOf(searchedText.toLowerCase()) == 0;
    });
    if (searchedText.length <= 0) {
      searchedItems = []
    }
    if (searchedItems.length == 1) {
      // this.onSelectCity(searchedItems[0])
      this.setState({searchedCars: []});
    }
    this.props.brands.some(e => {
      if (e.title.toLowerCase() === searchedText.toLowerCase().trim()) {
        // this.onSelectCity(e)
        this.setState({searchedCars: []});
      }
    })
    this.setState({searchedCars: searchedItems.slice(0, 5)});
  };

  onChangeCar(title){
    if (title.length >= 2) {
      this.searchedCars(title);
    }
    this.props.changeCarBrand(title);
  }

  onSelectCar(brandObj){
    this.setState({searchedCars: []});
    this.props.selectBrand(brandObj);
    Actions.pop()
  }

  renderList() {
      return this.state.searchedCars.map( car => {
          return (
            <TouchableWithoutFeedback
              key={car.title}
                onPress={() => this.onSelectCar(car)}
            >
                <View
                  style={{
                      height: 50,
                      width: '100%',
                      paddingHorizontal: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: "#333",
                  }}
                >
                  <Text
                    style={{
                      width: "100%",
                      fontFamily: 'SFUIText-Medium',
                      fontSize: 14,
                      color: '#222',
                    }}
                  >
                    {car.title}
                  </Text>
                </View>
            </TouchableWithoutFeedback>
          )
      })
  }

    render() {
        return (
            <MainCard>
                <Header goToMain={DEVICE_OS == iOS ? true : false}>
                    Марка авто
                </Header>
                <CardItem style={{
                  flexDirection: 'column',
                }}>
                    <View style={{
                        width: '100%',
                      height: 100,
                        paddingHorizontal: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                      // backgroundColor: "#189"
                    }}>
                      <TextInput
                        style={{
                            width: "100%",
                            borderBottomColor: "#414244",
                            borderBottomWidth: 1,
                        }}
                        autoCorrect={false}
                        placeholderTextColor={'#414244'}
                        placeholder={"Введите марку авто"}
                        onChangeText={this.onChangeCar.bind(this)}
                        value={this.props.city}
                      />
                    </View>
                  {
                      this.renderList()
                  }
                </CardItem>
            </MainCard>
        )
    }
}

const styles = {
    titleText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333'
    },
    boldText: {
        marginLeft: 5,
        marginRight: 5,
        fontSize: 15,
        fontWeight: '600',
        color: '#333'
    },
    link: {
        color: '#2199d8'
    }
}

const mapStateToProps = ({citiesBrands}) => {
  return {
    brands: citiesBrands.brands,
  }
}

export default connect(
  mapStateToProps,
  {
    changeCarBrand,
    selectBrand
  })(CarsScreen);
