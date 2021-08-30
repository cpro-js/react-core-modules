import { service } from "@cpro-js/di";
import { i18n } from "i18next";

import { TranslationService, Translations } from "./TranslationService";

@service()
export class TranslationServiceImpl extends TranslationService {
  constructor(private readonly i18nInstance: i18n) {
    super();
  }

  t = (key: string, values?: { [key: string]: string }) => {
    return this.i18nInstance.t(key, values);
  };

  getLanguage(): string {
    return this.i18nInstance.language;
  }

  useLanguage(language: string): Promise<void> {
    return this.i18nInstance.changeLanguage(language).then(() => undefined);
  }

  setTranslations(language: string, values: Translations): void {
    this.i18nInstance.addResourceBundle(
      language,
      "translation",
      values,
      true,
      true
    );
  }
}
