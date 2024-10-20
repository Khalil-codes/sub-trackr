/* eslint-disable no-unused-vars */
import { Subscription } from "@/types";
import { create } from "zustand";

type State = {
  modal: boolean;
  subcription?: Subscription | null;
  view?: "add" | "edit" | "view" | null;
  date?: string | null;
};

type Actions = {
  setModal: (args: State) => void;
};

export const useModal = create<State & Actions>()((set) => ({
  modal: false,
  subcription: null,
  view: null,
  setModal: (args) => set(args),
}));
