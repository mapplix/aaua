import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {openAnswear} from '@aaua/actions/AnQAction';

import styles from './styles';

const Item = props => {
  //   constructor() {
  //     super();

  //     if (Platform.OS === 'android') {
  //       UIManager.setLayoutAnimationEnabledExperimental &&
  //         UIManager.setLayoutAnimationEnabledExperimental(true);
  //     }
  //   }

  //   componentWillUpdate() {
  //     // LayoutAnimation.linear();
  //     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  //   }

  const dispatch = useDispatch();
  const {
    AnQ: {selectedAnswear},
  } = useSelector(state => state);

  const {children, id, title} = props;

  const expanded = selectedAnswear === id;

  const {descriptionContainer, descriptionText} = styles;

  const renderDescription = () => {
    if (expanded) {
      return (
        <View style={descriptionContainer}>
          <Text style={descriptionText}>{children}</Text>
        </View>
      );
    } else {
      return <View style={{height: 0}} />;
    }
  };

  const onOpenAnswear = id => {
    dispatch(openAnswear(id));
  };

  const {titleContainer, titleText, mainContainer} = styles;
  return (
    <TouchableWithoutFeedback onPress={() => onOpenAnswear(id)}>
      <View style={[mainContainer, props.style]}>
        <View style={titleContainer}>
          <Text style={titleText}>{title}</Text>
        </View>
        {renderDescription()}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Item;
