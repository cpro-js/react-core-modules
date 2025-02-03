import { describe, expect, test } from "vitest";

import { Container, store } from "../../src";

@store()
class TestStore {}

describe("@store()", () => {
  test("marks store class as injectable", () => {
    const container = new Container().bindSingleton(TestStore, TestStore);
    expect(container.get(TestStore)).toBeInstanceOf(TestStore);
  });
});
