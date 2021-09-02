import { injectable } from "@cpro-js/react-di";
import { Locale } from "date-fns";

@injectable()
export abstract class DateService {
  abstract formatPattern(
    date: Date,
    formatString: string,
    options: { timezone: string }
  ): string;

  abstract formatRelative(
    date: Date,
    options: { locale: Locale; timezone: string }
  ): string;

  abstract parse(
    dateString: string,
    formatString: string,
    options: { timezone: string }
  ): Date;
}
