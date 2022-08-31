import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
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
import Dice from "./Dice";

const Board = () => {
  const [values, setValues] = useState<BoardItemValue[]>(
    BOARD_ITEM_MAPPING.map((item) => ({ item: item, value: 0 }))
  );

  const [dice, setDice] = useState<BoardItemModel[]>([
    BOARD_ITEM_MAPPING[4],
    BOARD_ITEM_MAPPING[4],
    BOARD_ITEM_MAPPING[4],
  ]);

  const [isDiceRolling, setIsDiceRolling] = useState<boolean>(false);
  const [isBetSaved, setIsBetSaved] = useState<boolean>(false);

  useEffect(() => {
    if (isDiceRolling) {
      const intervalId = setInterval(() => {
        setDice([
          BOARD_ITEM_MAPPING[getRandomDiceIdx()],
          BOARD_ITEM_MAPPING[getRandomDiceIdx()],
          BOARD_ITEM_MAPPING[getRandomDiceIdx()],
        ]);
      }, 100);

      setTimeout(() => {
        clearInterval(intervalId);
        setIsDiceRolling(false);
        setIsBetSaved(false);
      }, 1000);

      return () => {
        clearInterval(intervalId);
        setIsDiceRolling(false);
        setIsBetSaved(false);
      };
    }
  }, [isDiceRolling]);

  console.log(dice);
  console.log(values);

  const getRandomDiceIdx = () =>
    Math.floor(Math.random() * BOARD_ITEM_MAPPING.length);

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
      disabled={isDiceRolling || isBetSaved}
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

  const renderDice = (item: BoardItemModel, idx: number) => (
    <Dice key={"dice" + idx} item={item} />
  );

  const saveBet = () => {
    setIsBetSaved(true);
  };

  const rollDice = () => {
    setIsDiceRolling(true);
  };

  return (
    <Grid
      container
      item
      flexDirection="column"
      justifyContent="space-around"
      spacing={1}
      sx={CARD_STYLE}
    >
      <Grid container item flexDirection="row" justifyContent="center">
        {dice.map(renderDice)}
      </Grid>
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
            onClick={saveBet}
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
            onClick={rollDice}
            fullWidth
            disabled={!isBetSaved}
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
