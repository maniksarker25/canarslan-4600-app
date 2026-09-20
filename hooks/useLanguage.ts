import { useTranslation } from 'react-i18next';
import { changeAppLanguage, AppLanguage, SUPPORTED_LANGUAGES } from '@/i18n';

export interface LanguageOption {
  code: AppLanguage;
  label: string;
  nativeLabel: string;
  flag: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇬🇧' },
  { code: 'de', label: 'German', nativeLabel: 'Deutsch', flag: '🇩🇪' },
];

/**
 * Hook for reading and changing the active app language.
 *
 * Usage:
 *   const { language, changeLanguage, isGerman } = useLanguage();
 */
export const useLanguage = () => {
  const { i18n } = useTranslation();

  const language = (i18n.language ?? 'en') as AppLanguage;

  const changeLanguage = async (lang: AppLanguage) => {
    await changeAppLanguage(lang);
  };

  const currentOption =
    LANGUAGE_OPTIONS.find((o) => o.code === language) ?? LANGUAGE_OPTIONS[0];

  return {
    language,
    changeLanguage,
    isGerman: language === 'de',
    isEnglish: language === 'en',
    currentOption,
    options: LANGUAGE_OPTIONS,
  };
};
