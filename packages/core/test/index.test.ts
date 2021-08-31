import AppStateModules from "@cpro-js/app-state";
import DiModules from "@cpro-js/di";
import I18nModules from "@cpro-js/i18n";

import * as ExportedModules from "../src/index";

describe("exports", () => {
  test("exports everything from @cpro-js/app-state", () => {
    expect(ExportedModules).toMatchObject(AppStateModules);
  });

  test("exports everything from @cpro-js/di", () => {
    expect(ExportedModules).toMatchObject(DiModules);
  });

  test("exports everything from @cpro-js/i18n", () => {
    expect(ExportedModules).toMatchObject(I18nModules);
  });
});
