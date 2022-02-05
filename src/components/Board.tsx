import { Grid } from "@mui/material";
import React, { useState } from "react";
import { BoardItem as BoardItemModel, BOARD_ITEM_MAPPING } from "../util";
import BoardItem from "./BoardItem";

const Board = () => {
  const [selections, setSelections] = useState([]);
  console.log(selections);

  const handleItemClick = (name: string) => {
    console.log("CLICK:", name);
    let newSelections = selections.slice();
    newSelections.push(name);
    setSelections(newSelections);
  };

  const renderBoardItem = (item: BoardItemModel) => (
    <BoardItem
      key={item.name}
      name={item.name}
      image={item.img}
      color={item.color}
      onClick={(name) => handleItemClick(name)}
    />
  );

  return (
    <Grid container flexDirection="column" spacing={2}>
      <Grid container item flexDirection="row" justifyContent="space-evenly">
        {BOARD_ITEM_MAPPING.slice(0, 3).map(renderBoardItem)}
      </Grid>
      <Grid container item flexDirection="row" justifyContent="space-evenly">
        {BOARD_ITEM_MAPPING.slice(3, 6).map(renderBoardItem)}
      </Grid>
    </Grid>
  );
};

export default Board;
