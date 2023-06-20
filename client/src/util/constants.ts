import chickenImg from "../img/chicken.gif";
import crabImg from "../img/crab.gif";
import deerImg from "../img/deer.gif";
import fishImg from "../img/fish.gif";
import shrimpImg from "../img/shrimp.gif";
import squashImg from "../img/squash.gif";

export const SERVER_URL = process.env.REACT_APP_SERVER_URL;
export const SERVER_PORT = process.env.REACT_APP_SERVER_PORT;
export const API_ENDPOINT = `${SERVER_URL}:${SERVER_PORT}`;

export const BOARD_ITEM_NAMES = {
  SHRIMP: "shrimp",
  CRAB: "crab",
  FISH: "fish",
  CHICKEN: "chicken",
  SQUASH: "squash",
  DEER: "deer",
};

export const BOARD_ITEM_IMAGES = {
  SHRIMP: shrimpImg,
  CRAB: crabImg,
  FISH: fishImg,
  CHICKEN: chickenImg,
  SQUASH: squashImg,
  DEER: deerImg,
};

export enum BoardItemName {
  "SHRIMP" = "SHRIMP",
  "CRAB" = "CRAB",
  "FISH" = "FISH",
  "CHICKEN" = "CHICKEN",
  "SQUASH" = "SQUASH",
  "DEER" = "DEER",
}

export interface BoardItem {
  name: BoardItemName;
  img: string;
  color: string;
  idx: number;
}

export interface BoardItemValue {
  item: BoardItem;
  value: number;
}

export const BOARD_ITEM_MAPPING: BoardItem[] = [
  {
    name: BoardItemName.DEER,
    img: deerImg,
    color: "#7A4B11",
    idx: 0,
  },
  {
    name: BoardItemName.SQUASH,
    img: squashImg,
    color: "#5AAFF3",
    idx: 1,
  },
  {
    name: BoardItemName.CHICKEN,
    img: chickenImg,
    color: "#FFAE4A",
    idx: 2,
  },
  {
    name: BoardItemName.FISH,
    img: fishImg,
    color: "#FF278E",
    idx: 3,
  },
  {
    name: BoardItemName.CRAB,
    img: crabImg,
    color: "#00CB61",
    idx: 4,
  },
  {
    name: BoardItemName.SHRIMP,
    img: shrimpImg,
    color: "#696969",
    idx: 5,
  },
];

export const MIN_BET_AMOUNT = 0;
export const MAX_BET_AMOUNT = 1000;
