import {
  interfaces,
  inject as inversifyInject,
  optional as inversifyOptional,
} from "inversify";
// fixes import  -> SyntaxError: Named export 'Provider' not found. The requested module 'inversify-react' is a CommonJS module,
import * as inversifyReact from "inversify-react";
import type { DecoratorTarget } from "inversify/lib/cjs/annotation/decorator_utils";

function isReactClassComponent(component: any) {
  return typeof component === "object" && !!component.isReactComponent;
}

export function inject<T = unknown>(
  serviceIdentifier: interfaces.ServiceIdentifier<T>
) {
  return function (
    target: DecoratorTarget,
    targetKey?: string,
    indexOrPropertyDescriptor?: number | TypedPropertyDescriptor<T>
  ): void {
    // special decorator for react component
    if (isReactClassComponent(target)) {
      return inversifyReact.resolve(serviceIdentifier)(
        target,
        targetKey!,
        indexOrPropertyDescriptor
      );
    }

    inversifyInject(serviceIdentifier)(
      target,
      targetKey,
      indexOrPropertyDescriptor
    );
  };
}

inject.optional = function injectOptional<T = unknown>(
  serviceIdentifier: interfaces.ServiceIdentifier<T>
) {
  return function (
    target: DecoratorTarget,
    targetKey?: string,
    indexOrPropertyDescriptor?: number | TypedPropertyDescriptor<T>
  ): void {
    // special decorator for react components -> class instance created by react
    if (isReactClassComponent(target)) {
      return inversifyReact.resolve.optional(serviceIdentifier)(
        target,
        targetKey!,
        indexOrPropertyDescriptor
      );
    }

    // normal classes -> instances created by inversify
    inversifyInject(serviceIdentifier)(
      target,
      targetKey,
      indexOrPropertyDescriptor
    );
    inversifyOptional()(target, targetKey, indexOrPropertyDescriptor);
  };
};
