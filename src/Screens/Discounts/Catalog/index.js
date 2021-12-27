import React, { useState, useEffect } from 'react';
import {ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import {CardItem} from '@aaua/components/common';
import Item from '@aaua/components/Discounts/Item';

import {selectCategory} from '@aaua/actions/DiscountsAction';

import {getImageByCategoryId} from '@aaua/helpers/ImageHelper';

import styles from './styles';

const CategoriesScreen = props => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const {auth, discounts} = useSelector(state => state);
  const {token} = auth.user;
  // const {selectedCategory} = discounts;
  const {categories} = props;

  const dispatch = useDispatch();

  const {scrollContainer, itemContainer} = styles;

  // useEffect( () => {
  //   if (selectedCategory) {
  //     Actions.discontsMap();
  //   }
  // }, [selectedCategory])

  const openDiscountCategory = category => {
    setSelectedCategory(category);
    Actions.discontsMap({selectedCategory: category});
  };

  const renderRows = () => {
    const categoriesList = [...categories];
    var i = 0;
    var rows = [];
    while (i < categoriesList.length) {
      rows.push(categoriesList.slice(i, i + 3));
      i = i + 3;
    }
    return rows.map((row, index) => {
      return (
        <CardItem style={itemContainer} key={index}>
          <Item
            onPress={() => openDiscountCategory(row[0])}
            imageSrc={getImageByCategoryId(row[0].id)}>
            {row[0].title}
          </Item>
          {row[1] !== undefined && (
            <>
              <Item
                onPress={() => openDiscountCategory(row[1])}
                imageSrc={getImageByCategoryId(row[1].id)}>
                {row[1].title}
              </Item>
              <Item
                onPress={() => openDiscountCategory(row[2])}
                imageSrc={getImageByCategoryId(row[2].id)}>
                {row[2].title}
              </Item>
            </>
          )}
        </CardItem>
      );
    });
  };

  return <ScrollView style={scrollContainer}>{renderRows()}</ScrollView>;
};

export default CategoriesScreen;
