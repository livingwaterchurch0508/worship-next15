import { Book, Inbox, Music, Printer } from "lucide-react";

import { hymns } from "@/app/mocks/hymns";
import { prints } from "@/app/mocks/prints";
import { pastors } from "@/app/mocks/pastors";
import { michaels } from "@/app/mocks/michaels";

const MENU_TYPES = {
  HYMN: "hymn",
  PRINT: "print",
  MICHAEL: "michael",
  PASTOR: "pastor",
} as const;

export type TMenuType = (typeof MENU_TYPES)[keyof typeof MENU_TYPES];

const MENU_TITLES = {
  [MENU_TYPES.HYMN]: "찬송가",
  [MENU_TYPES.PRINT]: "프린트",
  [MENU_TYPES.MICHAEL]: "복음성가",
  [MENU_TYPES.PASTOR]: "목사님찬양",
} as const;

const MENU_ICONS = {
  [MENU_TYPES.HYMN]: Book,
  [MENU_TYPES.PRINT]: Printer,
  [MENU_TYPES.MICHAEL]: Inbox,
  [MENU_TYPES.PASTOR]: Music,
} as const;

const WORSHIPS = {
  [MENU_TYPES.HYMN]: hymns,
  [MENU_TYPES.PRINT]: prints,
  [MENU_TYPES.MICHAEL]: michaels,
  [MENU_TYPES.PASTOR]: pastors,
} as const;

const SORT_TYPES = {
  LANGUAGE_ASC: 0,
  LANGUAGE_DESC: 1,
  NUMBER_ASC: 2,
  NUMBER_DESC: 3,
} as const;

export type TSortType = (typeof SORT_TYPES)[keyof typeof SORT_TYPES];

const SCORE_MODE = {
  M: "MANUAL",
  A: "AUTO",
} as const;

export type TScoreMode = (typeof SCORE_MODE)[keyof typeof SCORE_MODE];

const PLAY_MODE = {
  B: "BASIC",
  R: "REPEAT",
};

export type TPlayMode = (typeof PLAY_MODE)[keyof typeof PLAY_MODE];

export {
  MENU_TYPES,
  MENU_TITLES,
  MENU_ICONS,
  WORSHIPS,
  SORT_TYPES,
  SCORE_MODE,
  PLAY_MODE,
};
