import {
  Dispatch,
  ForwardRefExoticComponent,
  RefAttributes,
  SetStateAction,
} from "react";
import { LucideProps } from "lucide-react";

import { TMenuType } from "@/app/variables/enums";

export interface IActiveItem {
  title: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  isActive: boolean;
  menuType: TMenuType;
}

export interface IHymn {
  src: string;
  title: string;
  isMulti?: number;
  isHomework?: boolean;
  isThisWeek?: boolean;
  song?: string;
  type: TMenuType;
}

export interface IPlayHymn extends IHymn {
  index: number;
}

export interface IAudioPlayer {
  setShowPlayListAction: Dispatch<SetStateAction<boolean>>;
}

export interface IPlayList extends IAudioPlayer {
  showPlayList: boolean;
}
