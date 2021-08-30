import { injectable } from "@cpro-js/di";

import { LocaleModule } from "../I18nService";

@injectable()
export abstract class LocaleStore {
  protected abstract supportedLocales: Array<string>;
  protected abstract fallbackLocale: string;

  protected abstract currentLocale: string;
  protected abstract currentLanguage: string;
  protected abstract currentTimezone: string;
  protected localeModule: LocaleModule | undefined;

  abstract getSupportedLocales(): Array<string>;

  abstract getFallbackLocale(): string;

  abstract getCurrentLocale(): string;

  abstract getCurrentLanguage(): string;

  abstract setCurrentLocale(locale: string, localeModule: LocaleModule): void;

  abstract getLocaleModule(): LocaleModule;

  abstract getCurrentTimezone(): string;

  abstract setCurrentTimezone(timezone: string): void;
}
