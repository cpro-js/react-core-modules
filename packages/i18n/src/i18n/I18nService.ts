import { injectable } from "@cpro-js/di";

import { Locales, Translate } from "./translation/TranslationService";

export interface LocaleModule {
  locale: string;
  date: Locale;
}

@injectable()
export abstract class I18nService {
  abstract t: Translate;

  abstract translate: Translate;

  abstract formatDate(
    date: Date,
    formatString: string,
    options?: { timezone?: string }
  ): string;

  abstract formatDateRelative(
    date: Date,
    options?: { timezone?: string }
  ): string;

  abstract parseDate(
    dateString: string,
    formatString: string,
    options?: { timezone?: string }
  ): Date;

  abstract formatNumber(
    value: number,
    options?: {
      useGrouping?: boolean;
      minimumFractionDigits?: number;
      maximumFractionDigits?: number;
    }
  ): string;

  abstract formatPercent(
    value: number,
    options?: { minimumFractionDigits?: number; maximumFractionDigits?: number }
  ): string;

  abstract formatCurrency(value: number, currency: string): string;

  abstract formatFileSize(value: number): string;

  abstract parseNumber(value: string): number | undefined;

  abstract getLanguage(): string;

  abstract getLocale(): string;

  abstract useLocale(locale: string): Promise<void>;

  abstract updateTranslations(locales: Locales): Promise<void>;

  abstract getTimezone(): string;

  abstract useTimezone(timezone: string): void;
}
