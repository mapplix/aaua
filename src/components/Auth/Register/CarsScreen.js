import React from 'react';
import {View, Text, TextInput, TouchableWithoutFeedback, StyleSheet, Dimensions, Image} from 'react-native';
import {MainCard, CardItem, Header, Autocomplete} from '../../common';
import connect from "react-redux/es/connect/connect";
import {
  changeCity, onChangeBrand, onSelectBrand, selectCity
} from "../../../actions/RegisterAction";
import {Actions} from "react-native-router-flux";

const {width} = Dimensions.get('window');
const iconSearch = require('../../../images/search.png');

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
    if (searchedItems.length == 0) {
      // this.onSelectCity(searchedItems[0])
      this.setState({searchedCars: []});
    }
    this.props.brands.some(e => {
      if (e.title.toLowerCase() === searchedText.toLowerCase().trim()) {
        this.onSelectCar(e)
        this.setState({searchedCars: []});
      }
    })
    this.setState({searchedCars: searchedItems.slice(0, 5)});
  };

  onChangeCar(title){
    if (title.length >= 2) {
      this.searchedCars(title);
    }
    this.props.onChangeBrand(title);
  }

  onSelectCar(brandObj){
    this.setState({searchedCars: []});
    this.props.onSelectBrand(brandObj);
    Actions.pop()
  }

  renderList() {
      return this.state.searchedCars.map( car => {
          return (
            <TouchableWithoutFeedback
              key={car.title}
                onPress={() => this.onSelectCar(car)}
            >
                <View style={styles.itemContainer}>
                  <Text style={styles.itemText}>
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
                <Header>
                    Марка авто
                </Header>
                <CardItem style={{
                  flexDirection: 'column',
                }}>
                    <View style={styles.inputContainer}>
                      <Image source={iconSearch} style={styles.icon} />
                      <TextInput
                        style={styles.input}
                        placeholderTextColor={'#414244'}
                        placeholder={"Поиск"}
                        onChangeText={this.onChangeCar.bind(this)}
                        value={this.props.city}
                      />
                    </View>

       
                <View style={[styles.top]}>
                  <Text style={styles.itemText}>
                    ТОП марки
                  </Text>
                </View>
       

                  {
                      this.renderList()
                  }
                </CardItem>
            </MainCard>
        )
    }
}

const styles = StyleSheet.create({
  inputContainer: {
    width: width - 10,
    marginTop: 10,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: 'rgba(0,0,0,0.3)',
    borderWidth: 1,
    flexDirection: 'row',
    borderRadius: 8,
    height: 40,
  },
  icon: {
    width: 15,
    height: 30,
    resizeMode: 'contain',
    marginRight: 5,
  },
  top: {
    marginTop: 10,
    // marginBottom: 10,
    height: 40,
    width,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  input: {
    width: "90%",
    fontSize: 15,
    height: 40
  },
  itemContainer: {
    height: 50,
    width: width - 20,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    marginHorizontal: 10,
    borderColor: 'rgba(0,0,0,0.3)',

  },
  itemText: {
    width: "100%",
    fontFamily: "SFUIText-Bold",
    fontSize: 14,
    color: 'rgba(0,0,0,0.5)',
  },
});

const mapStateToProps = ({citiesBrands}) => {
  return {
    brands: citiesBrands.brands,
  }
}

export default connect(
  mapStateToProps,
  {
    onChangeBrand,
    onSelectBrand
  })(CarsScreen);