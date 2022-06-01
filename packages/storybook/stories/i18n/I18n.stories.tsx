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
import {
  ChangeEvent,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
} from "react";

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
      supportedLocales: ["de-DE", "en-US"],
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

const Provider: FC<{ children: ReactNode }> = observer(({ children }) => {
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

const ReloadResources = observer(() => {
  const i18nService = useInjection<I18nService>(I18nService);
  useEffect(() => {
    const reload = setTimeout(() => {
      i18nService.reloadResources();
    }, 2000);

    return () => {
      clearTimeout(reload);
    };
  }, [i18nService]);

  return null;
});

const LocaleChanger = observer(() => {
  const { useLocale, getLocale } = useInjection<I18nService>(I18nService);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      useLocale(event.target.value);
    },
    [useLocale]
  );

  const currentLocale = getLocale();

  return (
    <select onChange={onChange} value={currentLocale}>
      {["en-US", "de-DE"].map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
});

const Consumer = observer(() => {
  const {
    t,
    formatNumber,
    formatPercent,
    formatFileSize,
    formatCurrency,
    formatDateByPattern,
    formatDate,
    formatTime,
    formatDateTime,
    formatDateRelative,
  } = useI18n();

  return (
    <div>
      <dl>
        <dt>Message Bundle 'hello.world'</dt>
        <dd>{t("hello.world")} </dd>
      </dl>
      <dl>
        <dt>Formatted Number ('0.3999' - maximum 2 fraction digits)</dt>
        <dd>{formatNumber(0.3999, { maximumFractionDigits: 2 })} </dd>
      </dl>
      <dl>
        <dt>
          Formatted Number as percent ('50.8888' - maximum 2 fraction digits)
        </dt>
        <dd>{formatPercent(50.8888, { maximumFractionDigits: 2 })} </dd>
      </dl>
      <dl>
        <dt>Formatted file size (4096 Bytes)</dt>
        <dd>{formatFileSize(4096)} </dd>
      </dl>
      <dl>
        <dt>Formatted currency (4096 EUR)</dt>
        <dd>{formatCurrency(4096, "EUR")} </dd>
      </dl>
      <dl>
        <dt>Formatted date by pattern 'yyyy-MM-dd'</dt>
        <dd>{formatDateByPattern(new Date(), "yyyy-MM-dd")} </dd>
      </dl>

      <dl>
        <dt>Formatted date</dt>
        <dd>{formatDate(new Date())} </dd>
      </dl>
      <dl>
        <dt>Formatted date-time</dt>
        <dd>{formatDateTime(new Date())} </dd>
      </dl>
      <dl>
        <dt>Formatted time</dt>
        <dd>{formatTime(new Date())} </dd>
      </dl>
      <dl>
        <dt>Formatted date relative</dt>
        <dd>{formatDateRelative(new Date())} </dd>
      </dl>
    </div>
  );
});

export default {
  title: "I18n",
} as Meta;

export const Default = () => {
  return (
    <Provider>
      <ReloadResources />
      <LocaleChanger />
      <Consumer />
    </Provider>
  );
};
