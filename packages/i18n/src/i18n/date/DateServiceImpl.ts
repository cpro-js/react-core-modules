import { service } from "@cpro-js/react-di";
import { lightFormat, parse } from "date-fns";
import { getTimezoneOffset, utcToZonedTime } from "date-fns-tz";
import Duration from "duration-relativetimeformat";
import memoizeFormatConstructor from "intl-format-cache";

import {
  DateFormatOptions,
  DateService,
  DateTimeFormatOptions,
  LocaleOptions,
  TimeFormatOptions,
  TimezoneOptions,
} from "./DateService";

const getDateTimeFormat = memoizeFormatConstructor(Intl.DateTimeFormat);
const getRelativeTimeFormat = memoizeFormatConstructor(Duration);

@service()
export class DateServiceImpl extends DateService {
  formatPattern(
    date: Date,
    formatString: string,
    options: TimezoneOptions
  ): string {
    const formatStringFixed = DateServiceImpl.replaceBrackets(formatString);
    const transformedDate = this.applyTimeZoneToLocalDate(
      date,
      options.timezone
    );

    return lightFormat(transformedDate, formatStringFixed);
  }

  formatDate(
    date: Date,
    options: LocaleOptions & TimezoneOptions & DateFormatOptions
  ): string {
    const transformedDate = this.applyTimeZoneToLocalDate(
      date,
      options.timezone
    );

    return getDateTimeFormat(options.locale, {
      year: options.year,
      month: options.month,
      day: options.day,
    }).format(transformedDate);
  }

  formatDateTime(
    date: Date,
    options: LocaleOptions & TimezoneOptions & DateTimeFormatOptions
  ): string {
    const transformedDate = this.applyTimeZoneToLocalDate(
      date,
      options.timezone
    );

    return getDateTimeFormat(options.locale, {
      year: options.year,
      month: options.month,
      day: options.day,
      hour: options.hour,
      minute: options.minute,
      second: options.second,
    }).format(transformedDate);
  }

  formatTime(
    date: Date,
    options: LocaleOptions & TimezoneOptions & TimeFormatOptions
  ): string {
    const transformedDate = this.applyTimeZoneToLocalDate(
      date,
      options.timezone
    );

    return getDateTimeFormat(options.locale, {
      hour: options.hour,
      minute: options.minute,
      second: options.second,
    }).format(transformedDate);
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
    const parsedDateLocal = parse(dateString, formatStringFixed, new Date());

    // date is in local time, positive offset means that local timezone is behind UTC and negative if it is ahead
    const offset = parsedDateLocal.getTimezoneOffset() * 60 * 1000;
    const normalizedUtcDate = new Date(parsedDateLocal.getTime() - offset);

    return new Date(
      normalizedUtcDate.getTime() -
        getTimezoneOffset(options.timezone, normalizedUtcDate)
    );
  }

  applyTimeZoneToLocalDate(date: Date, timezone: string) {
    // shift locale javascript date to zoned time date
    return utcToZonedTime(date, timezone);
  }

  private static replaceBrackets(formatString: string): string {
    // regex test: test [d] test [t] []
    return formatString.replace(/\[([^\]]*)]/g, "'$1'");
  }
}
