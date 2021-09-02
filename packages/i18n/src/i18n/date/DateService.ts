import { injectable } from "@cpro-js/react-di";

export interface CommonFormatOptions {
  locale: string;
  timezone: string;
}

export interface DateFormatOptions {
  year: "numeric" | "2-digit";
  month: "numeric" | "2-digit" | "narrow" | "short" | "long";
  day: "numeric" | "2-digit";
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
    options: { timezone: string }
  ): string;

  abstract formatDate(
    date: Date,
    options: CommonFormatOptions & DateFormatOptions
  ): string;

  abstract formatTime(
    date: Date,
    options: CommonFormatOptions & TimeFormatOptions
  ): string;

  abstract formatDateTime(
    date: Date,
    options: CommonFormatOptions & DateTimeFormatOptions
  ): string;

  abstract formatRelative(date: Date, options: { locale: string }): string;

  abstract parse(
    dateString: string,
    formatString: string,
    options: { timezone: string }
  ): Date;
}
