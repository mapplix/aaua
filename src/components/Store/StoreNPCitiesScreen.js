import React from 'react';
import {View, Text, TextInput, TouchableWithoutFeedback} from 'react-native';
import {MainCard, CardItem, Header, Autocomplete} from '../common';
import connect from "react-redux/es/connect/connect";
import {
  makeOrder,
  changeDelivery,
  changeAddress,
  changeCity,
  changeNPCity,
  changeNPSkald,
  selectCity,
  changeComment,
  changePhone,
  selectPaymentType
} from '../../actions/StoreAction';
import {getCities, getNPCities, getNPsklads} from '../../actions/CitiesBrands';
import {DEFAULT_CITY} from "../../actions/constants";
import {Actions} from "react-native-router-flux";

class StoreCitiesScreen extends React.Component{

    constructor(props) {
        super(props)
      this.state = {
        searchedCities: [
          {id: "181", title: "Київ"},
          {id: "409", title: "Харків"},
          {id: "115", title: "Дніпропетровськ"},
          {id: "291", title: "Одеса"},
          {id: "238", title: "Львів"}
        ]
      }
    }

  searchedCities = (searchedText) => {
    var searchedItems = this.props.NPcities.filter(function(item) {
      return item.title.toLowerCase().indexOf(searchedText.toLowerCase()) == 0;
    });
    if (searchedText.length <= 0) {
      searchedItems = []
    }
    if (searchedItems.length == 0) {
      // this.onSelectCity(searchedItems[0])
      this.setState({searchedCities: []});
    }
    this.props.NPcities.some(e => {
      if (e.title.toLowerCase() === searchedText.toLowerCase().trim()) {
        this.onSelectCity(e)
        this.setState({searchedCities: []});
      }
    })
    this.setState({searchedCities: searchedItems.slice(0, 5)});
  };

  onChangeCity(title){
    if (title.length >= 2) {
      this.searchedItems(title);
    }
    this.props.changeCity(title);
  }

  onSelectCity(cityObj){
    this.setState({searchedItems: []});
    // this.props.getNPCities('.');
    // if (this.props.delivery == DELIVERY_NP) {
    //   this.props.selectCity(cityObj.id);
    //   this.props.getNPsklads(cityObj.id);
    // } else {
      this.props.selectCity(cityObj.title);
    this.props.getNPsklads(cityObj.id);
    Actions.pop();
    // }
  }

  renderList() {
      return this.state.searchedCities.map( city => {
          return (
            <TouchableWithoutFeedback
              key={city.title}
                onPress={() => this.onSelectCity(city)}
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
                    {city.title}
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
                    Город
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
                        placeholderTextColor={'#414244'}
                        placeholder={'Введите город'}
                        onChangeText={this.onChangeCity.bind(this)}
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

const mapStateToProps = ({store, citiesBrands}) => {
  return {
    npCity: store.npCity,
    delivery: store.delivery,
    NPskald: store.NPskald,
    phone: store.phone,
    comment: store.comment,
    address: store.address,
    city: store.city,
    NPsklads: citiesBrands.NPsklads,
    NPcities: citiesBrands.NPcities,
  }
}

export default connect(
  mapStateToProps,
  {
    changeCity,
    selectCity,
    changeNPCity,
    getNPCities, getNPsklads
  })(StoreCitiesScreen);