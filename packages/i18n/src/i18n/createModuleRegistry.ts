import { AsyncModuleRegistry, Container } from "@cpro-js/react-di";
import i18next, { BackendModule, i18n } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

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

export interface I18nModuleRegistryOptions {
  debug?: boolean;
  supportedLocales: Array<string>;
  fallbackLocale: string;
  timezone?: string;
  /**
   * Array of namespaces to load. Default 'translation'. Please make sure that 'defaultNS' and 'fallbackNS' is also part of the list.
   * Otherwise the namespace will never be loaded.
   */
  namespaces?: string | Array<string>;
  /**
   * Default namespace used if not passed to the translation function. Default 'translation'.
   */
  defaultNS?: string;
  /**
   * String or array of namespaces to lookup key if not found in given namespace.
   */
  fallbackNS?: string | Array<string>;
  /**
   * Configures the locale to be used.
   * Using the launchpad, you should pass the locale evaluated by the launchpad here; we determine the
   * most fitting translation then.
   * If you need full control over the language evaluation process, then implement the appropriate function.
   *
   * For standalone apps without launchpad integration leave out this parameter or pass undefined.
   * We will use a language detector which will respect query param "sap-language".
   * In consequence, the app will behave as any other Fiori app in regard to locale determination.
   */
  determineLocale?:
    | string
    | ((supportedLocales: Array<string>, fallbackLocale: string) => string);
  getTranslations: (
    language: string,
    namespace: string
  ) => Promise<Translations>;
  dateFormat?: I18nDateFormatOptions;
}

export type I18nModuleRegistry = (
  options: I18nModuleRegistryOptions
) => AsyncModuleRegistry;

function evaluateLocale(
  locale: string,
  supportedLocales: Array<string>,
  fallbackLocale: string
) {
  if (supportedLocales.includes(locale)) {
    return locale;
  }
  if (/-/.test(locale)) {
    const lang = locale.split("-")[0];
    if (supportedLocales.includes(lang)) {
      return lang;
    }
  }
  return fallbackLocale;
}

export const createI18nModuleRegistry: I18nModuleRegistry =
  (options: I18nModuleRegistryOptions) => async (container: Container) => {
    const localStore: LocaleStore = new LocaleStoreImpl(
      options.supportedLocales,
      options.fallbackLocale
    );

    const i18nInstance: i18n = i18next.createInstance();

    const locale = !options.determineLocale
      ? undefined
      : typeof options.determineLocale === "string"
      ? evaluateLocale(
          options.determineLocale,
          options.supportedLocales,
          options.fallbackLocale
        )
      : options.determineLocale(
          options.supportedLocales,
          options.fallbackLocale
        );

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
    } as BackendModule);

    if (!locale) {
      i18nInstance.use(LanguageDetector);
    }

    await i18nInstance.init({
      debug: options.debug,
      lng: locale ? getLanguageFromLocale(locale) : undefined,
      fallbackLng: getLanguageFromLocale(options.fallbackLocale),
      supportedLngs: getLanguagesByLocales(options.supportedLocales),
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
      detection: locale
        ? undefined
        : {
            order: ["querystring", "navigator"],
            lookupQuerystring: "sap-language",
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

    i18nService.useTimezone(
      options.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone
    );
  };
