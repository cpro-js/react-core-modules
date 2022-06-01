# @cpro-js/react-i18n

Preconfigured i18n system for react apps to remove boilerplate code.

## Installation

```
$ yarn add @cpro-js/react-i18n
```

## Setup

```tsx
import { Container } from "@cpro-js/react-di";
import { I18nService, createI18nModuleRegistry } from "@cpro-js/react-i18n";

const container = new Container();

// i18n
await container.loadAsync(
  createI18nModuleRegistry({
    debug: true,
    determineLocale: () => "de-DE",
    fallbackLocale: "de-DE",
    supportedLocales: ["de-DE"],
    getTranslations: language => import(`../asset/locale/${language}.i18n.json`),
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

```tsx
// ...
import { I18nService } from "@cpro/i18n";

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
