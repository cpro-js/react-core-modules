import AppStateModules from "@cpro-js/react-app-state";
import DiModules from "@cpro-js/react-di";
import I18nModules from "@cpro-js/react-i18n";

import * as ExportedModules from "../src/index";

describe("exports", () => {
  test("exports everything from @cpro-js/react-app-state", () => {
    expect(ExportedModules).toMatchObject(AppStateModules);
  });

  test("exports everything from @cpro-js/react-di", () => {
    expect(ExportedModules).toMatchObject(DiModules);
  });

  test("exports everything from @cpro-js/react-i18n", () => {
    expect(ExportedModules).toMatchObject(I18nModules);
  });
});
