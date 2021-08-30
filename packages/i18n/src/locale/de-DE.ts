import de from "date-fns/locale/de";
// todo fixme
// @ts-ignore
import numbroData from "numbro/languages/de-DE.js";

import { LocaleModule } from "../i18n/I18nService";

const locale: LocaleModule = {
  locale: "de-DE",
  date: de,
  number: numbroData,
};

// noinspection JSUnusedGlobalSymbols
export default locale;
