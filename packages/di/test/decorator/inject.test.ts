import { describe, expect, test } from "vitest";

import { Container, inject, service, store } from "../../src";

describe("@inject()", () => {
  describe("constructor injection", () => {
    test("allows to inject instances into services", () => {
      const value = `My random value: ${Math.random()}`;

      @service()
      class MyService {
        constructor(@inject("value") public value: string) {}
      }

      const container = new Container();
      container.bindConstant("value", value);
      container.bindSingleton("service", MyService);
      const myService: MyService = container.get("service");

      expect(myService).toBeInstanceOf(MyService);
      expect(myService.value).toBe(value);
    });

    test("allows to inject instances into stores", () => {
      const value = `My random value: ${Math.random()}`;

      @store()
      class MyStore {
        constructor(@inject("value") public value: string) {}
      }

      const container = new Container();
      container.bindConstant("value", value);
      container.bindSingleton("store", MyStore);
      const myStore: MyStore = container.get("store");

      expect(myStore).toBeInstanceOf(MyStore);
      expect(myStore.value).toBe(value);
    });

    describe("optional", () => {
      test("inject value into services", () => {
        const value = `My random value: ${Math.random()}`;

        @service()
        class MyService {
          constructor(
            @inject.optional("value") public value?: string
          ) {}
        }

        const container = new Container();
        container.bindConstant("value", value);
        container.bindSingleton("service", MyService);
        const myService: MyService = container.get("service");

        expect(myService).toBeInstanceOf(MyService);
        expect(myService.value).toBe(value);
      });

      test("skip inject value into services when binding not found", () => {
        @service()
        class MyService {
          constructor(@inject.optional("value") public value?: string) {}
        }

        const container = new Container();
        container.bindSingleton("service", MyService);
        const myService: MyService = container.get("service");

        expect(myService).toBeInstanceOf(MyService);
        expect(myService.value).toBeUndefined();
      });
    });
  });

  describe("property injection", () => {
    test("allows to inject instances into services", () => {
      const value = `My random value: ${Math.random()}`;

      @service()
      class MyService {
        @inject("value") value!: string;
      }

      const container = new Container();
      container.bindConstant("value", value);
      container.bindSingleton("service", MyService);
      const myService: MyService = container.get("service");

      expect(myService).toBeInstanceOf(MyService);
      expect(myService.value).toBe(value);
    });

    test("allows to inject instances into stores", () => {
      const value = `My random value: ${Math.random()}`;

      @store()
      class MyStore {
        @inject("value") value!: string;
      }

      const container = new Container();
      container.bindConstant("value", value);
      container.bindSingleton("store", MyStore);
      const myStore: MyStore = container.get("store");

      expect(myStore).toBeInstanceOf(MyStore);
      expect(myStore.value).toBe(value);
    });

    describe("optional", () => {
      test("inject value into services", () => {
        const value = `My random value: ${Math.random()}`;

        @service()
        class MyService {
          @inject.optional("value") value?: string;
        }

        const container = new Container();
        container.bindConstant("value", value);
        container.bindSingleton("service", MyService);
        const myService: MyService = container.get("service");

        expect(myService).toBeInstanceOf(MyService);
        expect(myService.value).toBe(value);
      });

      test("skip inject value into services when binding not found", () => {
        @service()
        class MyService {
          @inject.optional("value") value?: string;
        }

        const container = new Container();
        container.bindSingleton("service", MyService);
        const myService: MyService = container.get("service");

        expect(myService).toBeInstanceOf(MyService);
        expect(myService.value).toBeUndefined();
      });
    });
  });
});
