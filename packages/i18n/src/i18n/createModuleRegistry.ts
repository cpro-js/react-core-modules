import { AsyncModuleRegistry, Container } from "@cpro-js/react-di";
import { DetectorOptions } from "i18next-browser-languagedetector";

import { DateServiceImpl } from "./date/DateServiceImpl";
import { I18nService } from "./I18nService";
import { I18nDateFormatOptions, I18nServiceImpl } from "./I18nServiceImpl";
import { LocaleStoreImpl } from "./locale/LocaleStoreImpl";
import { NumberServiceImpl } from "./number/NumberServiceImpl";
import { Translations } from "./translation/TranslationService";
import { createTranslationService } from "./translation/TranslationServiceImpl";

export interface I18nModuleRegistryOptions {
  debug?: boolean;

  /**
   * The default locale to use, e.g. "en" or "en-IN".
   */
  fallbackLocale: string;

  /**
   * Client side implementation of translation retrieval.
   * This could be a backend call, a dynamic import, etc.
   *
   * This method might be called multiple times, e.g. user locale is "en-GB", then this method is called
   * with 1) "en-GB" and 2) "en".
   *
   * Specifying the list of {@link maintainedTranslations} limits calls to this method.
   *
   * @param locale the locale to load, e.g. "en" or "en-GB".
   * @param namespace allows distinction between different message-bundles
   */
  getTranslations: (locale: string, namespace: string) => Promise<Translations>;

  /**
   * Configure how to resolve the locale:
   * a) pass the value directly, e.g. "en" or "en-GB"
   * b) implement the appropriate function to take full control over the language evaluation process
   * c) make use of the built-in detector, by passing detector options as specified by i18next
   * {@link https://www.i18next.com/overview/plugins-and-utils#language-detector}
   *
   * If the localeResolver is not specified at all, a standard detector is used suited for webapps.
   * @example {order: ["querystring", "navigator"], lookupQuerystring: "language"}}
   */
  localeResolver?:
    | string
    | ((
        supportedLocales: Array<string> | undefined,
        fallbackLocale: string
      ) => string)
    | DetectorOptions;

  /**
   * List of locales of maintained message bundles, e.g. ["en", "de", "en-GB"].
   *
   * This information prevents unnecessary loading calls for non-existing message bundles.
   * Specifically, the method {@code getTranslations(language: string)} is only called with locales specified in this
   * list.
   *
   * If not specified the lookup is performed completely dynamic.
   * For example, if user locale is "fr-FR" and only "en" is configured, the following
   * lookups are performed (i.e. calls to {@link getTranslations}):
   * a) fr-FR (not maintained)
   * b) fr (not maintained)
   * c) en (the fallback)
   */
  maintainedTranslations?: Array<string>;

  /**
   * Restricts usage of locales for purposes of formatting (dates, numbers) to this list.
   * There's a special syntax, to allow every locale of a language: "en/*"; this would allow "en" as well as any
   * other locale combination "en-US", "en-GB".
   *
   * Examples:
   * - permissive for all English and German variants: [en/*, de/*]
   * - use only British date & number formatting: [en/GB]
   *
   * If not specified, translation and formatting might not be aligned,
   * e.g. English translation but French date & number formatting.
   */
  supportedFormattingLocales?: Array<string>;
  dateFormat?: I18nDateFormatOptions;
  timezone?: string;
  /**
   * Array of namespaces to load. Default 'translation'. Please make sure that 'defaultNS' and 'fallbackNS' is also part of the list.
   * Otherwise the namespace will never be loaded.
   */
  namespaces?: string | Array<string>;
  /**
   * Default namespace used if not passed to the translation function. Default 'translation'.
   */
  defaultNS?: string;
  /**
   * String or array of namespaces to lookup key if not found in given namespace.
   */
  fallbackNS?: string | Array<string>;
}

export type I18nModuleRegistry = (
  options: I18nModuleRegistryOptions
) => AsyncModuleRegistry;

export const DEFAULT_DETECTION = {
  order: ["querystring", "navigator"],
  lookupQuerystring: "language",
};

export const createI18nModuleRegistry: I18nModuleRegistry =
  (options: I18nModuleRegistryOptions) => async (container: Container) => {
    // evaluate explicitly specified locale, if any
    const locale =
      typeof options.localeResolver === "function"
        ? options.localeResolver(
            options.supportedFormattingLocales,
            options.fallbackLocale
          )
        : typeof options.localeResolver === "string"
        ? options.localeResolver
        : undefined;

    // get or provide default detector options, if no locale has been specified
    const detection =
      typeof options.localeResolver === "object"
        ? options.localeResolver
        : !locale
        ? DEFAULT_DETECTION
        : undefined;

    // init translation service, which also serves for language detection purposes
    const translationService = await createTranslationService(
      locale,
      detection,
      options
    );
    const finalLocale = locale ?? translationService.getDetectedLanguage();

    // init I18nService
    const i18nService: I18nService = new I18nServiceImpl(
      {
        supportedLocales: options.supportedFormattingLocales,
        dateFormat: options.dateFormat ?? {},
      },
      new LocaleStoreImpl(
        options.supportedFormattingLocales,
        options.fallbackLocale
      ),
      translationService,
      new DateServiceImpl(),
      new NumberServiceImpl()
    );
    // expose it to the DI container
    container.bindConstant(I18nService, i18nService);

    // configurations
    // note: translations have already been set
    await i18nService.useTimezone(
      options.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone
    );
    await i18nService.useFormattingLocale(finalLocale);

    if (options.debug) {
      console.log(
        "Resolved language for translations: ",
        i18nService.getTranslationLocale()
      );
      console.log("Locale for formatting: ", i18nService.getFormattingLocale());
    }
  };
