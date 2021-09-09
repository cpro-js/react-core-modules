import { injectable } from "@cpro-js/react-di";

import {
  DateFormatOptions,
  DateTimeFormatOptions,
  TimeFormatOptions,
  TimezoneOptions,
} from "./date/DateService";
import { Translate } from "./translation/TranslationService";

@injectable()
export abstract class I18nService {
  abstract t: Translate;

  abstract translate: Translate;

  abstract formatDateByPattern(
    date: Date,
    formatString: string,
    options?: Partial<TimezoneOptions>
  ): string;

  abstract formatDate(
    date: Date,
    options?: Partial<TimezoneOptions & DateFormatOptions>
  ): string;

  abstract formatDateTime(
    date: Date,
    options?: Partial<TimezoneOptions & DateTimeFormatOptions>
  ): string;

  abstract formatTime(
    date: Date,
    options?: Partial<TimezoneOptions & TimeFormatOptions>
  ): string;

  abstract formatDateRelative(date: Date): string;

  abstract parseDateByPattern(
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

  abstract reloadResources(): Promise<void>;

  abstract getTimezone(): string;

  abstract useTimezone(timezone: string): void;
}
