import numbro from "numbro";

import { NumberService } from "./NumberService";

const countDecimals = (value: number) => {
  if (Math.floor(value) !== value)
    return value.toString().split(".")[1].length || 0;
  return 0;
};

export class NumberServiceImpl extends NumberService {
  formatCurrency(value: number, currency: string): string {
    const currentLanguageData = numbro.languageData();
    let currencySymbol: string = currency;

    if (currentLanguageData.currency.code === currency) {
      currencySymbol = currentLanguageData.currency.symbol;
    } else {
      const allLanguages = numbro.languages();
      const languagesWithCurrency = Object.keys(allLanguages)
        .map((language) => allLanguages[language])
        .filter((language) => language.currency?.code === currency);
      if (languagesWithCurrency.length > 0) {
        currencySymbol = languagesWithCurrency[0].currency.symbol;
      }
    }

    return numbro(value).formatCurrency({
      ...numbro.defaultCurrencyFormat("will-be-ignored, ts error"),
      totalLength: 0,
      spaceSeparated:
        currentLanguageData.currencyFormat?.spaceSeparated ||
        currentLanguageData.spaceSeparated,
      currencySymbol: currencySymbol,
    });
  }

  formatNumber(
    value: number,
    options?: {
      useGrouping?: boolean;
      minimumFractionDigits?: number;
      maximumFractionDigits?: number;
    }
  ): string {
    return numbro(value).format(
      this.cleanUpNumbroOptions({
        average: false,
        thousandSeparated: options?.useGrouping,
        mantissa: options?.maximumFractionDigits,
        optionalMantissa:
          options?.maximumFractionDigits != null &&
          options.minimumFractionDigits == null,
        trimMantissa:
          options?.minimumFractionDigits != null &&
          options?.maximumFractionDigits != null &&
          options.minimumFractionDigits < options.maximumFractionDigits
            ? true
            : undefined,
      })
    );
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
    return numbro(percent).format(
      this.cleanUpNumbroOptions({
        average: false,
        output: "percent",
        thousandSeparated: options?.useGrouping,
        mantissa:
          options?.maximumFractionDigits != null
            ? options.maximumFractionDigits
            : countDecimals(value),
        optionalMantissa:
          options?.maximumFractionDigits != null &&
          options.minimumFractionDigits == null,
        trimMantissa:
          options?.minimumFractionDigits != null &&
          options?.maximumFractionDigits != null &&
          options.minimumFractionDigits < options.maximumFractionDigits
            ? true
            : undefined,
      })
    );
  }

  formatFileSize(value: number): string {
    return numbro(value).format(
      this.cleanUpNumbroOptions({
        average: false,
        base: "decimal",
        output: "byte",
        spaceSeparated: true,
        mantissa: 1,
        trimMantissa: true,
      })
    );
  }

  getLanguage(): string {
    return numbro.language();
  }

  parseNumber(value: string): number | undefined {
    return numbro.unformat(value);
  }

  useLanguage(language: string): void {
    numbro.setLanguage(language);
  }

  registerLanguage(languageData: numbro.NumbroLanguage): void {
    numbro.registerLanguage(languageData, false);
  }

  private cleanUpNumbroOptions(numbroOptions: numbro.Format): numbro.Format {
    Object.keys(numbroOptions).forEach((key) => {
      if ((numbroOptions as any)[key] === undefined) {
        delete (numbroOptions as any)[key];
      }
    });
    return numbroOptions;
  }
}
