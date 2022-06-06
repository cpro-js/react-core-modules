const uniqueArray = (items: Array<string>) =>
  items.filter((v, i, a) => a.indexOf(v) === i);

export const getLanguageFromLocale = (locale: string) => {
  if (!locale) {
    throw new Error("Locale must be passed to function getLanguageFromLocale!");
  }
  return locale.replace("-", "_").toLowerCase().split("_")[0];
};

/**
 *
 * @param locale
 * @param supportedLocales
 * @param fallbackLocale
 */
export const evaluateLocale = (
  locale: string | null | undefined,
  supportedLocales: Array<string> | undefined | null,
  fallbackLocale: string
) => {
  if (!fallbackLocale) {
    throw new Error(
      "FallbackLocale must be passed to function evaluateLocale!"
    );
  }

  // allow locale
  if (locale) {
    // check against supportedLocales if specified
    if (supportedLocales) {
      const result = supportedLocales.find((loc) => {
        if (loc.endsWith("-*")) {
          // Note: works only with locales which end with "-*"
          // Note: using an extra dash prevents to pick locales with same beginning, if such do exist
          const prefix = loc.replace("-*", "-");
          return locale.startsWith(prefix) || (locale + "-").startsWith(prefix);
        }
        return locale === loc;
      });
      if (!result) {
        return fallbackLocale;
      }
    }
    return locale;
  }

  // use fallback
  return fallbackLocale;
};
