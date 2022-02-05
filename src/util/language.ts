import { BOARD_ITEM_NAMES_VIET } from ".";

export const toViet = (eng: string) => {
  return BOARD_ITEM_NAMES_VIET[eng.toUpperCase()] ?? eng;
};
