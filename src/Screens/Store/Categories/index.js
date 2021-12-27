import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {useSelector, useDispatch} from 'react-redux';
import _ from 'lodash';

import {MainCard, CardItem, Header, Spiner} from '@aaua/components/common';
import {getCategories} from '@aaua/actions/StoreAction';
import Item from '@aaua/components/Store/Item';

const Categories = () => {
  const {
    auth: {
      user: {
        token,
        profile: {phone},
      },
    },
    store: {categories: storeCategories, loading},
  } = useSelector(state => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories(token, phone));
  }, []);

  const openStoreCategories = category => {
    if (category.id == 17) {
      // if this is Specail offers category
      Actions.specialOffer({subcategories: category.sub_categories});
    } else {
      Actions.goods({category: category});
    }
  };

  const renderRowItems = row => {
    return row.map((item, index) => {
      return (
        <View
          key={item.id}
          style={{
            flex: 1,
            margin: 1,
          }}>
          <Item
            onPress={() => openStoreCategories(item)}
            imageSrc={{uri: item.image}}>
            {item.name}
          </Item>
        </View>
      );
    });
  };

  const renderRows = () => {
    const categories = [...storeCategories];
    return categories.map(item => {
      return (
        <View
          key={item.id}
          style={{
            // flex: 1,
            margin: 1,
          }}>
          <Item
            onPress={() => openStoreCategories(item)}
            imageSrc={{uri: item.image}}>
            {item.name}
          </Item>
        </View>
      );
    });
  };

  const renderContent = () => {
    return (
      <View
        style={{
          flex: 1,
          // backgroundColor: '#194',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{
          fontSize: 16,
          fontWeight: '500',
        }}>
          Розділ в розробці
        </Text>
      </View>
    );

    // if (!loading) {
    //   return (
    //     <FlatList
    //       horizontal={false}
    //       numColumns={3}
    //       columnWrapperStyle={{
    //         flex: 1,
    //         justifyContent: 'space-around',
    //       }}
    //       data={storeCategories}
    //       renderItem={({item}) => {
    //         return (
    //           <View
    //             key={item.id}
    //             style={{
    //               // flex: 1,
    //               margin: 1,
    //             }}>
    //             <Item
    //               onPress={() => openStoreCategories(item)}
    //               imageSrc={{uri: item.image}}>
    //               {item.name}
    //             </Item>
    //           </View>
    //         );
    //       }}
    //       keyExtractor={item => item.id}
    //     />
    //   );
    // } else {
    //   return <Spiner />;
    // }
  };

  return (
    <MainCard>
      <Header
       burger 
      // basket
      >
        Магазин
      </Header>
      {renderContent()}
    </MainCard>
  );
};

export default Categories;
