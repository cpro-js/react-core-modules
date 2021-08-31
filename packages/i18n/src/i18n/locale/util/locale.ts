const uniqArray = (items: Array<string>) =>
  items.filter((v, i, a) => a.indexOf(v) === i);

export const getLanguageFromLocale = (locale: string) =>
  locale.replace("-", "_").toLowerCase().split("_")[0];

export const getLanguagesByLocales = (locales: Array<string>) =>
  uniqArray(locales.map((locale) => getLanguageFromLocale(locale)));
