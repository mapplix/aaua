import axios from '@aaua/axios';

import {
  SECRET_KEY,
  MY_AAUA_CARD_URL,
  ORDER_AAUA_CARD_URL,
  ADD_AAUA_CARD_URL,
  AZS_URL,
  GET_WOG_QR,
} from '@aaua/actions/constants';

class AauaCard {
  addCard = async data => {
    console.log('Service  ADD CARD', data);

    const response = await axios.post(ADD_AAUA_CARD_URL, data);

    console.log('Service  ADD CARD response ', response);

    return response.data;
  };
}

export default new AauaCard();
