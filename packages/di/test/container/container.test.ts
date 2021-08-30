import { injectable } from "inversify";

import { Container } from "../../src";

@injectable()
class TestClass {}

describe("Container", () => {
  it("allows to chain binding declarations", () => {
    const container: Container = new Container()
      .bindConstant("value", 1)
      .bindDynamic("dynamic", () => Math.random())
      .bindSingleton("singleton", TestClass)
      .bindTransient("instance", TestClass);

    expect(container).toBeInstanceOf(Container);
  });

  describe("binding", () => {
    it("constant value", () => {
      const container: Container = new Container().bindConstant("value", 6);
      expect(container.get("value")).toBe(6);
    });

    it("dynamic value", () => {
      const func = jest.fn(() => 6);

      const container: Container = new Container().bindDynamic("dynamic", func);
      expect(container.get("dynamic")).toBe(6);
      expect(func).toBeCalled();
      expect(func).toReturnWith(6);
    });

    it("singleton instance", () => {
      const container: Container = new Container().bindSingleton(
        "singleton",
        TestClass
      );
      expect(container.get("singleton")).toBeInstanceOf(TestClass);
      expect(container.get("singleton")).toBe(container.get("singleton"));
    });

    it("singleton instance - omitting identifier", () => {
      const container: Container = new Container().bindSingleton(TestClass);
      expect(container.get(TestClass)).toBeInstanceOf(TestClass);
      expect(container.get(TestClass)).toBe(container.get(TestClass));
    });

    it("transient instance", () => {
      const container: Container = new Container().bindTransient(
        "transient",
        TestClass
      );
      expect(container.get("transient")).toBeInstanceOf(TestClass);
      expect(container.get("transient")).not.toBe(container.get("transient"));
    });

    it("transient instance - omitting identifier", () => {
      const container: Container = new Container().bindTransient(TestClass);
      expect(container.get(TestClass)).toBeInstanceOf(TestClass);
      expect(container.get(TestClass)).not.toBe(container.get(TestClass));
    });
  });

  it("getAll", () => {
    const container: Container = new Container()
      .bindConstant("value", 1)
      .bindConstant("value", 2);
    expect(container.getAll("value")).toEqual([1, 2]);
  });

  it("associations", () => {
    const container: Container = new Container();

    container.bindConstant("value", 1);
    container.associateWith("value2", "value");
    container.associateWith("value3", "value");

    expect(container.get("value")).toBe(1);
    expect(container.get("value2")).toBe(1);
    expect(container.get("value3")).toBe(1);
  });
});
