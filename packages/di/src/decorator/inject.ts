import {
  interfaces,
  inject as inversifyInject,
  optional as inversifyOptional,
} from "inversify";
import { resolve } from "inversify-react";

function isReactClassComponent(component: any) {
  return typeof component === "object" && !!component.isReactComponent;
}

export function inject(serviceIdentifier: interfaces.ServiceIdentifier<any>) {
  return function (target: any, targetKey: string, index?: number): void {
    // special decorator for react component
    if (isReactClassComponent(target)) {
      // fixme does not longer work with ["@babel/plugin-proposal-class-properties", { "loose": false }] / TypeScript "useDefineForClassFields": true
      return resolve(serviceIdentifier)(target, targetKey, index);
    }

    inversifyInject(serviceIdentifier)(target, targetKey, index);
  };
}

inject.optional = function (
  serviceIdentifier: interfaces.ServiceIdentifier<any>
) {
  return function (target: any, targetKey: string, index?: number): void {
    // special decorator for react components -> class instance created by react
    if (isReactClassComponent(target)) {
      // fixme does not longer work with ["@babel/plugin-proposal-class-properties", { "loose": false }] / TypeScript "useDefineForClassFields": true
      return resolve.optional(serviceIdentifier)(target, targetKey, index);
    }

    // normal classes -> instances created by inversify
    inversifyInject(serviceIdentifier)(target, targetKey, index);
    inversifyOptional()(target, targetKey, index);
  };
};
