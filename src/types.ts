import { ServiceId } from "./constants/icons";

export type Service = {
  id: ServiceId;
  name: string;
};

export type Subscription = {
  id: string;
  service: Service;
  price: number;
  date: string;
};
