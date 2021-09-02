import { service } from "@cpro-js/react-di";
import { Locale, formatDistance, lightFormat, parse } from "date-fns";
import { getTimezoneOffset, utcToZonedTime } from "date-fns-tz";

import { DateService } from "./DateService";

@service()
export class DateServiceImpl extends DateService {
  format(
    date: Date,
    formatString: string,
    options: { timezone: string }
  ): string {
    const formatStringFixed = DateServiceImpl.replaceBrackets(formatString);

    // shift locale javascript date to zoned time date
    const transformedDate = utcToZonedTime(date, options.timezone);

    return lightFormat(transformedDate, formatStringFixed);
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
}
