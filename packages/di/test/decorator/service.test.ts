import { Container, service } from "../../src";

@service()
class TestService {}

describe("@service()", () => {
  it("marks service class as injectable", () => {
    const container = new Container().bindSingleton(TestService, TestService);
    expect(container.get(TestService)).toBeInstanceOf(TestService);
  });
});
