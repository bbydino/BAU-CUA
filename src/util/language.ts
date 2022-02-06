import { BoardItemName, BOARD_ITEM_NAMES_VIET } from ".";

export const toViet = (eng: string) => {
  return BOARD_ITEM_NAMES_VIET[eng.toUpperCase() as BoardItemName] ?? eng;
};
