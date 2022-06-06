# @cpro-js/react-i18n

Preconfigured i18n system for react apps to remove boilerplate code.

Uses i18next under the hood to handle translations and to detect the current language.
Uses Intl API for date and number formatting.

## Installation

```
$ yarn add @cpro-js/react-i18n
```

## Setup

Configure internationalization by providing a `fallbackLocale` and a method to retrieve a message bundle
based on its language (and / or bundle name, see namespaces): `getTranslations`.

The library used (i18next) will load message bundles in order of specificity, e.g. you provide "en-GB" then
`getTranslations` will be called twice: 1) "en-GB" and 2) "en". Thus, you can bundle common English translations
in the "en"-bundle while providing only specific, diverging translations for "en-GB".

To improve loading of message bundles, provide the locales of the maintained message bundles: `maintainedTranslations`.
Your implementation of `getTranslation` will now only be called with maintained translations.

Locale resolution can either be set explicitly by you (providing the locale string or a function which returns the
locale string) or determined automatically. If the `localeResolver` is undefined, then the language will be detected
by query parameter `language` or by the `navigator` property of the browser. To configure the detection options provide
them via the `localeResolver` property
(see [Language Detector](https://www.i18next.com/overview/plugins-and-utils#language-detector)).

The property `supportedFormattingLocales` is used to restrict the locale used for formatting dates and numbers.
Without specifying this property you allow every locale, quite independently of the used locale for text
translations (which is always restricted and has its specific fallback logic). To restrict to a language, but allowing
for any sub-language, a special syntax is used, e.g. "en-\*" to allow all possible locales for English.

```tsx
import { Container } from "@cpro-js/react-di";
import { I18nService, createI18nModuleRegistry } from "@cpro-js/react-i18n";

const container = new Container();

// i18n
await container.loadAsync(
  createI18nModuleRegistry({
    debug: true,
    fallbackLocale: "en",
    getTranslations: language => import(`../asset/locale/${language}.i18n.json`),
    maintainedTranslations: ["en", "de"],
    localeResolver: "de-DE",
    supportedFormattingLocales: ["en/*", "de/*"],
  })
);

if (module.hot) {
  const i18nService = container.get(I18nService);
  const id = ((module.children as any) as Array<string>).find(mod => (mod as any).indexOf(".i18n\\.json") !== -1);
  if (id) {
    module.hot.accept(id, () => {
      i18nService.useLocale(i18nService.getLocale());
    });
  }
}
```

## Usage

As class:

```tsx
// ...
import { observer, I18nService } from "@cpro-js/react-core";

@observer
class App extends Component<{}> {
  @inject(I18nService) private i18nService!: I18nService;

  render() {
    return (
      <div>
        {this.i18nService.t("hello.world")}
      </div>
    );
  }
}
```

Or as function component:

```tsx
import { observer, useInjection } from "@cpro-js/react-core";

export const App: FC = observer(() => {
  const { t } = useInjection(I18nService);

  return (
    <div>
      {t("hello.world")}
    </div>
  );
})
```
