import { service } from "@cpro-js/react-di";
import { i18n } from "i18next";

import { TranslationService } from "./TranslationService";

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

  async useLanguage(language: string): Promise<void> {
    await this.i18nInstance.loadLanguages(language);
    await this.i18nInstance.changeLanguage(language);
  }
}
