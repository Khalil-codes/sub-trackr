/* eslint-disable no-unused-vars */
import { Subscription } from "@/types";
import { create } from "zustand";

type State = {
  modal: boolean;
  subscription?: Subscription | null;
  view?: "add" | "edit" | "view" | null;
  date?: string | null;
};

type Actions = {
  setModal: (args: State) => void;
};

export const useModal = create<State & Actions>()((set) => ({
  modal: false,
  subscription: null,
  view: null,
  setModal: (args) => set(args),
}));
