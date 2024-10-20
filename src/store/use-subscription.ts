/* eslint-disable no-unused-vars */
import { Subscription } from "@/types";
import { create } from "zustand";

type State = {
  subscriptions: Subscription[];
};

type Actions = {
  addSubscription: (subscription: Subscription) => void;
  removeSubscription: (id: string) => void;
  updateSubscription: (id: string, subscription: Partial<Subscription>) => void;
};

export const useSubscription = create<State & Actions>()((set) => ({
  subscriptions: [],
  addSubscription: (subscription) => {
    set((state) => ({
      subscriptions: [...state.subscriptions, subscription],
    }));
  },
  removeSubscription: (id) => {
    set((state) => ({
      subscriptions: state.subscriptions.filter(
        (subscription) => subscription.id !== id
      ),
    }));
  },
  updateSubscription: (id, subscription) => {
    set((state) => ({
      subscriptions: state.subscriptions.map((sub) =>
        sub.id === id ? { ...sub, ...subscription } : sub
      ),
    }));
  },
}));
