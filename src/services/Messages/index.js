import axios from '@aaua/axios';

import {
  REGISTER_1_URL,
  SMS_CODE_URL,
  MESSAGES_LOADING_URL,
} from '@aaua/actions/constants';

import I18n from '@aaua/i18n';

let MSG_LIMIT = 100;

class Messages {
  getMessages = async (token, offset = 0) => {
    const data = {
      token: token,
      limit: MSG_LIMIT,
      offset: offset,
    };

    const response = await axios.post(MESSAGES_LOADING_URL, data);
console.log(' ---- getMessages---- ', response);
    if (response.data.error === 0) {
      const {data: messages} = response.data;
    // const messages = [
    //     {
    //       "id" : 1,
    //       "created_at" : 1519669938,
    //       "text" : "Вам начислено 6 бонусов AAUA",
    //       "viewes" : 0,
    //     },
    //     {
    //       "id" : 2,
    //       "created_at" : 1519669938,
    //       "text" : "Вам начислено 6 бонусов AAUA",
    //       "viewes" : 0,
    //     },
    //     {
    //       "id" : 3,
    //       "created_at" : 1519669938,
    //       "text" : "Вам начислено 6 бонусов AAUA",
    //       "viewes" : 0,
    //     },
    //     {
    //       "id" : 4,
    //       "created_at" : 1519669938,
    //       "text" : "Вам начислено 6 бонусов AAUA",
    //       "viewes" : 0,
    //     },
    //     {
    //       "id" : 5,
    //       "created_at" : 1519669938,
    //       "text" : "Вам начислено 6 бонусов AAUA",
    //       "viewes" : 0,
    //     },
    //     {
    //       "id" : 6,
    //       "created_at" : 1519669938,
    //       "text" : "Вам начислено 6 бонусов AAUA",
    //       "viewes" : 0,
    //     },
    //     {
    //       "id" : 7,
    //       "created_at" : 1519669938,
    //       "text" : "Вам начислено 6 бонусов AAUA",
    //       "viewes" : 0,
    //     }
    //   ]
      return messages ? messages : [];
    } else {
      return {
        error: I18n.t('messages_screen.error'),
      };
    }
  };

  getMessage = async userData => {
    const response = await axios.post(REGISTER_1_URL, userData);

    return response.data;
  };

  sendMessage = async phone => {
    const response = await axios.post(SMS_CODE_URL, {phone: phone});

    return response.data;
  };
}

const messages = new Messages();
export default messages;
