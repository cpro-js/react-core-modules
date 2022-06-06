import { action } from "@cpro-js/react-app-state";
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
import { evaluateLocale } from "./locale/util/localeUtils";
import { NumberService } from "./number/NumberService";
import {
  Translate,
  TranslationService,
} from "./translation/TranslationService";

export type I18nDateFormatOptions = Partial<
  DateFormatOptions & TimeFormatOptions & DateTimeFormatOptions
>;

export interface I18nServiceImplOptions {
  supportedLocales: Array<string> | undefined;
  dateFormat: I18nDateFormatOptions;
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

  t: Translate = (key, values) => {
    this.accessLanguage(); // access language to detect changes of language within component

    return this.translationService.t(key, values);
  };

  translate: Translate = (key, values) => {
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
    this.accessLanguageAndLocale(); // access language and locale to detect changes of language within components
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
    this.accessLanguageAndLocale(); // access language and locale to detect changes of language within components
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
      locale: this.store.getCurrentLocale(),
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

  getTranslationLocale = () => {
    return this.translationService.getLanguage();
  };

  getFormattingLocale = (): string => {
    return this.store.getCurrentLocale();
  };

  @action
  useLocale = async (locale: string) => {
    await this.useTranslationLocale(locale);
    await this.useFormattingLocale(locale);
  };

  useTranslationLocale = async (locale: string) => {
    if (this.translationService.getLanguage() !== locale) {
      await this.translationService.useLanguage(locale);
    }
  };

  @action
  useFormattingLocale = async (locale: string): Promise<void> => {
    const checkedLocale = evaluateLocale(
      locale,
      this.store.getSupportedLocales(),
      this.store.getFallbackLocale()
    );
    console.log("using formatting locale", checkedLocale, locale);

    if (this.numberService.getLocale() !== checkedLocale) {
      this.numberService.useLocale(checkedLocale);
    }

    this.store.setCurrentLocale(checkedLocale);
  };

  reloadResources = async (): Promise<void> => {
    await this.translationService.reloadResources();
    this.store.setCurrentLocale(this.store.getCurrentLocale());
  };

  getTimezone = (): string => {
    return this.store.getCurrentTimezone();
  };

  useTimezone = async (timezone: string) => {
    this.store.setCurrentTimezone(timezone);
  };

  private getMergedDateFormatOptions(
    options?: I18nDateFormatOptions
  ): Required<I18nDateFormatOptions> {
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
    this.translationService.getLanguage();
  }

  private accessLanguageAndLocale(): void {
    // access language and locale to detect changes of language within components
    this.store.getCurrentLanguage();
    this.translationService.getLanguage();
    this.store.getCurrentLocale();
  }
}
