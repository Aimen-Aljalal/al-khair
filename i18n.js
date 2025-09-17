import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


import enCommon from './locales/en/common.json';
import arCommon from './locales/ar/common.json';

const resources = {
  en: {
    common: enCommon,
  },
  ar: {
    common: arCommon,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', 
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false, 
    },
    
    react: {
      useSuspense: false,
    },
  });

export default i18n;

