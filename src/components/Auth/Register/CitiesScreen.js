import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
import { MainCard, CardItem, Header, Autocomplete } from "../../common";
import connect from "react-redux/es/connect/connect";
import { changeCity, selectCity } from "../../../actions/RegisterAction";
import { Actions } from "react-native-router-flux";

const { width } = Dimensions.get("window");
const iconSearch = require('../../../images/search.png');

class CitiesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedCities: [
        { id: "181", title: "Київ" },
        { id: "409", title: "Харків" },
        { id: "115", title: "Дніпропетровськ" },
        { id: "291", title: "Одеса" },
        { id: "238", title: "Львів" },
      ],
    };
  }

  searchedCities = (searchedText) => {
    var searchedItems = this.props.cities.filter(function(item) {
      return item.title.toLowerCase().indexOf(searchedText.toLowerCase()) == 0;
    });
    if (searchedText.length <= 0) {
      searchedItems = [];
    }
    if (searchedItems.length == 0) {
      // this.onSelectCity(searchedItems[0])
      this.setState({ searchedCities: [] });
    }
    this.props.cities.some((e) => {
      if (e.title.toLowerCase() === searchedText.toLowerCase().trim()) {
        console.log("some", e.title);
        this.onSelectCity(e);
        this.setState({ searchedCities: [] });
      }
    });
    this.setState({ searchedCities: searchedItems.slice(0, 5) });
  };

  onChangeCity(title) {
    if (title.length >= 2) {
      this.searchedCities(title);
    }
    this.props.changeCity(title);
  }

  onSelectCity(cityObj) {
    this.setState({ searchedCities: [] });
    this.props.selectCity(cityObj);
    Actions.pop();
  }

  renderList() {
    return this.state.searchedCities.map((city) => {
      return (
        <TouchableWithoutFeedback
          key={city.title}
          onPress={() => this.onSelectCity(city)}
        >
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>
              {city.title}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      );
    });
  }

  render() {
    return (
      <MainCard>
        <Header>Город</Header>
        <CardItem
          style={{
            flexDirection: "column",
          }}
        >
          <View style={styles.inputContainer}>
            <Image source={iconSearch} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholderTextColor={'rgba(0,0,0,0.5)'}
              placeholder={"Поиск"}
              onChangeText={this.onChangeCity.bind(this)}
              value={this.props.city}
            />
          </View>
          {this.renderList()}
        </CardItem>
      </MainCard>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    width: width - 10,
    marginTop: 10,
    marginHorizontal: 5,
    marginBottom: 10,
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

const mapStateToProps = ({ register, citiesBrands }) => {
  return {
    city: register.city,
    cityId: register.cityId,
    token: register.token,
    cities: citiesBrands.cities,
  };
};

export default connect(mapStateToProps, {
  changeCity,
  selectCity,
})(CitiesScreen);
