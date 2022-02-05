import shrimpImg from "../img/shrimp.gif";
import crabImg from "../img/crab.gif";
import fishImg from "../img/fish.gif";
import chickenImg from "../img/chicken.gif";
import squashImg from "../img/squash.gif";
import deerImg from "../img/deer.gif";

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
}

export const BOARD_ITEM_MAPPING: BoardItem[] = [
  {
    name: BoardItemName.DEER,
    img: deerImg,
    color: "#7A4B11",
  },
  {
    name: BoardItemName.SQUASH,
    img: squashImg,
    color: "#5AAFF3",
  },
  {
    name: BoardItemName.CHICKEN,
    img: chickenImg,
    color: "#FFAE4A",
  },
  {
    name: BoardItemName.FISH,
    img: fishImg,
    color: "#FF278E",
  },
  {
    name: BoardItemName.CRAB,
    img: crabImg,
    color: "#00CB61",
  },
  {
    name: BoardItemName.SHRIMP,
    img: shrimpImg,
    color: "#313131",
  },
];
