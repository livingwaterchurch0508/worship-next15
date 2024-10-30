import { IActiveItem } from "@/app/variables/interfaces";
import { MENU_ICONS, MENU_TITLES, MENU_TYPES } from "@/app/variables/enums";

const Menus: IActiveItem[] = Object.values(MENU_TYPES).map((type, index) => ({
  title: MENU_TITLES[type],
  icon: MENU_ICONS[type],
  isActive: index === 0,
  menuType: type,
}));

export { Menus };
