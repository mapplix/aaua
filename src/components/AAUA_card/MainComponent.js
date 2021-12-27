import React, {useEffect} from 'react';
import {Spiner} from '@aaua/components/common';
import {getMyCard, orderCard} from '@aaua/actions/AAUA_CardAction';
import {useSelector, useDispatch} from 'react-redux';
import ButtonsScreen from './ButtonsScreen';
import QRcode from './QRcode';
import AZSListScreen from './AZSListScreen';

const Main = () => {
  const dispatch = useDispatch();
  const {
    AAUA_Card: {myCards, orderCardSuccess, loading},
    auth: {
      user: {token},
    },
  } = useSelector(state => state);

  useEffect(() => {
    dispatch(getMyCard(token));
  }, []);

  if (loading) {
    return <Spiner size={'large'} />;
  } else {
    if (myCards != null && myCards.card != null) {
      return <QRcode />;
    } else {
      return <ButtonsScreen />;
    }
  }
};

export default Main;
