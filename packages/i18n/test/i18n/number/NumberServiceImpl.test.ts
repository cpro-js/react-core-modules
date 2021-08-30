import { NumberService } from "../../../src/i18n/number/NumberService";
import { NumberServiceImpl } from "../../../src/i18n/number/NumberServiceImpl";
import deDE from "../../../src/locale/de-DE";

const numberService: NumberService = new NumberServiceImpl();

describe("NumberServiceImpl", () => {
  describe("de-De", () => {
    beforeEach(() => {
      numberService.registerLanguage(deDE.number);
      numberService.useLanguage("de-DE");
    });

    describe(".formatNumber()", () => {
      it("default", () => {
        expect(numberService.formatNumber(0.333)).toBe("0,333");
        expect(numberService.formatNumber(3)).toBe("3");
        expect(numberService.formatNumber(3.33)).toBe("3,33");
        expect(numberService.formatNumber(3333)).toBe("3333");
        expect(numberService.formatNumber(3333.33)).toBe("3333,33");
        expect(numberService.formatNumber(3333333)).toBe("3333333");
        expect(numberService.formatNumber(3333333.33)).toBe("3333333,33");
      });
      it("integer", () => {
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
      it("integer - thousand separator", () => {
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
      it("float", () => {
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

      it("float - thousand separator", () => {
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
    });

    describe(".formatPercent()", () => {
      it("default", () => {
        expect(numberService.formatPercent(33)).toBe("33%");
        expect(numberService.formatPercent(33.3)).toBe("33,3%");
        expect(numberService.formatPercent(300)).toBe("300%");
        expect(numberService.formatPercent(333)).toBe("333%");
        expect(numberService.formatPercent(333.3)).toBe("333,3%");
        expect(numberService.formatPercent(3333)).toBe("3333%");
        expect(numberService.formatPercent(3333.3)).toBe("3333,3%");
      });
      it("integer", () => {
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

      it("integer - thousand separator", () => {
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
        ).toBe("3.333%");
        expect(
          numberService.formatPercent(3333.3, {
            maximumFractionDigits: 0,
            useGrouping: true,
          })
        ).toBe("3.333%");
      });
      it("float", () => {
        expect(
          numberService.formatPercent(33, { maximumFractionDigits: 1 })
        ).toBe("33%");
        expect(
          numberService.formatPercent(33.3, { maximumFractionDigits: 1 })
        ).toBe("33,3%");
        expect(
          numberService.formatPercent(300, { maximumFractionDigits: 1 })
        ).toBe("300%");
        expect(
          numberService.formatPercent(333, { maximumFractionDigits: 1 })
        ).toBe("333%");
        expect(
          numberService.formatPercent(333.3, { maximumFractionDigits: 1 })
        ).toBe("333,3%");
        expect(
          numberService.formatPercent(3333, { maximumFractionDigits: 1 })
        ).toBe("3333%");
        expect(
          numberService.formatPercent(3333.3, { maximumFractionDigits: 1 })
        ).toBe("3333,3%");
        expect(
          numberService.formatPercent(3333.3, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })
        ).toBe("3333,30%");
      });

      it("float - thousand separator", () => {
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
        ).toBe("33,3%");
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
        ).toBe("333,3%");
        expect(
          numberService.formatPercent(3333, {
            maximumFractionDigits: 1,
            useGrouping: true,
          })
        ).toBe("3.333%");
        expect(
          numberService.formatPercent(3333.3, {
            maximumFractionDigits: 1,
            useGrouping: true,
          })
        ).toBe("3.333,3%");
        expect(
          numberService.formatPercent(3333.3, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
            useGrouping: true,
          })
        ).toBe("3.333,30%");
      });
    });

    describe(".formatCurrency()", () => {
      it("default", () => {
        expect(numberService.formatCurrency(0.333, "EUR")).toBe("0,333 €");
        expect(numberService.formatCurrency(3, "EUR")).toBe("3 €");
        expect(numberService.formatCurrency(3.33, "EUR")).toBe("3,33 €");
        expect(numberService.formatCurrency(3333, "EUR")).toBe("3.333 €");
        expect(numberService.formatCurrency(3333.33, "EUR")).toBe("3.333,33 €");
        expect(numberService.formatCurrency(3333333, "EUR")).toBe(
          "3.333.333 €"
        );
        expect(numberService.formatCurrency(3333333.33, "EUR")).toBe(
          "3.333.333,33 €"
        );
      });
    });

    describe(".formatFileSize()", () => {
      it("default", () => {
        expect(numberService.formatFileSize(334)).toBe("334 B");
        expect(numberService.formatFileSize(3843)).toBe("3,8 KB");
        expect(numberService.formatFileSize(28980)).toBe("29 KB");
        expect(numberService.formatFileSize(29500)).toBe("29,5 KB");
        expect(numberService.formatFileSize(577647376)).toBe("577,6 MB");
      });
    });
  });

  describe("en-US", () => {
    beforeEach(() => {
      numberService.useLanguage("en-US");
    });

    describe(".formatNumber()", () => {
      it("default", () => {
        expect(numberService.formatNumber(0.333)).toBe("0.333");
        expect(numberService.formatNumber(3)).toBe("3");
        expect(numberService.formatNumber(3.33)).toBe("3.33");
        expect(numberService.formatNumber(3333)).toBe("3333");
        expect(numberService.formatNumber(3333.33)).toBe("3333.33");
        expect(numberService.formatNumber(3333333)).toBe("3333333");
        expect(numberService.formatNumber(3333333.33)).toBe("3333333.33");
      });
      it("integer", () => {
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
      it("integer - thousand separator", () => {
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
      it("float", () => {
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

      it("float - thousand separator", () => {
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
      it("default", () => {
        expect(numberService.formatPercent(33)).toBe("33%");
        expect(numberService.formatPercent(33.3)).toBe("33.3%");
        expect(numberService.formatPercent(300)).toBe("300%");
        expect(numberService.formatPercent(333)).toBe("333%");
        expect(numberService.formatPercent(333.3)).toBe("333.3%");
        expect(numberService.formatPercent(3333)).toBe("3333%");
        expect(numberService.formatPercent(3333.3)).toBe("3333.3%");
      });
      it("integer", () => {
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

      it("integer - thousand separator", () => {
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
      it("float", () => {
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

      it("float - thousand separator", () => {
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
      it("default", () => {
        expect(numberService.formatCurrency(0.333, "EUR")).toBe("€ 0.333");
        expect(numberService.formatCurrency(3, "EUR")).toBe("€ 3");
        expect(numberService.formatCurrency(3.33, "EUR")).toBe("€ 3.33");
        expect(numberService.formatCurrency(3333, "EUR")).toBe("€ 3,333");
        expect(numberService.formatCurrency(3333.33, "EUR")).toBe("€ 3,333.33");
        expect(numberService.formatCurrency(3333333, "EUR")).toBe(
          "€ 3,333,333"
        );
        expect(numberService.formatCurrency(3333333.33, "EUR")).toBe(
          "€ 3,333,333.33"
        );
      });
    });

    describe(".formatFileSize()", () => {
      it("default", () => {
        expect(numberService.formatFileSize(334)).toBe("334 B");
        expect(numberService.formatFileSize(3843)).toBe("3.8 KB");
        expect(numberService.formatFileSize(28980)).toBe("29 KB");
        expect(numberService.formatFileSize(29500)).toBe("29.5 KB");
        expect(numberService.formatFileSize(577647376)).toBe("577.6 MB");
      });
    });
  });
});
