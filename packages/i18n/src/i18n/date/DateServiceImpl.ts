import { service } from "@cpro-js/react-di";
import { TZDate, tz } from "@date-fns/tz";
import { memoize } from "@formatjs/fast-memoize";
import { lightFormat, parse } from "date-fns";
import Duration from "duration-relativetimeformat";

import {
  DateFormatOptions,
  DateService,
  DateTimeFormatOptions,
  LocaleOptions,
  TimeFormatOptions,
  TimezoneOptions,
} from "./DateService";

type IntlDateTimeFormatOptions = ConstructorParameters<
  typeof Intl.DateTimeFormat
>[1];
const getDateTimeFormat = memoize(
  (locale: string, options: IntlDateTimeFormatOptions) =>
    new Intl.DateTimeFormat(locale, options)
);

type DurationOptions = ConstructorParameters<typeof Duration>[1];
const getRelativeTimeFormat = memoize(
  (locale: string, options: DurationOptions) => new Duration(locale, options)
);

@service()
export class DateServiceImpl extends DateService {
  formatPattern(
    date: Date,
    formatString: string,
    options: TimezoneOptions
  ): string {
    const formatStringFixed = DateServiceImpl.replaceBrackets(formatString);
    const transformedDate = new TZDate(date, options.timezone);

    return lightFormat(transformedDate, formatStringFixed);
  }

  formatDate(
    date: Date,
    options: LocaleOptions & TimezoneOptions & DateFormatOptions
  ): string {
    return getDateTimeFormat(options.locale, {
      year: options.year,
      month: options.month,
      day: options.day,
      timeZone: options.timezone,
    }).format(date);
  }

  formatDateTime(
    date: Date,
    options: LocaleOptions & TimezoneOptions & DateTimeFormatOptions
  ): string {
    return getDateTimeFormat(options.locale, {
      year: options.year,
      month: options.month,
      day: options.day,
      hour: options.hour,
      minute: options.minute,
      second: options.second,
      timeZone: options.timezone,
    }).format(date);
  }

  formatTime(
    date: Date,
    options: LocaleOptions & TimezoneOptions & TimeFormatOptions
  ): string {
    return getDateTimeFormat(options.locale, {
      hour: options.hour,
      minute: options.minute,
      second: options.second,
      timeZone: options.timezone,
    }).format(date);
  }

  formatRelative(date: Date, options: LocaleOptions): string {
    const now = new Date();

    return getRelativeTimeFormat(options.locale, {
      numeric: "auto",
      style: "long",
    }).format(date, now);
  }

  parse(
    dateString: string,
    formatString: string,
    options: TimezoneOptions
  ): Date {
    const formatStringFixed = DateServiceImpl.replaceBrackets(formatString);
    const parsedDateInTz = parse(dateString, formatStringFixed, new Date(), {
      in: tz(options.timezone),
    });

    // transform to system date
    return new Date(parsedDateInTz);
  }

  private static replaceBrackets(formatString: string): string {
    // regex test: test [d] test [t] []
    return formatString.replace(/\[([^\]]*)]/g, "'$1'");
  }
}
