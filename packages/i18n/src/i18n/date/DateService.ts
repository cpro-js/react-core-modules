import { injectable } from "@cpro-js/di";
import { Locale } from "date-fns";

@injectable()
export abstract class DateService {
  abstract format(
    date: Date,
    formatString: string,
    options: { locale: Locale; timezone: string }
  ): string;

  abstract formatRelative(
    date: Date,
    options: { locale: Locale; timezone: string }
  ): string;

  abstract parse(
    dateString: string,
    formatString: string,
    options: { locale: Locale; timezone: string }
  ): Date;
}
