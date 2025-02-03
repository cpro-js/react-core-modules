import { describe, expect, test } from "vitest";

import {
  evaluateLocale,
  getLanguageFromLocale,
} from "../../../../src/i18n/locale/util/localeUtils";

describe("Locale Utils Tests", () => {
  test("getLanguageFromLocale with locale", () => {
    const result = getLanguageFromLocale("en-IN");
    expect(result).toBe("en");
  });

  test("getLanguageFromLocale with language", () => {
    const result = getLanguageFromLocale("de");
    expect(result).toBe("de");
  });

  test("fail getLanguageFromLocale", () => {
    // @ts-ignore
    expect(() => getLanguageFromLocale(null)).toThrowError();
    // @ts-ignore
    expect(() => getLanguageFromLocale()).toThrowError();
    expect(() => getLanguageFromLocale("")).toThrowError();
  });

  test("evaluateLocale permissive", () => {
    const supported = ["en-*", "de-*"];
    const fallback = "en";

    expect(evaluateLocale("en", supported, fallback)).toBe("en");
    // permissive behaviour
    expect(evaluateLocale("en-IN", supported, fallback)).toBe("en-IN");
    expect(evaluateLocale("de-DE", supported, fallback)).toBe("de-DE");
    expect(evaluateLocale("de", supported, fallback)).toBe("de");
    // fallback to default language
    expect(evaluateLocale("fr", supported, fallback)).toBe(fallback);
    expect(evaluateLocale("", supported, fallback)).toBe(fallback);
    expect(evaluateLocale(undefined, supported, fallback)).toBe(fallback);
    expect(evaluateLocale(null, supported, fallback)).toBe(fallback);
    expect(evaluateLocale("en", null, fallback)).toBe(fallback);
    expect(evaluateLocale("en", undefined, fallback)).toBe(fallback);
    expect(evaluateLocale("en", [], fallback)).toBe(fallback);
  });

  test("evaluateLocale explicit", () => {
    const supported = ["en-US", "de"];
    const fallback = "en-US";

    expect(evaluateLocale("en", supported, fallback)).toBe(fallback);
    expect(evaluateLocale("de-DE", supported, fallback)).toBe(fallback);
    expect(evaluateLocale("de", supported, fallback)).toBe("de");
  });

  test("fail evaluateLocale", () => {
    expect(() => evaluateLocale("en", ["en"], "")).toThrowError();
    // @ts-ignore
    expect(() => evaluateLocale("en", ["en"], null)).toThrowError();
    // @ts-ignore
    expect(() => evaluateLocale("en", ["en"])).toThrowError();
  });
});
