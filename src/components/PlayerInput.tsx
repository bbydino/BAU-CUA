import { Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  BG_STYLE,
  BoardItem,
  BoardItemValue,
  BOARD_ITEM_MAPPING,
} from "../util";
import BoardItemInput from "./BoardItemInput";

const PlayerInput = () => {
  const [values, setValues] = useState<BoardItemValue[]>(
    BOARD_ITEM_MAPPING.map((item) => ({ item: item, value: 0 }))
  );

  console.log(values);

  const handleInputChange = (
    item: BoardItem,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let newValues = values.slice();
    newValues[item.idx].value =
      event.target.value === "" ? 0 : Number(event.target.value);
    setValues(newValues);
  };

  const handleBlur = (item: BoardItem) => {
    const value = values[item.idx].value;
    let newValues = values.slice();
    if (value < 0) {
      newValues[item.idx].value = 0;
      setValues(newValues);
    } else if (value > 100) {
      newValues[item.idx].value = 100;
      setValues(newValues);
    }
  };

  const renderBoardItemInput = (item: BoardItem) => (
    <BoardItemInput
      key={item.name + "input"}
      item={item}
      value={values[item.idx].value}
      handleInputChange={handleInputChange}
      handleBlur={handleBlur}
    />
  );

  return (
    <Grid
      container
      item
      flexDirection="column"
      justifyContent="space-around"
      sx={{ ...BG_STYLE, width: "90%" }}
    >
      <Grid container item flexDirection="row" justifyContent="space-evenly">
        {BOARD_ITEM_MAPPING.slice(0, 3).map(renderBoardItemInput)}
      </Grid>
      <Grid container item flexDirection="row" justifyContent="space-evenly">
        {BOARD_ITEM_MAPPING.slice(3, 6).map(renderBoardItemInput)}
      </Grid>
      <Grid item>
        <Button variant="contained" size="large" color="secondary" fullWidth>
          <Typography align="center" variant="h5" color="primary">
            <b>SUBMIT BET</b>
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

export default PlayerInput;
