import { injectable } from "@cpro-js/react-di";

export type Translations = { [key: string]: string | object };

export type Translate = (
  key: string,
  values?: { [key: string]: string | number | boolean }
) => string;

@injectable()
export abstract class TranslationService {
  abstract t: Translate;

  abstract getLanguage(): string;

  abstract getDetectedLanguage(): string;

  abstract useLanguage(language: string): Promise<void>;

  abstract reloadResources(): Promise<void>;
}
