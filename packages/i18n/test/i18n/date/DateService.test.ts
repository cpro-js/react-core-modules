import { subHours, subSeconds } from "date-fns";
import { de, enUS } from "date-fns/locale";

import { DateService } from "../../../src/i18n/date/DateService";
import { DateServiceImpl } from "../../../src/i18n/date/DateServiceImpl";

const dateService: DateService = new DateServiceImpl();

describe("DateService", () => {
  describe(".parse()", () => {
    describe("parses pattern 'yyyyMMddHHmmssSSS'", () => {
      it("as 'Etc/UTC' timezone", () => {
        const dateFormat = "yyyyMMddHHmmssSSS";

        const dateString1 = "20190630170000000";
        const dateStringExpected1 = "2019-06-30T17:00:00.000Z";
        const result1 = dateService.parse(dateString1, dateFormat, {
          timezone: "Etc/UTC",
        });
        expect(result1.toISOString()).toBe(dateStringExpected1);

        const dateString2 = "20190627165943076";
        const dateStringExpected2 = "2019-06-27T16:59:43.076Z";
        const result2 = dateService.parse(dateString2, dateFormat, {
          timezone: "Etc/UTC",
        });
        expect(result2.toISOString()).toBe(dateStringExpected2);
      });

      it("as 'Europe/Berlin' timezone", () => {
        const dateFormat = "yyyyMMddHHmmssSSS";

        const dateString1 = "20190630170000000";
        const dateStringExpected1 = "2019-06-30T15:00:00.000Z";
        const result1 = dateService.parse(dateString1, dateFormat, {
          timezone: "Europe/Berlin",
        });
        expect(result1.toISOString()).toBe(dateStringExpected1);

        const dateString2 = "20190627165943076";
        const dateStringExpected2 = "2019-06-27T14:59:43.076Z";
        const result2 = dateService.parse(dateString2, dateFormat, {
          timezone: "Europe/Berlin",
        });
        expect(result2.toISOString()).toBe(dateStringExpected2);
      });
    });

    describe("parses pattern 'yyyy-MM-dd'", () => {
      it("as 'Etc/UTC' timezone", () => {
        const dateFormat = "yyyy-MM-dd";

        const dateString1 = "2019-06-30";
        const dateStringExpected1 = "2019-06-30T00:00:00.000Z";
        const result1 = dateService.parse(dateString1, dateFormat, {
          timezone: "Etc/UTC",
        });
        expect(result1.toISOString()).toBe(dateStringExpected1);

        const dateString2 = "2019-06-27";
        const dateStringExpected2 = "2019-06-27T00:00:00.000Z";
        const result2 = dateService.parse(dateString2, dateFormat, {
          timezone: "Etc/UTC",
        });
        expect(result2.toISOString()).toBe(dateStringExpected2);
      });

      it("as 'Europe/Berlin' timezone", () => {
        const dateFormat = "yyyy-MM-dd";

        const dateString1 = "2019-06-30";
        const dateStringExpected1 = "2019-06-29T22:00:00.000Z";
        const result1 = dateService.parse(dateString1, dateFormat, {
          timezone: "Europe/Berlin",
        });
        expect(result1.toISOString()).toBe(dateStringExpected1);

        const dateString2 = "2019-06-27";
        const dateStringExpected2 = "2019-06-26T22:00:00.000Z";
        const result2 = dateService.parse(dateString2, dateFormat, {
          timezone: "Europe/Berlin",
        });
        expect(result2.toISOString()).toBe(dateStringExpected2);
      });
    });

    describe("parses pattern 'yyyy-MM-dd[T]HH:mm:ss.SSS[Z]'", () => {
      // NOTE: the test is completely stupid, because the pattern is always an ISO UTC Date String
      // parsing it like this should be avoided as the exsting timezone information will be ignored and the
      // date will be parsed instead to the desired time zone.

      it("as 'Etc/UTC' timezone", () => {
        const dateFormat = "yyyy-MM-dd[T]HH:mm:ss.SSS[Z]";

        const dateString = "2019-06-27T16:59:43.076Z";
        const dateStringExpected = "2019-06-27T16:59:43.076Z";
        const result1 = dateService.parse(dateString, dateFormat, {
          timezone: "Etc/UTC",
        });
        expect(result1.toISOString()).toBe(dateStringExpected);
      });

      it("as 'Europe/Berlin' timezone", () => {
        const dateFormat = "yyyy-MM-dd[T]HH:mm:ss.SSS[Z]";

        const dateString = "2019-06-27T16:59:43.076Z";
        const dateStringExpected = "2019-06-27T14:59:43.076Z";
        const result1 = dateService.parse(dateString, dateFormat, {
          timezone: "Europe/Berlin",
        });
        expect(result1.toISOString()).toBe(dateStringExpected);
      });
    });
  });

  describe(".format()", () => {
    describe("formats pattern 'yyyyMMddHHmmssSSS'", () => {
      it("as 'Etc/UTC' timezone", () => {
        const dateFormat = "yyyyMMddHHmmssSSS";

        const date1 = new Date("2019-06-30T17:00:00.000Z");
        const dateStringExpected1 = "20190630170000000";
        const result1 = dateService.formatPattern(date1, dateFormat, {
          timezone: "Etc/UTC",
        });
        expect(result1).toBe(dateStringExpected1);

        const date2 = new Date("2019-06-27T16:59:43.076Z");
        const dateStringExpected2 = "20190627165943076";
        const result2 = dateService.formatPattern(date2, dateFormat, {
          timezone: "Etc/UTC",
        });
        expect(result2).toBe(dateStringExpected2);
      });

      it("as 'Europe/Berlin' timezone", () => {
        const dateFormat = "yyyyMMddHHmmssSSS";

        const date1 = new Date("2019-06-30T17:00:00.000Z");
        const dateStringExpected1 = "20190630190000000";
        const result1 = dateService.formatPattern(date1, dateFormat, {
          timezone: "Europe/Berlin",
        });

        expect(result1).toBe(dateStringExpected1);

        const date2 = new Date("2019-06-27T16:59:43.076Z");
        const dateStringExpected2 = "20190627185943076";
        const result2 = dateService.formatPattern(date2, dateFormat, {
          timezone: "Europe/Berlin",
        });

        expect(result2).toBe(dateStringExpected2);
      });
    });

    describe("formats pattern 'yyyy-MM-dd'", () => {
      it("as 'Etc/UTC' timezone", () => {
        const dateFormat = "yyyy-MM-dd";

        const date1 = new Date("2019-06-30T00:00:00.000Z");
        const dateStringExpected1 = "2019-06-30";
        const result1 = dateService.formatPattern(date1, dateFormat, {
          timezone: "Etc/UTC",
        });
        expect(result1).toBe(dateStringExpected1);

        const date2 = new Date("2019-06-26T22:00:00.000Z");
        const dateStringExpected2 = "2019-06-26";
        const result2 = dateService.formatPattern(date2, dateFormat, {
          timezone: "Etc/UTC",
        });
        expect(result2).toBe(dateStringExpected2);
      });

      it("as 'Europe/Berlin' timezone", () => {
        const dateFormat = "yyyy-MM-dd";

        const date1 = new Date("2019-06-30T00:00:00.000Z");
        const dateStringExpected1 = "2019-06-30";
        const result1 = dateService.formatPattern(date1, dateFormat, {
          timezone: "Europe/Berlin",
        });

        expect(result1).toBe(dateStringExpected1);

        const date2 = new Date("2019-06-26T22:00:00.000Z");
        const dateStringExpected2 = "2019-06-27";
        const result2 = dateService.formatPattern(date2, dateFormat, {
          timezone: "Europe/Berlin",
        });

        expect(result2).toBe(dateStringExpected2);
      });

      it("as 'America/Chicago' timezone", () => {
        const dateFormat = "yyyy-MM-dd";

        const date1 = new Date("2019-06-30T00:00:00.000Z");
        const dateStringExpected1 = "2019-06-29";
        const result1 = dateService.formatPattern(date1, dateFormat, {
          timezone: "America/Chicago",
        });

        expect(result1).toBe(dateStringExpected1);

        const date2 = new Date("2019-06-26T22:00:00.000Z");
        const dateStringExpected2 = "2019-06-26";
        const result2 = dateService.formatPattern(date2, dateFormat, {
          timezone: "America/Chicago",
        });

        expect(result2).toBe(dateStringExpected2);
      });
    });

    describe("formats date in format 'yyyy-MM-dd[T]HH:mm:ss.SSS'", () => {
      it("as 'Etc/UTC' timezone", () => {
        const dateFormat = "yyyy-MM-dd[T]HH:mm:ss.SSS";

        const date1 = new Date("2019-06-30T17:00:00.000Z");
        const dateStringExpected1 = "2019-06-30T17:00:00.000";
        const result1 = dateService.formatPattern(date1, dateFormat, {
          timezone: "Etc/UTC",
        });

        expect(result1).toBe(dateStringExpected1);

        const date2 = new Date("2019-06-27T16:59:43.076Z");
        const dateStringExpected2 = "2019-06-27T16:59:43.076";
        const result2 = dateService.formatPattern(date2, dateFormat, {
          timezone: "Etc/UTC",
        });

        expect(result2).toBe(dateStringExpected2);
      });

      it("as 'Europe/Berlin' timezone", () => {
        const dateFormat = "yyyy-MM-dd[T]HH:mm:ss.SSS";

        const date1 = new Date("2019-06-30T17:00:00.000Z");
        const dateStringExpected1 = "2019-06-30T19:00:00.000";
        const result1 = dateService.formatPattern(date1, dateFormat, {
          timezone: "Europe/Berlin",
        });

        expect(result1).toBe(dateStringExpected1);

        const date2 = new Date("2019-06-27T16:59:43.076Z");
        const dateStringExpected2 = "2019-06-27T18:59:43.076";
        const result2 = dateService.formatPattern(date2, dateFormat, {
          timezone: "Europe/Berlin",
        });

        expect(result2).toBe(dateStringExpected2);
      });
    });
  });

  describe(".formatRelative()", () => {
    describe("timezone: utc", () => {
      it("formats date (1 minute ago)", () => {
        const dateBefore = subSeconds(new Date(), 30);
        const result = dateService.formatRelative(dateBefore, {
          locale: enUS,
          timezone: "Etc/UTC",
        });

        expect(result).toBe("1 minute ago");
      });

      it("formats date (1 minute ago) - locale aware", () => {
        const dateBefore = subSeconds(new Date(), 30);
        const result = dateService.formatRelative(dateBefore, {
          locale: de,
          timezone: "Etc/UTC",
        });

        expect(result).toBe("vor einer Minute");
      });

      it("formats date (about 1 hour ago)", () => {
        const dateBefore = subHours(new Date(), 1);
        const result = dateService.formatRelative(dateBefore, {
          locale: enUS,
          timezone: "Etc/UTC",
        });

        expect(result).toBe("about 1 hour ago");
      });

      it("formats date (about 1 hour ago) - locale aware", () => {
        const dateBefore = subHours(new Date(), 1);
        const result = dateService.formatRelative(dateBefore, {
          locale: de,
          timezone: "Etc/UTC",
        });

        expect(result).toBe("vor etwa einer Stunde");
      });
    });

    describe("timezone: Europe/Berlin", () => {
      it("formats date (1 minute ago)", () => {
        const dateBefore = subSeconds(new Date(), 30);
        const result = dateService.formatRelative(dateBefore, {
          locale: enUS,
          timezone: "Europe/Berlin",
        });

        expect(result).toBe("1 minute ago");
      });

      it("formats date (1 minute ago) - locale aware", () => {
        const dateBefore = subSeconds(new Date(), 30);
        const result = dateService.formatRelative(dateBefore, {
          timezone: "Europe/Berlin",
          locale: de,
        });

        expect(result).toBe("vor einer Minute");
      });

      it("formats date (about 1 hour ago)", () => {
        const dateBefore = subHours(new Date(), 1);
        const result = dateService.formatRelative(dateBefore, {
          timezone: "Europe/Berlin",
          locale: enUS,
        });

        expect(result).toBe("about 1 hour ago");
      });

      it("formats date (about 1 hour ago) - locale aware", () => {
        const dateBefore = subHours(new Date(), 1);
        const result = dateService.formatRelative(dateBefore, {
          timezone: "Europe/Berlin",
          locale: de,
        });

        expect(result).toBe("vor etwa einer Stunde");
      });
    });
  });
});
