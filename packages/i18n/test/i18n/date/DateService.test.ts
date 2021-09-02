import { subHours, subMinutes } from "date-fns";

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

  describe(".formatPattern()", () => {
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

  describe(".formatDate()", () => {
    it("as 'Etc/UTC' timezone - en-US", () => {
      const date1 = new Date("2019-06-30T00:00:00.000Z");
      const dateStringExpected1 = "06/30/2019";
      const result1 = dateService.formatDate(date1, {
        timezone: "Etc/UTC",
        locale: "en-US",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      expect(result1).toBe(dateStringExpected1);

      const date2 = new Date("2019-06-30T22:00:00.000Z");
      const dateStringExpected2 = "06/30/2019";
      const result2 = dateService.formatDate(date2, {
        timezone: "Etc/UTC",
        locale: "en-US",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      expect(result2).toBe(dateStringExpected2);
    });

    it("as 'Etc/UTC' timezone - de-DE", () => {
      const date1 = new Date("2019-06-30T00:00:00.000Z");
      const dateStringExpected1 = "30.06.2019";
      const result1 = dateService.formatDate(date1, {
        timezone: "Etc/UTC",
        locale: "de-DE",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      expect(result1).toBe(dateStringExpected1);

      const date2 = new Date("2019-06-30T22:00:00.000Z");
      const dateStringExpected2 = "30.06.2019";
      const result2 = dateService.formatDate(date2, {
        timezone: "Etc/UTC",
        locale: "de-DE",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      expect(result2).toBe(dateStringExpected2);
    });

    it("as 'Europe/Berlin' timezone - en-US", () => {
      const date1 = new Date("2019-06-30T00:00:00.000Z");
      const dateStringExpected1 = "06/30/2019";
      const result1 = dateService.formatDate(date1, {
        timezone: "Europe/Berlin",
        locale: "en-US",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      expect(result1).toBe(dateStringExpected1);

      const date2 = new Date("2019-06-30T22:00:00.000Z");
      const dateStringExpected2 = "07/01/2019";
      const result2 = dateService.formatDate(date2, {
        timezone: "Europe/Berlin",
        locale: "en-US",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      expect(result2).toBe(dateStringExpected2);
    });

    it("as 'Europe/Berlin' timezone - de-DE", () => {
      const date1 = new Date("2019-06-30T00:00:00.000Z");
      const dateStringExpected1 = "30.06.2019";
      const result1 = dateService.formatDate(date1, {
        timezone: "Europe/Berlin",
        locale: "de-DE",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      expect(result1).toBe(dateStringExpected1);

      const date2 = new Date("2019-06-30T22:00:00.000Z");
      const dateStringExpected2 = "01.07.2019";
      const result2 = dateService.formatDate(date2, {
        timezone: "Europe/Berlin",
        locale: "de-DE",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      expect(result2).toBe(dateStringExpected2);
    });
  });

  describe(".formatTime()", () => {
    it("as 'Etc/UTC' timezone - en-US", () => {
      const date1 = new Date("2019-06-30T00:00:00.000Z");
      expect(
        dateService.formatTime(date1, {
          timezone: "Etc/UTC",
          locale: "en-US",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      ).toBe("12:00:00 AM");

      expect(
        dateService.formatTime(date1, {
          timezone: "Etc/UTC",
          locale: "en-US",
          hour: "2-digit",
          minute: "2-digit",
          second: undefined,
        })
      ).toBe("12:00 AM");

      const date2 = new Date("2019-06-30T22:00:00.000Z");
      expect(
        dateService.formatTime(date2, {
          timezone: "Etc/UTC",
          locale: "en-US",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      ).toBe("10:00:00 PM");

      expect(
        dateService.formatTime(date2, {
          timezone: "Etc/UTC",
          locale: "en-US",
          hour: "2-digit",
          minute: "2-digit",
          second: undefined,
        })
      ).toBe("10:00 PM");
    });

    it("as 'Etc/UTC' timezone - de-DE", () => {
      const date1 = new Date("2019-06-30T00:00:00.000Z");
      expect(
        dateService.formatTime(date1, {
          timezone: "Etc/UTC",
          locale: "de-DE",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      ).toBe("00:00:00");

      expect(
        dateService.formatTime(date1, {
          timezone: "Etc/UTC",
          locale: "de-DE",
          hour: "2-digit",
          minute: "2-digit",
          second: undefined,
        })
      ).toBe("00:00");

      const date2 = new Date("2019-06-30T22:00:00.000Z");
      expect(
        dateService.formatTime(date2, {
          timezone: "Etc/UTC",
          locale: "de-DE",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      ).toBe("22:00:00");

      expect(
        dateService.formatTime(date2, {
          timezone: "Etc/UTC",
          locale: "de-DE",
          hour: "2-digit",
          minute: "2-digit",
          second: undefined,
        })
      ).toBe("22:00");
    });

    it("as 'Europe/Berlin' timezone - en-US", () => {
      const date1 = new Date("2019-06-30T00:00:00.000Z");
      expect(
        dateService.formatTime(date1, {
          timezone: "Europe/Berlin",
          locale: "en-US",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      ).toBe("02:00:00 AM");

      expect(
        dateService.formatTime(date1, {
          timezone: "Europe/Berlin",
          locale: "en-US",
          hour: "2-digit",
          minute: "2-digit",
          second: undefined,
        })
      ).toBe("02:00 AM");

      const date2 = new Date("2019-06-30T22:00:00.000Z");
      expect(
        dateService.formatTime(date2, {
          timezone: "Europe/Berlin",
          locale: "en-US",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      ).toBe("12:00:00 AM");

      expect(
        dateService.formatTime(date2, {
          timezone: "Europe/Berlin",
          locale: "en-US",
          hour: "2-digit",
          minute: "2-digit",
          second: undefined,
        })
      ).toBe("12:00 AM");
    });

    it("as 'Europe/Berlin' timezone - de-DE", () => {
      const date1 = new Date("2019-06-30T00:00:00.000Z");
      expect(
        dateService.formatTime(date1, {
          timezone: "Europe/Berlin",
          locale: "de-DE",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      ).toBe("02:00:00");

      expect(
        dateService.formatTime(date1, {
          timezone: "Europe/Berlin",
          locale: "de-DE",
          hour: "2-digit",
          minute: "2-digit",
          second: undefined,
        })
      ).toBe("02:00");

      const date2 = new Date("2019-06-30T22:00:00.000Z");
      expect(
        dateService.formatTime(date2, {
          timezone: "Europe/Berlin",
          locale: "de-DE",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      ).toBe("00:00:00");

      expect(
        dateService.formatTime(date2, {
          timezone: "Europe/Berlin",
          locale: "de-DE",
          hour: "2-digit",
          minute: "2-digit",
          second: undefined,
        })
      ).toBe("00:00");
    });
  });

  describe(".formatDateTime()", () => {
    it("as 'Etc/UTC' timezone - en-US", () => {
      const date1 = new Date("2019-06-30T00:00:00.000Z");
      expect(
        dateService.formatDateTime(date1, {
          timezone: "Etc/UTC",
          locale: "en-US",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      ).toBe("06/30/2019, 12:00:00 AM");

      expect(
        dateService.formatDateTime(date1, {
          timezone: "Etc/UTC",
          locale: "en-US",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: undefined,
        })
      ).toBe("06/30/2019, 12:00 AM");

      const date2 = new Date("2019-06-30T22:00:00.000Z");
      expect(
        dateService.formatDateTime(date2, {
          timezone: "Etc/UTC",
          locale: "en-US",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      ).toBe("06/30/2019, 10:00:00 PM");

      expect(
        dateService.formatDateTime(date2, {
          timezone: "Etc/UTC",
          locale: "en-US",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: undefined,
        })
      ).toBe("06/30/2019, 10:00 PM");
    });

    it("as 'Etc/UTC' timezone - de-DE", () => {
      const date1 = new Date("2019-06-30T00:00:00.000Z");
      expect(
        dateService.formatDateTime(date1, {
          timezone: "Etc/UTC",
          locale: "de-DE",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      ).toBe("30.06.2019, 00:00:00");

      expect(
        dateService.formatDateTime(date1, {
          timezone: "Etc/UTC",
          locale: "de-DE",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: undefined,
        })
      ).toBe("30.06.2019, 00:00");

      const date2 = new Date("2019-06-30T22:00:00.000Z");
      expect(
        dateService.formatDateTime(date2, {
          timezone: "Etc/UTC",
          locale: "de-DE",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      ).toBe("30.06.2019, 22:00:00");

      expect(
        dateService.formatDateTime(date2, {
          timezone: "Etc/UTC",
          locale: "de-DE",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: undefined,
        })
      ).toBe("30.06.2019, 22:00");
    });

    it("as 'Europe/Berlin' timezone - en-US", () => {
      const date1 = new Date("2019-06-30T00:00:00.000Z");
      expect(
        dateService.formatDateTime(date1, {
          timezone: "Europe/Berlin",
          locale: "en-US",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      ).toBe("06/30/2019, 02:00:00 AM");

      expect(
        dateService.formatDateTime(date1, {
          timezone: "Europe/Berlin",
          locale: "en-US",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: undefined,
        })
      ).toBe("06/30/2019, 02:00 AM");

      const date2 = new Date("2019-06-30T22:00:00.000Z");
      expect(
        dateService.formatDateTime(date2, {
          timezone: "Europe/Berlin",
          locale: "en-US",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      ).toBe("07/01/2019, 12:00:00 AM");

      expect(
        dateService.formatDateTime(date2, {
          timezone: "Europe/Berlin",
          locale: "en-US",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: undefined,
        })
      ).toBe("07/01/2019, 12:00 AM");
    });

    it("as 'Europe/Berlin' timezone - de-DE", () => {
      const date1 = new Date("2019-06-30T00:00:00.000Z");
      expect(
        dateService.formatDateTime(date1, {
          timezone: "Europe/Berlin",
          locale: "de-DE",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      ).toBe("30.06.2019, 02:00:00");

      expect(
        dateService.formatDateTime(date1, {
          timezone: "Europe/Berlin",
          locale: "de-DE",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: undefined,
        })
      ).toBe("30.06.2019, 02:00");

      const date2 = new Date("2019-06-30T22:00:00.000Z");
      expect(
        dateService.formatDateTime(date2, {
          timezone: "Europe/Berlin",
          locale: "de-DE",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      ).toBe("01.07.2019, 00:00:00");

      expect(
        dateService.formatDateTime(date2, {
          timezone: "Europe/Berlin",
          locale: "de-DE",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: undefined,
        })
      ).toBe("01.07.2019, 00:00");
    });
  });

  describe(".formatRelative()", () => {
    describe("timezone: current", () => {
      it("formats date (1 minute ago) - en-US", () => {
        const dateBefore = subMinutes(new Date(), 1);
        const result = dateService.formatRelative(dateBefore, {
          locale: "en-US",
        });

        expect(result).toBe("1 minute ago");
      });

      it("formats date (1 minute ago) - de-DE", () => {
        const dateBefore = subMinutes(new Date(), 1);
        const result = dateService.formatRelative(dateBefore, {
          locale: "de-DE",
        });

        expect(result).toBe("vor 1 Minute");
      });

      it("formats date (about 1 hour ago) - en-US", () => {
        const dateBefore = subHours(new Date(), 1);
        const result = dateService.formatRelative(dateBefore, {
          locale: "en-US",
        });

        expect(result).toBe("1 hour ago");
      });

      it("formats date (about 1 hour ago) - de-DE", () => {
        const dateBefore = subHours(new Date(), 1);
        const result = dateService.formatRelative(dateBefore, {
          locale: "de-DE",
        });

        expect(result).toBe("vor 1 Stunde");
      });
    });
  });
});
