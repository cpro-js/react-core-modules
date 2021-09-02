import { service } from "@cpro-js/react-di";

import {
  DateFormatOptions,
  DateService,
  DateTimeFormatOptions,
  TimeFormatOptions,
  TimezoneOptions,
} from "./date/DateService";
import { I18nService } from "./I18nService";
import { LocaleStore } from "./locale/LocaleStore";
import { getLanguageFromLocale } from "./locale/util/locale";
import { NumberService } from "./number/NumberService";
import {
  Locales,
  Translate,
  TranslationService,
  Translations,
} from "./translation/TranslationService";
import { LocaleModule } from "./types";

export interface I18nServiceImplOptions {
  supportedLocales: Array<string>;
  getLocale: (locale: string) => Promise<LocaleModule>;
  getTranslations: (language: string) => Promise<Translations>;
  dateFormat: Partial<
    DateFormatOptions & TimeFormatOptions & DateTimeFormatOptions
  >;
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

  formatDateByPattern = (
    date: Date,
    formatString: string,
    options?: Partial<TimezoneOptions>
  ): string => {
    this.accessLanguageAndLocale(); // access language and locale to detect changes of language within components

    return this.dateService.formatPattern(date, formatString, {
      timezone: options?.timezone || this.store.getCurrentTimezone(),
    });
  };

  formatDate = (
    date: Date,
    options?: Partial<TimezoneOptions & DateFormatOptions>
  ): string => {
    this.accessLanguageAndLocale(); // access language and locale to detect changes of language within components

    const mergedOptions = this.getMergedDateFormatOptions(options);

    return this.dateService.formatDate(date, {
      timezone: options?.timezone || this.store.getCurrentTimezone(),
      locale: this.store.getCurrentLocale(),
      year: mergedOptions.year,
      month: mergedOptions.month,
      day: mergedOptions.day,
    });
  };

  formatDateTime = (
    date: Date,
    options?: Partial<TimezoneOptions & DateTimeFormatOptions>
  ): string => {
    const mergedOptions = this.getMergedDateFormatOptions(options);

    return this.dateService.formatDateTime(date, {
      timezone: options?.timezone || this.store.getCurrentTimezone(),
      locale: this.store.getCurrentLocale(),
      year: mergedOptions.year,
      month: mergedOptions.month,
      day: mergedOptions.day,
      hour: mergedOptions.hour,
      minute: mergedOptions.minute,
      second: mergedOptions.second,
    });
  };

  formatTime = (
    date: Date,
    options?: Partial<TimezoneOptions & TimeFormatOptions>
  ): string => {
    const mergedOptions = this.getMergedDateFormatOptions(options);

    return this.dateService.formatTime(date, {
      timezone: options?.timezone || this.store.getCurrentTimezone(),
      locale: this.store.getCurrentLocale(),
      hour: mergedOptions.hour,
      minute: mergedOptions.minute,
      second: mergedOptions.second,
    });
  };

  formatDateRelative = (date: Date): string => {
    this.accessLanguageAndLocale(); // access language and locale to detect changes of language within components

    return this.dateService.formatRelative(date, {
      locale: this.store.getLocaleModule().locale,
    });
  };

  parseDateByPattern = (
    dateString: string,
    formatString: string,
    options?: { timezone?: string }
  ): Date => {
    return this.dateService.parse(dateString, formatString, {
      timezone: options?.timezone || this.store.getCurrentTimezone(),
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

  private getMergedDateFormatOptions(
    options?: Partial<
      DateFormatOptions & TimeFormatOptions & DateTimeFormatOptions
    >
  ): DateFormatOptions & TimeFormatOptions & DateTimeFormatOptions {
    return {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      ...this.options.dateFormat,
      ...options,
    };
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
