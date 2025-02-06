// fixes import  -> SyntaxError: Named export 'Provider' not found. The requested module 'inversify-react' is a CommonJS module,
import * as inversifyReact from "inversify-react";
import { FC, ReactNode, memo } from "react";

import { Container } from "../container/container";

export interface ContainerProviderProps {
  container: Container;
  children: ReactNode;
}

export const ContainerProvider: FC<ContainerProviderProps> = memo(
  ({ container, children }) => {
    return (
      <inversifyReact.Provider container={container._diContainer()}>
        {children}
      </inversifyReact.Provider>
    );
  }
);
