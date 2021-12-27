import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import {
  MainCard,
  CardItem,
  Header,
} from '@aaua/components/common';
import {Actions} from 'react-native-router-flux';
import {RATIO, WIDTH_RATIO} from '@aaua/styles/constants';
import {getMyCard, orderCard, getAZSList} from '@aaua/actions/AAUA_CardAction';
import {useSelector, useDispatch} from 'react-redux';
import {DEVICE_OS, iOS, BASE_URL} from '@aaua/actions/constants';
import AZSComponent from '@aaua/components/AAUA_card/AZSComponent';

import I18n from '@aaua/i18n';

import styles from './styles';

const AZSListScreen = props => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  // const [azs, setAzsList] = useState([]);

  const {
    auth: {
      user: {token},
    },
    AAUA_Card: {azs},
  } = useSelector(state => state);

  useEffect(() => {
    if (token && azs.length < 1) {
      dispatch(getAZSList(token));
    }
  }, [token]);

  console.log('redner list', azs, token);
  const {modal, modalTextContainer, modalText} = styles;
  return (
    <MainCard>
      <Header burger goToMain={DEVICE_OS == iOS ? true : false}>
        {I18n.t('fuel_screen.header')}
      </Header>
      <CardItem
        style={{
          flex: 4,
          paddingTop: 21 * RATIO,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}>
        <FlatList
          horizontal={false}
          numColumns={2}
          columnWrapperStyle={{
            flex: 1,
            justifyContent: 'flex-start',
          }}
          keyExtractor={item => item.id}
          data={azs.data}
          renderItem={({item}) => {
            return (
              <AZSComponent
                key={item.id + item.title}
                onPress={Actions.AAUA_main}
                imageSrc={{uri: `${BASE_URL}${item.img}`}}
                intro={item.intro}>
                {item.title}
              </AZSComponent>
            );
          }}
        />
      </CardItem>
    </MainCard>
  );
};

export default AZSListScreen;
