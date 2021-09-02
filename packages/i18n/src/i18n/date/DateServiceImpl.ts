import { service } from "@cpro-js/react-di";
import { lightFormat, parse } from "date-fns";
import { getTimezoneOffset, utcToZonedTime } from "date-fns-tz";
import memoizeFormatConstructor from "intl-format-cache";

import { DateService } from "./DateService";

const Duration = require("duration-relativetimeformat");

const getRelativeTimeFormat = memoizeFormatConstructor(Duration);

const padToTwoDigits = (number: number) => (number > 9 ? number : `0${number}`);

@service()
export class DateServiceImpl extends DateService {
  formatPattern(
    date: Date,
    formatString: string,
    options: { timezone: string }
  ): string {
    const formatStringFixed = DateServiceImpl.replaceBrackets(formatString);

    // shift locale javascript date to zoned time date
    const transformedDate = utcToZonedTime(date, options.timezone);

    return lightFormat(transformedDate, formatStringFixed);
  }

  formatRelative(date: Date, options: { locale: string }): string {
    const now = new Date();

    return getRelativeTimeFormat(options.locale, {
      numeric: "auto",
      style: "long",
    }).format(date, now);
  }

  parse(
    dateString: string,
    formatString: string,
    options: { timezone: string }
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
}
