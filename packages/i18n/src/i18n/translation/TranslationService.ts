import { injectable } from "@cpro-js/di";

export type Translations = { [key: string]: string | object };
export type Locales = { [language: string]: Translations };

export type Translate = (
  key: string,
  values?: { [key: string]: string }
) => string;

@injectable()
export abstract class TranslationService {
  abstract t: Translate;

  abstract getLanguage(): string;
  abstract useLanguage(language: string): Promise<void>;
  abstract setTranslations(language: string, values: Translations): void;
}
