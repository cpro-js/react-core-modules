import "reflect-metadata";

import {
  Container,
  ContainerProvider,
  I18nService,
  createI18nModuleRegistry,
  useInjection,
} from "@cpro-js/react-core";
import { Preview } from "@storybook/react";
import pMemoize from "p-memoize";
import { useEffect } from "react";


const createContainer = async () => {
  const container = new Container();
  let counter = 0;
  // i18n
  await container.loadAsync(
    createI18nModuleRegistry({
      debug: true,
      maintainedTranslations: ["de-DE", "en-US"],
      supportedFormattingLocales: ["de-DE", "en-US"],
      fallbackLocale: "de-DE",
      // namespaces: ["common", "app", "translation"],
      getTranslations: (language, namespace) => {
        return Promise.resolve({
          hello: {
            world: `Hello World ${language} - ${++counter}`,
          },
        });
      },
    })
  );

  return container;
}

const createCachedContainer = pMemoize(createContainer);

export default {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  tags: ["autodocs"],
  globalTypes: {
    language: {
      title: "Languages",
      description: "Languages",
      toolbar: {
        icon: "globe",
        items: [
          {
            value: "de-DE",
            title: "de-DE",
          },
          {
            value: "en-US",
            title: "en-US",
          },
        ],
      },
    },
  },
  loaders: [
    async (context) => {
      return {
        container: await createCachedContainer()
      };
    },
  ],
  decorators: [
    // react on language changes
    (Story, { globals }) => {
      const { language } = globals;
      const { useLocale, useFormattingLocale, getFormattingLocale, getTranslationLocale } =
        useInjection<I18nService>(I18nService);


      useEffect(() => {
        if (language != getFormattingLocale()) {
          void useFormattingLocale(language);
        }

        if (language != getTranslationLocale()) {
          void useLocale(language);
        }

      }, [language]);

      return <Story/>;
    },
    // apply global container
    (Story, { loaded }) => {
      return (
        <ContainerProvider container={loaded.container}>
          <Story/>
        </ContainerProvider>
      );
    },

  ],
} satisfies Preview;
