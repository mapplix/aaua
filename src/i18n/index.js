import I18n from 'react-native-i18n';
import en from './locales/en.js';
import ua from './locales/ua.js';

I18n.fallbacks = true;

I18n.translations = {
  en,
  ua,
};

I18n.locale = 'ua';

// export const translate = (key, options) => {
//   return key ? I18n.t(key, options) : null;
// };

export default I18n;
