import { AsyncModuleRegistry, Container } from "@cpro-js/react-di";
import i18next, { i18n } from "i18next";

import { DateService } from "./date/DateService";
import { DateServiceImpl } from "./date/DateServiceImpl";
import { I18nService } from "./I18nService";
import { I18nDateFormatOptions, I18nServiceImpl } from "./I18nServiceImpl";
import { LocaleStore } from "./locale/LocaleStore";
import { LocaleStoreImpl } from "./locale/LocaleStoreImpl";
import {
  getLanguageFromLocale,
  getLanguagesByLocales,
} from "./locale/util/locale";
import { NumberService } from "./number/NumberService";
import { NumberServiceImpl } from "./number/NumberServiceImpl";
import {
  TranslationService,
  Translations,
} from "./translation/TranslationService";
import { TranslationServiceImpl } from "./translation/TranslationServiceImpl";

const getTimezone = (): string | undefined => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (e) {
    return undefined;
  }
};

export interface I18nModuleRegistryOptions {
  debug: boolean;
  supportedLocales: Array<string>;
  fallbackLocale: string;
  timezone?: string;
  fallbackTimezone: string;
  /**
   * array of namespaces to load. Default 'translation'.
   */
  namespaces?: string | Array<string>;
  /**
   * default namespace used if not passed to the translation function. Default 'translation'.
   */
  defaultNS?: string;
  /**
   * string or array of namespaces to lookup key if not found in given namespace.
   */
  fallbackNS?: string | Array<string>;
  determineLocale: (
    supportedLocales: Array<string>,
    fallbackLocale: string
  ) => string;
  getTranslations: (
    language: string,
    namespace: string
  ) => Promise<Translations>;
  dateFormat?: I18nDateFormatOptions;
}

export type I18nModuleRegistry = (
  options: I18nModuleRegistryOptions
) => AsyncModuleRegistry;

export const createI18nModuleRegistry: I18nModuleRegistry =
  (options: I18nModuleRegistryOptions) => async (container: Container) => {
    const localStore: LocaleStore = new LocaleStoreImpl(
      options.supportedLocales,
      options.fallbackLocale
    );

    const i18nInstance: i18n = i18next.createInstance();

    i18nInstance.use({
      type: "backend",
      read(
        language: string,
        namespace: string,
        callback: (errorValue: unknown, translations: null | {}) => void
      ) {
        options
          .getTranslations(language, namespace)
          .then((resources) => callback(null, resources))
          .catch((error) => callback(error, null));
      },
    });

    await i18nInstance.init({
      debug: options.debug,
      fallbackLng: getLanguageFromLocale(options.fallbackLocale),
      supportedLngs: getLanguagesByLocales(options.supportedLocales),
      ns: options.namespaces,
      fallbackNS: options.fallbackNS,
      defaultNS: options.defaultNS,
      resources: {},
      parseMissingKeyHandler(key: string) {
        return `???${key}???`;
      },
      interpolation: {
        escapeValue: false, // not needed for react-native
      },
      react: {
        useSuspense: false, // fix https://github.com/i18next/react-i18next/issues/766
      },
    });

    const translationService: TranslationService = new TranslationServiceImpl(
      i18nInstance
    );
    const dateService: DateService = new DateServiceImpl();
    const numberService: NumberService = new NumberServiceImpl();

    const i18nService: I18nService = new I18nServiceImpl(
      {
        supportedLocales: options.supportedLocales,
        dateFormat: options.dateFormat ?? {},
      },
      localStore,
      translationService,
      dateService,
      numberService
    );

    container.bindConstant(I18nService, i18nService);

    const locale = options.determineLocale(
      options.supportedLocales,
      options.fallbackLocale
    );

    i18nService.useTimezone(
      options.timezone || getTimezone() || options.fallbackTimezone
    );
    await i18nService.useLocale(locale);
  };
