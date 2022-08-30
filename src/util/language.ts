import { BoardItemName, ENGLISH_TO_VIET } from ".";

export const toViet = (eng: string) => {
  return ENGLISH_TO_VIET[eng.toUpperCase() as BoardItemName] ?? eng;
};
