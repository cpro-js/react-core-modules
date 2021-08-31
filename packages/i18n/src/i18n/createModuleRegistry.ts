import { AsyncModuleRegistry, Container } from "@cpro-js/di";
import i18next, { i18n } from "i18next";

import { DateService } from "./date/DateService";
import { DateServiceImpl } from "./date/DateServiceImpl";
import { I18nService } from "./I18nService";
import { I18nServiceImpl } from "./I18nServiceImpl";
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
import { i18nNamespace } from "./translation/util/resources";
import { LocaleModule } from "./types";

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
  determineLocale: (
    supportedLocales: Array<string>,
    fallbackLocale: string
  ) => string;
  getLocale: (locale: string) => Promise<LocaleModule>;
  getTranslations: (language: string) => Promise<Translations>;
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

    await i18nInstance.init({
      debug: options.debug,
      fallbackLng: getLanguageFromLocale(options.fallbackLocale),
      supportedLngs: getLanguagesByLocales(options.supportedLocales),
      fallbackNS: i18nNamespace,
      ns: [i18nNamespace],
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
        getLocale: options.getLocale,
        getTranslations: options.getTranslations,
        supportedLocales: options.supportedLocales,
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
