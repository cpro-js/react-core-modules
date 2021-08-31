import { subHours, subSeconds } from "date-fns";
import { de, enUS } from "date-fns/locale";

import { DateService } from "../../../src/i18n/date/DateService";
import { DateServiceImpl } from "../../../src/i18n/date/DateServiceImpl";

const dateService: DateService = new DateServiceImpl();

describe("DateService", () => {
  describe(".parse()", () => {
    describe("timezone: utc", () => {
      it("parses 'yyyyMMddHHmmssSSS'", () => {
        const dateFormat = "yyyyMMddHHmmssSSS";

        const dateString1 = "20190630170000000";
        const dateStringExpected1 = "2019-06-30T17:00:00.000Z";
        const result1 = dateService.parse(dateString1, dateFormat, {
          locale: de,
          timezone: "Etc/UTC",
        });
        expect(result1.toISOString()).toBe(dateStringExpected1);

        const dateString2 = "20190627165943076";
        const dateStringExpected2 = "2019-06-27T16:59:43.076Z";
        const result2 = dateService.parse(dateString2, dateFormat, {
          locale: de,
          timezone: "Etc/UTC",
        });
        expect(result2.toISOString()).toBe(dateStringExpected2);
      });

      it("parses 'yyyyMMddHHmmssSSS'", () => {
        const dateFormat = "yyyyMMddHHmmssSSS";

        const dateString1 = "20190630170000000";
        const dateStringExpected1 = "2019-06-30T17:00:00.000Z";
        const result1 = dateService.parse(dateString1, dateFormat, {
          locale: de,
          timezone: "Etc/UTC",
        });
        expect(result1.toISOString()).toBe(dateStringExpected1);

        const dateString2 = "20190627165943076";
        const dateStringExpected2 = "2019-06-27T16:59:43.076Z";
        const result2 = dateService.parse(dateString2, dateFormat, {
          locale: de,
          timezone: "Etc/UTC",
        });
        expect(result2.toISOString()).toBe(dateStringExpected2);
      });

      it("parses 'yyyy-MM-dd[T]HH:mm:ss.SSS[Z]'", () => {
        const dateFormat = "yyyy-MM-dd[T]HH:mm:ss.SSS[Z]";

        const dateString = "2019-06-27T16:59:43.076Z";
        const dateStringExpected = "2019-06-27T16:59:43.076Z";
        const result1 = dateService.parse(dateString, dateFormat, {
          locale: de,
          timezone: "Etc/UTC",
        });
        expect(result1.toISOString()).toBe(dateStringExpected);
      });

      it("parses 'yyyy-MM-dd HH:mm:ss xxxx'", () => {
        const dateFormat = "yyyy-MM-dd HH:mm:ss xxxx";

        const dateString = "2010-11-17 13:12:00 +0100";
        const dateStringExpected = "2010-11-17T12:12:00.000Z";
        const result1 = dateService.parse(dateString, dateFormat, {
          locale: de,
          timezone: "Etc/UTC",
        });
        expect(result1.toISOString()).toBe(dateStringExpected);
      });

      it("parses 'do LLLL yyyy' (locale aware date)", () => {
        const dateFormat = "do LLLL yyyy";

        const dateString = "30. Juni 2019";
        const dateStringExpected = "2019-06-30T00:00:00.000Z";
        const result1 = dateService.parse(dateString, dateFormat, {
          locale: de,
          timezone: "Etc/UTC",
        });
        expect(result1.toISOString()).toBe(dateStringExpected);
      });
    });

    describe("timezone: Europe/Berlin", () => {
      it("parses 'yyyyMMddHHmmssSSS'", () => {
        const dateFormat = "yyyyMMddHHmmssSSS";

        const dateString1 = "20190630170000000";
        const dateStringExpected1 = "2019-06-30T15:00:00.000Z";
        const result1 = dateService.parse(dateString1, dateFormat, {
          locale: de,
          timezone: "Europe/Berlin",
        });
        expect(result1.toISOString()).toBe(dateStringExpected1);

        const dateString2 = "20190627165943076";
        const dateStringExpected2 = "2019-06-27T14:59:43.076Z";
        const result2 = dateService.parse(dateString2, dateFormat, {
          locale: de,
          timezone: "Europe/Berlin",
        });
        expect(result2.toISOString()).toBe(dateStringExpected2);
      });

      it("parses 'yyyyMMddHHmmssSSS'", () => {
        const dateFormat = "yyyyMMddHHmmssSSS";

        const dateString1 = "20190630170000000";
        const dateStringExpected1 = "2019-06-30T15:00:00.000Z";
        const result1 = dateService.parse(dateString1, dateFormat, {
          locale: de,
          timezone: "Europe/Berlin",
        });
        expect(result1.toISOString()).toBe(dateStringExpected1);

        const dateString2 = "20190627165943076";
        const dateStringExpected2 = "2019-06-27T14:59:43.076Z";
        const result2 = dateService.parse(dateString2, dateFormat, {
          locale: de,
          timezone: "Europe/Berlin",
        });
        expect(result2.toISOString()).toBe(dateStringExpected2);
      });

      it("parses 'yyyy-MM-dd[T]HH:mm:ss.SSS[Z]'", () => {
        const dateFormat = "yyyy-MM-dd[T]HH:mm:ss.SSS[Z]";

        const dateString = "2019-06-27T16:59:43.076Z";
        const dateStringExpected = "2019-06-27T14:59:43.076Z";
        const result1 = dateService.parse(dateString, dateFormat, {
          locale: de,
          timezone: "Europe/Berlin",
        });
        expect(result1.toISOString()).toBe(dateStringExpected);
      });

      it("parses 'do LLLL yyyy' (locale aware date)", () => {
        const dateFormat = "do LLLL yyyy";

        const dateString = "30. Juni 2019";
        const dateStringExpected = "2019-06-29T22:00:00.000Z"; // todo is this right?
        const result1 = dateService.parse(dateString, dateFormat, {
          timezone: "Europe/Berlin",
          locale: de,
        });
        expect(result1.toISOString()).toBe(dateStringExpected);
      });
    });
  });

  describe(".format()", () => {
    describe("timezone: utc", () => {
      it("formats date in format iso format yyyy-MM-dd[T]HH:mm:ss.SSS[Z]", () => {
        const dateFormat = "yyyy-MM-dd[T]HH:mm:ss.SSS[Z]";

        const date1 = new Date("2019-06-30T17:00:00.000Z");
        const dateStringExpected1 = "2019-06-30T17:00:00.000Z";
        const result1 = dateService.format(date1, dateFormat, {
          locale: de,
          timezone: "Etc/UTC",
        });
        expect(result1).toBe(dateStringExpected1);

        const date2 = new Date("2019-06-27T16:59:43.076Z");
        const dateStringExpected2 = "2019-06-27T16:59:43.076Z";
        const result2 = dateService.format(date2, dateFormat, {
          locale: de,
          timezone: "Etc/UTC",
        });
        expect(result2).toBe(dateStringExpected2);
      });

      it("formats date in format yyyyMMddHHmmssSSS", () => {
        const dateFormat = "yyyyMMddHHmmssSSS";

        const date1 = new Date("2019-06-30T17:00:00.000Z");
        const dateStringExpected1 = "20190630170000000";
        const result1 = dateService.format(date1, dateFormat, {
          locale: de,
          timezone: "Etc/UTC",
        });
        expect(result1).toBe(dateStringExpected1);

        const date2 = new Date("2019-06-27T16:59:43.076Z");
        const dateStringExpected2 = "20190627165943076";
        const result2 = dateService.format(date2, dateFormat, {
          locale: de,
          timezone: "Etc/UTC",
        });
        expect(result2).toBe(dateStringExpected2);
      });

      it("formats date in format 'do LLLL yyyy HH[:]mm' (locale aware date)", () => {
        const dateFormat = "do LLLL yyyy HH[:]mm";

        const date1 = new Date("2019-06-30T17:00:00.000Z");
        const dateStringExpected1 = "30. Juni 2019 17:00";
        const result1 = dateService.format(date1, dateFormat, {
          locale: de,
          timezone: "Etc/UTC",
        });

        expect(result1).toBe(dateStringExpected1);
      });

      it("formats date with timezone tokens", () => {
        const date = new Date("2018-09-01T16:01:36.386Z");
        const dateFormat = "d.M.yyyy HH:mm:ss.SSS [GMT]ZZ [GMT]Z";
        const dateStringExpected = "1.9.2018 16:01:36.386 GMT+0000 GMT+00:00";
        const result = dateService.format(date, dateFormat, {
          locale: de,
          timezone: "Etc/UTC",
        });
        expect(result).toBe(dateStringExpected);
      });
    });

    describe("timezone: Europe/Berlin", () => {
      it("formats date in format format yyyy-MM-dd[T]HH:mm:ss.SSS", () => {
        const dateFormat = "yyyy-MM-dd[T]HH:mm:ss.SSS";

        const date1 = new Date("2019-06-30T17:00:00.000Z");
        const dateStringExpected1 = "2019-06-30T19:00:00.000";
        const result1 = dateService.format(date1, dateFormat, {
          locale: de,
          timezone: "Europe/Berlin",
        });

        expect(result1).toBe(dateStringExpected1);

        const date2 = new Date("2019-06-27T16:59:43.076Z");
        const dateStringExpected2 = "2019-06-27T18:59:43.076";
        const result2 = dateService.format(date2, dateFormat, {
          locale: de,
          timezone: "Europe/Berlin",
        });

        expect(result2).toBe(dateStringExpected2);
      });

      it("formats date in format yyyyMMddHHmmssSSS", () => {
        const dateFormat = "yyyyMMddHHmmssSSS";

        const date1 = new Date("2019-06-30T17:00:00.000Z");
        const dateStringExpected1 = "20190630190000000";
        const result1 = dateService.format(date1, dateFormat, {
          locale: de,
          timezone: "Europe/Berlin",
        });

        expect(result1).toBe(dateStringExpected1);

        const date2 = new Date("2019-06-27T16:59:43.076Z");
        const dateStringExpected2 = "20190627185943076";
        const result2 = dateService.format(date2, dateFormat, {
          locale: de,
          timezone: "Europe/Berlin",
        });

        expect(result2).toBe(dateStringExpected2);
      });

      it("formats date in format 'do LLLL yyyy HH[:]mm' (locale aware date)", () => {
        const dateFormat = "do LLLL yyyy HH[:]mm";

        const date1 = new Date("2019-06-30T17:00:00.000Z");
        const dateStringExpected1 = "30. Juni 2019 19:00";
        const result1 = dateService.format(date1, dateFormat, {
          locale: de,
          timezone: "Europe/Berlin",
        });

        expect(result1).toBe(dateStringExpected1);
      });

      it("formats date with timezone tokens", () => {
        const date = new Date("2018-09-01T16:01:36.386Z");
        const dateFormat = "d.M.yyyy HH:mm:ss.SSS [GMT]ZZ [GMT]Z (z)";
        const dateStringExpected =
          "1.9.2018 18:01:36.386 GMT+0200 GMT+02:00 (MESZ)";
        const result = dateService.format(date, dateFormat, {
          locale: de,
          timezone: "Europe/Berlin",
        });
        expect(result).toBe(dateStringExpected);
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
