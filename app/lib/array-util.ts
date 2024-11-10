import { IHymn } from "@/app/variables/interfaces";
import { SORT_TYPES, TSortType } from "@/app/variables/enums";

export function homeworkSort(array: IHymn[]) {
  return array.sort(
    (
      { isHomework: aIsHomework = false, isThisWeek: aIsThisWeek = false },
      { isHomework: bIsHomework = false, isThisWeek: bIsThisWeek = false },
    ) => {
      if (aIsHomework > bIsHomework) return -1;
      if (!aIsHomework && !bIsHomework && aIsThisWeek > bIsThisWeek) return -1;

      return 0;
    },
  );
}

function koreanSort(array: IHymn[], order: TSortType) {
  const sortedArray = array.sort(({ title: aTitle }, { title: bTitle }) =>
    aTitle.split(".")[1].localeCompare(bTitle.split(".")[1]),
  );
  return order === SORT_TYPES.LANGUAGE_ASC
    ? sortedArray
    : sortedArray.reverse();
}

function numberSort(array: IHymn[], order: TSortType) {
  const sortedArray = array.sort(
    ({ title: aTitle }, { title: bTitle }) =>
      +aTitle.split(".")[0] - +bTitle.split(".")[0],
  );
  return order === SORT_TYPES.NUMBER_ASC ? sortedArray : sortedArray.reverse();
}

function filterMulti(array: IHymn[]) {
  const multiSet = new Set(
    array
      .filter(({ isMulti }) => {
        return !!isMulti;
      })
      .map(({ title }) => title),
  );

  return array.filter(({ title, isMulti }) => {
    if (multiSet.has(title)) return !!isMulti;
    return true;
  });
}

function filterIsHymn(array: IHymn[], isHymn: boolean) {
  if (!isHymn) return array;
  return array.filter(({ song }) => song);
}

export function arraySort(array: IHymn[], order: TSortType, isHymn: boolean) {
  if (order === SORT_TYPES.NUMBER_ASC || order === SORT_TYPES.NUMBER_DESC) {
    return homeworkSort(
      numberSort(filterMulti(filterIsHymn(array, isHymn)), order),
    );
  }
  return homeworkSort(
    koreanSort(filterMulti(filterIsHymn(array, isHymn)), order),
  );
}

export function setTextColor(hymn: IHymn) {
  if (hymn?.isHomework) return "text-red-600 dark:text-red-400";
  if (hymn?.isThisWeek) return "text-yellow-600 dark:text-yellow-400";
  if (!!hymn?.song) return "text-blue-600 dark:text-blue-400";
  return "text-gray-600 dark:text-gray-400";
}
