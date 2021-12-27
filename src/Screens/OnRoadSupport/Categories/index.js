import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import I18n from '@aaua/i18n';

import {
  MainCard,
  CardItem,
  CardComponent,
  CardComponentTouchable,
  Spiner,
  Header,
} from '@aaua/components/common';
import {getCategories} from '@aaua/actions/OnRoadActions';
import {DEVICE_OS, iOS, Android} from '@aaua/actions/constants';

import styles from './styles';

const TECH_SUPPORT = '1';
const LEGAL_SUPPORT = '2';
const MEDICAL_SUPPRT = '3';
const SERVICE = '4';

const Categories = () => {

  const dispatch = useDispatch();
  const {
    onRoad: {categories, loading},
    auth: {
      user: {token},
    },
  } = useSelector(state => state);

  useEffect(() => {
    if (token) {
      dispatch(getCategories(token));
    }
  }, [token]);

  const renderCategories = () => {
    return categories.map(category => {
      var imageUrl = require('@aaua/images/icons/onroad1.png');

      if (category.id == LEGAL_SUPPORT) {
        imageUrl = require('@aaua/images/icons/onroad3.png');
      } else if (category.id == MEDICAL_SUPPRT) {
        imageUrl = require('@aaua/images/icons/onroad2.png');
      } else if (category.id == SERVICE) {
        imageUrl = require('@aaua/images/icons/onroad4.png');
      }
      const {
        imageStyle,
        imageContainer,
        textContainer,
        textStyle,
        componentStyle,
      } = styles;
      return (
        <CardComponentTouchable
          key={category.id}
          onPress={() =>
            Actions.onroadDetails({
              category: category,
            })
          }
          style={componentStyle}>
          <View style={imageContainer}>
            <Image
              resizeMode={'contain'}
              style={imageStyle}
              source={imageUrl}
            />
          </View>
          <View style={textContainer}>
            <Text style={textStyle}>{category.title}</Text>
          </View>
        </CardComponentTouchable>
      );
    });
  };

  const renderContent = () => {
    if (!loading) {
      return (
        <MainCard>
          <Header burger goToMain={DEVICE_OS == iOS ? true : false}>
            {I18n.t('on_road_support_screen.header')}
          </Header>
          <CardItem
            style={{
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingLeft: 13,
              paddingRight: 13,
              marginTop: 21,
            }}>
            {renderCategories()}
          </CardItem>
        </MainCard>
      );
    }
    return <Spiner />;
  };

  return renderContent();
};

// const mapStateToProps = ({onRoad, auth}) => {
//   return {
//     token: auth.user.token,
//     categories: onRoad.categories,
//     loading: onRoad.loading,
//   };
// };

// export default connect(mapStateToProps, {getCategories})(CategoriesComponent);
export default Categories;
