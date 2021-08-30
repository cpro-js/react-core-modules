import { Provider } from "inversify-react";
import { FC, memo } from "react";

import { Container } from "../container/container";

export const ContainerProvider: FC<{ container: Container }> = memo(
  ({ container, children }) => {
    return <Provider container={container._diContainer()}>{children}</Provider>;
  }
);
