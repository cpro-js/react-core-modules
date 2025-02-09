import { memoize } from "@formatjs/fast-memoize";
import prettyBytes from "pretty-bytes";

import { NumberService } from "./NumberService";

type IntlNumberFormatOptions = ConstructorParameters<
  typeof Intl.NumberFormat
>[1];
const getNumberFormat = memoize(
  (locale: string, options: IntlNumberFormatOptions) =>
    new Intl.NumberFormat(locale, options)
);

const countDecimals = (value: number) => {
  if (Math.floor(value) !== value)
    return value.toString().split(".")[1].length || 0;
  return 0;
};

export class NumberServiceImpl extends NumberService {
  private locale: string = "en-US";

  formatCurrency(value: number, currencyIsoCode: string): string {
    return getNumberFormat(this.locale, {
      ...this.normalizeOptionsByValue(value),
      style: "currency",
      currency: currencyIsoCode,
      currencyDisplay: "symbol",
    }).format(value);
  }

  formatNumber(
    value: number,
    options?: {
      useGrouping?: boolean;
      minimumFractionDigits?: number;
      maximumFractionDigits?: number;
    }
  ): string {
    return getNumberFormat(this.locale, {
      ...this.normalizeOptionsByValue(value, options),
      style: "decimal",
      useGrouping: options?.useGrouping ?? false,
    }).format(value);
  }

  formatPercent(
    value: number,
    options?: {
      useGrouping?: boolean;
      minimumFractionDigits?: number;
      maximumFractionDigits?: number;
    }
  ): string {
    const percent = value / 100;

    return getNumberFormat(this.locale, {
      ...this.normalizeOptionsByValue(value, options),
      style: "percent",
      useGrouping: options?.useGrouping ?? false,
    }).format(percent);
  }

  formatFileSize(value: number): string {
    // Note: pretty-bytes is pretty small & uses Intl internally
    return prettyBytes(value, {
      locale: this.locale,
      maximumFractionDigits: 1,
      bits: false,
    });
  }

  getLocale(): string {
    return this.locale;
  }

  parseNumber(value: string): number | undefined {
    // based on https://stackoverflow.com/a/29273131
    const thousandSeparator = getNumberFormat(this.locale, {
      useGrouping: true,
    })
      .format(11111)
      .replace(/\p{Number}/gu, "");
    const decimalSeparator = getNumberFormat(this.locale, {
      minimumFractionDigits: 1,
    })
      .format(1.1)
      .replace(/\p{Number}/gu, "");

    const parsed = parseFloat(
      value
        .replace(thousandSeparator, "")
        // remove non-numeric signs except -> ",", ".", "-"
        .replace(/[^\d.,-]/g, "")
        // remove thousand seperator
        .replace(new RegExp("\\" + thousandSeparator, "g"), "")
        // replace original decimalSeparator with english one
        .replace(new RegExp("\\" + decimalSeparator), ".")
    );

    return isNaN(parsed) ? undefined : parsed;
  }

  useLocale(locale: string): void {
    this.locale = locale;
  }

  private normalizeOptionsByValue(
    value: number,
    options?: {
      useGrouping?: boolean;
      minimumFractionDigits?: number;
      maximumFractionDigits?: number;
    }
  ): {
    useGrouping?: boolean;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  } {
    const fallbackMinimumDigits = countDecimals(value);
    // either use the provided minimum fraction count or us the calculated count if possible
    const minimumFractionDigits =
      options?.minimumFractionDigits ??
      (options?.maximumFractionDigits != null &&
        fallbackMinimumDigits > options?.maximumFractionDigits)
        ? options?.maximumFractionDigits
        : fallbackMinimumDigits;

    return {
      ...options,
      minimumFractionDigits: minimumFractionDigits,
    };
  }
}
