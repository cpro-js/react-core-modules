import { injectable } from "@cpro-js/react-di";

@injectable()
export abstract class LocaleStore {
  protected abstract supportedLocales: Array<string>;
  protected abstract fallbackLocale: string;

  protected abstract currentLocale: string;
  protected abstract currentLanguage: string;
  protected abstract currentTimezone: string;

  abstract getSupportedLocales(): Array<string>;

  abstract getFallbackLocale(): string;

  abstract getCurrentLocale(): string;

  abstract getCurrentLanguage(): string;

  abstract setCurrentLocale(locale: string): void;

  abstract getCurrentTimezone(): string;

  abstract setCurrentTimezone(timezone: string): void;
}
