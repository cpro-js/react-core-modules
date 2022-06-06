import { action, makeObservable, observable } from "@cpro-js/react-app-state";
import { store } from "@cpro-js/react-di";

import { LocaleStore } from "./LocaleStore";
import { getLanguageFromLocale } from "./util/localeUtils";

@store()
export class LocaleStoreImpl extends LocaleStore {
  protected readonly supportedLocales: Array<string> | undefined;
  protected readonly fallbackLocale: string;

  @observable
  protected currentLocale: string = "";
  @observable
  protected currentLanguage: string = "";
  @observable
  protected currentLanguageCounter: number = 0;
  @observable
  protected currentTimezone: string = "";

  constructor(
    supportedLocales: Array<string> | undefined,
    fallbackLocale: string
  ) {
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

  getSupportedLocales() {
    return this.supportedLocales;
  }

  @action
  setCurrentLocale(locale: string): void {
    if (this.currentLocale !== locale) {
      this.currentLocale = locale;
      this.currentLanguage = getLanguageFromLocale(locale);
    }
    this.currentLanguageCounter++;
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
