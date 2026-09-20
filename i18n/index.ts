import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from '@/locales/en.json';
import de from '@/locales/de.json';

export const LANGUAGE_KEY = '@app_language';
export const SUPPORTED_LANGUAGES = ['en', 'de'] as const;
export type AppLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const getDeviceLanguage = (): AppLanguage => {
  try {
    const locale = Localization.getLocales()[0]?.languageCode ?? 'en';
    const lang = locale.toLowerCase().split('-')[0];
    return SUPPORTED_LANGUAGES.includes(lang as AppLanguage)
      ? (lang as AppLanguage)
      : 'en';
  } catch {
    return 'en';
  }
};

/**
 * Initialize i18n. Call this BEFORE rendering the app.
 * Reads persisted language from AsyncStorage, falls back to device locale.
 */
export const initI18n = async (): Promise<void> => {
  let language: AppLanguage = getDeviceLanguage();

  try {
    const stored = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (stored && SUPPORTED_LANGUAGES.includes(stored as AppLanguage)) {
      language = stored as AppLanguage;
    }
  } catch {
    // Use device language if AsyncStorage fails
  }

  await i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    resources: {
      en: { translation: en },
      de: { translation: de },
    },
    lng: language,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
};

/**
 * Change the active language and persist it to AsyncStorage.
 */
export const changeAppLanguage = async (lang: AppLanguage): Promise<void> => {
  await i18n.changeLanguage(lang);
  await AsyncStorage.setItem(LANGUAGE_KEY, lang);
};

export default i18n;
