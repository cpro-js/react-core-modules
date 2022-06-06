export abstract class NumberService {
  abstract getLocale(): string;

  abstract useLocale(locale: string): void;

  abstract formatNumber(
    value: number,
    options?: {
      useGrouping?: boolean;
      minimumFractionDigits?: number;
      maximumFractionDigits?: number;
    }
  ): string;

  abstract formatPercent(
    value: number,
    options?: {
      useGrouping?: boolean;
      minimumFractionDigits?: number;
      maximumFractionDigits?: number;
    }
  ): string;

  abstract formatCurrency(value: number, currency: string): string;

  abstract formatFileSize(value: number): string;

  abstract parseNumber(value: string): number | undefined;
}
