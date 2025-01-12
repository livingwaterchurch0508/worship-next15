import {
  Dispatch,
  ForwardRefExoticComponent,
  RefAttributes,
  RefObject,
  SetStateAction,
} from "react";
import { LucideProps } from "lucide-react";
import type { UniqueIdentifier } from "@dnd-kit/core/dist/types";

import { TMenuType } from "@/app/variables/enums";

export interface IActiveItem {
  title: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  isActive: boolean;
  menuType: TMenuType;
}

export interface IWorship {
  src: string;
  title: string;
  isMulti?: number;
  isHomework?: boolean;
  isThisWeek?: boolean;
  song?: string;
}

export interface IHymn extends IWorship {
  type: TMenuType;
}

export interface IPlayHymn extends IHymn {
  id: UniqueIdentifier;
  index: number;
}

export interface IPlayList extends IDetailPlayer {
  showPlayList: boolean;
  setShowPlayListAction: Dispatch<SetStateAction<boolean>>;
}

export interface IDetailPlayer {
  handlePrevPlay: () => void;
  handlePause: () => void;
  handlePlay: () => void;
  handleNextPlay: (isEnded?: boolean) => void;
  handleScore: () => void;
  handlePlayMode: () => void;
  progress: number;
  progressBarRef: RefObject<HTMLDivElement | null>;
  audioRef: RefObject<HTMLAudioElement | null>;
  handleMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
}
