import { Provider } from "inversify-react";
import { FC, ReactNode, memo } from "react";

import { Container } from "../container/container";

export interface ContainerProviderProps {
  container: Container;
  children: ReactNode;
}

export const ContainerProvider: FC<ContainerProviderProps> = memo(
  ({ container, children }) => {
    return <Provider container={container._diContainer()}>{children}</Provider>;
  }
);
