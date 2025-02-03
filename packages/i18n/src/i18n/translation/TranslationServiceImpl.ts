import { service } from "@cpro-js/react-di";
import i18next, { BackendModule } from "i18next";
import type { i18n } from "i18next";
import LanguageDetector, {
  DetectorOptions,
} from "i18next-browser-languagedetector";

import { I18nModuleRegistryOptions } from "../createModuleRegistry";
import { Translate, TranslationService } from "./TranslationService";

export const createTranslationService = async (
  locale: string | undefined,
  detection: DetectorOptions | undefined,
  options: I18nModuleRegistryOptions
) => {
  // create i18n instance
  const i18nInstance: i18n = i18next.createInstance();

  // use a backend to load languages
  i18nInstance.use({
    type: "backend",
    read(
      language: string,
      namespace: string,
      callback: (errorValue: unknown, translations: null | {}) => void
    ) {
      // restrict language loading to supported locales, if specified
      if (
        options.maintainedTranslations &&
        options.maintainedTranslations.length &&
        !options.maintainedTranslations.includes(language)
      ) {
        return callback(
          "Translations for this language are not maintained: " + language,
          null
        );
      }

      options
        .getTranslations(language, namespace)
        .then((resources) => callback(null, resources))
        .catch((error) => callback(error, null));
    },
  } as BackendModule);

  if (detection) {
    i18nInstance.use(LanguageDetector);
  }

  await i18nInstance.init({
    debug: options.debug,
    lng: locale,
    fallbackLng: options.fallbackLocale,
    // don't use supportedLngs to restrict languages => you would need to specify EVERY locale en-US, en-GB, ...
    // supportedLngs: getLanguagesByLocales(options.supportedLocales),
    ns: options.namespaces ?? "translation",
    fallbackNS: options.fallbackNS ?? false,
    defaultNS: options.defaultNS ?? "translation",
    // resources: {}, // empty object prevents loading
    parseMissingKeyHandler(key: string) {
      return `???${key}???`;
    },
    interpolation: {
      escapeValue: false, // not needed for react-native
    },
    react: {
      useSuspense: false, // fix https://github.com/i18next/react-i18next/issues/766
    },
    detection: detection,
  });

  return new TranslationServiceImpl(i18nInstance);
};

@service()
export class TranslationServiceImpl extends TranslationService {
  constructor(private readonly i18nInstance: i18n) {
    super();
  }

  t: Translate = (key, values) => {
    return this.i18nInstance.t(key, values);
  };

  getDetectedLanguage(): string {
    return this.i18nInstance.language;
  }

  getLanguage(): string {
    return this.i18nInstance.resolvedLanguage;
  }

  async useLanguage(language: string): Promise<void> {
    await this.i18nInstance.loadLanguages(language);
    await this.i18nInstance.changeLanguage(language);
  }

  async reloadResources(): Promise<void> {
    await this.i18nInstance.reloadResources();
  }
}
