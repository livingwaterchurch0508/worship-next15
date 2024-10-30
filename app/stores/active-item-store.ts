import { create } from "zustand";

import { IActiveItem } from "@/app/variables/interfaces";
import { Menus } from "@/app/variables/constants";

interface IActiveItemStore {
  activeItem: IActiveItem;
  setActiveItem: (activeItem: IActiveItem) => void;
}

const useActiveItemStore = create<IActiveItemStore>((set) => ({
  activeItem: Menus[0],
  setActiveItem: (activeItem) => set({ activeItem }),
}));

export { useActiveItemStore };
