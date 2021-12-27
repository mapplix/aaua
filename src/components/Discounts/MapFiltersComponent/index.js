import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';

import I18n from '@aaua/i18n';

import {ModalCard, MapButton} from '@aaua/components/common';

import styles from './styles';

const MapFiltersComponent = ({
  selectedCategory,
  selectCategory,
  onCloseModal,
}) => {

  const [category, setCategory] = useState(selectedCategory);

  const {
    discounts: {categories: categoriesList},
  } = useSelector(state => state);

  const onSelectCategory = cat => {
    setCategory(cat);
  };

  const applyFilters = () => {
    selectCategory(category);
    onCloseModal();
  };

  const renderRows = () => {
    const categories = [...categoriesList];
    var i = 0;
    var rows = [];
    while (i < categories.length) {
      rows.push(categories.slice(i, i + 3));
      i = i + 3;
    }
    return categories.map((row, index) => {
      return (
        <MapButton
          key={index}
          style={{
            backgroundColor: category.id == row.id ? '#ffc200' : '#ffffff',
          }}
          onPress={() => onSelectCategory(row)}>
          {row.title}
        </MapButton>
      );
    });
  };

  const {modalCard, modalRow, buttonContainer, buttonText, buttonTextBold} =
    styles;

  return (
    <ModalCard style={modalCard}>
      <View style={styles.modalRow}>{renderRows()}</View>

      <View
        style={[
          modalRow,
          {
            flex: 2,
            marginBottom: 12,
          },
        ]}>
        <TouchableOpacity style={buttonContainer} onPress={onCloseModal}>
          <Text style={buttonText}>{I18n.t('map_screen.modal.close')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttonContainer} onPress={applyFilters}>
          <Text style={[buttonText, buttonTextBold]}>
            {I18n.t('map_screen.modal.apply')}
          </Text>
        </TouchableOpacity>
      </View>
    </ModalCard>
  );
};

export default MapFiltersComponent;
