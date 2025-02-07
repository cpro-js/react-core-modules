/**
 * @vitest-environment happy-dom
 */

import { render } from "@testing-library/react";
import { Component, FC } from "react";
import { describe, expect, test } from "vitest";

import { Container, ContainerProvider, inject, useInjection } from "../../src";

describe("react", () => {
  describe("class components", () => {
    test("property injection", () => {
      const testValue = "hello-world";
      const testKey = "testKey";

      class TestComponent extends Component<{}, {}> {
        @inject(testKey)
        private testValue!: string;

        render() {
          return this.testValue;
        }
      }

      const container = new Container();
      container.bindConstant<string>(testKey, testValue);

      const { asFragment } = render(
        <ContainerProvider container={container}>
          <TestComponent />
        </ContainerProvider>
      );

      expect(asFragment().textContent).toBe(testValue);
    });
  });

  describe("functional components", () => {
    test("works with react hooks", () => {
      const testValue = "hello-world";
      const testKey = "testKey";

      const TestComponent: FC<{}> = () => {
        return <>{useInjection<string>(testKey)}</>;
      };

      const container = new Container();
      container.bindConstant<string>(testKey, testValue);

      const { asFragment } = render(
        <ContainerProvider container={container}>
          <TestComponent />
        </ContainerProvider>
      );

      expect(asFragment().textContent).toBe(testValue);
    });
  });
});
