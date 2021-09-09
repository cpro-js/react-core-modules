import {
  Container,
  ContainerProvider,
  I18nService,
  createI18nModuleRegistry,
  fromPromise,
  observer,
  useI18n,
  useInjection,
} from "@cpro-js/react-core";
import { Meta } from "@storybook/react";
import { FC, useEffect, useMemo } from "react";

const createContainer = async () => {
  const container = new Container();

  let counter = 0;

  // i18n
  await container.loadAsync(
    createI18nModuleRegistry({
      debug: true,
      determineLocale: () => "de-DE",
      fallbackLocale: "de-DE",
      fallbackTimezone: "Europe/Berlin",
      supportedLocales: ["de-DE"],
      // namespaces: ["common", "app", "translation"],
      getTranslations: (language, namespace) => {
        console.log("getTranslations", language, namespace);
        return Promise.resolve({
          hello: {
            world: `Hello World ${language} - ${++counter}`,
          },
        });
      },
    })
  );

  return container;
};

const Provider: FC<{}> = observer(({ children }) => {
  const container = useMemo(() => {
    return fromPromise(createContainer());
  }, []);

  return container.case({
    pending: () => <div>Loading...</div>,
    fulfilled: (container: Container) => (
      <ContainerProvider container={container}>{children}</ContainerProvider>
    ),
    rejected: (error: Error) => (
      <div>
        Error {error.message} {error.stack}
      </div>
    ),
  });
});

const Consumer = observer(() => {
  const { t } = useI18n();

  const i18nService = useInjection<I18nService>(I18nService);

  useEffect(() => {
    const reload = setTimeout(() => {
      i18nService.reloadResources();
    }, 2000);

    return () => {
      clearTimeout(reload);
    };
  }, [i18nService]);

  return <div>{t("hello.world")}</div>;
});

export default {
  title: "I18n",
} as Meta;

export const Default = () => {
  return (
    <Provider>
      <Consumer />
    </Provider>
  );
};
