import { beforeEach, describe, expect, test } from "vitest";

import { NumberService } from "../../../src/i18n/number/NumberService";
import { NumberServiceImpl } from "../../../src/i18n/number/NumberServiceImpl";

const numberService: NumberService = new NumberServiceImpl();

describe("NumberServiceImpl", () => {
  describe("de-DE", () => {
    beforeEach(() => {
      numberService.useLocale("de-DE");
    });

    describe(".formatNumber()", () => {
      test("default", () => {
        expect(numberService.formatNumber(0.333)).toBe("0,333");
        expect(numberService.formatNumber(3)).toBe("3");
        expect(numberService.formatNumber(3.33)).toBe("3,33");
        expect(numberService.formatNumber(3333)).toBe("3333");
        expect(numberService.formatNumber(3333.33)).toBe("3333,33");
        expect(numberService.formatNumber(3333333)).toBe("3333333");
        expect(numberService.formatNumber(3333333.33)).toBe("3333333,33");
      });
      test("integer", () => {
        expect(
          numberService.formatNumber(0.333, { maximumFractionDigits: 0 })
        ).toBe("0");
        expect(
          numberService.formatNumber(3, { maximumFractionDigits: 0 })
        ).toBe("3");
        expect(
          numberService.formatNumber(3.33, { maximumFractionDigits: 0 })
        ).toBe("3");
        expect(
          numberService.formatNumber(3333, { maximumFractionDigits: 0 })
        ).toBe("3333");
        expect(
          numberService.formatNumber(3333.33, { maximumFractionDigits: 0 })
        ).toBe("3333");
        expect(
          numberService.formatNumber(3333333, { maximumFractionDigits: 0 })
        ).toBe("3333333");
        expect(
          numberService.formatNumber(3333333.33, { maximumFractionDigits: 0 })
        ).toBe("3333333");
      });
      test("integer - thousand separator", () => {
        expect(
          numberService.formatNumber(0.333, {
            maximumFractionDigits: 0,
            useGrouping: true,
          })
        ).toBe("0");
        expect(
          numberService.formatNumber(3, {
            maximumFractionDigits: 0,
            useGrouping: true,
          })
        ).toBe("3");
        expect(
          numberService.formatNumber(3.33, {
            maximumFractionDigits: 0,
            useGrouping: true,
          })
        ).toBe("3");
        expect(
          numberService.formatNumber(3333, {
            maximumFractionDigits: 0,
            useGrouping: true,
          })
        ).toBe("3.333");
        expect(
          numberService.formatNumber(3333.33, {
            maximumFractionDigits: 0,
            useGrouping: true,
          })
        ).toBe("3.333");
        expect(
          numberService.formatNumber(3333333, {
            maximumFractionDigits: 0,
            useGrouping: true,
          })
        ).toBe("3.333.333");
        expect(
          numberService.formatNumber(3333333.33, {
            maximumFractionDigits: 0,
            useGrouping: true,
          })
        ).toBe("3.333.333");
      });
      test("float", () => {
        expect(
          numberService.formatNumber(0.333, { maximumFractionDigits: 2 })
        ).toBe("0,33");

        expect(
          numberService.formatNumber(3, { maximumFractionDigits: 2 })
        ).toBe("3");
        expect(
          numberService.formatNumber(3, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })
        ).toBe("3,00");
        expect(
          numberService.formatNumber(3.33, { maximumFractionDigits: 2 })
        ).toBe("3,33");

        expect(
          numberService.formatNumber(3333, { maximumFractionDigits: 2 })
        ).toBe("3333");
        expect(
          numberService.formatNumber(3333, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })
        ).toBe("3333,00");

        expect(
          numberService.formatNumber(3333.33, { maximumFractionDigits: 2 })
        ).toBe("3333,33");

        expect(
          numberService.formatNumber(3333.33, {
            maximumFractionDigits: 3,
            minimumFractionDigits: 3,
          })
        ).toBe("3333,330");
      });

      test("float - thousand separator", () => {
        expect(
          numberService.formatNumber(0.333, {
            maximumFractionDigits: 2,
            useGrouping: true,
          })
        ).toBe("0,33");

        expect(
          numberService.formatNumber(3, {
            maximumFractionDigits: 2,
            useGrouping: true,
          })
        ).toBe("3");
        expect(
          numberService.formatNumber(3, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
            useGrouping: true,
          })
        ).toBe("3,00");
        expect(
          numberService.formatNumber(3.33, {
            maximumFractionDigits: 2,
            useGrouping: true,
          })
        ).toBe("3,33");

        expect(
          numberService.formatNumber(3333, {
            maximumFractionDigits: 2,
            useGrouping: true,
          })
        ).toBe("3.333");
        expect(
          numberService.formatNumber(3333, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
            useGrouping: true,
          })
        ).toBe("3.333,00");

        expect(
          numberService.formatNumber(3333.33, {
            maximumFractionDigits: 2,
            useGrouping: true,
          })
        ).toBe("3.333,33");

        expect(
          numberService.formatNumber(3333.33, {
            maximumFractionDigits: 3,
            minimumFractionDigits: 3,
            useGrouping: true,
          })
        ).toBe("3.333,330");
      });

      test("minumumFractionDigits regression test", () => {
        expect(
          numberService.formatNumber(1.2000000000000002, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 3,
          })
        ).toBe("1,2");
      });
    });

    describe(".formatPercent()", () => {
      test("default", () => {
        expect(numberService.formatPercent(33)).toBe("33\xa0%");
        expect(numberService.formatPercent(33.3)).toBe("33,3\xa0%");
        expect(numberService.formatPercent(300)).toBe("300\xa0%");
        expect(numberService.formatPercent(333)).toBe("333\xa0%");
        expect(numberService.formatPercent(333.3)).toBe("333,3\xa0%");
        expect(numberService.formatPercent(3333)).toBe("3333\xa0%");
        expect(numberService.formatPercent(3333.3)).toBe("3333,3\xa0%");
      });
      test("integer", () => {
        expect(
          numberService.formatPercent(33, { maximumFractionDigits: 0 })
        ).toBe("33\xa0%");
        expect(
          numberService.formatPercent(33.3, { maximumFractionDigits: 0 })
        ).toBe("33\xa0%");
        expect(
          numberService.formatPercent(300, { maximumFractionDigits: 0 })
        ).toBe("300\xa0%");
        expect(
          numberService.formatPercent(333, { maximumFractionDigits: 0 })
        ).toBe("333\xa0%");
        expect(
          numberService.formatPercent(333.3, { maximumFractionDigits: 0 })
        ).toBe("333\xa0%");
        expect(
          numberService.formatPercent(3333, { maximumFractionDigits: 0 })
        ).toBe("3333\xa0%");
        expect(
          numberService.formatPercent(3333.3, { maximumFractionDigits: 0 })
        ).toBe("3333\xa0%");
      });

      test("integer - thousand separator", () => {
        expect(
          numberService.formatPercent(33, {
            maximumFractionDigits: 0,
            useGrouping: true,
          })
        ).toBe("33\xa0%");
        expect(
          numberService.formatPercent(33.3, {
            maximumFractionDigits: 0,
            useGrouping: true,
          })
        ).toBe("33\xa0%");
        expect(
          numberService.formatPercent(300, {
            maximumFractionDigits: 0,
            useGrouping: true,
          })
        ).toBe("300\xa0%");
        expect(
          numberService.formatPercent(333, {
            maximumFractionDigits: 0,
            useGrouping: true,
          })
        ).toBe("333\xa0%");
        expect(
          numberService.formatPercent(333.3, {
            maximumFractionDigits: 0,
            useGrouping: true,
          })
        ).toBe("333\xa0%");
        expect(
          numberService.formatPercent(3333, {
            maximumFractionDigits: 0,
            useGrouping: true,
          })
        ).toBe("3.333\xa0%");
        expect(
          numberService.formatPercent(3333.3, {
            maximumFractionDigits: 0,
            useGrouping: true,
          })
        ).toBe("3.333\xa0%");
      });
      test("float", () => {
        expect(
          numberService.formatPercent(33, { maximumFractionDigits: 1 })
        ).toBe("33\xa0%");
        expect(
          numberService.formatPercent(33.3, { maximumFractionDigits: 1 })
        ).toBe("33,3\xa0%");
        expect(
          numberService.formatPercent(300, { maximumFractionDigits: 1 })
        ).toBe("300\xa0%");
        expect(
          numberService.formatPercent(333, { maximumFractionDigits: 1 })
        ).toBe("333\xa0%");
        expect(
          numberService.formatPercent(333.3, { maximumFractionDigits: 1 })
        ).toBe("333,3\xa0%");
        expect(
          numberService.formatPercent(3333, { maximumFractionDigits: 1 })
        ).toBe("3333\xa0%");
        expect(
          numberService.formatPercent(3333.3, { maximumFractionDigits: 1 })
        ).toBe("3333,3\xa0%");
        expect(
          numberService.formatPercent(3333.3, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })
        ).toBe("3333,30\xa0%");
      });

      test("float - thousand separator", () => {
        expect(
          numberService.formatPercent(33, {
            maximumFractionDigits: 1,
            useGrouping: true,
          })
        ).toBe("33\xa0%");
        expect(
          numberService.formatPercent(33.3, {
            maximumFractionDigits: 1,
            useGrouping: true,
          })
        ).toBe("33,3\xa0%");
        expect(
          numberService.formatPercent(300, {
            maximumFractionDigits: 1,
            useGrouping: true,
          })
        ).toBe("300\xa0%");
        expect(
          numberService.formatPercent(333, {
            maximumFractionDigits: 1,
            useGrouping: true,
          })
        ).toBe("333\xa0%");
        expect(
          numberService.formatPercent(333.3, {
            maximumFractionDigits: 1,
            useGrouping: true,
          })
        ).toBe("333,3\xa0%");
        expect(
          numberService.formatPercent(3333, {
            maximumFractionDigits: 1,
            useGrouping: true,
          })
        ).toBe("3.333\xa0%");
        expect(
          numberService.formatPercent(3333.3, {
            maximumFractionDigits: 1,
            useGrouping: true,
          })
        ).toBe("3.333,3\xa0%");
        expect(
          numberService.formatPercent(3333.3, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
            useGrouping: true,
          })
        ).toBe("3.333,30\xa0%");
      });
    });

    describe(".formatCurrency()", () => {
      test("default", () => {
        expect(numberService.formatCurrency(0.333, "EUR")).toBe("0,333\xa0€");
        expect(numberService.formatCurrency(3, "EUR")).toBe("3\xa0€");
        expect(numberService.formatCurrency(3.33, "EUR")).toBe("3,33\xa0€");
        expect(numberService.formatCurrency(3333, "EUR")).toBe("3.333\xa0€");
        expect(numberService.formatCurrency(3333.33, "EUR")).toBe(
          "3.333,33\xa0€"
        );
        expect(numberService.formatCurrency(3333333, "EUR")).toBe(
          "3.333.333\xa0€"
        );
        expect(numberService.formatCurrency(3333333.33, "EUR")).toBe(
          "3.333.333,33\xa0€"
        );
      });
    });

    describe(".formatFileSize()", () => {
      test("default", () => {
        expect(numberService.formatFileSize(334)).toBe("334 B");
        expect(numberService.formatFileSize(3843)).toBe("3,8 kB");
        expect(numberService.formatFileSize(28980)).toBe("29 kB");
        expect(numberService.formatFileSize(29500)).toBe("29,5 kB");
        expect(numberService.formatFileSize(577647376)).toBe("577,6 MB");
      });
    });

    describe(".parseNumber()", () => {
      test("default", () => {
        expect(numberService.parseNumber("0,333")).toBe(0.333);
        expect(numberService.parseNumber("3")).toBe(3);
        expect(numberService.parseNumber("3,33")).toBe(3.33);
        expect(numberService.parseNumber("3333")).toBe(3333);
        expect(numberService.parseNumber("3.333")).toBe(3333);
        expect(numberService.parseNumber("3333,33")).toBe(3333.33);
        expect(numberService.parseNumber("3.333,33")).toBe(3333.33);
        expect(numberService.parseNumber("3333333")).toBe(3333333);
        expect(numberService.parseNumber("3.333.333")).toBe(3333333);
        expect(numberService.parseNumber("3333333,33")).toBe(3333333.33);
        expect(numberService.parseNumber("3.333.333,33")).toBe(3333333.33);
      });

      test("percent", () => {
        expect(numberService.parseNumber("33\xa0%")).toBe(33);
        expect(numberService.parseNumber("33,3\xa0%")).toBe(33.3);
        expect(numberService.parseNumber("333\xa0%")).toBe(333);
        expect(numberService.parseNumber("333,3\xa0%")).toBe(333.3);
        expect(numberService.parseNumber("3333\xa0%")).toBe(3333);
        expect(numberService.parseNumber("3333,3\xa0%")).toBe(3333.3);
      });

      test("currency", () => {
        expect(numberService.parseNumber("0,333\xa0€")).toBe(0.333);
        expect(numberService.parseNumber("3\xa0€")).toBe(3);
        expect(numberService.parseNumber("3,33\xa0€")).toBe(3.33);
        expect(numberService.parseNumber("3.333\xa0€")).toBe(3333);
        expect(numberService.parseNumber("3.333,33\xa0€")).toBe(3333.33);
        expect(numberService.parseNumber("3.333.333\xa0€")).toBe(3333333);
        expect(numberService.parseNumber("3.333.333,33\xa0€")).toBe(3333333.33);
      });

      test("file size (without converting to bytes)", () => {
        expect(numberService.parseNumber("334 B")).toBe(334);
        expect(numberService.parseNumber("3,8 kB")).toBe(3.8);
        expect(numberService.parseNumber("29 kB")).toBe(29);
      });
    });
  });

  describe("en-US", () => {
    beforeEach(() => {
      numberService.useLocale("en-US");
    });

    describe(".formatNumber()", () => {
      test("default", () => {
        expect(numberService.formatNumber(0.333)).toBe("0.333");
        expect(numberService.formatNumber(3)).toBe("3");
        expect(numberService.formatNumber(3.33)).toBe("3.33");
        expect(numberService.formatNumber(3333)).toBe("3333");
        expect(numberService.formatNumber(3333.33)).toBe("3333.33");
        expect(numberService.formatNumber(3333333)).toBe("3333333");
        expect(numberService.formatNumber(3333333.33)).toBe("3333333.33");
      });
      test("integer", () => {
        expect(
          numberService.formatNumber(0.333, { maximumFractionDigits: 0 })
        ).toBe("0");
        expect(
          numberService.formatNumber(3, { maximumFractionDigits: 0 })
        ).toBe("3");
        expect(
          numberService.formatNumber(3.33, { maximumFractionDigits: 0 })
        ).toBe("3");
        expect(
          numberService.formatNumber(3333, { maximumFractionDigits: 0 })
        ).toBe("3333");
        expect(
          numberService.formatNumber(3333.33, { maximumFractionDigits: 0 })
        ).toBe("3333");
        expect(
          numberService.formatNumber(3333333, { maximumFractionDigits: 0 })
        ).toBe("3333333");
        expect(
          numberService.formatNumber(3333333.33, { maximumFractionDigits: 0 })
        ).toBe("3333333");
      });
      test("integer - thousand separator", () => {
        expect(
          numberService.formatNumber(0.333, {
            maximumFractionDigits: 0,
            useGrouping: true,
          })
        ).toBe("0");
        expect(
          numberService.formatNumber(3, {
            maximumFractionDigits: 0,
            useGrouping: true,
          })
        ).toBe("3");
        expect(
          numberService.formatNumber(3.33, {
            maximumFractionDigits: 0,
            useGrouping: true,
          })
        ).toBe("3");
        expect(
          numberService.formatNumber(3333, {
            maximumFractionDigits: 0,
            useGrouping: true,
          })
        ).toBe("3,333");
        expect(
          numberService.formatNumber(3333.33, {
            maximumFractionDigits: 0,
            useGrouping: true,
          })
        ).toBe("3,333");
        expect(
          numberService.formatNumber(3333333, {
            maximumFractionDigits: 0,
            useGrouping: true,
          })
        ).toBe("3,333,333");
        expect(
          numberService.formatNumber(3333333.33, {
            maximumFractionDigits: 0,
            useGrouping: true,
          })
        ).toBe("3,333,333");
      });
      test("float", () => {
        expect(
          numberService.formatNumber(0.333, { maximumFractionDigits: 2 })
        ).toBe("0.33");

        expect(
          numberService.formatNumber(3, { maximumFractionDigits: 2 })
        ).toBe("3");
        expect(
          numberService.formatNumber(3, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })
        ).toBe("3.00");
        expect(
          numberService.formatNumber(3.33, { maximumFractionDigits: 2 })
        ).toBe("3.33");

        expect(
          numberService.formatNumber(3333, { maximumFractionDigits: 2 })
        ).toBe("3333");
        expect(
          numberService.formatNumber(3333, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })
        ).toBe("3333.00");

        expect(
          numberService.formatNumber(3333.33, { maximumFractionDigits: 2 })
        ).toBe("3333.33");

        expect(
          numberService.formatNumber(3333.33, {
            maximumFractionDigits: 3,
            minimumFractionDigits: 3,
          })
        ).toBe("3333.330");
      });

      test("float - thousand separator", () => {
        expect(
          numberService.formatNumber(0.333, {
            maximumFractionDigits: 2,
            useGrouping: true,
          })
        ).toBe("0.33");

        expect(
          numberService.formatNumber(3, {
            maximumFractionDigits: 2,
            useGrouping: true,
          })
        ).toBe("3");
        expect(
          numberService.formatNumber(3, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
            useGrouping: true,
          })
        ).toBe("3.00");
        expect(
          numberService.formatNumber(3.33, {
            maximumFractionDigits: 2,
            useGrouping: true,
          })
        ).toBe("3.33");

        expect(
          numberService.formatNumber(3333, {
            maximumFractionDigits: 2,
            useGrouping: true,
          })
        ).toBe("3,333");
        expect(
          numberService.formatNumber(3333, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
            useGrouping: true,
          })
        ).toBe("3,333.00");

        expect(
          numberService.formatNumber(3333.33, {
            maximumFractionDigits: 2,
            useGrouping: true,
          })
        ).toBe("3,333.33");

        expect(
          numberService.formatNumber(3333.33, {
            maximumFractionDigits: 3,
            minimumFractionDigits: 3,
            useGrouping: true,
          })
        ).toBe("3,333.330");
      });
    });

    describe(".formatPercent()", () => {
      test("default", () => {
        expect(numberService.formatPercent(33)).toBe("33%");
        expect(numberService.formatPercent(33.3)).toBe("33.3%");
        expect(numberService.formatPercent(300)).toBe("300%");
        expect(numberService.formatPercent(333)).toBe("333%");
        expect(numberService.formatPercent(333.3)).toBe("333.3%");
        expect(numberService.formatPercent(3333)).toBe("3333%");
        expect(numberService.formatPercent(3333.3)).toBe("3333.3%");
      });
      test("integer", () => {
        expect(
          numberService.formatPercent(33, { maximumFractionDigits: 0 })
        ).toBe("33%");
        expect(
          numberService.formatPercent(33.3, { maximumFractionDigits: 0 })
        ).toBe("33%");
        expect(
          numberService.formatPercent(300, { maximumFractionDigits: 0 })
        ).toBe("300%");
        expect(
          numberService.formatPercent(333, { maximumFractionDigits: 0 })
        ).toBe("333%");
        expect(
          numberService.formatPercent(333.3, { maximumFractionDigits: 0 })
        ).toBe("333%");
        expect(
          numberService.formatPercent(3333, { maximumFractionDigits: 0 })
        ).toBe("3333%");
        expect(
          numberService.formatPercent(3333.3, { maximumFractionDigits: 0 })
        ).toBe("3333%");
      });

      test("integer - thousand separator", () => {
        expect(
          numberService.formatPercent(33, {
            maximumFractionDigits: 0,
            useGrouping: true,
          })
        ).toBe("33%");
        expect(
          numberService.formatPercent(33.3, {
            maximumFractionDigits: 0,
            useGrouping: true,
          })
        ).toBe("33%");
        expect(
          numberService.formatPercent(300, {
            maximumFractionDigits: 0,
            useGrouping: true,
          })
        ).toBe("300%");
        expect(
          numberService.formatPercent(333, {
            maximumFractionDigits: 0,
            useGrouping: true,
          })
        ).toBe("333%");
        expect(
          numberService.formatPercent(333.3, {
            maximumFractionDigits: 0,
            useGrouping: true,
          })
        ).toBe("333%");
        expect(
          numberService.formatPercent(3333, {
            maximumFractionDigits: 0,
            useGrouping: true,
          })
        ).toBe("3,333%");
        expect(
          numberService.formatPercent(3333.3, {
            maximumFractionDigits: 0,
            useGrouping: true,
          })
        ).toBe("3,333%");
      });
      test("float", () => {
        expect(
          numberService.formatPercent(33, { maximumFractionDigits: 1 })
        ).toBe("33%");
        expect(
          numberService.formatPercent(33.3, { maximumFractionDigits: 1 })
        ).toBe("33.3%");
        expect(
          numberService.formatPercent(300, { maximumFractionDigits: 1 })
        ).toBe("300%");
        expect(
          numberService.formatPercent(333, { maximumFractionDigits: 1 })
        ).toBe("333%");
        expect(
          numberService.formatPercent(333.3, { maximumFractionDigits: 1 })
        ).toBe("333.3%");
        expect(
          numberService.formatPercent(3333, { maximumFractionDigits: 1 })
        ).toBe("3333%");
        expect(
          numberService.formatPercent(3333.3, { maximumFractionDigits: 1 })
        ).toBe("3333.3%");
        expect(
          numberService.formatPercent(3333.3, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })
        ).toBe("3333.30%");
      });

      test("float - thousand separator", () => {
        expect(
          numberService.formatPercent(33, {
            maximumFractionDigits: 1,
            useGrouping: true,
          })
        ).toBe("33%");
        expect(
          numberService.formatPercent(33.3, {
            maximumFractionDigits: 1,
            useGrouping: true,
          })
        ).toBe("33.3%");
        expect(
          numberService.formatPercent(300, {
            maximumFractionDigits: 1,
            useGrouping: true,
          })
        ).toBe("300%");
        expect(
          numberService.formatPercent(333, {
            maximumFractionDigits: 1,
            useGrouping: true,
          })
        ).toBe("333%");
        expect(
          numberService.formatPercent(333.3, {
            maximumFractionDigits: 1,
            useGrouping: true,
          })
        ).toBe("333.3%");
        expect(
          numberService.formatPercent(3333, {
            maximumFractionDigits: 1,
            useGrouping: true,
          })
        ).toBe("3,333%");
        expect(
          numberService.formatPercent(3333.3, {
            maximumFractionDigits: 1,
            useGrouping: true,
          })
        ).toBe("3,333.3%");
        expect(
          numberService.formatPercent(3333.3, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
            useGrouping: true,
          })
        ).toBe("3,333.30%");
      });
    });

    describe(".formatCurrency()", () => {
      test("default", () => {
        expect(numberService.formatCurrency(0.333, "EUR")).toBe("€0.333");
        expect(numberService.formatCurrency(3, "EUR")).toBe("€3");
        expect(numberService.formatCurrency(3.33, "EUR")).toBe("€3.33");
        expect(numberService.formatCurrency(3333, "EUR")).toBe("€3,333");
        expect(numberService.formatCurrency(3333.33, "EUR")).toBe("€3,333.33");
        expect(numberService.formatCurrency(3333333, "EUR")).toBe("€3,333,333");
        expect(numberService.formatCurrency(3333333.33, "EUR")).toBe(
          "€3,333,333.33"
        );
      });
    });

    describe(".formatFileSize()", () => {
      test("default", () => {
        expect(numberService.formatFileSize(334)).toBe("334 B");
        expect(numberService.formatFileSize(3843)).toBe("3.8 kB");
        expect(numberService.formatFileSize(28980)).toBe("29 kB");
        expect(numberService.formatFileSize(29500)).toBe("29.5 kB");
        expect(numberService.formatFileSize(577647376)).toBe("577.6 MB");
      });
    });

    describe(".parseNumber()", () => {
      test("default", () => {
        expect(numberService.parseNumber("0.333")).toBe(0.333);
        expect(numberService.parseNumber("-0.333")).toBe(-0.333);
        expect(numberService.parseNumber("3")).toBe(3);
        expect(numberService.parseNumber("-3")).toBe(-3);
        expect(numberService.parseNumber("3.33")).toBe(3.33);
        expect(numberService.parseNumber("-3.33")).toBe(-3.33);
        expect(numberService.parseNumber("3333")).toBe(3333);
        expect(numberService.parseNumber("-3333")).toBe(-3333);
        expect(numberService.parseNumber("3,333")).toBe(3333);
        expect(numberService.parseNumber("-3,333")).toBe(-3333);
        expect(numberService.parseNumber("3333.33")).toBe(3333.33);
        expect(numberService.parseNumber("-3333.33")).toBe(-3333.33);
        expect(numberService.parseNumber("3,333.33")).toBe(3333.33);
        expect(numberService.parseNumber("-3,333.33")).toBe(-3333.33);
        expect(numberService.parseNumber("3333333")).toBe(3333333);
        expect(numberService.parseNumber("-3333333")).toBe(-3333333);
        expect(numberService.parseNumber("3,333,333")).toBe(3333333);
        expect(numberService.parseNumber("-3,333,333")).toBe(-3333333);
        expect(numberService.parseNumber("3333333.33")).toBe(3333333.33);
        expect(numberService.parseNumber("-3333333.33")).toBe(-3333333.33);
        expect(numberService.parseNumber("3,333,333.33")).toBe(3333333.33);
        expect(numberService.parseNumber("-3,333,333.33")).toBe(-3333333.33);
      });

      test("percent", () => {
        expect(numberService.parseNumber("33%")).toBe(33);
        expect(numberService.parseNumber("-33%")).toBe(-33);
        expect(numberService.parseNumber("33.3%")).toBe(33.3);
        expect(numberService.parseNumber("-33.3%")).toBe(-33.3);
        expect(numberService.parseNumber("333%")).toBe(333);
        expect(numberService.parseNumber("-333%")).toBe(-333);
        expect(numberService.parseNumber("333.3%")).toBe(333.3);
        expect(numberService.parseNumber("-333.3%")).toBe(-333.3);
        expect(numberService.parseNumber("3333%")).toBe(3333);
        expect(numberService.parseNumber("-3333%")).toBe(-3333);
        expect(numberService.parseNumber("3333.3%")).toBe(3333.3);
        expect(numberService.parseNumber("-3333.3%")).toBe(-3333.3);
      });

      test("currency", () => {
        expect(numberService.parseNumber("€0.333")).toBe(0.333);
        expect(numberService.parseNumber("€-0.333")).toBe(-0.333);
        expect(numberService.parseNumber("€3")).toBe(3);
        expect(numberService.parseNumber("€-3")).toBe(-3);
        expect(numberService.parseNumber("€3.33")).toBe(3.33);
        expect(numberService.parseNumber("€-3.33")).toBe(-3.33);
        expect(numberService.parseNumber("€3,333")).toBe(3333);
        expect(numberService.parseNumber("€-3,333")).toBe(-3333);
        expect(numberService.parseNumber("€3,333.33")).toBe(3333.33);
        expect(numberService.parseNumber("€-3,333.33")).toBe(-3333.33);
        expect(numberService.parseNumber("€3,333,333")).toBe(3333333);
        expect(numberService.parseNumber("€-3,333,333")).toBe(-3333333);
        expect(numberService.parseNumber("€3,333,333.33")).toBe(3333333.33);
        expect(numberService.parseNumber("€-3,333,333.33")).toBe(-3333333.33);
      });

      test("file size (without converting to bytes)", () => {
        expect(numberService.parseNumber("334 B")).toBe(334);
        expect(numberService.parseNumber("-334 B")).toBe(-334);
        expect(numberService.parseNumber("3.8 kB")).toBe(3.8);
        expect(numberService.parseNumber("-3.8 kB")).toBe(-3.8);
        expect(numberService.parseNumber("29 kB")).toBe(29);
        expect(numberService.parseNumber("-29 kB")).toBe(-29);
      });
    });
  });
});
