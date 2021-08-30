import enUS from "date-fns/locale/en-US";
import numbro from "numbro";

import { LocaleModule } from "../i18n/I18nService";

const locale: LocaleModule = {
  locale: "en-US",
  date: enUS,
  number: numbro.languageData("en-US"), // default
};

// noinspection JSUnusedGlobalSymbols
export default locale;
