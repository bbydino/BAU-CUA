/**
 * constants and functions regarding language and translations
 * viet font key mapping: https://www.dafontfree.net/vps-qui-nhon-hoa-light/f70930.htm
 */

export enum Languages {
  ENGLISH = "en",
  VIETNAMESE = "vn",
}

export function t(eng: string, lang: Languages) {
  if (lang === Languages.VIETNAMESE) {
    return toViet(eng) || eng;
  }

  return eng;
}

export function toViet(eng: string) {
  return ENGLISH_TO_VIET[eng.toUpperCase()] ?? eng;
}

const BOARD_ITEMS_VIET = {
  SHRIMP: "tôm",
  CRAB: "cua",
  FISH: "cá",
  CHICKEN: "gà",
  SQUASH: "bÀu",
  DEER: "nai",
  "ROLL DICE": String.fromCharCode(
    199,
    193,
    110,
    104,
    32,
    108,
    218,
    67,
    32,
    108,
    161,
    67
  ), // ĐÁNH LÚC LẮC
  "SAVE BET": String.fromCharCode(199, 193, 110, 104, 32, 99, 208, 174, 99), // ĐÁNH CƯỢC
  "CLEAR BET": String.fromCharCode(99, 104, 168, 73, 32, 99, 208, 174, 99), // chùi cược
  "TOTAL BET": String.fromCharCode(
    84,
    176,
    78,
    71,
    32,
    84,
    73,
    352,
    78,
    32,
    99,
    208,
    174,
    99
  ), // tổng tiền cược
  "INVALID BET": String.fromCharCode(
    99,
    208,
    174,
    99,
    32,
    66,
    402,
    84,
    32,
    72,
    174,
    80,
    32,
    76,
    6
  ), // cược bất hợp lệ
};

const PLAYER_INFO_VIET = {
  "PLAYER SUMMARY": "",
  LANGUAGE: String.fromCharCode(110, 103, 212, 110, 32, 110, 103, 29), // NGÔN NGỮ
  NAME: String.fromCharCode(84, 234, 78), // tên
  MONEY: String.fromCharCode(84, 73, 352, 78), // tiền
  "WIN STREAK": "",
  "LOSING STREAK": "",
  "MOST CHOSEN": "",
  "LUCKY ANIMAL": "",
  "UNLUCKY ANIMAL": "",
};

const LANGUAGE_NAMES_VIET = {
  ENGLISH: String.fromCharCode(84, 73, 8240, 110, 103, 32, 65, 110, 104), // TIẾNG ANH
  VIETNAMESE: String.fromCharCode(84, 73, 8240, 110, 103, 32, 118, 73, 6, 84), // TIẾNG VIỆT
};
const INSTRUCTIONS_VIET = {
  "HOW TO PLAY": "",
  "THERE ARE SIX ITEMS ON THE BOARD (DEER, SQUASH, CHICKEN, FISH, CRAB, SHRIMP), AND THREE DICE ARE ROLLED. EACH DIE HAS EQUAL CHANCE OF BEING ONE OF THE SIX ITEMS. YOU PLACE BETS ON WHAT ITEM YOU THINK THE DICE WILL SHOW. THEN YOU ROLL THE DIE. FOR EACH DICE THAT HAS YOUR SELECTED ITEM(S), YOU GET YOUR MONEY BACK PLUS WHATEVER YOU BET. IF THE DICE DON'T INCLUDE YOUR SELECTED ITEM(S), YOU LOSE THE MONEY YOU BET ON THOSE ITEM(S).":
    "",
};
interface EnglishToVietMap {
  [index: string]: string;
}
export const ENGLISH_TO_VIET: EnglishToVietMap = {
  ...BOARD_ITEMS_VIET,
  ...PLAYER_INFO_VIET,
  ...LANGUAGE_NAMES_VIET,
  ...INSTRUCTIONS_VIET,
};
