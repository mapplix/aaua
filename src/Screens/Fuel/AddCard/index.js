import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import I18n from '@aaua/i18n';

import {
  MainCard,
  CardItem,
  ButtonRoundet,
  Header,
  CreditCardInput,
} from '@aaua/components/common';
import {showAlert} from '@aaua/components/Modals';

import AauaCard from '@aaua/services/AauaCard';

const AddCard = () => {
  const {
    AAUA_Card,
    auth: {
      user: {token},
    },
  } = useSelector(state => state);

  const [cardNumber, setCardNumber] = useState('');

  const onCodeChange = text => {
    setCardNumber(text);
  };

  const onPress = async () => {
    const validNumber = cardNumber.replace(/\-/g, '');
    const card = {
      token: token,
      number: validNumber,
    };
    const addCardResponse = await AauaCard.addCard(card);

    if (addCardResponse.error > 0) {
      const {error} = addCardResponse;
      let errorMsg = I18n.t('fuel_screen.add_card.errors.some_wrong');
      if (error == 2) {
        errorMsg = I18n.t('fuel_screen.add_card.errors.unauthorized');
      }
      if (error == 3) {
        errorMsg = I18n.t('fuel_screen.add_card.errors.no_card');
      }
      if (error == 4) {
        errorMsg = I18n.t('fuel_screen.add_card.errors.not_found');
      }
      showAlert(I18n.t('modals.error_title'), errorMsg, I18n.t('modals.close'));
    } else {
      showAlert(
        I18n.t('modals.thanks_title'),
        I18n.t('fuel_screen.add_card.card_added'),
        I18n.t('modals.close'),
        Actions.AAUA_main(),
      );
    }
  };

  return (
    <MainCard>
      <Header back>{I18n.t('fuel_screen.add_card.header')}</Header>
      <CardItem
        style={{
          flex: 0,
          height: 230,
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
        }}>
        <CreditCardInput
          label={I18n.t('fuel_screen.add_card.card_number')}
          value={cardNumber}
          onChangeText={onCodeChange}
          placeholder={'XXXX XXXX XXXX XXX'}
        />
      </CardItem>
      <CardItem
        style={{
          marginTop: 57,
        }}>
        <ButtonRoundet
          style={{
            marginRight: 45,
            marginLeft: 45,
            height: 45,
          }}
          onPress={onPress}>
          {I18n.t('fuel_screen.add_card.add_card')}
        </ButtonRoundet>
      </CardItem>
    </MainCard>
  );
};

export default AddCard;
