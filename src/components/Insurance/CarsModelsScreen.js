import React from 'react';
import {View, Text, TextInput, TouchableWithoutFeedback} from 'react-native';
import {MainCard, CardItem, Header, Spiner} from '../common';
import connect from 'react-redux/es/connect/connect';
import {
  changeYear,
  changeCar,
  changeCarBrand,
  orderKasko,
  selectBrand,
  getCarModel,
  selectModel,
  changeOsagoCity,
  selectOsagoCity,
} from '../../Actions/InsuranceAction';
import {Actions} from 'react-native-router-flux';
import {DEVICE_OS, iOS} from '../../Actions/constants';

class CarsModelsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedCars: [],
    };
  }

  componentDidMount() {
    console.log('car models ', this.props.brandId);
    this.props.getCarModel(this.props.brandId);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('FDFDFD - componentDidUpdate', this.state.searchedCars.length);
    if (this.state.searchedCars.length < 1) {
      this.setState({
        searchedCars: this.props.carModels.slice(0, 5),
      });
    }
  }

  searchedCars = searchedText => {
    var searchedItems = this.props.carModels.filter(function(item) {
      return item.title.toLowerCase().indexOf(searchedText.toLowerCase()) == 0;
    });
    if (searchedText.length <= 0) {
      searchedItems = [];
    }
    if (searchedItems.length == 1) {
      // this.onSelectCity(searchedItems[0])
      this.setState({searchedCars: []});
    }
    this.props.carModels.some(e => {
      if (e.title.toLowerCase() === searchedText.toLowerCase().trim()) {
        // this.onSelectCity(e)
        this.setState({searchedCars: []});
      }
    });
    this.setState({searchedCars: searchedItems.slice(0, 5)});
  };

  onChangeCar(title) {
    if (title.length >= 1) {
      this.searchedCars(title);
    }
    // this.props.changeCarBrand(title);
  }

  onChangeCarModel(model) {
    this.props.selectModel(model);
    Actions.pop();
  }

  onSelectCar(brandObj) {
    this.setState({searchedCars: []});
    this.props.selectBrand(brandObj);
    Actions.pop();
  }

  renderList() {
    if (this.state.searchedCars.length) {
      return this.state.searchedCars.slice(0, 5).map(car => {
        return (
          <TouchableWithoutFeedback
            key={car.title}
            onPress={() => this.onChangeCarModel(car)}>
            <View
              style={{
                height: 50,
                width: '100%',
                paddingHorizontal: 15,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: '#333',
              }}>
              <Text
                style={{
                  width: '100%',
                  fontFamily: 'SFUIText-Medium',
                  fontSize: 14,
                  color: '#222',
                }}>
                {car.title}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        );
      });
    } else {
      return <Spiner />;
    }
  }

  render() {
    console.log('carModels', DEVICE_OS == iOS);
    return (
      <MainCard>
        <Header goToMain={DEVICE_OS == iOS ? true : false}>Модель авто</Header>
        <CardItem
          style={{
            flexDirection: 'column',
          }}>
          <View
            style={{
              width: '100%',
              height: 100,
              paddingHorizontal: 15,
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: "#189"
            }}>
            <TextInput
              style={{
                width: '100%',
                borderBottomColor: '#414244',
                borderBottomWidth: 1,
              }}
              placeholder={'Введите модель авто'}
              onChangeText={this.onChangeCar.bind(this)}
              value={this.props.city}
            />
          </View>
          {this.renderList()}
        </CardItem>
      </MainCard>
    );
  }
}

const styles = {
  titleText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  boldText: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  link: {
    color: '#2199d8',
  },
};

const mapStateToProps = ({insurance}) => {
  return {
    carModels: insurance.carModels,
    carModel: insurance.carModel,
  };
};

export default connect(
  mapStateToProps,
  {
    getCarModel,
    changeCarBrand,
    selectBrand,
    selectModel,
  },
)(CarsModelsScreen);
