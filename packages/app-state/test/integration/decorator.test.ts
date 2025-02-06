import { describe, expect, test } from "vitest";

import {
  computed,
  makeObservable,
  observable,
  runInAction,
  toJS,
  when,
} from "../../src";

describe("decorator", () => {
  test("simple property", async () => {
    class Store {
      @observable
      stringProperty: string = "";

      @observable.shallow
      arrayProperty: Array<{ id: string }> = [];

      @observable.struct
      objectProperty: { id: string } = { id: "" };

      constructor() {
        makeObservable(this);
      }

      @computed
      get objectPropertyAsString(): string {
        return JSON.stringify(toJS(this.objectProperty));
      }
    }

    const store = new Store();

    expect(store.stringProperty).toBe("");
    expect(store.arrayProperty).toEqual([]);
    expect(store.objectProperty).toEqual({ id: "" });

    const promise = when(() => store.stringProperty != "", { timeout: 500 });

    runInAction(() => {
      store.stringProperty = "hello world";
    });

    await promise;

    expect(store.stringProperty).toBe("hello world");
  });

  test("array property", async () => {
    class Store {
      @observable.shallow
      arrayProperty: Array<{ id: number }> = [];

      constructor() {
        makeObservable(this);
      }
    }

    const store = new Store();

    expect(store.arrayProperty).toEqual([]);

    const promise = when(() => store.arrayProperty.length > 0, {
      timeout: 500,
    });

    runInAction(() => {
      store.arrayProperty.push({ id: 1 });
    });

    await promise;

    expect(store.arrayProperty).toEqual([{ id: 1 }]);
  });

  test("objectProperty property", async () => {
    class Store {
      @observable
      objectProperty: { id: number } = { id: 0 };

      constructor() {
        makeObservable(this);
      }
    }

    const store = new Store();

    expect(store.objectProperty).toEqual({ id: 0 });

    const promise = when(() => store.objectProperty.id !== 0, { timeout: 500 });

    runInAction(() => {
      store.objectProperty.id = 1;
    });

    await promise;

    expect(store.objectProperty).toEqual({ id: 1 });
  });
});
