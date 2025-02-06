import { Observer, useI18n } from "@cpro-js/react-core";
import { Meta, StoryObj } from "@storybook/react";

/**
 * These stories show the use of hook `useI18n()`;
 *
 * ```tsx
 * import { useI18n } from "@cpro-js/react-core";
 * ```
 */
export default {
  title: "@cpro-js/react-core/useI18n",
} satisfies Meta;

/**
 * Translates a text via Message Bundle
 *
 * ```tsx
 * const { t } = useI18n();
 * const helloWorld = t("hello.world");
 * ```
 */
export const t: StoryObj<{}> = {
  name: "t",
  render: () => {
    const { t } = useI18n();
    return (
      <dl>
        <dt>Message Bundle 'hello.world'</dt>
        <dd>
          <Observer render={() => <>{t("hello.world")}</>}/>
        </dd>
      </dl>
    );
  }
};

/**
 * Formats a number for the current locale
 *
 * ```tsx
 * const { formatNumber } = useI18n();
 * const value = formatNumber(0.3999, { maximumFractionDigits: 2 });
 * ```
 */
export const formatNumber: StoryObj<{}> = {
  name: "formatNumber",
  render: () => {
    const { formatNumber } = useI18n();
    return (
      <dl>
        <dt>Formatted Number ('0.3999' - maximum 2 fraction digits)</dt>
        <dd>
          <Observer render={() => <>{formatNumber(0.3999, { maximumFractionDigits: 2 })}</>}/>
        </dd>
      </dl>
    );
  }
};

/**
 * Formats a number in percent for the current locale
 *
 * ```tsx
 * const { formatPercent } = useI18n();
 * const value = formatPercent(50.8888, { maximumFractionDigits: 2 });
 * ```
 */
export const formatPercent: StoryObj<{}> = {
  name: "formatPercent",
  render: () => {
    const { formatPercent } = useI18n();
    return (
      <dl>
        <dt>
          Formatted Number as percent ('50.8888' - maximum 2 fraction digits)
        </dt>
        <dd>
          <Observer render={() => <>{formatPercent(50.8888, { maximumFractionDigits: 2 })}</>}/>
        </dd>
      </dl>
    );
  }
};

/**
 * Formats a number in percent for the current locale
 *
 * ```tsx
 * const { formatFileSize } = useI18n();
 * const value = formatPercent(50.8888, { maximumFractionDigits: 2 });
 * ```
 */
export const formatFileSize: StoryObj<{}> = {
  name: "formatFileSize",
  render: () => {
    const { formatFileSize } = useI18n();
    return (
      <dl>
        <dt>Formatted file size (4096 Bytes)</dt>
        <dd>
          <Observer render={() => <>{formatFileSize(4096)}</>}/>
        </dd>
      </dl>
    );
  }
};

/**
 * Formats a currency for the current locale
 *
 * ```tsx
 * const { formatCurrency } = useI18n();
 * const value = formatCurrency(4096, "EUR");
 * ```
 */
export const formatCurrency: StoryObj<{}> = {
  name: "formatCurrency",
  render: () => {
    const { formatCurrency } = useI18n();
    return (
      <dl>
        <dt>Formatted currency (4096 EUR)</dt>
        <dd>
          <Observer render={() => <>{formatCurrency(4096, "EUR")}</>}/>
        </dd>
      </dl>
    );
  }
};

/**
 * Formats a date by pattern
 *
 * ```tsx
 * const { formatDateByPattern } = useI18n();
 * const value = formatDateByPattern(new Date(), "yyyy-MM-dd");
 * ```
 */
export const formatDateByPattern: StoryObj<{}> = {
  name: "formatDateByPattern",
  render: () => {
    const { formatDateByPattern } = useI18n();
    return (
      <dl>
        <dt>Formatted date by pattern 'yyyy-MM-dd'</dt>
        <dd>
          <Observer render={() => <>{formatDateByPattern(new Date(), "yyyy-MM-dd")}</>}/>
        </dd>
      </dl>
    );
  }
};

/**
 * Formats a date into locale-aware date string representation
 *
 * ```tsx
 * const { formatDate } = useI18n();
 * const value = formatDate(new Date());
 * ```
 */
export const formatDate: StoryObj<{}> = {
  name: "formatDate",
  render: () => {
    const { formatDate } = useI18n();
    return (
      <dl>
        <dt>Formatted date</dt>
        <dd>
          <Observer render={() => <>{formatDate(new Date())}</>}/>
        </dd>
      </dl>
    );
  }
};

/**
 * Formats a date into locale-aware datetime string representation
 *
 * ```tsx
 * const { formatDateTime } = useI18n();
 * const value = formatDateTime(new Date());
 * ```
 */
export const formatDateTime: StoryObj<{}> = {
  name: "formatDateTime",
  render: () => {
    const { formatDateTime } = useI18n();
    return (
      <dl>
        <dt>Formatted date-time</dt>
        <dd>
          <Observer render={() => <>{formatDateTime(new Date())}</>}/>
        </dd>
      </dl>
    );
  }
};


/**
 * Formats a date into locale-aware time string representation
 *
 * ```tsx
 * const { formatTime } = useI18n();
 * const value = formatTime(new Date());
 * ```
 */
export const formatTime: StoryObj<{}> = {
  name: "formatTime",
  render: () => {
    const { formatTime } = useI18n();
    return (
      <dl>
        <dt>Formatted time</dt>
        <dd>
          <Observer render={() => <>{formatTime(new Date())}</>}/>
        </dd>
      </dl>
    );
  }
};


/**
 * Formats a date into locale-aware string representation of a relative date / time
 *
 * ```tsx
 * const { formatDateRelative } = useI18n();
 * const value = formatDateRelative(new Date());
 * ```
 */
export const formatDateRelative: StoryObj<{}> = {
  name: "formatDateRelative",
  render: () => {
    const { formatDateRelative } = useI18n();
    return (
      <dl>
        <dt>Formatted date relative (now)</dt>
        <dd>
          <Observer render={() => <>{formatDateRelative(new Date())}</>}/>
        </dd>
        <dt>Formatted date relative (yesterday)</dt>
        <dd>
          <Observer render={() => <>{formatDateRelative(new Date(Date.now() - 24 * 60 * 60 * 1000))}</>}></Observer>
        </dd>
      </dl>
    );
  }
};


