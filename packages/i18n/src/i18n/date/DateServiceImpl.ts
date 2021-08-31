import { service } from "@cpro-js/di";
import { Locale, formatDistance, parse } from "date-fns";
import { format, getTimezoneOffset, utcToZonedTime } from "date-fns-tz";

import { DateService } from "./DateService";

const padToTwoDigits = (number: number) => (number > 9 ? number : `0${number}`);

@service()
export class DateServiceImpl extends DateService {
  format(
    date: Date,
    formatString: string,
    options: { locale: Locale; timezone: string }
  ): string {
    const timeZoneOffsetInMinutes =
      (-1 * getTimezoneOffset(options.timezone, date)) / 1000 / 60;

    const formatStringTimezone =
      DateServiceImpl.replaceUtcOffsetWithTimezoneOffset(
        formatString,
        timeZoneOffsetInMinutes
      );
    const formatStringFixed =
      DateServiceImpl.replaceBrackets(formatStringTimezone);

    const transformedDate = utcToZonedTime(date, options.timezone);

    return format(transformedDate, formatStringFixed, {
      locale: options.locale,
    });
  }

  formatRelative(
    date: Date,
    options: { locale: Locale; timezone: string }
  ): string {
    const transformedDate = utcToZonedTime(date, options.timezone);
    const transformedDateNow = utcToZonedTime(new Date(), options.timezone);

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

    // date is in local time, positive offset means that local timezone is behind UTC and negative if it is ahead
    const offset = parsedDateLocal.getTimezoneOffset() * 60 * 1000;
    const normalizedUtcDate = new Date(parsedDateLocal.getTime() - offset);

    return new Date(
      normalizedUtcDate.getTime() -
        getTimezoneOffset(options.timezone, normalizedUtcDate)
    );
  }

  private static replaceBrackets(formatString: string): string {
    // regex test: test [d] test [t] []
    return formatString.replace(/\[([^\]]*)]/g, "'$1'");
  }

  private static replaceUtcOffsetWithTimezoneOffset(
    format: string,
    timezoneOffsetInMinutes: number
  ) {
    return format.replace(/(ZZ?)(?![^\[]*])/g, (match) => {
      switch (match) {
        case "Z":
          return DateServiceImpl.formatTimeZoneOffset(
            timezoneOffsetInMinutes,
            ":"
          );
        default:
          // 'ZZ'
          return DateServiceImpl.formatTimeZoneOffset(
            timezoneOffsetInMinutes,
            ""
          );
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
