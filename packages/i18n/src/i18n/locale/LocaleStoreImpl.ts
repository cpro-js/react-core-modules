import { action, makeObservable, observable } from "@cpro-js/app-state";
import { store } from "@cpro-js/di";

import { LocaleModule } from "../types";
import { LocaleStore } from "./LocaleStore";
import { getLanguageFromLocale } from "./util/locale";

@store()
export class LocaleStoreImpl extends LocaleStore {
  protected readonly supportedLocales: Array<string>;
  protected readonly fallbackLocale: string;

  @observable
  protected currentLocale: string = "";
  @observable
  protected currentLanguage: string = "";
  @observable
  protected currentLanguageCounter: number = 0;
  @observable.ref
  protected localeModule: LocaleModule | undefined = undefined;
  @observable
  protected currentTimezone: string = "";

  constructor(supportedLocales: Array<string>, fallbackLocale: string) {
    super();
    this.supportedLocales = supportedLocales;
    this.fallbackLocale = fallbackLocale;

    makeObservable(this);
  }

  getCurrentLanguage(): string {
    // access counter to allow updates of message bundle
    this.accessLanguageCounter();
    return this.currentLanguage;
  }

  getCurrentLocale(): string {
    return this.currentLocale;
  }

  getFallbackLocale(): string {
    return this.fallbackLocale;
  }

  getSupportedLocales(): Array<string> {
    return this.supportedLocales;
  }

  @action
  setCurrentLocale(locale: string, localeModule: LocaleModule): void {
    this.localeModule = localeModule;
    if (this.currentLocale !== locale) {
      this.currentLocale = locale;
      this.currentLanguage = getLanguageFromLocale(locale);
    }
    this.currentLanguageCounter++;
  }

  getLocaleModule(): LocaleModule {
    if (this.localeModule == null) {
      throw new Error(
        "Calling i18n service before proper initialization is not allowed!"
      );
    }

    return this.localeModule;
  }

  getCurrentTimezone(): string {
    return this.currentTimezone;
  }

  @action
  setCurrentTimezone(timezone: string): void {
    this.currentTimezone = timezone;
  }

  private accessLanguageCounter(): number {
    return this.currentLanguageCounter;
  }
}
