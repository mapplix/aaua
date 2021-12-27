import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableWithoutFeedback} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {
  MainCard,
  CardItem,
  Header,
  Autocomplete,
} from '@aaua/components/common';

import styles from './styles';

const AutocompleteScreen = ({
  defaultList,
  data,
  onSelect,
  textInputPlaceholder,
}) => {
  // const {t} = useTranslation();

  // const defaultSearchedCars = [
  //   {id: '7', title: 'Audi'},
  //   {id: '10', title: 'BMW'},
  //   {id: '19', title: 'Chevrolet'},
  //   {id: '25', title: 'Daewoo'},
  //   {id: '37', title: 'Ford'},
  // ];

  const [filteredItems, setFilteredItems] = useState(defaultList);
  const [text, setText] = useState('');

  // const {
  //   citiesBrands: {brands},
  // } = useSelector(state => state);

  const {itemContainer, itemText, textInputContainer, textInputStyle} = styles;

  const searchingItems = searchedText => {
    var searchedItems = data.filter(item => {
      return item.title.toLowerCase().indexOf(searchedText.toLowerCase()) == 0;
    });
    if (searchedText.length <= 0) {
      searchedItems = [];
    }
    if (searchedItems.length == 1) {
      setFilteredItems([]);
    }
    // data.some(e => {
    //   if (e.title.toLowerCase() === searchedText.toLowerCase().trim()) {
    //     setFilteredItems([]);
    //   }
    // });
    setFilteredItems(searchedItems.slice(0, 5));
  };

  const onChangeCar = title => {
    if (title.length >= 1) {
      searchingItems(title);
    }
    setText(title);
  };

  const onSelectItem = obj => {
    setFilteredItems([]);

    onSelect(obj);
    Actions.pop();
  };

  const renderList = () => {
    return filteredItems.map(item => {
      return (
        <TouchableWithoutFeedback
          key={item.title}
          onPress={() => onSelectItem(item)}>
          <View style={itemContainer}>
            <Text style={itemText}>{item.title}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    });
  };

  return (
    <CardItem
      style={{
        flexDirection: 'column',
      }}>
      <View style={textInputContainer}>
        <TextInput
          style={textInputStyle}
          autoCorrect={false}
          placeholderTextColor={'#414244'}
          placeholder={textInputPlaceholder}
          onChangeText={onChangeCar}
          value={text}
        />
      </View>
      {renderList()}
    </CardItem>
  );
};

export default AutocompleteScreen;
