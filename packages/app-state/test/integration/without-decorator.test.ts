import {
  makeAutoObservable,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

import { when } from "../../src";

describe("without decorator", () => {
  describe("makeObservable", () => {
    it("simple property", async () => {
      class Store {
        stringProperty: string = "";

        constructor() {
          makeObservable(this, {
            stringProperty: observable,
          });
        }
      }

      const store = new Store();

      expect(store.stringProperty).toBe("");

      const promise = when(() => store.stringProperty != "", { timeout: 500 });

      runInAction(() => {
        store.stringProperty = "hello world";
      });

      await promise;

      expect(store.stringProperty).toBe("hello world");
    });

    it("array property", async () => {
      class Store {
        arrayProperty: Array<{ id: number }> = [];

        constructor() {
          makeObservable(this, {
            arrayProperty: observable.shallow,
          });
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

    it("objectProperty property", async () => {
      class Store {
        objectProperty: { id: number } = { id: 0 };

        constructor() {
          makeObservable(this, {
            objectProperty: observable,
          });
        }
      }

      const store = new Store();

      expect(store.objectProperty).toEqual({ id: 0 });

      const promise = when(() => store.objectProperty.id !== 0, {
        timeout: 500,
      });

      runInAction(() => {
        store.objectProperty.id = 1;
      });

      await promise;

      expect(store.objectProperty).toEqual({ id: 1 });
    });
  });

  describe("makeAutoObservable", () => {
    it("simple property", async () => {
      class Store {
        stringProperty: string = "";

        constructor() {
          makeAutoObservable(this);
        }
      }

      const store = new Store();

      expect(store.stringProperty).toBe("");

      const promise = when(() => store.stringProperty != "", { timeout: 500 });

      runInAction(() => {
        store.stringProperty = "hello world";
      });

      await promise;

      expect(store.stringProperty).toBe("hello world");
    });

    it("array property", async () => {
      class Store {
        arrayProperty: Array<{ id: number }> = [];

        constructor() {
          makeAutoObservable(this);
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

    it("objectProperty property", async () => {
      class Store {
        objectProperty: { id: number } = { id: 0 };

        constructor() {
          makeAutoObservable(this);
        }
      }

      const store = new Store();

      expect(store.objectProperty).toEqual({ id: 0 });

      const promise = when(() => store.objectProperty.id !== 0, {
        timeout: 500,
      });

      runInAction(() => {
        store.objectProperty.id = 1;
      });

      await promise;

      expect(store.objectProperty).toEqual({ id: 1 });
    });
  });
});
