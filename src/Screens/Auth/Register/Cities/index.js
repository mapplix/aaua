import React from 'react';
import {Dimensions, StyleSheet, Image} from 'react-native';
import {useSelector} from 'react-redux';

import I18n from '@aaua/i18n';

import {
  MainCard,
  CardItem,
  Header,
  Autocomplete,
} from '@aaua/components/common';
import AutocompleteScreen from '@aaua/components/common/AutocompleteScreen';

const {width} = Dimensions.get('window');

const CitiesScreen = ({onSelectCity}) => {
  const {
    citiesBrands: {cities},
  } = useSelector(state => state);

  const defaultCities = cities.slice(0, 4);

  return (
    <MainCard>
      <Header>{I18n.t('insurance_screen.osago.city')}</Header>
      <AutocompleteScreen
        defaultList={defaultCities}
        data={cities}
        onSelect={onSelectCity}
        textInputPlaceholder={I18n.t(
          'insurance_screen.osago.car_city.placeholder',
        )}
      />
    </MainCard>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: width - 10,
    marginTop: 10,
    marginHorizontal: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '90%',
    fontSize: 15,
    height: 40,
  },
  itemContainer: {
    height: 50,
    width: width - 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginHorizontal: 10,
    borderColor: 'rgba(0,0,0,0.3)',
  },
  itemText: {
    width: '100%',
    fontFamily: 'SFUIText-Bold',
    fontSize: 14,
    color: 'rgba(0,0,0,0.5)',
  },
});

// const mapStateToProps = ({ register, citiesBrands }) => {
//   return {
//     city: register.city,
//     cityId: register.cityId,
//     token: register.token,
//     cities: citiesBrands.cities,
//   };
// };

// export default connect(mapStateToProps, {
//   changeCity,
//   selectCity,
// })(CitiesScreen);

export default CitiesScreen;
