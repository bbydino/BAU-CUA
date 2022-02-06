import { Grid } from "@mui/material";
import React from "react";
import {
  BG_STYLE,
  BoardItem as BoardItemModel,
  BOARD_ITEM_MAPPING,
} from "../util";
import BoardItem from "./BoardItem";

const Board = () => {
  const handleItemClick = (name: string) => {
    console.log("CLICK:", name);
  };

  const renderBoardItem = (item: BoardItemModel) => (
    <BoardItem
      key={item.name + "boardItem"}
      item={item}
      handleItemClick={(name) => handleItemClick(name)}
    />
  );

  return (
    <Grid
      container
      item
      flexDirection="column"
      justifyContent="space-around"
      sx={{ ...BG_STYLE }}
    >
      <Grid
        container
        item
        flexDirection="row"
        justifyContent="space-evenly"
        wrap="wrap"
      >
        {BOARD_ITEM_MAPPING.slice(0, 3).map(renderBoardItem)}
      </Grid>
      <Grid container item flexDirection="row" justifyContent="space-evenly">
        {BOARD_ITEM_MAPPING.slice(3, 6).map(renderBoardItem)}
      </Grid>
    </Grid>
  );
};

export default Board;
