import { Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  BoardItem as BoardItemModel,
  BoardItemValue,
  BOARD_ITEM_MAPPING,
  CARD_STYLE,
  MAX_BET_AMOUNT,
  MIN_BET_AMOUNT,
  toViet,
} from "../../util";
import BoardItem from "./BoardItem";
import BoardItemInput from "./BoardItemInput";

const Board = () => {
  const [values, setValues] = useState<BoardItemValue[]>(
    BOARD_ITEM_MAPPING.map((item) => ({ item: item, value: 0 }))
  );
  console.log(values);

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

  const renderBoardItemInput = (item: BoardItemModel) => (
    <BoardItemInput
      key={item.name + "input"}
      item={item}
      value={values[item.idx].value}
      handleInputChange={handleInputChange}
    />
  );

  const handleInputChange = (
    item: BoardItemModel,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = Number(event.target.value);
    let newValues = values.slice();
    if (value === undefined) {
      // do nothing
    } else if (value < MIN_BET_AMOUNT) {
      newValues[item.idx].value = MIN_BET_AMOUNT;
    } else if (value > MAX_BET_AMOUNT) {
      newValues[item.idx].value = MAX_BET_AMOUNT;
    } else {
      newValues[item.idx].value = value;
    }
    setValues(newValues);
  };

  return (
    <Grid
      container
      item
      flexDirection="column"
      justifyContent="space-around"
      sx={CARD_STYLE}
    >
      <Grid
        container
        item
        flexDirection="row"
        justifyContent="space-evenly"
        wrap="wrap"
      >
        {BOARD_ITEM_MAPPING.slice(0, 3).map(renderBoardItem)}
        {BOARD_ITEM_MAPPING.slice(0, 3).map(renderBoardItemInput)}
      </Grid>
      <Grid container item flexDirection="row" justifyContent="space-evenly">
        {BOARD_ITEM_MAPPING.slice(3, 6).map(renderBoardItem)}
        {BOARD_ITEM_MAPPING.slice(3, 6).map(renderBoardItemInput)}
      </Grid>
      <Grid item container flexDirection="row">
        <Grid item xs={6}>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            fullWidth
            sx={{ height: "100%" }}
          >
            <Typography align="center" variant="h5" color="primary">
              <b>{toViet("SAVE BET")}</b>
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            fullWidth
            sx={{ height: "100%" }}
          >
            <Typography align="center" variant="h5" color="secondary">
              <b>{toViet("ROLL DICE")}</b>
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Board;
