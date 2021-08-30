import { service } from "@cpro-js/di";
import { Locale, format, formatDistance, parse } from "date-fns";
import { findTimeZone, getUTCOffset } from "timezone-support";

import { DateService } from "./DateService";

const padToTwoDigits = (number: number) => (number > 9 ? number : `0${number}`);

@service()
export class DateServiceImpl extends DateService {
  format(
    date: Date,
    formatString: string,
    options: { locale: Locale; timezone: string }
  ): string {
    const timeZoneInfo = findTimeZone(options.timezone);
    const timeZoneOffset = getUTCOffset(date, timeZoneInfo);

    const formatStringTimezone =
      DateServiceImpl.replaceUtcOffsetWithTimezoneOffset(
        formatString,
        timeZoneOffset
      );
    const formatStringFixed =
      DateServiceImpl.replaceBrackets(formatStringTimezone);

    const transformedDate = DateServiceImpl.getTimeZoneAgnosticDate(
      date,
      timeZoneOffset,
      true
    );
    return format(transformedDate, formatStringFixed, {
      locale: options.locale,
    });
  }

  formatRelative(
    date: Date,
    options: { locale: Locale; timezone: string }
  ): string {
    const timeZoneInfo = findTimeZone(options.timezone);
    const timeZoneOffset = getUTCOffset(date, timeZoneInfo);

    const now = new Date();
    const transformedDate = DateServiceImpl.getTimeZoneAgnosticDate(
      date,
      timeZoneOffset,
      true
    );
    const transformedDateNow = DateServiceImpl.getTimeZoneAgnosticDate(
      now,
      timeZoneOffset,
      true
    );

    return formatDistance(transformedDate, transformedDateNow, {
      addSuffix: true,
      locale: options.locale,
    });
  }

  parse(
    dateString: string,
    formatString: string,
    options: { locale: Locale; timezone: string }
  ): Date {
    const formatStringFixed = DateServiceImpl.replaceBrackets(formatString);
    const parsedDateLocal = parse(dateString, formatStringFixed, new Date(), {
      locale: options.locale,
    });

    // if format string already contains time zone information, no utc offset is necessary
    if (DateServiceImpl.containsTimeZone(formatStringFixed)) {
      return parsedDateLocal;
    }

    const timeZoneInfo = findTimeZone(options.timezone);
    const timeZoneOffset = getUTCOffset(parsedDateLocal, timeZoneInfo);

    return DateServiceImpl.getTimeZoneAgnosticDate(
      parsedDateLocal,
      timeZoneOffset,
      false
    );
  }

  private static getTimeZoneAgnosticDate(
    date: Date,
    timezone: { abbreviation?: string; offset: number },
    subtract: boolean
  ): Date {
    const offset = timezone.offset - date.getTimezoneOffset();
    return new Date(date.getTime() + (subtract ? -1 : 1) * offset * 60 * 1000);
  }

  private static replaceBrackets(formatString: string): string {
    // regex test: test [d] test [t] []
    return formatString.replace(/\[([^\]]*)]/g, "'$1'");
  }

  private static replaceUtcOffsetWithTimezoneOffset(
    format: string,
    timezone: { abbreviation?: string; offset: number }
  ) {
    return format.replace(/(z|ZZ?)(?![^\[]*])/g, (match) => {
      switch (match) {
        case "z":
          return `[${timezone.abbreviation}]`;
        case "Z":
          return DateServiceImpl.formatTimeZoneOffset(timezone.offset, ":");
        default:
          // 'ZZ'
          return DateServiceImpl.formatTimeZoneOffset(timezone.offset, "");
      }
    });
  }

  private static formatTimeZoneOffset(offset: number, separator: string) {
    let sign;
    if (offset <= 0) {
      offset = -offset;
      sign = "+";
    } else {
      sign = "-";
    }
    const hours = padToTwoDigits(Math.floor(offset / 60));
    const minutes = padToTwoDigits(offset % 60);
    return sign + hours + separator + minutes;
  }

  private static containsTimeZone(formatString: string): boolean {
    // regex and token code from: https://github.com/date-fns/date-fns/blob/master/src/parse/index.js
    const formattingTokensRegExp =
      /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
    const longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;

    // @ts-ignore: based on https://github.com/date-fns/date-fns/blob/master/src/parse/index.js
    const tokens = formatString
      .match(longFormattingTokensRegExp)
      .join("")
      .match(formattingTokensRegExp)
      .slice();

    return tokens.some(
      (token) => ["x", "xx", "xxx", "xxxx"].indexOf(token) !== -1
    );
  }
}
