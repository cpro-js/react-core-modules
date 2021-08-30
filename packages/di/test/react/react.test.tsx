import React from "react";
import renderer from "react-test-renderer";

import { Container, ContainerProvider, inject, useInjection } from "../../src";

describe("react", () => {
  describe("class components", () => {
    it("property injection", () => {
      const testValue = "hello-world";
      const testKey = "testKey";

      class TestComponent extends React.Component {
        @inject(testKey)
        private testValue!: string;

        render() {
          return this.testValue;
        }
      }

      const container = new Container();
      container.bindConstant<string>(testKey, testValue);

      const tree = renderer
        .create(
          <ContainerProvider container={container}>
            <TestComponent />
          </ContainerProvider>
        )
        .toJSON();

      expect(tree).toBe(testValue);
    });
  });

  describe("functional components", () => {
    it("works with react hooks", () => {
      const testValue = "hello-world";
      const testKey = "testKey";

      const TestComponent: React.FC<{}> = () => {
        return useInjection(testKey);
      };

      const container = new Container();
      container.bindConstant<string>(testKey, testValue);

      const tree = renderer
        .create(
          <ContainerProvider container={container}>
            <TestComponent />
          </ContainerProvider>
        )
        .toJSON();

      expect(tree).toBe(testValue);
    });
  });
});
