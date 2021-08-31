import { action, makeObservable, observable } from "@cpro-js/react-app-state";
import { store } from "@cpro-js/react-di";

import { TranslationStore } from "./TranslationStore";

@store()
export class TranslationStoreImpl extends TranslationStore {
  @observable
  protected currentLanguage: string = "";
  @observable
  protected counter: number = 1;
  protected defaultLanguage: string = "";

  constructor(defaultLanguage: string, currentLanguage: string) {
    super();
    this.defaultLanguage = defaultLanguage;
    this.currentLanguage = currentLanguage;

    makeObservable(this);
  }

  getCurrentLanguage(): string {
    // access counter to allow updates of message bundle
    this.getCounter();
    return this.currentLanguage;
  }

  @action
  setCurrentLanguage(language: string): void {
    this.currentLanguage = language;
    this.counter++;
  }

  setDefaultLanguage(language: string): void {
    this.defaultLanguage = language;
  }

  getDefaultLanguage(): string {
    return this.defaultLanguage;
  }

  private getCounter() {
    return this.counter;
  }
}
