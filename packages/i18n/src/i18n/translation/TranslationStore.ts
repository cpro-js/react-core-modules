import { injectable } from "@cpro-js/di";

@injectable()
export abstract class TranslationStore {
  protected abstract defaultLanguage: string;
  protected abstract currentLanguage: string;

  abstract getDefaultLanguage(): string;

  abstract setDefaultLanguage(language: string): void;

  abstract getCurrentLanguage(): string;

  abstract setCurrentLanguage(language: string): void;
}
