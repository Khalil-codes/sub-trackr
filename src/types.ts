import { Icon } from "@phosphor-icons/react";

export type Service<T = Icon | React.ComponentType<unknown>> = {
  id: string;
  name: string;
  icon: T;
};
