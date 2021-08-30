export abstract class NumberService {
  abstract getLanguage(): string;

  abstract useLanguage(language: string): void;

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
