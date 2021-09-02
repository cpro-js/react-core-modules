import { injectable } from "@cpro-js/react-di";

export interface LocaleOptions {
  locale: string;
}

export interface TimezoneOptions {
  timezone: string;
}

export interface DateFormatOptions {
  year: "numeric" | "2-digit" | undefined;
  month: "numeric" | "2-digit" | "narrow" | "short" | "long" | undefined;
  day: "numeric" | "2-digit" | undefined;
}

export interface TimeFormatOptions {
  hour: "numeric" | "2-digit" | undefined;
  minute: "numeric" | "2-digit" | undefined;
  second: "numeric" | "2-digit" | undefined;
}

export interface DateTimeFormatOptions
  extends DateFormatOptions,
    TimeFormatOptions {}

@injectable()
export abstract class DateService {
  abstract formatPattern(
    date: Date,
    formatString: string,
    options: TimezoneOptions
  ): string;

  abstract formatDate(
    date: Date,
    options: LocaleOptions & TimezoneOptions & DateFormatOptions
  ): string;

  abstract formatTime(
    date: Date,
    options: LocaleOptions & TimezoneOptions & TimeFormatOptions
  ): string;

  abstract formatDateTime(
    date: Date,
    options: LocaleOptions & TimezoneOptions & DateTimeFormatOptions
  ): string;

  abstract formatRelative(date: Date, options: LocaleOptions): string;

  abstract parse(
    dateString: string,
    formatString: string,
    options: TimezoneOptions
  ): Date;
}
