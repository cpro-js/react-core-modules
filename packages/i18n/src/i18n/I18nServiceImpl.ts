import { service } from "@cpro-js/di";

import { DateService } from "./date/DateService";
import { I18nService, LocaleModule } from "./I18nService";
import { LocaleStore } from "./locale/LocaleStore";
import { getLanguageFromLocale } from "./locale/util/locale";
import { NumberService } from "./number/NumberService";
import {
  Locales,
  Translate,
  TranslationService,
  Translations,
} from "./translation/TranslationService";

export interface I18nServiceImplOptions {
  supportedLocales: Array<string>;
  getLocale: (locale: string) => Promise<LocaleModule>;
  getTranslations: (language: string) => Promise<Translations>;
}

@service()
export class I18nServiceImpl extends I18nService {
  constructor(
    private readonly options: I18nServiceImplOptions,
    private readonly store: LocaleStore,
    private readonly translationService: TranslationService,
    private readonly dateService: DateService,
    private readonly numberService: NumberService
  ) {
    super();
  }

  t: Translate = (key: string, values?: { [key: string]: string }) => {
    this.accessLanguage(); // access language to detect changes of language within component

    return this.translationService.t(key, values);
  };

  translate: Translate = (key: string, values?: { [key: string]: string }) => {
    this.accessLanguage(); // access language to detect changes of language within component

    return this.translationService.t(key, values);
  };

  formatDate = (
    date: Date,
    formatString: string,
    options?: { timezone?: string }
  ): string => {
    this.accessLanguageAndLocale(); // access language and locale to detect changes of language within components

    return this.dateService.format(date, formatString, {
      timezone: options?.timezone || this.store.getCurrentTimezone(),
      locale: this.store.getLocaleModule().date,
    });
  };

  formatDateRelative = (
    date: Date,
    options?: { timezone?: string }
  ): string => {
    this.accessLanguageAndLocale(); // access language and locale to detect changes of language within components

    return this.dateService.formatRelative(date, {
      timezone: options?.timezone || this.store.getCurrentTimezone(),
      locale: this.store.getLocaleModule().date,
    });
  };

  parseDate = (
    dateString: string,
    formatString: string,
    options?: { timezone?: string }
  ): Date => {
    return this.dateService.parse(dateString, formatString, {
      timezone: options?.timezone || this.store.getCurrentTimezone(),
      locale: this.store.getLocaleModule().date,
    });
  };

  formatCurrency = (value: number, currency: string): string => {
    this.accessLanguageAndLocale(); // access language and locale to detect changes of language within components

    return this.numberService.formatCurrency(value, currency);
  };

  formatNumber = (
    value: number,
    options?: {
      useGrouping?: boolean;
      minimumFractionDigits?: number;
      maximumFractionDigits?: number;
    }
  ): string => {
    this.accessLanguageAndLocale(); // access language and locale to detect changes of language within components

    return this.numberService.formatNumber(value, options);
  };

  formatPercent = (
    value: number,
    options?: { minimumFractionDigits?: number; maximumFractionDigits?: number }
  ): string => {
    this.accessLanguageAndLocale(); // access language and locale to detect changes of language within components

    return this.numberService.formatPercent(value, options);
  };

  formatFileSize = (value: number): string => {
    this.accessLanguageAndLocale(); // access language and locale to detect changes of language within components

    return this.numberService.formatFileSize(value);
  };

  parseNumber = (value: string): number | undefined => {
    return this.numberService.parseNumber(value);
  };

  getLanguage = (): string => {
    return this.store.getCurrentLanguage();
  };

  getLocale = (): string => {
    return this.store.getCurrentLocale();
  };

  useLocale = async (locale: string): Promise<void> => {
    if (this.options.supportedLocales.indexOf(locale) === -1) {
      return Promise.reject(
        new Error(
          `Request unsupported locale ${locale} for supported locales ${this.options.supportedLocales.join(
            ", "
          )}`
        )
      );
    }

    const language = getLanguageFromLocale(locale);
    const [localeModule, translations] = await Promise.all([
      this.options.getLocale(locale),
      this.options.getTranslations(language),
    ]);

    this.translationService.setTranslations(language, translations);
    await this.translationService.useLanguage(language);

    this.numberService.useLanguage(locale);

    this.store.setCurrentLocale(locale, localeModule);
  };

  async updateTranslations(locales: Locales): Promise<void> {
    Object.keys(locales).map((language) =>
      this.translationService.setTranslations(language, locales[language])
    );
    await this.translationService.useLanguage(
      this.translationService.getLanguage()
    );
    this.store.setCurrentLocale(
      this.store.getCurrentLocale(),
      this.store.getLocaleModule()
    );
  }

  getTimezone(): string {
    return this.store.getCurrentTimezone();
  }

  useTimezone(timezone: string): void {
    this.store.setCurrentTimezone(timezone);
  }

  private accessLanguage(): void {
    // access language to detect changes of language within components
    this.store.getCurrentLanguage();
  }

  private accessLanguageAndLocale(): void {
    // access language and locale to detect changes of language within components
    this.store.getCurrentLanguage();
    this.store.getCurrentLocale();
  }
}
