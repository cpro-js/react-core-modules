import { Locales } from "../TranslationService";

export const i18nNamespace = "translation";

export type I18nextResources = { [language: string]: { translation: object } };

export const getResources = (locales: Locales): I18nextResources => {
  const providedLanguages = Object.keys(locales);
  console.log(providedLanguages);
  console.log(locales);
  return providedLanguages.reduce<I18nextResources>(
    (i18nResources, language) => {
      i18nResources[language] = {
        translation: locales[language],
      };
      return i18nResources;
    },
    {}
  );
};
